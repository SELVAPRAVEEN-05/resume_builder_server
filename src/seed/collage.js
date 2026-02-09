const mongoose = require("mongoose");
const College = require("../models/college");

const colleges = [
    { collegeName: "Anna University" },
    { collegeName: "SRM Institute of Science and Technology" },
    { collegeName: "VIT University" },
    { collegeName: "IIT Madras" },
    { collegeName: "IIT Bombay" },
    { collegeName: "Delhi University" },
    { collegeName: "Pune University" },
    { collegeName: "BITS Pilani" },
    { collegeName: "Manipal University" },
    { collegeName: "Amrita Vishwa Vidyapeetham" }
];

const seedColleges = async () => {
    try {
        await College.deleteMany({});
        const result = await College.insertMany(colleges);
        console.log(`${result.length} colleges inserted into database`);
    } catch (error) {
        console.error('Error seeding colleges:', error.message);
    }
};

module.exports = seedColleges;