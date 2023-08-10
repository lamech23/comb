const { DataTypes } = require("sequelize");
const db = require("../../config/Database");
const users = require("../UserModels");

const HouseRegistration = db.define(
  "register_house",
  {
    house_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contact: {
      type: DataTypes.INTEGER,
    },
    location: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    
    role: {
      type: DataTypes.STRING,
      defaultValue: "landowner",
    },
  },
  {
    freezeTablesName: true,
    timestamps: true,
  }
);

db.sync()
  .then(() => {
    console.log("HouseRegistration table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create HouseRegistration table", error);
  });

module.exports = HouseRegistration;
