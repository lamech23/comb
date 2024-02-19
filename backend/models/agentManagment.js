const { DataTypes } = require("sequelize");
const db = require("../config/Database");
const Details = require("./UploadModals");
const users = require("./UserModels");

const agentManagmentTable = db.define(
  "agentManagments",
  {
    houseId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTablesName: true,
  }
);

db.sync()
  .then(() => {
    console.log("agentManagmentTable table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create agentManagmentTable table", error);
  });

  Details.belongTo(users,{
    foreignKey:"userId",
    as: 'user',
    onUpdate: "cascade"

  })

  agentManagmentTable.hasMany(Details,{
    foreignKey:"houseId",
    as: 'details',
    onUpdate: "cascade"

  })


module.exports = agentManagmentTable;
