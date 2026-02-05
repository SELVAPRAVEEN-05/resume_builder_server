require('dotenv').config();
const connectDB = require('./src/config/db');

// Import seed functions
const seedSkills = require('./src/seed/skill');
const seedLanguages = require('./src/seed/language');
const seedColleges = require('./src/seed/collage');
const seedCompanies = require('./src/seed/company');

const runSeeds = async () => {
    try {
        await connectDB();
        console.log('\n Starting database seeding...\n');

        await seedSkills();
        await seedLanguages();
        await seedColleges();
        await seedCompanies();

        console.log('\n All seeds completed successfully!\n');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error.message);
        process.exit(1);
    }
};

runSeeds();
