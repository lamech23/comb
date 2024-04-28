const express = require("express");
const {
  createDetails,
  getAllDetails,
  getSingelDetails,
  deleteDetails,
  updateDetails,

  ownCompound,
  RentalHouse,
  BnBHouse,
  grtDetailsById,
  getAllHouses,
  getAllTours,
  getAllHousesByName,
  getProductsInCategory,
  fetchHousesByNames,
  getRelevantAgentToAhouse
} = require("../controllers/Details");
const { imageUpload } = require("../middlleware/upload");
const {
  requireAuth,
  isAdmin,
  checkIfOwner,
} = require("../middlleware/requireAuth");
const { hasAdmin } = require("../middlleware/checkRoles");
const { verifyToken } = require("../middlleware/token");

const router = express.Router();
//this basically means that the middleware fires first before the other routes so as to protect them
// router.use(requireAuth);
//Post a details
router.post("/", verifyToken, imageUpload, createDetails);

// GET all uploads
router.get("/allHouses", verifyToken, getAllHouses);
router.get("/relevant-agent", verifyToken, hasAdmin,  getRelevantAgentToAhouse);
router.get("/fetchHousesByName/",verifyToken, hasAdmin,  getAllHousesByName);
router.get("/housesLinkedToTenants",verifyToken,fetchHousesByNames);
router.get("/byUserId", getAllDetails);
router.get("/Bungalow", ownCompound);
router.get("/Maisonette", RentalHouse);
router.get("/Apartments", BnBHouse);
router.get("/TourRequest", getAllTours);
router.get("/fetchDetailsCategory/:category", getProductsInCategory);
router.get("/single-house/:id", verifyToken, getSingelDetails);
router.get("/byId", getSingelDetails);
router.delete("/:id",verifyToken, hasAdmin, deleteDetails);
router.get("/:id", grtDetailsById);
router.patch("/:id", checkIfOwner, imageUpload, updateDetails);

module.exports = router;
