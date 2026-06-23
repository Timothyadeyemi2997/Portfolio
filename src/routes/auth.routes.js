const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { loginValidator } = require("../validators/auth.validator");
const validateRequest = require("../middlewares/validate.middleware");
const protect = require("../middlewares/auth.middleware");
const { authorize } = require ("../middlewares/role.middleware");



/**
 * @route   POST /api/auth/login
 * @desc    Admin login
 * @access  Public
 */
router.post("/login",
  loginValidator,
  validateRequest,
  authController.login
);

/**
 * @route   GET /api/auth/me
 * @desc    Get current authenticated admin
 * @access  Private
 */
router.get( "/me", 
  protect, 
  authController.getMe
);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout admin
 * @access  Private
 *
 * JWT logout is handled client-side by
 * removing the token from storage.
 */
router.post("/logout", 
  protect, 
  authController.logout
);


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Admin login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */

module.exports = router;