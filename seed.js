require('dotenv').config({ quiet: true });
const mongoose = require('mongoose');

// Import seed functions
const seedSkills = require('./src/seed/skill');
const seedLanguages = require('./src/seed/language');
const seedColleges = require('./src/seed/collage');
const seedDegrees = require('./src/seed/degree');
const seedSpecializations = require('./src/seed/specialization');
const seedCompanies = require('./src/seed/company');
const seedUsers = require('./src/seed/user');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/resume-builder';

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB\n');

    console.log('Starting database seeding...\n');
    console.log('='.repeat(50));

    // Run all seed functions
    await seedUsers();
    await seedColleges();
    await seedDegrees();
    await seedSpecializations();
    await seedSkills();
    await seedLanguages();
    await seedCompanies();

    console.log('='.repeat(50));
    console.log('\n Database seeding completed successfully!\n');

    await mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();
