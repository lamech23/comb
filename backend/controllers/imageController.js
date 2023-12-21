const imageUrl = require("../models/imageModel");

const createImages = async (req, res)=>{

    const baseUrl = process.env.BASE_URL;
    const token =req.user
    const user_id = token.id
    const imageUrls = [];

    for (let i = 0; i < req.files.length; i++) {
        const imagePath = await imageUrl.create({
            image: `${baseUrl}/${req.files[i].path}`,
            user_id: user_id
        });
        imageUrls.push(imagePath);
    }

    res.status(200).json({
        success: true,
        data: imageUrls
    });
}
const getImages = async (req, res) => {
    try {
        const token = req.user;
        const user_id = token.id;

        const images = await imageUrl.findAll({
            // where: {
            //     user_id: user_id // Ensure the field name matches your database schema
            // }
        });

        res.status(200).json({
            images: images, // Ensure you're sending 'images', not 'image' as the key
            success: true,
            message: "Fetched images",
        });
    } catch (error) {
        // Handle errors appropriately
        res.status(500).json({
            success: false,
            message: "Failed to fetch images",
            error: error.message // Send the error message for debugging
        });
    }
};

    

module.exports={createImages, getImages}