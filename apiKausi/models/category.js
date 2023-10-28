const { DataTypes } = require("sequelize");
const db = require("../config/config");

const HouseCategory = db.define(
  "HouseCategory",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

db.sync();

module.exports = HouseCategory;
