const authService = require("../services/authService");
const cookie = require("cookie-parser");
const db = require("../db");

const register = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password, type, orgId } = req.body;
  try {
    const result = await authService.loginUser(
      email.toLowerCase(),
      password,
      type,
      orgId
    );

    res.cookie("jwt", result.token, result.cookieOptions);
    res.status(201).json({
      status: result.status,
      token: result.token,
      role: result.role,
    });
  } catch (error) {
    next(error);
  }
};
const sendEmailVerify = async (req, res, next) => {
  const { email } = req.params;
  try {
    const result = await authService.sendEmailagain(email.toLowerCase());
    res.status(201).json({
      message: "Verification Email Has sent!",
    });
  } catch (error) {
    next(error);
  }
};

const sendTokenVerify = async (req, res, next) => {
  const { email } = req.params;
  try {
    const result = await authService.sendToken(email.toLowerCase());
    res.status(201).json({
      message: "Verification Email Has sent!",
    });
  } catch (error) {
    next(error);
  }
};
const otpVerify = async (req, res, next) => {
  const { email, otp } = req.body;
  try {
    const result = await authService.otpConfirm(email.toLowerCase(), otp);
    res.status(201).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};
const emailVerify = async (req, res, next) => {
  const { email, token } = req.params;
  try {
    const result = await authService.emailConfirm(email.toLowerCase(), token);
    res.status(201).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res, next) => {
  try {
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({
      status: "success",
      message: "logged Out!",
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await authService.resetPassword(
      email.toLowerCase(),
      password
    );
    res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

const recoverOrganizer = async (req, res, next) => {
  const { email } = req.params;
  try {
    const result = await authService.recoverOrganizer(email);
    res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  loginUser,
  emailVerify,
  sendEmailVerify,
  logout,
  sendTokenVerify,
  otpVerify,
  resetPassword,
  recoverOrganizer,
};
