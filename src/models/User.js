const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [ true, "Please provide your name" ],
      trim: true,
      maxlength: [ 50, "Name cannot be more than 50 characters" ]
    },

    email: {
      type: String,
      required: [ true, "Please provide an email" ],
      unique: true,
      trim: true
    },

    password: {
      type: String,
      required: [ true, "A password is required" ],
      trim: true,
      minlength: [ 6, "Password must be at least 6 characters long" ],
      select: false
    },

    role: {
      type: String,
      enum: [ 
        "super-admin",
        "admin", 
        "editor" 
      ],
      default: "admin"
    },

    isVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);