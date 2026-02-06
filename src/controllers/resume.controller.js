const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const Resume = require('../models/resume');
const PersonalDetails = require('../models/personalDetails');
const Education = require('../models/education');
const ResumeSkill = require('../models/resumeSkill');
const ResumeLanguage = require('../models/resumeLanguage');
const Experience = require('../models/experience');
const Project = require('../models/project');
const Certification = require('../models/certification');

/**
 * CREATE RESUME
 */
exports.createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { templateId, objective, personal, education, skills, languages, experience, projects, certifications } = req.body;

    const existing = await Resume.findOne({ userId });
    if (existing) return res.status(400).json({ message: 'Resume already exists' });

    const resume = await Resume.create({ userId, templateId, objective });

    if (personal) {
      await PersonalDetails.create({ resumeId: resume._id, ...personal });
    }

    if (education?.length) {
      await Education.insertMany(
        education.map(e => ({ resumeId: resume._id, ...e }))
      );
    }

    if (skills?.length) {
      await ResumeSkill.insertMany(
        skills.map(id => ({ resumeId: resume._id, skillId: id }))
      );
    }

    if (languages?.length) {
      await ResumeLanguage.insertMany(
        languages.map(id => ({ resumeId: resume._id, languageId: id }))
      );
    }

    if (experience?.length) {
      await Experience.insertMany(
        experience.map(e => ({ resumeId: resume._id, ...e }))
      );
    }

    if (projects?.length) {
      await Project.insertMany(
        projects.map(p => ({ resumeId: resume._id, ...p }))
      );
    }

    if (certifications?.length) {
      await Certification.insertMany(
        certifications.map(c => ({ resumeId: resume._id, ...c }))
      );
    }

    res.status(201).json({ message: 'Resume created successfully', resumeId: resume._id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * GET FULL RESUME
 */
exports.getMyResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.userId }).populate('templateId');
    if (!resume) return res.status(404).json({ message: 'Resume not found' });

    const data = await Promise.all([
      PersonalDetails.findOne({ resumeId: resume._id }),
      Education.find({ resumeId: resume._id }).populate('collegeId'),
      ResumeSkill.find({ resumeId: resume._id }).populate('skillId'),
      ResumeLanguage.find({ resumeId: resume._id }).populate('languageId'),
      Experience.find({ resumeId: resume._id }).populate('companyId'),
      Project.find({ resumeId: resume._id }),
      Certification.find({ resumeId: resume._id })
    ]);

    res.json({
      resume,
      personal: data[0],
      education: data[1],
      skills: data[2],
      languages: data[3],
      experience: data[4],
      projects: data[5],
      certifications: data[6]
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * GENERATE RESUME PDF (LaTeX)
 */
exports.generateResumePDF = async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.userId }).populate('templateId');
    if (!resume) return res.status(404).json({ message: 'Resume not found' });

    const personal = await PersonalDetails.findOne({ resumeId: resume._id });
    const education = await Education.find({ resumeId: resume._id }).populate('collegeId');
    const skills = await ResumeSkill.find({ resumeId: resume._id }).populate('skillId');
    const languages = await ResumeLanguage.find({ resumeId: resume._id }).populate('languageId');
    const experience = await Experience.find({ resumeId: resume._id }).populate('companyId');
    const projects = await Project.find({ resumeId: resume._id });
    const certifications = await Certification.find({ resumeId: resume._id });

    const latexService = require('../services/latex.service');
    const pdfPath = await latexService.generateResumePDF({
      resume,
      personal,
      education,
      skills,
      languages,
      experience,
      projects,
      certifications,
      template: resume.templateId
    });

    res.download(pdfPath, `resume_${resume._id}.pdf`);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'PDF generation failed', error: err.message });
  }
};

/**
 * DELETE RESUME
 */
exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.userId });
    if (!resume) return res.status(404).json({ message: 'Resume not found' });

    const id = resume._id;

    await Promise.all([
      Resume.deleteOne({ _id: id }),
      PersonalDetails.deleteOne({ resumeId: id }),
      Education.deleteMany({ resumeId: id }),
      ResumeSkill.deleteMany({ resumeId: id }),
      ResumeLanguage.deleteMany({ resumeId: id }),
      Experience.deleteMany({ resumeId: id }),
      Project.deleteMany({ resumeId: id }),
      Certification.deleteMany({ resumeId: id })
    ]);

    res.json({ message: 'Resume deleted successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * UPDATE RESUME
 */
exports.updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { templateId, objective, personal, education, skills, languages, experience, projects, certifications } = req.body;

    let resume = await Resume.findOne({ userId });
    if (!resume) return res.status(404).json({ message: 'Resume not found' });

    // Update resume fields
    if (templateId) resume.templateId = templateId;
    if (objective) resume.objective = objective;
    await resume.save();

    // Update personal details
    if (personal) {
      const existingPersonal = await PersonalDetails.findOne({ resumeId: resume._id });
      if (existingPersonal) {
        await PersonalDetails.updateOne({ resumeId: resume._id }, personal);
      } else {
        await PersonalDetails.create({ resumeId: resume._id, ...personal });
      }
    }

    // Update education
    if (education) {
      await Education.deleteMany({ resumeId: resume._id });
      if (education.length > 0) {
        await Education.insertMany(
          education.map(e => ({ resumeId: resume._id, ...e }))
        );
      }
    }

    // Update skills
    if (skills) {
      await ResumeSkill.deleteMany({ resumeId: resume._id });
      if (skills.length > 0) {
        await ResumeSkill.insertMany(
          skills.map(id => ({ resumeId: resume._id, skillId: id }))
        );
      }
    }

    // Update languages
    if (languages) {
      await ResumeLanguage.deleteMany({ resumeId: resume._id });
      if (languages.length > 0) {
        await ResumeLanguage.insertMany(
          languages.map(id => ({ resumeId: resume._id, languageId: id }))
        );
      }
    }

    // Update experience
    if (experience) {
      await Experience.deleteMany({ resumeId: resume._id });
      if (experience.length > 0) {
        await Experience.insertMany(
          experience.map(e => ({ resumeId: resume._id, ...e }))
        );
      }
    }

    // Update projects
    if (projects) {
      await Project.deleteMany({ resumeId: resume._id });
      if (projects.length > 0) {
        await Project.insertMany(
          projects.map(p => ({ resumeId: resume._id, ...p }))
        );
      }
    }

    // Update certifications
    if (certifications) {
      await Certification.deleteMany({ resumeId: resume._id });
      if (certifications.length > 0) {
        await Certification.insertMany(
          certifications.map(c => ({ resumeId: resume._id, ...c }))
        );
      }
    }

    res.json({ message: 'Resume updated successfully', resumeId: resume._id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
