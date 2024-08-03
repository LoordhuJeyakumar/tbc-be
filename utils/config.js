const dontenv = require("dotenv"); // Import the dotenv package

// Configure dotenv to load environment variables from a `.env` file
dontenv.config();

const envProcess = {
  MONGODB_URI: process.env.MONGODB_URI, // MongoDB connection string

  PORT: process.env.PORT, // Port number for the server to listen on

  HOSTNAME: process.env.HOSTNAME, // Hostname of the server

  DB_NAME: process.env.DB_NAME, // Name of the database

  EMAIL_HOST: process.env.EMAIL_HOST, // Hostname for the email server

  EMAIL_PORT: process.env.EMAIL_PORT, // Port number for the email server

  EMAIL_SECURE: process.env.EMAIL_SECURE, // Boolean indicating whether to use a secure connection with the email server

  EMAIL_USER: process.env.EMAIL_USER, // Username for the email server

  EMAIL_PASS: process.env.EMAIL_PASS, // Password for the email server

  FRONTEND_BASEURI: process.env.FRONTEND_BASEURI, // Base URI for the frontend

  JWT_SECRET: process.env.JWT_SECRET, // Secret key for JWT authentication
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  MONGODB_CONNECTION_URI: process.env.MONGODB_CONNECTION_URI,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  AWS_REGION: process.env.AWS_REGION,
};

// Exporting the envProcess object
module.exports = envProcess;
