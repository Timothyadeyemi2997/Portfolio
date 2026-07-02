const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");
const { authorize } = require("../middlewares/role.middleware");
const protect = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

// Public
router.get("/", projectController.getAll);
router.get("/:id", projectController.getById);


// Protected — multer parses multipart/form-data
router.post(
  "/",
  protect,
  upload.single("image"),
  projectController.create
);

router.put(
  "/:id",
  protect,
  upload.single("image"),
  projectController.update
);

// Delete — admin/super-admin only
router.delete(
  "/:id",
  protect,
  authorize("admin", "super-admin"),
  projectController.delete
);

  /**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Portfolio projects management
 */

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of projects
 */

module.exports = router;