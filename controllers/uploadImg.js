const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../models/user");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

async function uploadAvatar(req, res, next) {
  const { path: tempUpload, filename } = req.file;
  const { _id } = req.user;
  const [extention] = filename.split(".").reverse();
  const avatarName = `${_id}.${extention}`;
  const resultUpload = path.join(avatarDir, avatarName);
  await fs.rename(tempUpload, resultUpload);

  const resizedAvatar = await Jimp.read(resultUpload);
  resizedAvatar.resize(250, 250).writeAsync(resultUpload);

  const avatarURL = path.join("avatars", resultUpload);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
}

module.exports = uploadAvatar;
