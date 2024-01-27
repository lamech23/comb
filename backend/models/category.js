const { DataTypes } = require("sequelize");
const db = require("../config/Database");
const Details = require("./UploadModals");


const Category = db.define(
  "category",
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

Category.hasMany(Details, {
  foreignKey: "category_id",
});

Details.belongsTo(Category, {
  foreignKey: "category_id",
});

db.sync();

module.exports = Category;
