const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");



// Routes
const projectRoutes = require("./routes/project.routes");
const authRoutes = require("./routes/auth.routes");
const contactRoutes = require("./routes/contact.routes");

// Error Middleware 
const errorHandler =require("./middlewares/error.middleware");

const app = express();

// secure HTTP headers
app.use(helmet());

// Enable CORS (frontend Access)
app.use(
  cors({
    origin: function (origin, callback) {
      const allowed = [
        "http://localhost:5173",
        process.env.CLIENT_URL,
      ];
      if (!origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// swagger route
app.use(
  "/api/docs",swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// Logging (only in development recommended)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Global Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP
  message: "Too many requests, try again later.",
});

app.use(limiter);


/**
 * =========================
 * HEALTH CHECK ROUTE
 * =========================
 */
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "The Portfolio API is running 🚀",
  });
});


// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);


/**
 * =========================
 * HANDLE UNKNOWN ROUTES
 * =========================
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;