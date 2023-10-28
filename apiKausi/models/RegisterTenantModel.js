const { DataTypes } = require("sequelize");
const db = require("../config/config");
const User = require("./user/users");
const HouseDetails = require("./HouseDetails");

const tenantRegistration = db.define(
  "tenant_info",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    house_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    tenants_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    landOwner_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    rent: {
      type: DataTypes.STRING,
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
    
    previousBalance: {
      type: DataTypes.BIGINT,
    },
  },
  {
    freezeTablesName: true,
    timestamps: true,
  }
);

tenantRegistration.belongsTo(User, {
  foreignKey: "landOwner_id",
  as: "landOwner",
});

User.hasMany(tenantRegistration, {
  foreignKey: "landOwner_id",
  as: "landOwner",
});

tenantRegistration.belongsTo(User, {
  foreignKey: "tenants_id",
  as: "tenant",
});

tenantRegistration.belongsTo(HouseDetails, {
  foreignKey: "house_id",
  as: "house",
});

HouseDetails.hasMany(tenantRegistration, {
  foreignKey: "house_id",
  as: "house",
});

db.sync();

module.exports = tenantRegistration;
