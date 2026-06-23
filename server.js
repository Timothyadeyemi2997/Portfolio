const connectDB = require("./src/config/db");
const { verifyEmailConnection,
} = require("./src/config/mail");
const app = require("./src/app");

connectDB();

verifyEmailConnection();


/**
 * =========================
 * START SERVER
 * =========================
 */
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  await connectDB();

  console.log(
    `🚀 Server running on port ${PORT}`
  );
});

/**
 * =========================
 * HANDLE UNHANDLED PROMISE REJECTIONS
 * =========================
 */
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err.message);

  server.close(() => {
    process.exit(1);
  });
});

/**
 * =========================
 * HANDLE UNCAUGHT EXCEPTIONS
 * =========================
 */
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err.message);

  process.exit(1);
});

/**
 * =========================
 * GRACEFUL SHUTDOWN (Render friendly)
 * =========================
 */
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");

  server.close(() => {
    console.log("Process terminated");
  });
});