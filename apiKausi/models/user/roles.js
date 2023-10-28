const { DataTypes } = require("sequelize");
const db = require("../../config/config");


const Roles = db.define(
  "roles",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    role: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

db.sync();

module.exports = Roles;
