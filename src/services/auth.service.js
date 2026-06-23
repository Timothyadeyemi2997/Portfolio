const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateToken = require("../utils/generateToken");

class AuthService {
  async login(email, password) {
    // find user
    const user = await User.findOne({
      email,
    }).select("+password");

    // Create reusable error
    const error = new Error(
      "Invalid email or password"
    );
    error.statusCode = 401;

    //check user exists
    if (!user) {
      throw error;
    }

    // Compare passwords
    const isMatch = await bycrpt.compare(
      password, user.password
    );

    if (!isMatch) {
      const error = new Error(
        "Invalid credentials"
      );
      error.statusCode = 401;

      throw error;
    }

    // Generate JWT
    const token = generateToken(
      user._id
    );

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}

module.exports = new AuthService();