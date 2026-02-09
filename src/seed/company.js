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
    { companyName: "Tech Mahindra" }
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

