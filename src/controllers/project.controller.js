const projectService = require("../services/project.service");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

class ProjectController {
  async create(req, res, next) {
    try {
      let imageData = {};

      if (req.file) {
        const result = await uploadToCloudinary(req.file);
        imageData = {
          imageUrl: result.secure_url,
          cloudinaryId: result.public_id,
        };
      }

      const project = await projectService.createProject({
        ...req.body,
        technologies: req.body.technologies
          ? JSON.parse(req.body.technologies)
          : [],
        featured: req.body.featured === "true",
        ...imageData,
      });

      return res.status(201).json({ success: true, data: project });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const projects = await projectService.getProjects();
      return res.status(200).json({
        success: true,
        count: projects.length,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const project = await projectService.getProjectById(req.params.id);
      return res.status(200).json({ success: true, data: project });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      let imageData = {};

      if (req.file) {
        const result = await uploadToCloudinary(req.file);
        imageData = {
          imageUrl: result.secure_url,
          cloudinaryId: result.public_id,
        };
      }

      const project = await projectService.updateProject(req.params.id, {
        ...req.body,
        technologies: req.body.technologies
          ? JSON.parse(req.body.technologies)
          : [],
        featured: req.body.featured === "true",
        ...imageData,
      });

      return res.status(200).json({ success: true, data: project });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await projectService.deleteProject(req.params.id);
      return res.status(200).json({
        success: true,
        message: "Project deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProjectController();