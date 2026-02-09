const mongoose = require("mongoose");
const Language = require("../models/language");

const languages = [
    { languageName: "English" },
    { languageName: "Tamil" },
    { languageName: "Hindi" },
    { languageName: "Telugu" },
    { languageName: "Malayalam" },
    { languageName: "French" },
    { languageName: "German" },
    { languageName: "Spanish" },
    { languageName: "Mandarin Chinese" },
    { languageName: "Japanese" }
];

const seedLanguages = async () => {
    try {
        await Language.deleteMany({});
        const result = await Language.insertMany(languages);
        console.log(`${result.length} languages inserted into database`);
    } catch (error) {
        console.error('Error seeding languages:', error.message);
    }
};

module.exports = seedLanguages;
