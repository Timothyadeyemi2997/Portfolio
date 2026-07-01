const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/User");


const createAdmin = async () => {
  try {
    console.log("Connecting to:", process.env.MONGO_URI ? "URI found" : "URI MISSING" );
    console.log("Admin Email:", process.env.ADMIN_EMAIL ? "EMAIL found" : "EMAIL MISSING" );
    console.log("Admin Password:", process.env.ADMIN_PASSWORD ? "PASSWORD found" : "PASSWORD MISSING" );

    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      console.error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    await User.create({
      name: "Portfolio Admin",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD, // hashed automatically by pre("save") hook
      role: "super-admin",
    });

    console.log("Admin created successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();