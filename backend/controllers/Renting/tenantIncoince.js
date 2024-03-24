const nodemailer = require("nodemailer");


const lease = async(tenant) => {
 
    const companyName = "Freyton Property Agencies";
    const companyAddress = "531 Main Street, Nairobi, Ruai";
    const companyPhone = "+123 456 7890";
    const companyEmail = "info@freatonproperty.com";
    const companyLogoUrl = "https://example.com/logo.png";
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "lamechcruze@gmail.com",
            pass: "fdbmegjxghvigklv",
        },
    });

    const mailOptions = {
        to: `lamechcruze@gmail.com`,
        subject: "Lease Agreement ",
        html: `
            <div class="font-sans max-w-2xl mx-auto p-8">
                <img src="${companyLogoUrl}" alt="${companyName}" class="mx-auto max-w-xs mb-8">
                <h2 class="text-center text-xl mb-4">Lease Agreement</h2>
                <p>Hello ${tenant.tenantsName},</p>
                <p>Congratulations! You have been successfully registered as a tenant for:</p>
                <p class="font-semibold">Property: ${tenant.houseName}, ${tenant.houseNumber}</p>
                <p class="mt-4">Here are the details of your lease:</p>
                <ul class="list-disc pl-4 mt-2">
                    <li><strong>Monthly Rent:</strong> $${tenant.rent}</li>
                    <li><strong>Rent Deposit:</strong> $${tenant.rentDeposit}</li>
                    <li><strong>Water Reading:</strong> ${tenant.waterReading}</li>
                    <li><strong>Water Bill:</strong> $${tenant.waterBill}</li>
                    <li><strong>Garbage Fee:</strong> $${tenant.garbage}</li>
                    <li><strong>Rent Payment Date:</strong> ${tenant.rentPaymentDate}</li>
                    <li><strong>Previous Balance:</strong> KSH ${tenant.previousBalance}</li>
                    <li><strong>Phone Number:</strong> ${tenant.phoneNumber}</li>
                    <li><strong>Next of Kin Number:</strong> ${tenant.nextOfKingNumber}</li>
                    <li><strong>Previous Readings:</strong> ${tenant.prevReadings}</li>
                    <li><strong>Payable Rent:</strong> $${tenant.payableRent}</li>lease
                </ul>
                <p class="mt-8">Please review the lease terms carefully. If you have any questions or concerns, feel free to contact us.</p>
                <hr class="my-8">
                <p class="text-center">For any inquiries, please contact:</p>
                <p class="text-center font-semibold">${companyName}</p>
                <p class="text-center">${companyAddress}</p>
                <p class="text-center">Phone: ${companyPhone} | Email: ${companyEmail}</p>
                <p class="text-center mt-4">Thank you for choosing ${companyName}!</p>
            </div>
        `,
    };

   await transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            console.log("There was an error", err);
        } else {
            console.log("Email sent:", response);
        }
    });
    
};

module.exports = {lease}
