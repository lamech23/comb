const { DataTypes } = require("sequelize");
const db = require("../config/Database");
const users = require("./UserModels");
const imageUrl = require("./imageModel");

const Details = db.define(
  "Details",
  {
    

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTablesName: true,
    timestamps: true,
  }
);


imageUrl.belongsTo(Details, {
  foreignKey: "details_id",
  as: "details",
  onDelete: "cascade",
  onUpdate: "cascade",
});



db.sync()
  .then(() => {
    console.log("Details table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create Details table", error);
  });

module.exports = Details;
