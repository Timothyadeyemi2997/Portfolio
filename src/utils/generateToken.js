const jwt = require("jsonwebtoken");

const generateToken = (userid) => {
  return jwt.sign(
    { id: userid },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );
};

module.exports = generateToken;