/**
 * Validation middleware for resume data
 */

const validateResume = (req, res, next) => {
  const { personal, education, experience } = req.body;

  try {
    // Validate personal details if provided
    if (personal) {
      if (!personal.fullName || personal.fullName.trim() === '') {
        return res.status(400).json({ message: 'Full name is required' });
      }
      if (!personal.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email)) {
        return res.status(400).json({ message: 'Valid email is required' });
      }
      if (!personal.phone || !/^\+?[\d\s\-()]{10,}$/.test(personal.phone)) {
        return res.status(400).json({ message: 'Valid phone number is required' });
      }
    }

    // Validate education if provided
    if (Array.isArray(education)) {
      for (let edu of education) {
        // if (!edu.collegeId) {
        //   return res.status(400).json({ message: 'College ID is required for each education entry' });
        // }
        if (!edu.graduationYear || isNaN(parseInt(edu.graduationYear))) {
          return res.status(400).json({ message: 'Valid graduation year is required' });
        }
      }
    }

    // Validate experience if provided
    if (Array.isArray(experience)) {
      for (let exp of experience) {
        // if (!exp.companyId) {
        //   return res.status(400).json({ message: 'Company ID is required for each experience entry' });
        // }
        if (!exp.jobTitle || exp.jobTitle.trim() === '') {
          return res.status(400).json({ message: 'Job title is required' });
        }
        if (!exp.startDate) {
          return res.status(400).json({ message: 'Start date is required' });
        }
      }
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'Validation error', error: err.message });
  }
};

const validateAuth = (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    if (req.path.includes('register')) {
      // Validate registration
      if (!name || name.trim() === '') {
        return res.status(400).json({ message: 'Name is required' });
      }
    }

    // if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (!email) {
      return res.status(400).json({ message: 'Valid email is required' });
    }

    // if (!password || password.length < 6) {
    if (!password || password.length < 1) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: 'Validation error', error: err.message });
  }
};

module.exports = {
  validateResume,
  validateAuth
};
