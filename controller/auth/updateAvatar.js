const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { User } = require("../../Schemas/user");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}${originalname}`;

  Jimp.read(tempUpload, (err, img) => {
    if (err) throw err;
    img.resize(250, 250).write(`${avatarDir}/${filename}`);
  });

  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({ avatarURL });
};
module.exports = updateAvatar;
