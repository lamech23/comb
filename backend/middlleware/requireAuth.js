const jwt = require("jsonwebtoken");
const User = require("../models/UserModels");
const { Op } = require("sequelize");


const requireAuth = async (req, res, next) => {
  // const {id} =req.params

  //verifying authenticaton
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  // here am spliting the bearer from the token using the split method since i am intrested with the token the empty spaced string indicates the spaced bearer and token and basically we can discard the bearer part of the string
  const token = authorization.split(" ")[1];

  try {
    //if the code on the right is a success then its going to return the id from the payload and use that id to find the user as described down here in simple terms am decoding the token
    const user = jwt.verify(token, process.env.SECRET)

    //here we are finding the user by id . The select method only picks the id instead of getting the hashed password and email


    
    const id  = user?.id
     await User.findOne({ where: { id: id } });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

const isAdmin = (req, res, next) => {
try {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];
  const Admin = jwt.verify(token, process.env.SECRET)

  if(Admin.role.includes("Admin")){
    next()
  }
} catch (error) {
  res.status(401).json({ error: "Request is not authorized" });
  
}
};


const checkIfOwner = async (req, res, next ) =>{
  try {
    const {authorization} =req.headers
    if (!authorization) {
      return res.status(401).json({ error: "Authorization token required" });
    }
    const token = authorization.split(" ")[1];
    const isUser = jwt.verify(token, process.env.SECRET)
    const id =isUser.id
    console.log(id);
    const user = await User.findOne({where:{id}}
      
    )
    if(user){
      next()
  
    }
    
  } catch (error) {

  res.status(403).json({ error: "You forbiden to perform that action" });
  res.redirect("/")
    
  }
 
  

}
module.exports = { requireAuth, isAdmin, checkIfOwner };
