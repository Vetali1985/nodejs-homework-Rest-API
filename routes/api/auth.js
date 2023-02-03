const express = require("express");

const { tryCatchWrapper } = require("../../helpers");
const { register, login } = require("../../controllers/auth.controller");
const { validateBody, auth, upload } = require("../../middlewares");
const { userSchema } = require("../../schema/user");
const uploadAvatar = require("../../controllers/uploadImg");

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
authRouter.patch(
  "/users/avatars",
  tryCatchWrapper(auth),
  upload.single("avatar"),
  tryCatchWrapper(uploadAvatar)
);
