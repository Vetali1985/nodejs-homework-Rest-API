const { User } = require("../models/user");

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

module.exports = {
  getContact,
  createContact,
  current,
};
