const Details = require("../models/UploadModals.js");
const NewsLetter = require("../models/NewsLetterModel");
const users = require("../models/UserModels.js");

const getDetails = async (req, res) => {
  let count = 0;

  try {
    const details = await Details.findAll({});

    count = details.length;

    res.status(200).json(count);
  } catch (error) {
    res.status(500);
  }
};

const getNewsLetter = async (req, res) => {
  let count = 0;
  let count2 = 0;

  try {
    const details = await NewsLetter.findAll({});
    const user = await users.findAll({});

    count = details.length;
    count2 = user.length;
    //active users
    const activeUsers = user.filter((user) => user.Active === "active");
    const activeUser = activeUsers.length;

    //tenants

    const tenants = user.filter((user) => user.role === "tenant");
    const Tenant = tenants.length;
    //landowners

    const landowner = user.filter((user) => user.role === "landowner");
    const Landlord = landowner.length;

    res.status(200).json({ count, count2, activeUser, Tenant, Landlord });
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
  getDetails,
  getNewsLetter,
};
