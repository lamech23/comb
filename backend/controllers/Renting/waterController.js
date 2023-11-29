const water = require("../../models/RentingModels/waterModel");

const createWater = async (req, res) => {
  const token = req.user;
  const user_id = token.id;

  const waterDetails = {
    units: req.body.units,
    user_id: user_id,
    house_id: req.body.house_id,
  };
  try {
    const createdWater = await water.create(waterDetails);
    res.status(200).send({
      createdWater,
      success: true,
      message: " water readings created successfuly ",
    });
  } catch (error) {
    res.status(500).json({
      success:false,
      message: "please provide data "
    })
  }
};

const getWater =async(req, res)=>{
  try {
    const getWater = await water.findAll({
      where:{}

    })
  } catch (error) {
    
  }
}


const deleteWater =async(req, res)=>{
  try {
    const getWater = await water.destroy({

    })
  } catch (error) {
    
  }
}
module.exports = {
  createWater,
};
