const sequelize = require('sequelize')

const db = new sequelize('kausi', 'root', '',{
    host:"localhost",
    dialect: "mysql"
});
 
module.exports= db; 