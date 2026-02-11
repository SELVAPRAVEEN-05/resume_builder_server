const express = require('express');
const router = express.Router();

const {
    getSkills,
    getCompanies,
    getColleges,
    getLanguages,
    getDegrees,
    getSpecializations

} = require('../controllers/data.controller');

router.get('/skills', getSkills);
router.get('/companies', getCompanies);
router.get('/colleges', getColleges);
router.get('/languages', getLanguages);
router.get('/degrees', getDegrees);
router.get('/specializations', getSpecializations);

module.exports = router;
