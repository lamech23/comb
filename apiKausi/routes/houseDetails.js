const {
  createHouse,
  getAllHouses,
  getAllHouseDetailsById,
  getAllHouseDetailForLandOwner,
  deleteHouse,
  updateHouse
} = require("../controller/HouseDetails");


const HouseDetailsRouter = require("express").Router();
const { verifyToken } = require("../middleware/auth");
const { imageUpload } = require("../middleware/imageUpload");


HouseDetailsRouter.post("/create_house", imageUpload, verifyToken, createHouse);
HouseDetailsRouter.get("/get_all_houses", getAllHouses);
HouseDetailsRouter.get("/get_single_house/:id", getAllHouseDetailsById);
HouseDetailsRouter.get("/details_for_land_owner",verifyToken,getAllHouseDetailForLandOwner);
HouseDetailsRouter.delete("/delete_house/:id", deleteHouse);
HouseDetailsRouter.patch("update_house_details/:id" , updateHouse );


module.exports = HouseDetailsRouter;
