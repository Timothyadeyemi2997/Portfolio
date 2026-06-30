const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

module.exports = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      const token = signToken(user);

      return res.status(200).json({
        success: true,
        token,
        admin: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // Protected — only callable by an authenticated super-admin
  register: async (req, res, next) => {
    try {
      const { name, email, password, role } = req.body;

      // Only allow creating "admin" or "editor" — never another super-admin via API
      const allowedRoles = ["admin", "editor"];
      const finalRole = allowedRoles.includes(role) ? role : "admin";

      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({ success: false, message: "Email already in use" });
      }

      const user = await User.create({ name, email, password, role: finalRole });

      return res.status(201).json({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  getMe: async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      return res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  },

  logout: (req, res) => {
    // Stateless JWT — actual token removal happens client-side
    return res.status(200).json({ success: true, message: "Logged out successfully" });
  },
};