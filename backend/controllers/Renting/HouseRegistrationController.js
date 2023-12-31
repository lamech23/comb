const HouseRegistration = require("../../models/RentingModels/HouseRegisteringModel");
const tenantRegistration = require("../../models/RentingModels/RegisterTenantModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../../models/UserModels");
const houseName = require("../../models/RentingModels/houseNameModel");
const sequelize = require("sequelize");
const { Op } = require("sequelize");

// const users = require("../../models/UserModels.js");

const getAllHouses = async (req, res) => {
  const details = await tenantRegistration.findAll({
    where: {
      houseName: req.params.houseName,
    },
  });
  try {
    // Calculating the total expenses for each user
    const detailsWithTotal = details.map((detail) => {
      const totalExpenses = [
        Number(detail.waterBill) || 0,
        Number(detail.rent) || 0,
        Number(detail.rentDeposit) || 0,
        Number(detail.garbage) || 0,
      ].reduce((acc, currentValue) => acc + currentValue, 0);

      return {
        ...detail.dataValues,
        totalExpenses, // Adding the total expenses to the user details
      };
    });

    const landownerName = await houseName.findOne({
      include: {
        model: users,
        as: "houseName",
      },
    });
    console.log(landownerName);

    const landownerEmail = landownerName? landownerName.houseName.email: "Not Found";

    res.status(200).send({ detailsWithTotal, landownerEmail });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const subtotal = async (req, res) => {
  const { id } = req.params;
  try {
    const details = await tenantRegistration.findOne({
      where: { id },
    });
    const detail = [
      details.waterBill,
      details.rent,
      details.rentDeposit,
      details.garbage,
    ];
    let totalSum = 0;

    for (let i = 0; i < detail.length; i++) {
      totalSum += Number(detail[i]);
    }
    res.status(200).json(totalSum);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
// this get all the tenants that are registerd to as specific house name
// eg house k-50 under a landowner

const getTenants = async (req, res) => {
  const token = req.user;
  const user_id = token.id;

  try {
    const tenats = await houseName.findAll({
      where: {
        user_id: user_id,
      },
    });
    const landownerHousename = tenats.map((landOwnerHouse) => {
      return landOwnerHouse.house_name;
    });
    const tenatsHouse = await tenantRegistration.findAll({
      where: {
        houseName: landownerHousename,
      },
    });
    const tenantDetals = Array.isArray({ tenats, tenatsHouse });

    if (tenantDetals === true && tenats.length === 0) {
      return res.status(404).json({
        succese: false,
        message: "house does not exist ",
      });
    }

    res.status(200).json(tenatsHouse);
  } catch (error) {
    // res.status(400).json({ error: error.message });
  }
};

const getTenantForTenantRegistration = async (req, res) => {
  try {
    const getHouses = await houseName.findAll({});

    res.status(200).json(getHouses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const RegisteringHouse = async (req, res) => {
  const { house_name, full_name, user_name, contact, location, user_id } =
    req.body;

  try {
    const HouseEntry = await HouseRegistration.create({
      house_name,
      full_name,
      user_name,
      contact,
      location,
      user_id,
    });

    res.status(200).json(HouseEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const creatHouseCategory = async (req, res) => {
  try {
    const details = {
      house_name: req.body.house_name,
      user_id: req.body.user_id,
    };

    const houseNameDetails = await houseName.create(details);
    res.status(200).json(houseNameDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const details = await houseName.findAll({
      include: {
        model: users,
        as: "houseName",
      },
    });
    res.status(200).json(details);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getHouseByHouseName = async (req, res) => {
  try {
    const { houseName } = req.query; // accecing the houseName from the req

    const specificHouses = await tenantRegistration.findAll({
      where: {
        houseName: houseName,
      },
    });

    res.status(200).json({ specificHouses });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  RegisteringHouse,
  getTenants,
  getAllHouses,
  subtotal,
  creatHouseCategory,
  getAll,
  getTenantForTenantRegistration,
  getHouseByHouseName,
};
