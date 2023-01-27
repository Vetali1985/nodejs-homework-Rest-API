const express = require("express");

const { tryCatchWrapper } = require("../../helpers");
const { register, login } = require("../../controllers/auth.controller");
const { validateBody } = require("../../middlewares");
const { userSchema } = require("../../schema/user");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSchema),
  tryCatchWrapper(register)
);
authRouter.post("/login", tryCatchWrapper(login));
module.exports = {
  authRouter,
};
