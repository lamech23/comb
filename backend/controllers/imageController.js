const imageUrl = require("../models/imageModel");


const getImageUrl = (req) => {
    const baseUrl = process.env.BASE_URL; // Replace with your base URL for serving images
    return `${baseUrl}/${req.file.path}`;
  };
const createImages = async (req, res)=>{
    const images = getImageUrl(req)
    const token =req.user
    const user_id = token.id
    try {
        const addImage = await imageUrl.create(
            {
                image:images,
                user_id: user_id
            }

        )
        if (addImage) {
            res.status(200).json({
                addImage,
                success: true,
                message: "successfull added "
                
            })
        }
    } catch (error) {
        console.log(error);
        
    }
}

module.exports={createImages}