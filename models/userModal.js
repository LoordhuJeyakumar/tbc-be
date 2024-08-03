const mongoose = require("mongoose");

// Function to validate email format
const validateEmail = (e) => {
  // Regular expression for a valid email address
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // Return true if the email matches the pattern, false otherwise
  return emailPattern.test(e);
};

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is requierd"] },
    email: {
      type: String,
      required: [true, "Email is requierd"],
      validate: validateEmail,
      unique: true,
    },
    passwordHash: { type: String, required: [true, "Password is required"] },
    verification: { type: Boolean, default: false },
    verificationToken: { type: String, default: "" },
    resetToken: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
  },
  { timestamps: true }
);

// Create the User model using the userSchema
const UserModal = mongoose.model("User", userSchema, "users");
// Exporting the User model
module.exports = UserModal;
