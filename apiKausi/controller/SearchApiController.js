const HouseDetails = require("../models/HouseDetails");

const Search = async (req, res) => {
  try {
    const { q } = req.query;

    const keys = ["title", "price", "category"];

    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
      );
    };

    const products = await HouseDetails.findAll({});

    res.status(200).json(search(products));
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

module.exports = {
  Search,
};
