const Template = require('../models/template');

const templates = [
  {
    name: 'Classic',
    description: 'A classic and professional resume template',
    filePath: 'jack.tex',
    isActive: true,
    previewUrl: 'http://10.227.226.205:5000/previews/classic.png'
  },
];


const seedTemplates = async () => {
  try {
    await Template.deleteMany({});
    const result = await Template.insertMany(templates);
    console.log(`${result.length} templates inserted into database`);
  } catch (error) {
    console.error('Error seeding templates:', error.message);
  }
};

module.exports = seedTemplates;
