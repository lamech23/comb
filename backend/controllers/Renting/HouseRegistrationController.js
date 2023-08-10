const HouseRegistration = require("../../models/RentingModels/HouseRegisteringModel");
const tenantRegistration = require("../../models/RentingModels/RegisterTenantModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../../models/UserModels");

// const users = require("../../models/UserModels.js");

const createToken = ([id, email, house_name, user_name]) => {
  return jwt.sign(
    {
      id: id,
      email: email,
      house_name: house_name,
      user_name: user_name,
    },
    process.env.SECRET,
    { expiresIn: "1000" }
  );
};

const getAllHouses = async (req, res) => {
  const details = await tenantRegistration.findAll({});
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

    console.log(houseName, "Params");

    const details = await tenantRegistration.findAll({
      where: {
       houseName
      }
    });
    res.status(200).json(details);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const RegisteringHouse = async (req, res) => {
  const {
    house_name,
    full_name,
    user_name,
    email,
    contact,
    location,
    password,
  } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const checkEmail = await HouseRegistration.findOne({
    where: { email: email },
  });
  try {
    if (checkEmail) {
      res.status(400);
    }
    const User = await users.create({
      email,
      password: hash,
      role: "landowner",
    });
    const HouseEntry = await HouseRegistration.create({
      house_name,
      full_name,
      user_name,
      email,
      contact,
      location,
      password: hash,
      role: "landowner",
    });

    //create a token,
    const token = createToken([
      HouseEntry.id,
      HouseEntry.house_name,
      HouseEntry.email,
      HouseEntry.role,
      HouseEntry.user_name,
    ]);
    // res.status(200).json(User)

    // pass the token as a response instead of the user
    res.status(200).json({
      id: HouseEntry.id,
      email: HouseEntry.email,
      role: HouseEntry.role,
      use_name: HouseEntry.use_name,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginginlandowner = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(404);
    }
    const user = await HouseRegistration.findOne({ where: { email: email } });

    if (!user) {
      // the reason why throw is being used is because we dont have acces to the json
      res.status(400).json({ error: "invalid  email" });
    }
    // trying to compare the password N/B :user.password is the hased password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(400).json({ error: "invalid  password" });
    }
    const token = createToken([user.id, user.email, user.role, user.user_name]);
    res.status(201).json({
      id: user.id,
      email: user.email,
      role: user.role,
      user_name: user.user_name,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  RegisteringHouse,
  loginginlandowner,
  getTenants,
  getAllHouses,
  subtotal
};
