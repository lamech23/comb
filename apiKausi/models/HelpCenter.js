const { DataTypes } = require("sequelize");
const db = require("../config/Database");

const HelpCenter = db.define(
  "HelpCenter",
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
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTablesName: true,
  }
);

//db.sync()
 

module.exports = HelpCenter;
