const mongoose = require("mongoose");
const Specialization = require("../models/specialization");

const specializations = [
    { specializationName: "Computer Science and Engineering" },
    { specializationName: "Information Technology" },
    { specializationName: "Electronics and Communication Engineering" },
    { specializationName: "Electrical and Electronics Engineering" },
    { specializationName: "Mechanical Engineering" },
    { specializationName: "Artificial Intelligence and Machine Learning" },
    { specializationName: "Data Science" },
    { specializationName: "Cyber Security" },
    { specializationName: "Cloud Computing" },
    { specializationName: "Web Development" }
];

const seedSpecializations = async () => {
    try {
        await Specialization.deleteMany({});
        const result = await Specialization.insertMany(specializations);
        console.log(`${result.length} specializations inserted into database`);
    } catch (error) {
        console.error('Error seeding specializations:', error.message);
    }
};

module.exports = seedSpecializations;
