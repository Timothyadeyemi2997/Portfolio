const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const contactController = require(
  "../controllers/contact.controller");
const protect = require(
  "../middlewares/auth.middleware");
const { contactValidator,} = require(
  "../validators/contact.validator");
const validateRequest = require(
  "../middlewares/validate.middleware"
);


const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message:
    "Too many contact requests. Try again later.",
});

/**
 * PUBLIC
 * Submit contact form
 */
router.post(
  "/",
  contactLimiter,
  contactValidator,
  validateRequest,
  contactController.create
);

/**
 * ADMIN
 * Get all messages
 */
router.get(
  "/",
  protect,
  contactController.getAll
);

/**
 * ADMIN
 * Get single message
 */
router.get(
  "/:id",
  protect,
  contactController.getOne
);

/**
 * ADMIN
 * Mark as read
 */
router.patch(
  "/:id/read",
  protect,
  contactController.markRead
);

/**
 * ADMIN
 * Delete message
 */
router.delete(
  "/:id",
  protect,
  contactController.delete
);

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact form messages
 */

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Send contact message
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - subject
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent successfully
 */

module.exports = router;