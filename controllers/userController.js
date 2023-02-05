const { User } = require("../models/user");
const { HttpError } = require("../helpers/index");

async function createContact(req, res, next) {
  const { user } = req;
  const { id: contactId } = req.body;

  user.owner.push(contactId);

  await User.findByIdAndUpdate(user._id, user);
  return res.status(201).json({
    contact: user.owner,
  });
}

async function getContact(req, res, next) {
  const { user } = req;
  const { owner } = user;

  return res.status(200).json({
    contacts: owner,
  });
}

async function current(req, res, next) {
  const { user } = req;
  const { email, subscription } = user;

  return res.status(200).json({
    user: {
      email,
      subscription,
    },
  });
}

async function verifyMail(req, res, next) {
  const { token } = req.params;
  const user = await User.findOne({
    verificationToken: token,
  });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  return res.status(200).json({
    message: "Verification successful",
  });
}
module.exports = {
  getContact,
  createContact,
  current,
  verifyMail,
};
