const { DataTypes } = require("sequelize");
const db = require("../config/Database");
const users = require("./UserModels");

const Tours = db.define(
  "tours",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    selectedDate: {
      type: DataTypes.STRING,
    },

    time: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTablesName: true,
  }
);

Tours.belongsTo(users, { foreignKey: "tour_id", as: "tour" });
//db.sync()
 

module.exports = Tours;
