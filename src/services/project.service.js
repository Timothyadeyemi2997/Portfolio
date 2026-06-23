const slugify = require("slugify");
const projectRepository = require("../repositories/project.repository");
const uploadToCloudinary = require("../utils/uploadToCloudinary");



const result = await uploadToCloudinary(
  req.file
);

class ProjectService {
  async createProject(data) {
    const slug = slugify(data.title, {
      lower: true,
      strict: true,
    });

    return await projectRepository.create({
      ...data,
      slug,
    });
  }

  async getProjects() {
    return await projectRepository.findAll();
  }

  async getProjectById(id) {
    const project =
      await projectRepository.findById(id);

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  }

  async updateProject(id, data) {
    if (data.title) {
      data.slug = slugify(data.title, {
        lower: true,
        strict: true,
      });
    }

    const project =
      await projectRepository.update(id, data);

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  }

  async deleteProject(id) {
    const project =
      await projectRepository.delete(id);

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  }
}

module.exports = new ProjectService();