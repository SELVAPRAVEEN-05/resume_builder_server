const Resume = require('../models/resume');
const PersonalDetails = require('../models/personalDetails');
const Education = require('../models/education');
const ResumeSkill = require('../models/resumeSkill');
const ResumeLanguage = require('../models/resumeLanguage');
const Experience = require('../models/experience');
const Project = require('../models/project');
const Certification = require('../models/certification');

exports.createResume = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      objective,
      personal,
      education,
      skills,
      languages,
      experience,
      projects,
      certifications
    } = req.body;

    // prevent duplicate resume per user
    const existing = await Resume.findOne({ user_id: userId });
    if (existing) {
      return res.status(400).json({ message: 'Resume already exists' });
    }

    const resume = await Resume.create({
      user_id: userId,
      objective
    });

    // personal details
    if (personal) {
      await PersonalDetails.create({
        resume_id: resume._id,
        ...personal
      });
    }

    // education
    if (education?.length) {
      const eduDocs = education.map(e => ({
        resume_id: resume._id,
        college_id: e.college_id,
        grade: e.grade,
        graduation_year: e.graduation_year
      }));
      await Education.insertMany(eduDocs);
    }

    // skills
    if (skills?.length) {
      const skillDocs = skills.map(skillId => ({
        resume_id: resume._id,
        skill_id: skillId
      }));
      await ResumeSkill.insertMany(skillDocs);
    }

    // languages
    if (languages?.length) {
      const langDocs = languages.map(langId => ({
        resume_id: resume._id,
        language_id: langId
      }));
      await ResumeLanguage.insertMany(langDocs);
    }

    // experience
    if (experience?.length) {
      const expDocs = experience.map(e => ({
        resume_id: resume._id,
        company_id: e.company_id,
        job_title: e.job_title,
        start_date: e.start_date,
        end_date: e.end_date,
        description: e.description
      }));
      await Experience.insertMany(expDocs);
    }

    // projects
    if (projects?.length) {
      const projDocs = projects.map(p => ({
        resume_id: resume._id,
        title: p.title,
        description: p.description,
        tech_stack: p.tech_stack
      }));
      await Project.insertMany(projDocs);
    }

    // certifications
    if (certifications?.length) {
      const certDocs = certifications.map(c => ({
        resume_id: resume._id,
        ...c
      }));
      await Certification.insertMany(certDocs);
    }

    res.status(201).json({ message: 'Resume created successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/* ============================
   GET MY RESUME (FULL)
============================ */
exports.getMyResume = async (req, res) => {
  try {
    const userId = req.userId;

    const resume = await Resume.findOne({ user_id: userId });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const [
      personal,
      education,
      skills,
      languages,
      experience,
      projects,
      certifications
    ] = await Promise.all([
      PersonalDetails.findOne({ resume_id: resume._id }),
      Education.find({ resume_id: resume._id }).populate('college_id'),
      ResumeSkill.find({ resume_id: resume._id }).populate('skill_id'),
      ResumeLanguage.find({ resume_id: resume._id }).populate('language_id'),
      Experience.find({ resume_id: resume._id }).populate('company_id'),
      Project.find({ resume_id: resume._id }),
      Certification.find({ resume_id: resume._id })
    ]);

    res.json({
      resume,
      personal,
      education,
      skills,
      languages,
      experience,
      projects,
      certifications
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/* ============================
   UPDATE RESUME OBJECTIVE
============================ */
exports.updateObjective = async (req, res) => {
  try {
    const { objective } = req.body;

    const resume = await Resume.findOneAndUpdate(
      { user_id: req.userId },
      { objective },
      { new: true }
    );

    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/* ============================
   DELETE RESUME (FULL CLEANUP)
============================ */
exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ user_id: req.userId });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const resumeId = resume._id;

    await Promise.all([
      Resume.deleteOne({ _id: resumeId }),
      PersonalDetails.deleteOne({ resume_id: resumeId }),
      Education.deleteMany({ resume_id: resumeId }),
      ResumeSkill.deleteMany({ resume_id: resumeId }),
      ResumeLanguage.deleteMany({ resume_id: resumeId }),
      Experience.deleteMany({ resume_id: resumeId }),
      Project.deleteMany({ resume_id: resumeId }),
      Certification.deleteMany({ resume_id: resumeId })
    ]);

    res.json({ message: 'Resume deleted successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
