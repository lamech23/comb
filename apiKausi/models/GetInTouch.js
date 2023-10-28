const { DataTypes } = require("sequelize");
const db = require("../config/Database");

const Contact = db.define(
  "contact_us",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    
    email: {
      type: DataTypes.STRING,
      unique: true,
    },

    subject: {
      type: DataTypes.STRING,
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


module.exports = Contact;
