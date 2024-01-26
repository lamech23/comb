const tenantRegistration = require("../../models/RentingModels/RegisterTenantModel");

const users = require("../../models/UserModels");
const waterStore = require("../../models/RentingModels/waterBackupModel");
const payments = require("../../models/RentingModels/additionalPaymentsModel");

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
    payableRent,
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
      payableRent,
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
    currentReadings: 0,
  };

  try {
    const updatedTenant = await tenantRegistration.update(tenantDetails, {
      where: { id: id },
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
    // console.log(waterBackupDetails);

    const waterBackup = await waterStore.create(waterBackupDetails);

    res.status(200).json({
      success: true,
      createPayments: updatedTenant,
      waterBackup: waterBackup,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const paymentsCreations = async (req, res) => {
  const { updatedPayment } = req.body;
  console.log(updatedPayment);
  try {
    const updatedPaymentArray = Object.values(updatedPayment);

    // Iterate over user IDs and create payments for each user
    for (const tenantUpdate of updatedPaymentArray) {
      const { id, amount, paymentType, dateTime } = tenantUpdate;

      // Create a payment for the current user
      const createPayment = await payments.create({
        amount: amount,
        paymentType: paymentType,
        dateTime: dateTime,
        userId: id,
      });
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
const getPayments = async (req, res) => {
  try {
    // Find payment data for the specified user
    const tenant = await tenantRegistration.findAll({});
    const tenantsId = tenant.map((data) => data.id);

    const paymentData = await payments.findAll({
      where: { userId: tenantsId },
    });

  // const totalAdditionalPayments=  tenantsId.map(async (tenantId) => {
  //     const paymentData = await payments.findAll({
  //       where: { userId: tenantId },
  //     });
  
  //     const totalAmount = paymentData.reduce((acc, detail) => {
  //       return acc + Number(detail.amount);
  //     }, 0);
  
  //     return { tenantId, totalAmount };
  //   })
  //   console.log(totalAdditionalPayments);
  const totalAdditionalPayments = await Promise.all(
    tenantsId.map(async (tenantId) => {
      const paymentData = await payments.findAll({
        where: { userId: tenantId },
      });
  
      const totalAmount = paymentData.reduce((acc, detail) => {
        return acc + Number(detail.amount);
      }, 0);
  
      console.log(totalAmount);
      return {
        ...paymentData,
        totalAmount} 
    })
  );

  // console.log(totalAdditionalPayments);
    if (paymentData) {
      res.status(200).json({
        success: true,
        totalAdditionalPayments,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Payment data not found for the user",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

//
const updateWaterBill = async (req, res) => {
  const { updatedUsers } = req.body;

  try {
    // Iterate through updatedUsers and update only the specified fields
    for (const tenantId in updatedUsers) {
      const { currentReadings, entryDate } = updatedUsers[tenantId];

      // Find the tenant in the tenantRegistration table
      const tenant = await tenantRegistration.findByPk(tenantId);

      console.log(tenant.currentReadings);
      // Check if the tenant exists
      if (!tenant) {
        return res
          .status(404)
          .json({ error: `Tenant with ID ${tenantId} not found` });
      }

      // Update or create the waterStore entry
      let waterStoreEntry = await waterStore.findOne({
        where: { tenant_id: tenantId },
      });

      if (!waterStoreEntry) {
        // If the entry doesn't exist, create a new one
        waterStoreEntry = await waterStore.create({
          currentReadings: tenant.currentReadings,
          tenant_id: tenant.Id,
        });
      } else {
        // If the entry exists, update it
        await waterStore.update(
          {
            currentReadings: tenant.currentReadings,
          },
          { where: { tenant_id: tenantId } }
        );
      }

      // Update the fields in the tenantRegistration table
      if (currentReadings !== undefined) {
        tenant.currentReadings = currentReadings;
      }
      if (entryDate !== undefined) {
        tenant.entryDate = entryDate;
      }

      // Save the changes in the tenantRegistration table
      await tenant.save();
    }

    res.json({ message: "Users updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  tenatRegistration,
  tentantUpdating,
  paymentsCreations,
  updateWaterBill,
  getPayments,
};
