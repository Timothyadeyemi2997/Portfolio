// src/models/Project.js

const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },

    description: {
      type: String,
      required: [true, "Description is required"]
    },

    technologies: {
      type: [String],
      default: []
    },

    githubUrl: {
      type: String,
      default: ""
    },

    liveUrl: {
      type: String,
      default: ""
    },

    imageUrl: {
      type: String,
      default: ""
    },

    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Project", projectSchema);