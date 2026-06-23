const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Portfolio API",
    version: "1.0.0",
    description:
      "A production-ready portfolio backend API built with Node.js, Express, and MongoDB. It manages projects, authentication, and contact messages.",
  },

  servers: [
    {
      url: "http://localhost:5000",
      description: "Local server",
    },
    {
      url: "https://your-deployed-url.onrender.com",
      description: "Production server",
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },

  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;