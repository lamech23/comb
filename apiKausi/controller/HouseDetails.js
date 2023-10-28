const HouseDetails = require("../models/HouseDetails");
const HouseImages = require("../models/HouseImages");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const getImageUrl = (req) => {
  const baseUrl = process.env.BASE_URL; // Replace with your base URL for serving images
  return `${baseUrl}/${req.file.path}`;
};

const createHouse = async (req, res) => {
  try {
    const {
      house_name,
      houseNumber,
      title,
      location,
      description,
      contact,
      price,
      category_id,
    } = req.body;

    const accessToken = req.user;
    const user_id = accessToken.userId.id;

    const image = getImageUrl(req); // Check this function for any issues

    // Create a new house listing
    const newHouse = await HouseDetails.create({
      house_name,
      houseNumber,
      title,
      location,
      description,
      contact,
      price,
      user_id,
      landOwner_id: user_id, // Assign landOwner_id based on your logic
      category_id,

    });

    if (image > 0) {
      // Create image records and associate them with the new house listing
      const imageRecords = Array.from({ length: imageCount }).map(() => ({
        imageUrl: image,
        house_id: newHouse.id,
      }));

      await HouseImages.bulkCreate(imageRecords);
    }

    res.status(201).json(newHouse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create a house listing" });
  }
};

const getAllHouses = async (req, res) => {
  const page_size = 100;
  try {
    const details = await HouseDetails.findAll({
      offset: 0,
      limit: page_size,
      order: req.query.sort ? sqs.sort(req.query.sort) : [["id", "desc"]],
      include: [
        {
          model: HouseImages,
          as: "images", // Alias for the HouseImages model
          attributes: ["imageUrl"],
        },
      ],
    });
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve house listings" });
  }
};

const getAllHouseDetailsById = async (req, res) => {
  try {
    const { id } = req.params;

    const details = await HouseDetails.findAll({
      where: {
        id: id,
      },
      include: [
        {
          model: HouseImages,
          as: "images", // Alias for the HouseImages model
          attributes: ["imageUrl"],
        },
      ],
    });

    res.status(200).json(details);
  } catch (error) {
    console.error(error);
    res.status(400).json("Error fetching house details");
  }
};

const getAllHouseDetailForLandOwner = async (req, res) => {
  try {
    const accessToken = req.user;
    const user_id = accessToken.userId.id;

    const details = await HouseDetails.findAll({
      where: {
        landOwner_id: user_id,
      },
      include: [
        {
          model: HouseImages,
          as: "images", // Alias for the HouseImages model
          attributes: ["imageUrl"],
        },
      ],
    });

    res.status(200).json(details);
  } catch (error) {
    console.error(error);
    res.status(400).json("Error fetching house details");
  }
};



const updateHouse = async (req, res) => {
  try {
    const id = req.params.id; // Assuming you pass the house ID as a URL parameter
    const updatedData = req.body;

    // Check if the house listing with the given ID exists
    const existingHouse = await HouseDetails.findByPk(id);

    if (!existingHouse) {
      return res.status(404).json({ error: "House listing not found" });
    }

    // Update specific fields of the house details
    const updatedFields = ["title", "location", "description", "price"];
    for (const field of updatedFields) {
      if (updatedData[field]) {
        existingHouse[field] = updatedData[field];
      }
    }

    // Save the updated house details
    await existingHouse.save();

    // Handle image updates or replacements
    if (updatedData.images) {
      // Delete existing images associated with the house
      await HouseImages.destroy({
        where: {
          house_id: houseId,
        },
      });

      // Insert or associate new images with the house
      const imageRecords = updatedData.images.map((imageUrl) => ({
        imageUrl,
        house_id: houseId,
      }));

      await HouseImages.bulkCreate(imageRecords);
    }

    // Return the updated house listing
    res.status(200).json(existingHouse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update house listing" });
  }
};

const deleteHouse = async (req, res) => {
  try {
    const houseId = req.params.id; // Assuming you pass the house ID as a URL parameter

    // First, delete associated images
    await HouseImages.destroy({
      where: {
        house_id: houseId,
      },
    });

    // Then, delete the house listing
    const deletedCount = await HouseDetails.destroy({
      where: {
        id: houseId,
      },
    });

    if (deletedCount > 0) {
      res.status(204).json({ message: "House listing deleted successfully" });
    } else {
      res.status(404).json({ error: "House listing not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete house listing" });
  }
};

module.exports = {
  createHouse,
  getAllHouses,
  getAllHouseDetailsById,
  getAllHouseDetailForLandOwner,
  deleteHouse,
  updateHouse
};
