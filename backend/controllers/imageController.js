const imageUrl = require("../models/imageModel");


// const getImageUrl = (req) => {
//     // console.log(req.files.path);
//     const image= []
//     const baseUrl = process.env.BASE_URL;
//     for (let i = 0; i < req.files.length; i++) {
//         image.push(`${baseUrl}/${req.files[i].path}`);
//     }
    
//      // Replace with your base URL for serving images
//     return image
//   };
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

    res.status(201).json({
        success: true,
        data: imageUrls
    });
}

module.exports={createImages}