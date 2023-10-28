const { DataTypes } = require("sequelize");
const db = require("../config/config");
const HouseDetails = require("./HouseDetails");

const HouseImages = db.define(
  "HouseImages",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    house_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

HouseDetails.hasMany(HouseImages, { foreignKey: "house_id", as: "images" });
HouseImages.belongsTo(HouseDetails, { foreignKey: "house_id", as: "house" });

db.sync();

module.exports = HouseImages;
