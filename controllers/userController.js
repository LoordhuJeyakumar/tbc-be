const UserModal = require("../models/userModal");
const envProcess = require("../utils/config");
const { helperFunctions } = require("../utils/helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendVerificationEmail = require("../utils/sendVerificationEmail");

// Async function to send a verification email to the user
async function sendEmail(doc, emailType) {
  try {
    // Send verification email
    const verificationEmail = await sendVerificationEmail(doc, emailType);
    console.log("Verification email sent successfully");
    return verificationEmail;
  } catch (error) {
    console.log("Error sending verification email");
    console.log(error);
    return error;
  }
}

const userController = {
  signup: async function (request, response) {
    try {
      // Extract name, password, and email from request body with email converted to lowercase
      const { password } = request.body;
      const email = request.body.email?.toLowerCase();

      const name = helperFunctions.capitalizeText(request.body.name);

      // Check for required fields (name, password, and email)
      if (!name || !password || !email) {
        return response
          .status(400) //If any one of them undefined return Bad Request
          .json({ message: "Name, Password and Email are requierd" });
      }

      // Validate email format using the validateEmail function
      if (!helperFunctions.validateEmail(email)) {
        return response
          .status(400) //if it's not valid return Bad Request
          .json({ message: "Please enter valid email" });
      }

      // Check if a user with the same email already exists
      let existingUser = await UserModal.findOne({ email: email });

      // Handle existing user scenarios
      if (existingUser) {
        // User already exists and verified, return conflict
        if (existingUser.verification) {
          return response.status(409).json({
            message: `User with '${email}' already exists`,
          });
        } else {
          // User already exists but not verified, inform user to verify
          return response.status(409).json({
            message: `User with '${email}' already exists, Please verify your email to activate`,
          });
        }
      }

      // Hash the password using bcrypt
      const passwordHash = await bcrypt.hash(password, 10);

      // Create a JWT verification token with user information
      const verificationToken = jwt.sign(
        {
          name,
          email,
        },
        envProcess.JWT_SECRET,
        { expiresIn: "24h" }
      );

      // Create a new User model instance with extracted data and token
      let newUser = await UserModal({
        name,
        email,
        passwordHash,
        verificationToken,
      });

      // Save the new user to the database
      let savedUser = await newUser.save();

      if (savedUser) {
        // User creation successful, send verification email
        response.status(201).json({
          message:
            "User created successfully, Plaese check your email for verification",
        });
      }

      // Attempt to send verification email using the sendEmail function
      /* 
            Note that the sendEmail function is called after the user document has been saved, and the response is sent before the email is sent. This ensures that the response is returned immediately, while the email sending process runs in the background.
            */
      let emailInfo = await sendEmail(savedUser, "activationEmail");
      if (!emailInfo) {
        console.error("Error sending verification email");
      }
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },

  signin: async function (request, response) {
    try {
      // Get password and email from request body
      const password = request.body?.password;
      const email = request.body.email?.toLowerCase();

      // Check for required fields (password and email)
      if (!password || !email) {
        // Respond with Bad Request (400) if either is missing
        return response
          .status(400) //If any one of them undefined return Bad Request
          .json({ message: "Password and Email are requierd" });
      }

      // Searching for a user with the provided email in the database
      let user = await UserModal.findOne({ email: email });

      // Check if the user exists
      if (!user) {
        // If no user is found, return a 401 Unauthorized status code and an error message
        return response
          .status(401)
          .json({ message: "user does not exist, Please register!" });
      }

      // Checking if the user's email is verified
      if (!user.verification) {
        // If not, return a 403 Forbidden status code and an error message
        return response.status(403).json({
          message: "Your account is InActive, Please verify your email",
        });
      }

      // Compare the entered password with the hashed password using bcrypt
      const isAuthenticated = await bcrypt.compare(password, user.passwordHash);

      // If the password is incorrect, return a 401 Unauthorized status code and an error message
      if (!isAuthenticated) {
        return response.status(401).json({ message: "invalid password" });
      }

      // Create a JWT access token containing user information
      const accessToken = jwt.sign(
        {
          name: user.name,
          email: user.email,
          id: user._id,
          role:user.role
        },
        envProcess.JWT_SECRET,
        { expiresIn: "8h" } // Access token expires in 8 hours
      );

      let loggedInUser = await UserModal.findById(user._id, {
        passwordHash: 0,
        verification: 0,
        verificationToken: 0,
        resetToken: 0,
      });
      // If everything is correct, return a 200 OK status code and the user details along with the access token
      return response.status(200).json({
        message: "Login succesfull",
        data:{
        accessToken,
        expiresIn: 8 * 60 * 60, // 8 hours in seconds
        loggedInUser,
        }
      });
    } catch (error) {
      // If an error occurs, log the error and return a 500 Internal Server Error status code and an error message
      console.error(error);
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },

  logout: async function (request, response) {
    try {
      request.user.tokens = request.user.tokens.filter((token) => {
        return token.token != request.token;
      });
    } catch (error) {}
  },

  profile: async function (request, response) {
    try {
    } catch (error) {}
  },
  verifyActivationToken: async (request, response) => {
    try {
      const { userId, verifyToken } = request.params;
      if (!userId || !verifyToken) {
        return response
          .status(400)
          .json({ message: "verification token and userId requierd" });
      }

      const userByToken = await UserModal.findOne({
        verificationToken: verifyToken,
      });

      if (!userByToken) {
        return response
          .status(401)
          .send({ message: "Verification Token is not valid" });
      }
      const decode = jwt.verify(verifyToken, envProcess.JWT_SECRET);
      const user = await UserModal.findOne({ email: decode.email });

      if (!user) {
        return response
          .status(401)
          .json({ message: "Verification Token is not valid" });
      }

      if (user.verificationToken == verifyToken && user._id == userId) {
        user.verification = true;
        user.verificationToken = "";

        let updatedUser = await user.save();
        if (updatedUser) {
          return response
            .status(200)
            .send({ message: "verificationToken is valid" });
        } else {
          return response
            .status(401)
            .send({ message: "Verification Token is not valid" });
        }
      }

      return response
        .status(401)
        .send({ message: "Verification Token is not valid" });
    } catch (error) {
      // If an error occurs, log the error and return a 500 Internal Server Error status code and an error message

      console.error(error);
      return response
        .status(500)
        .json({ error: "Internal Server Error", error: error.message });
    }
  },
};
module.exports = userController;
