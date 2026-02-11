const skill = require("../models/skill");
const College = require("../models/college");
const Company = require("../models/company");
const Language = require("../models/language");
const Degree = require("../models/degree");
const Specialization = require("../models/specialization");

exports.getSkills = async (req, res) => {
  try {
    const skills = await skill.find().sort({ skillName: 1 });
    
    res.json({
      success: true,
      count: skills.length,
      skills
    });
  } catch (err) {
    console.error('Error fetching skills:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching skills',
      error: err.message
    });
  }
};

exports.getColleges = async (req, res) => {
  try {
    const colleges = await College.find().sort({ collegeName: 1 });
    
    res.json({
      success: true,
      count: colleges.length,
      colleges
    });
  } catch (err) {
    console.error('Error fetching colleges:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching colleges',
      error: err.message
    });
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ companyName: 1 });
    
    res.json({
      success: true,
      count: companies.length,
      companies
    });
  } catch (err) {
    console.error('Error fetching companies:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching companies',
      error: err.message
    });
  }
};

exports.getLanguages = async (req, res) => {
  try {
    const languages = await Language.find().sort({ languageName: 1 });
    
    res.json({
      success: true,
      count: languages.length,
      languages
    });
  } catch (err) {
    console.error('Error fetching languages:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching languages',
      error: err.message
    });
  }
};

exports.getDegrees = async (req, res) => {
  try {
    const degrees = await Degree.find().sort({ degreeName: 1 });
    
    res.json({
      success: true,
      count: degrees.length,
      degrees
    });
  } catch (err) {
    console.error('Error fetching degrees:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching degrees',
      error: err.message
    });
  }
};

exports.getSpecializations = async (req, res) => {
  try {
    const specializations = await Specialization.find().sort({ specializationName: 1 });
    
    res.json({
      success: true,
      count: specializations.length,
      specializations
    });
  } catch (err) {
    console.error('Error fetching specializations:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching specializations',
      error: err.message
    });
  }
};