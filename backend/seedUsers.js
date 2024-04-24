const { users } = require("./models/UserModels");
 const {Sequelize} = require( 'sequelize' );
 const bcrypt = require("bcrypt");


module.exports = {
  up: async(queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('katindi1@', 10);

    return queryInterface.bulkInsert('Users', [
      {
        email: "lamech",
        password:hashedPassword,
        role: "admin",
        verified: true,
        Active: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};