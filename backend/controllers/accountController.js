const userAccount = require("../models/accountModel");
const cloudinary = require("cloudinary").v2;

const createAccount = async (req, res) => {
  try {
    const token = req.user;
    const user_id = token.userId.id;

    const file = req.file;
    console.log(file);

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "=Images",
    });
    const accountDetails = {
      userId: user_id,
      photo: result.secure_url,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
      gender: req.body.gender,
    };

    const newAccount = await userAccount.create(
      accountDetails,
    );

    if (newAccount) {
      return res.status(201).json({
        success: true,
        account: newAccount,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to add account",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err,
    });
  }
};

module.exports = {
  createAccount,
};
