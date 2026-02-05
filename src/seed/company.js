const mongoose = require("mongoose");
const Company = require("../models/company");

const companies = [
    { companyName: "Google" },
    { companyName: "Microsoft" },
    { companyName: "Amazon" },
    { companyName: "Apple" },
    { companyName: "Meta" },

    { companyName: "Infosys" },
    { companyName: "TCS" },
    { companyName: "Wipro" },
    { companyName: "HCL" },
    { companyName: "Tech Mahindra" },
    { companyName: "Cognizant" },
    { companyName: "Accenture" },
    { companyName: "Capgemini" },

    { companyName: "Zoho" },
    { companyName: "Freshworks" },
    { companyName: "Flipkart" },
    { companyName: "Myntra" },
    { companyName: "Swiggy" },
    { companyName: "Zomato" },

    { companyName: "Paytm" },
    { companyName: "PhonePe" },
    { companyName: "Razorpay" },
    { companyName: "Upstox" },

    { companyName: "IBM" },
    { companyName: "Oracle" },
    { companyName: "SAP" },
    { companyName: "Intel" },
    { companyName: "Cisco" },

    { companyName: "Byju's" },
    { companyName: "Unacademy" },
    { companyName: "Coursera" },
    { companyName: "Udemy" }
];

const seedCompanies = async () => {
    try {
        await Company.deleteMany({});
        const result = await Company.insertMany(companies);
        console.log(`${result.length} companies inserted into database`);
    } catch (error) {
        console.error('Error seeding companies:', error.message);
    }
};

module.exports = seedCompanies;

