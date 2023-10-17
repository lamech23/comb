const HouseRegistration = require("../../models/RentingModels/HouseRegisteringModel");
const tenantRegistration = require("../../models/RentingModels/RegisterTenantModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../../models/UserModels");
const houseName = require("../../models/RentingModels/houseNameModel");

// const users = require("../../models/UserModels.js");



const getAllHouses = async (req, res) => {
  const details = await tenantRegistration.findAll();
  res.status(200).json(details);

  
};


const subtotal = async(req, res) =>{
  const  id  = req.params.id;
  console.log(id, "Identification");
try {
  const details = await tenantRegistration.findOne({ 
    where:{ id:id}
  })
  const  detail = [details.waterBill,  details.rent, details.rentDeposit, details.garbage]
let totalSum = 0;
for (let i = 0; i < detail.length; i++) {
  totalSum += Number(detail[i]);
}

res.status(200).json( totalSum )
  
} catch (error) {
  res.status(500).json(error.message)
}

}
// this get all the tenants that are registerd to as specific house name
// eg house k-50 under a landowner

const getTenants = async (req, res) => {
  try {
    const {houseName} = req.params
    console.log(houseName);

    // const getHouses = await houseName.findAll({})
    const details = await tenantRegistration.findAll({
        include:{
         model: HouseRegistration,
         as:'tenentHouse'
        }
     });
  

      res.status(200).json([details] );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTenantForTenantRegistration = async (req, res) => {
  try {
 

    const getHouses = await houseName.findAll({})
  //   const details = await tenantRegistration.findAll({
  //  include:{
  //   model: HouseRegistration,
  //   as:'tenentHouse'
  //  }
    //  });

      res.status(200).json(getHouses );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const RegisteringHouse = async (req, res) => {
  const {
    house_name,
    full_name,
    user_name,
    contact,
    location,
    user_id
  } = req.body;


  try {
   
    const HouseEntry = await HouseRegistration.create({
      house_name,
      full_name,
      user_name,
      contact,
      location,
      user_id
    });

 
    // res.status(200).json(User)

    // pass the token as a response instead of the user
    res.status(200).json(HouseEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const creatHouseCategory = async(req, res)=>{
  try {
    // const {houseName, user_id} = req.body
    const details ={
      house_name: req.body.house_name,
      user_id: req.body.user_id
      
    }

    const houseNameDetails = await houseName.create(details)
    res.status(200).json(houseNameDetails)
    
  } catch (error) {
    res.status(400).json({ error: error.message });
    

    
  }
}

const getAll = async (req, res) => {
  const details = await houseName.findAll(
    {include: {
      model: users,
      as: "houseName"
    
  }});
  res.status(200).json(details);

  
};


module.exports = {
  RegisteringHouse,
  getTenants,
  getAllHouses,
  subtotal,
  creatHouseCategory,
  getAll,
  getTenantForTenantRegistration
};
