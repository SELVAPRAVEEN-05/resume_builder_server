const Template = require('../models/template');

const templates = [
  {
    name: 'Modern',
    description: 'A modern and clean resume template with contemporary styling',
    filePath: 'modern.tex',
    isActive: true,
    previewUrl: null
  },
  {
    name: 'Classic',
    description: 'A classic and professional resume template',
    filePath: 'jack.tex',
    isActive: true,
    previewUrl: null
  },
  {
    name: 'Professional',
    description: 'A professional resume template suitable for formal positions',
    filePath: 'professional.tex',
    isActive: true,
    previewUrl: null
  },
  {
    name: 'Creative',
    description: 'A creative resume template for designers and creative professionals',
    filePath: 'creative.tex',
    isActive: true,
    previewUrl: null
  }
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
