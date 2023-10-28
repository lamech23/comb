const { DataTypes } = require("sequelize");
const db = require("../config/Database");

const NewsLetter = db.define(
  "Newsletter",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    freezeTablesName: true,
  }
);

//db.sync()
 
module.exports = NewsLetter;
