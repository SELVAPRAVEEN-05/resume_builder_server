const mongoose = require("mongoose");
const Degree = require("../models/degree");

const degrees = [
    { degreeName: "Bachelor of Engineering (B.E)" },
    { degreeName: "Bachelor of Technology (B.Tech)" },
    { degreeName: "Bachelor of Science (B.Sc)" },
    { degreeName: "Master of Engineering (M.E)" },
    { degreeName: "Master of Technology (M.Tech)" }
];

const seedDegrees = async () => {
    try {
        await Degree.deleteMany({});
        const result = await Degree.insertMany(degrees);
        console.log(`${result.length} degrees inserted into database`);
    } catch (error) {
        console.error('Error seeding degrees:', error.message);
    }
};

module.exports = seedDegrees;
