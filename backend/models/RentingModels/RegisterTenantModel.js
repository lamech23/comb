const { DataTypes } = require("sequelize");
const db = require("../../config/Database");
const HouseRegistration = require("../RentingModels/HouseRegisteringModel");

const tenantRegistration = db.define(
  "tenant_info",
  {
    tenantsName: {
      type: DataTypes.STRING,
    },
    houseNumber: {
      type: DataTypes.STRING,
    },
    rent: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    rentDeposit: {
      type: DataTypes.STRING,
    },
    waterReading: {
      type: DataTypes.STRING,
    },
    waterBill: {
      type: DataTypes.INTEGER,
    },
    garbage: {
      type: DataTypes.STRING,
    },

    userName: {
      type: DataTypes.STRING,
    },

    previousBalance: {
      type: DataTypes.BIGINT,
    },
    houseName: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    nextOfKingNumber: {
      type: DataTypes.STRING,
    },

    house_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTablesName: true,
    timestamps: true,
  }
);

tenantRegistration.belongsTo(HouseRegistration, {
  foreignKey: "house_id",
  as: "tenantHouse",
  onDelete: "cascade",
  onUpdate: "cascade",
});

db.sync()
  .then(() => {
    console.log("tenant_info table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create tenant_info table", error);
  });

module.exports = tenantRegistration;
