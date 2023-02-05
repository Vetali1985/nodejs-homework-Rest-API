const express = require("express");
const {
  createContact,
  getContact,
  current,
  verifyMail,
} = require("../../controllers/userController");
const { tryCatchWrapper } = require("../../helpers");
const { auth } = require("../../middlewares");

const userRouter = express.Router();

userRouter.post(
  "/contact",
  tryCatchWrapper(auth),
  tryCatchWrapper(createContact)
);
userRouter.get("/contact", tryCatchWrapper(auth), tryCatchWrapper(getContact));
userRouter.get("/current", tryCatchWrapper(auth), tryCatchWrapper(current));
userRouter.get("/verify/:token", tryCatchWrapper(verifyMail));

module.exports = {
  userRouter,
};
