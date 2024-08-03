// Import the Express framework for creating a server
const express = require("express");

// Import the cors middleware to enable cross-origin requests
const cors = require("cors");
// Custom routes for the application
const appRouter = require("./routes");

// Create an Express application instance
const app = express();

// Enable CORS middleware (Cross-Origin Resource Sharing) for all requests
app.use(cors());

// Using built-in middleware function in Express to parse incoming requests with JSON payloads
app.use(express.json());
// Middleware setup

app.get("/", (req, res) =>
  res.status(200).send(`
    <h1></h1>
    <h1>Welcome to TBC API</h1>
    <b style="color:white; background-color:green; padding:5">Connected to MongoDB Application Health is Good</b>`)
);

// Use the application routes defined in appRouter
app.use("/api/v1", appRouter);

// Define a middleware function to handle unknown endpoints
const unknownEndpoint = (request, response) => {
  // Send a 404 Not Found response with an error message
  response.status(404).send({ error: "unknown endpoint" });
};

// Register the unknownEndpoint middleware as the last app-level middleware
// This ensures it only gets called if no other middleware handles the request
app.use(unknownEndpoint);

// Export the Express.js application instance
module.exports = app;
