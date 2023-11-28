const water = require("../../models/RentingModels/waterModel");


const createWater = async  (req, res)=>{

    const token =req.user
    const user_id =token.id

    const waterDetails = {
        units: req.body.units,
        user_id: user_id,
        house_id: req.body.house_id,
      };
    try {
        const getHouses = await water.create(waterDetails);
        res.status(200).send({
            success: true, 
            message: " water readings created successfuly "
        })

      
    } catch (error) {
        console.log(error);
        
    }

}
    
    module.exports={
        createWater
    }