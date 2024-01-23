const tenantRegistration = require("../../models/RentingModels/RegisterTenantModel");

const users = require("../../models/UserModels");
const waterStore = require("../../models/RentingModels/waterBackupModel");

const tenatRegistration = async (req, res) => {
  const {
    tenantsName,
    houseNumber,
    rent,
    email,
    rentDeposit,
    waterReading,
    waterBill,
    garbage,
    userName,
    phoneNumber,
    previousBalance,
    houseName,
    nextOfKingNumber,
    prevReadings,
    payableRent
  } = req.body;

  try {
    const tenant = await tenantRegistration.create({
      tenantsName,
      houseNumber,
      rent,
      email,
      rentDeposit,
      waterReading,
      waterBill,
      garbage,
      userName,
      houseName,
      previousBalance,
      phoneNumber,
      nextOfKingNumber,
      prevReadings,
      payableRent
      // house_id,
    });
    res.status(200).json(tenant);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

const tentantUpdating = async (req, res) => {
  const { id } = req.params;

  const token = req.user;
  const user_id = token?.id;

  const tenantDetails = {
    tenantsName: req.body.tenantsName,
    rent: req.body.rent,
    email: req.body.email,
    waterReading: req.body.waterReading,
    waterBill: req.body.waterBill,
    garbage: req.body.garbage,
    userName: req.body.userName,
    previousBalance: req.body.previousBalance,
    phoneNumber: req.body.phoneNumber,
    nextOfKingNumber: req.body.nextOfKingNumber,
    prevReadings: req.body.prevReadings,
    currentReadings: req.body.currentReadings,
  };

  try {
    const updatedTenant= await tenantRegistration.update(tenantDetails, {
      where: { id: id },
      returning: true, // Make sure to add this option to return the updated rows
    });

      //  res.status(404).json({
      //   success: false,
      //   error: "Tenant not found",
      // });

    const waterBackupDetails = {
      currentReadings: req.body.currentReadings,
      user_id: user_id,
      tenant_id: req.body.tenant_id, // Access the id property from the updatedTenant
      house_id: req.body.house_id,
    };
    console.log(waterBackupDetails);

    const waterBackup = await waterStore.create(waterBackupDetails);

    console.log(" water backups",waterBackup);

    res.status(200).json({
      success: true,
      tenantUpdate: updatedTenant,
      waterBackup: waterBackup,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};


module.exports = {
  tenatRegistration,
  tentantUpdating,
};
