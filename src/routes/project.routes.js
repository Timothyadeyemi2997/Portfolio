const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");
const { authorize } = require("../middlewares/role.middleware");

const protect = require("../middlewares/auth.middleware");

router.get("/", projectController.getAll);
router.get( "/:id", projectController.getById);
router.post( "/", protect, projectController.create);
router.put(  "/:id", protect, projectController.update);
router.delete("/:id",
  protect, authorize("admin", "super-admin"), projectController.delete);

router.delete("/projects/:id",
  protect, authorize("admin", "super-admin"),
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