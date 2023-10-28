const tenantRegistration = require("../models/RegisterTenantModel");

const registerTenant = async (req, res) => {
  const {
    tenants_id,
    house_id,
    landOwner_id,
    rent,
    rentDeposit,
    waterReading,
    waterBill,
    garbage,
    previousBalance,
    nextOfKingNumber,
  } = req.body;

  try {
    const tenant = await tenantRegistration.create({
      tenants_id,
      house_id,
      landOwner_id,
      rent,
      rentDeposit,
      waterReading,
      waterBill,
      garbage,
      previousBalance,
      nextOfKingNumber,
    });

    console.log(tenant);
    res.status(200).json(tenant);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const getTenantsForLandowner = async (req, res) => {
  try {
    const accessToken = req.user;
    const user_id = accessToken.userId.id;

    // Query the tenantRegistration model to retrieve tenants for the specified landowner
    const tenants = await tenantRegistration.findAll({
      where: { landOwner_id: user_id }, // Adjust the field name as needed
    });

    res.status(200).json(tenants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get tenants for the landowner" });
  }
};

module.exports = {
  registerTenant,
  getTenantsForLandowner,
};
