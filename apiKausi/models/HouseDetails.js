const { DataTypes } = require("sequelize");
const db = require("../config/config");
const users = require("./user/users");
const Category = require("./category");

const HouseDetails = db.define(
  "HouseDetails",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    house_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    houseNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.UUID,
    },

    landOwner_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

  },
  {
    freezeTablesName: true,
    timestamps: true,
  }
);

HouseDetails.belongsTo(users, { foreignKey: "user_id", as: "user" });
HouseDetails.belongsTo(Category, { foreignKey: "category_id", as: "category" });


db.sync();

module.exports = HouseDetails;
