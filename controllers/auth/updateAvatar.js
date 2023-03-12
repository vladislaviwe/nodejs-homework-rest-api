const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const {PORT} = process.env;
const {User} = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars")

const updateAvatar = async(req, res) => {
    const {path: tempUpload, originalname} = req.file;
    const {_id, name} = req.user;

    const avatar = await Jimp.read(tempUpload);
    avatar.resize(250,250).write(tempUpload);

    const newAvatarName = `${_id}_${name}_${originalname}`;
    const resultUpload = path.join(avatarsDir, newAvatarName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = `http://localhost:${PORT}/avatars/${newAvatarName}`;
    await User.findByIdAndUpdate(_id, {avatarURL});

    res.json({
        avatarURL,
    })
}

module.exports = updateAvatar;