const Project = require("../models/Project");

class ProjectRepository {
  async create(data) {
    return await Project.create(data);
  }

  async findAll() {
    return await Project.find().sort({
      createdAt: -1,
    });
  }

  async findById(id) {
    return await Project.findById(id);
  }

  async findBySlug(slug) {
    return await Project.findOne({ slug });
  }

  async update(id, data) {
    return await Project.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async delete(id) {
    return await Project.findByIdAndDelete(id);
  }
}

module.exports = new ProjectRepository();