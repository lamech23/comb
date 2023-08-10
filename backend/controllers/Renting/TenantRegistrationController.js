

const tenantRegistration = require("../../models/RentingModels/RegisterTenantModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../../models/UserModels");

// const users = require("../../models/UserModels.js");



const createToken = ([id,email, houseNumber,userName ]) => {
  return jwt.sign({ 
    id:id,
    email:email,
    // role:,
    houseNumber:houseNumber,
    userName:userName,

  
  }, process.env.SECRET, { expiresIn: "1000" });
};


const tenatRegistration = async (req, res) => {
    const {    
         tenantsName,
        houseNumber,
        rent,
        rentDeposit,
        waterReading,
        waterBill,
        garbage,
        userName,
        phoneNumber,
        previousBalance,
        houseName,
        email,
        nextOfKingNumber,
         password ,
         
         landowner_id
        } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt );
    const checkEmail = await tenantRegistration.findOne({where: {email: email}})
    try {
     if(checkEmail){
        res.status(400)
      }
      const User = await users.create({
        email,
        password: hash,
        role:'tenant'

      });
      const tenant = await tenantRegistration.create({
        tenantsName,
        houseNumber,
        rent,
        rentDeposit,
        waterReading,
        waterBill,
        garbage,
        userName,
        email,
        houseName,
        previousBalance,
        phoneNumber,
        nextOfKingNumber,
        password:hash,
        role:"tenant",
        landowner_id
    });
      //create a token,
      const token = createToken([ tenant.id,tenant.houseNumber,tenant.email,tenant.role,tenant.userName] );
      // res.status(200).json(User)
  
      // pass the token as a response instead of the user
      res.status(200).json({ 
        id: tenant.id,
        email: tenant.email,
        role: tenant.role,
        house_number:tenant.house_number,
        token
       });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };  



  
  module.exports = {
    tenatRegistration
  
  };
