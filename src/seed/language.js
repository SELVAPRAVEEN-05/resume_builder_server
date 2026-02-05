const mongoose = require("mongoose");
const Language = require("../models/language");

const languages = [
    { languageName: "English" },
    { languageName: "Tamil" },
    { languageName: "Hindi" },
    { languageName: "Telugu" },
    { languageName: "Malayalam" },
    { languageName: "Kannada" },
    { languageName: "Marathi" },
    { languageName: "Bengali" },
    { languageName: "Gujarati" },
    { languageName: "Punjabi" },
    { languageName: "Urdu" },
    { languageName: "Odia" },

    { languageName: "French" },
    { languageName: "German" },
    { languageName: "Spanish" },
    { languageName: "Italian" },
    { languageName: "Portuguese" },
    { languageName: "Dutch" },

    { languageName: "Chinese" },
    { languageName: "Japanese" },
    { languageName: "Korean" },
    { languageName: "Arabic" },
    { languageName: "Russian" }
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
