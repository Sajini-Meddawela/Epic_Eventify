const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      const error = new Error("You are not logged In!");
      error.statusCode = 401;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
};

//Give rolebase authentication for protected routes
const restrictTo = (...roles) => {
  return (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = decode(token);
    console.log(decoded);
    if (!roles.includes(decoded.role)) {
      throw new Error("You don't have permission for this action!");
    }
    next();
  };
};

const decode = (token) => {
  const tokenWithoutBearer = token.split(" ")[1];
  const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
  return decoded;
};

module.exports = { protect, decode, restrictTo };
