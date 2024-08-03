// Import Mongoose for interacting with MongoDB
const mongoose = require("mongoose");
// Import the environment variables and configuration settings
const envProcess = require("./utils/config");
// Import the Express.js application instance
const app = require("./app");

// Log a message indicating the start of the database connection process
console.log("Connecting to the database.... ");

// Connecting to the MongoDB database using Mongoose
mongoose
  .connect(`${envProcess.MONGODB_CONNECTION_URI}${envProcess.MONGO_DB_NAME}`) // Using the MongoDB URI and database name from the environment configuration
  .then(() => {
    // If the connection is successful, log the success message
    console.log("Successfully connected to MongoDB");

    // Start the Express server on the specified port
    app.listen(envProcess.PORT, () => {
      // Log a message indicating the server is running
      console.log(`Server running on port ${envProcess.PORT}`);
    });
  })
  .catch((error) => {
    // Log an error message if the connection fails, including the error details
    console.log("Error connecting to the MongoDB", error.message);
  });
