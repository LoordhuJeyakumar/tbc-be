const userController = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.post("/signup", userController.signup);
userRouter.get(
  "/verifyEmail/:userId/:verifyToken",

  userController.verifyActivationToken
);

userRouter.post("/signin", userController.signin)
module.exports = userRouter;
