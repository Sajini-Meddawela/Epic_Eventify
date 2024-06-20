const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const { response } = require("express");

//email send
const sendEmailagain = async (email) => {
  try {
    //check user
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email LIKE ? and confirmed = false",
      [`${email}`]
    );
    if (rows.length === 0) {
      throw new Error("Invalid Link or User Already Confirmed!");
    }
    //check token
    const tokenCheck = await db.query(
      "SELECT * FROM token WHERE userEmail LIKE ?",
      [`${email}`]
    );
    if (tokenCheck[0].length > 0) {
      throw new Error("Confirmation Email already sent to this email!");
    }
    const token = crypto.randomBytes(32).toString("hex");
    const insertQueryToken =
      "INSERT INTO Token (token, userEmail) VALUES (?, ?)";
    const insertToken = await db.query(insertQueryToken, [token, email]);

    const url = `${process.env.APP_URL}/auth/${email}/verify/${token}`;
    await sendEmail(email, "Verify Email", url);
  } catch (error) {
    throw error;
  }
};

//email send with token
const sendToken = async (email) => {
  try {
    //check user
    const [rows] = await db.query("SELECT * FROM users WHERE email LIKE ?", [
      `${email}`,
    ]);
    if (rows.length === 0) {
      throw new Error("User Not Found!");
    }
    const otp = Math.floor(10000 + Math.random() * 90000);
    const insertQueryOtp = "INSERT INTO otp (otp, userEmail) VALUES (?, ?)";
    const insertOtp = await db.query(insertQueryOtp, [otp, email]);
    await sendEmail(email, "Reset Password OTP", otp.toString());
  } catch (error) {
    throw error;
  }
};
const registerUser = async (req) => {
  const { fullName, email, pass, phone, role, uploadImg } = req;
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email LIKE ?", [
      `${email}`,
    ]);

    if (rows.length > 0) {
      throw new Error("User Already Exists!");
    }
    //check if the role is admin
    if (role == "Admin") {
      throw new Error("You cannot add Admin Roles!");
    }
    //password hashing
    const saltRounds = 10;
    const salt = await bcryptjs.genSalt(saltRounds);
    const hash = await bcryptjs.hash(pass, salt);
    // Insert the new user into the database
    const insertQuery =
      "INSERT INTO users (fullName, email, phone, img, password, role) VALUES ( ?, ?, ?, ?, ?, ?)";
    const insertUser = await db.query(insertQuery, [
      fullName,
      email,
      phone,
      uploadImg,
      hash,
      role,
    ]);
    const insertUserResult = insertUser[0];
    if (insertUserResult.affectedRows == 0) {
      throw new Error("User Registration Failed Due to Database Error!");
    }

    //update user sub tables
    const userId = insertUserResult.insertId;
    if (role === "Attendee") {
      const nic = req.nic;
      const insertQueryAttendee =
        "INSERT INTO attendees (user_id,nic, role) VALUES (?,?, 'Attendee')";
      await db.query(insertQueryAttendee, [userId, nic]);
    } else if (role === "Organizer") {
      const insertQueryOrganizer =
        "INSERT INTO organizers (user_id,organizerId, address, person1, phone1, person2, phone2, role) VALUES (?, ?, ?, ?, ?, ?, ?, 'Organizer')";
      await db.query(insertQueryOrganizer, [
        userId,
        req.organizerId,
        req.address,
        req.person1,
        req.phone1,
        req.person2,
        req.phone2,
      ]);
    } else if (role === "Admin") {
      const insertQueryAttendee =
        "INSERT INTO admins (user_id, role) VALUES (?, 'Admin')";
      await db.query(insertQueryAttendee, [userId]);
    }

    //add token and send mail
    sendEmailagain(email);

    return {
      message: "An Email sent to your account. Please Verify!",
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const loginUser = async (email, password, type, organizerId) => {
  try {
    if (!email || !password) {
      throw new Error("Email and Password Required!");
    }
    const [rows] = await db.query("SELECT * FROM users WHERE email LIKE ?", [
      `${email}`,
    ]);
    if (rows.length == 0) {
      const error = new Error("User Not Found!");
      error.statusCode = 404;
      throw error;
    }
    const fullName = rows[0].fullName;
    if (type === 1 && rows[0].role !== "Attendee") {
      throw new Error(
        `Hello ${fullName},This is attendee login,please login with your attendee account!`
      );
    } else if (type === 2 && rows[0].role !== "Organizer") {
      throw new Error(
        `Hello ${fullName},This is Organizer login, please login with your Organizer account!`
      );
    }

    const user = rows[0];
    if (user.role === "Organizer") {
      const orgId = await db.query(
        "SELECT * FROM organizers WHERE organizerId = ?",
        [`${organizerId}`]
      );
      if (orgId[0].length == 0) {
        const error = new Error("Invalid Organizer Id!");
        error.statusCode = 404;
        throw error;
      }
    }

    //check password
    let passwordMatch;
    await bcryptjs
      .compare(password, user.password)
      .then((res) => {
        passwordMatch = res;
      })
      .catch((err) => console.error(err.message));

    if (passwordMatch) {
      //check email confirm
      if (!user.confirmed) {
        throw new Error("Please Verify Your Email!");
      }
       return createSendToken(user);
    } else {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

//email confirmation
const emailConfirm = async (email, token) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email LIKE ?", [
      `%${email}%`,
    ]);
    if (rows.length === 0) {
      throw new Error("Invalid Link!");
    }

    const tokenCheck = await db.query(
      "SELECT * FROM token WHERE userEmail LIKE ? and token LIKE ?",
      [`${email}`, `${token}`]
    );

    if (tokenCheck[0] === 0) {
      throw new Error("Invalid Link!");
    }
    const updateQuery = "UPDATE users SET confirmed = true WHERE email = ?";
    const updateUserConfirmation = await db.query(updateQuery, [email]);
    if (updateUserConfirmation[0].affectedRows > 0) {
      await db.query(
        "delete FROM token WHERE userEmail LIKE ? and token LIKE ?",
        [`${email}`, `${token}`]
      );
      return "Email Confirmation Success";
    }
  } catch (error) {
    throw error;
  }
};
//otp confirmation
const otpConfirm = async (email, otp) => {
  try {
    const otpCheck = await db.query(
      "SELECT * FROM otp WHERE userEmail LIKE ? and otp LIKE ?",
      [`${email}`, `${otp}`]
    );

    if (otpCheck[0].length === 0) {
      throw new Error("Invalid OTP!");
    }
    if (otpCheck[0].length > 0) {
      await db.query("delete FROM otp WHERE userEmail LIKE ? and otp LIKE ?", [
        `${email}`,
        `${otp}`,
      ]);
      return "Email Confirmation Success";
    }
  } catch (error) {
    throw error;
  }
};

//reset password
const resetPassword = async (email, password) => {
  //password hashing
  const saltRounds = 10;
  const salt = await bcryptjs.genSalt(saltRounds);
  const hash = await bcryptjs.hash(password, salt);
  const resetQuery = await db.query(
    "UPDATE users SET password = ? WHERE email = ?",
    [`${hash}`, `${email}`]
  );

  if (resetQuery[0].affectedRows === 0) {
    throw new Error("Password Reset Failed!");
  }
};
//recover organizer
const recoverOrganizer = async (email) => {
  try {
    //check user
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email LIKE ? and role = 'Organizer'",
      [`${email}`]
    );
    if (rows.length === 0) {
      throw new Error("Organizer Not Found!");
    }

    const getOrgIdQuery =
      "SELECT o.organizerId FROM organizers o LEFT JOIN users u ON u.id=o.user_id where u.email like ?";
    const getOrgId = await db.query(getOrgIdQuery, [`${email}`]);
    const id = `Organizer Id : ${getOrgId[0][0].organizerId}`;
    await sendEmail(email, "Verify Email", id);
  } catch (error) {
    throw error;
  }
};
//created token
const signToken = (email, confirmed, role) => {
  return jwt.sign({ email, confirmed, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user) => {
  // Remove password from output
  user.password = undefined;
  
  const token = signToken(user.email, user.confirmed, user.role);
  const role = user.role;
  const email = user.email; 
 
  const cookieOptions = {
    expires: new Date(Date.now() + 5 * 60 * 1000),
    httpOnly: true,
  };
  
 return {
    status: "success",
    token,
    role,
    email,
    cookieOptions,
  };
};

module.exports = {
  registerUser,
  loginUser,
  emailConfirm,
  sendEmailagain,
  sendToken,
  otpConfirm,
  resetPassword,
  recoverOrganizer,
};
