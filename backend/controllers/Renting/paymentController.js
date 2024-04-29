const tenantRegistration = require("../../models/RentingModels/RegisterTenantModel");
const paymentRequest = require("../../models/RentingModels/paymentRequestModel");
const Details = require("../../models/UploadModals");
const users = require("../../models/UserModels");
const cloudinary = require("cloudinary").v2;

const addPayment = async (req, res) => {
  const token = req.user.userId;
  const user_id = token.id;

  console.log(user_id, "this id ");
  const file = req.file;

  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "=Images",
    });
    const paymentDetails = {
      userId: user_id,
      image: result.secure_url,
    };

    const createPayment = await paymentRequest.create(paymentDetails);
    console.log(createPayment);
    res.status(200).send({
      createPayment,
      success: true,
      message: " payment  created successfuly ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllPaymentsForAdminSide = async (req, res) => {
  try {
    const payments = await paymentRequest.findAll({
      where: {
        status: "open",
      },
      include: [
        {
          model: users,
          as: "user",
        },
      ],
    });
    if (payments) {
      const userId = payments.map((item) => item.userId);

      const tenant = await tenantRegistration.findAll({
        where: {
          userId: userId,
        },
      });

      const tenantMap = {};
      tenant.forEach((tenant) => {
        return (tenantMap[tenant.userId] = tenant);
      });

      const houseIds = [...new Set(tenant.map((tenant) => tenant.houseId))];

      const houses = await Details.findAll({
        where: {
          id: houseIds,
        },
      });

      const houseMap = {};
      houses.forEach((house) => {
        return (houseMap[house.id] = house);
      });
      const paymentsWithTenants = payments.map((payment) => {
        const userId = payment.userId;
        const tenantsHouse = tenant.find((tenant) => tenant.userId === userId);

        const houseDetails = houseMap[tenantsHouse.houseId];
        const tenantDetails = tenantMap[userId];

        return {
          ...payment.toJSON(),
          tenant: tenantDetails || {},
          house: houseDetails || {},
        };
      });

      res.status(200).json({
        payments: paymentsWithTenants,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


const updatePaymentStatus = async (req, res) => {
  const id = req.params.id;

  const paymentStatus = { status: req.query.status };

  try {
    const payment = await paymentRequest.update(paymentStatus, {where: {id: id}});
    res.status(200).json(payment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports = {
  addPayment,
  getAllPaymentsForAdminSide,
  updatePaymentStatus
};
