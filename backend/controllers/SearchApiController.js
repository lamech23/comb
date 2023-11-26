
const { Op } = require("sequelize");
const Details = require("../models/UploadModals.js");

const getSearch = async (req, res) => {
  const { keyword } = req.params;

  if (!keyword) {
    return res
      .status(400)
      .json({ message: "Keyword is required for user search." });
  }

  try {
    const keys = ["id","title", "price", "category"];
    const limit = 4;

    const products = await Details.findAll({
      where: {
        category: { [Op.like]: `%${keyword}%` },
      },
      limit: limit,
      attributes: keys,
    });

    // Filter by keyword manually (if needed)
    // const filteredProducts = products.filter((item) =>
    //   keys.some((key) => {
    //     const value = item[key];
    //     return value && typeof value === "string" && value.toLowerCase().includes(keyword);
    //   })
    // );

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      
       error: "Internal server error" });
  }
};

module.exports = {
  getSearch,
};

