// const { json } = require('sequelize/types/sequelize.js')
const users = require("../models/UserModels.js");

const getAllUsers = async (req, res) => {
  const user = await users.findAll({});
  res.status(200).json(user);
};

//activating and deactivating auser
const deactivate = async (req, res) => {
  try {
    const id = req.params.id;

    const userStatus = { Active: req.query.Active };

    const userEmail = await users.update(userStatus, { where: { id: id } });
    if (userEmail === 0) {
      return res.status(400).json({ msg: "nop" });
    }
    res.status(200).json(userEmail);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//deleting a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await users.destroy({
    where: {
      id: id,
    },
  });

  if (!user) {
    return res.status(400).json({ error: "user doesn't exist " });
  }
  res.status(200).json(user);
};
// get  single user
const getUserById = async (req, res) => {
  const { id } = req.params;
  const User = await users.findOne({
    where: {
      id: id,
    },
  });
  if (!User) {
    return res.status(400);
  } else {
    res.status(200).json(User);
  }
};
//elevating user
const getUserInfo = async (req, res) => {
  const { id } = req.params;
  const User = await users.findOne({
    where: {
      id: id,
    },
  });
  if (!User) {
    return res.status(400);
  } else {
    res.status(200).json(User);
  }
};


module.exports = {
  getAllUsers,
  deleteUser,
  getUserById,
  getUserInfo,
  deactivate,

};
