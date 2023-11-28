const { DataTypes } = require("sequelize");
const db = require("../../config/Database");
const users = require("../UserModels");
const houseName = require("./houseNameModel");

const water = db.define(
  "water",
  {
    units: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    house_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
        type: DataTypes.INTEGER,
      },
  },
  {
    freezeTablesName: true,
    timestamps: true,
  }
);
water.belongsTo(users, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "cascade",
  onUpdate: "cascade",
});
water.belongsTo(houseName, {
    foreignKey: "house_id",
    as: "house",
    onDelete: "cascade",
    onUpdate: "cascade",
  });
