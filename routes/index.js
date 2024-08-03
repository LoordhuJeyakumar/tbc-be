const userRouter = require("./userRoutes");

const appRouter = require("express").Router();

appRouter.use("/users", userRouter);

module.exports = appRouter;
