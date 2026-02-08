const Resume = require('../models/resume');
const PersonalDetails = require('../models/personalDetails');
const Education = require('../models/education');
const ResumeSkill = require('../models/resumeSkill');
const ResumeLanguage = require('../models/resumeLanguage');
const Experience = require('../models/experience');
const Project = require('../models/project');
const Certification = require('../models/certification');

/**
 * CREATE RESUME (MULTIPLE ALLOWED)
 */
exports.createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      title,
      templateId,
      objective,
      personal,
      education,
      skills,
      languages,
      experience,
      projects,
      certifications
    } = req.body;

    const resume = await Resume.create({
      userId,
      title,
      templateId,
      objective
    });

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

    res.status(201).json({
      message: 'Resume created successfully',
      resumeId: resume._id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * GET ALL RESUMES OF USER
 */
exports.getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume
      .find({ userId: req.userId })
      .populate('templateId')
      .sort({ createdAt: -1 });

    res.json(resumes);

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * GET FULL RESUME BY ID
 */
exports.getResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.userId
    }).populate('templateId');

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
      PersonalDetails.findOne({ resumeId }),
      Education.find({ resumeId }).populate('collegeId'),
      ResumeSkill.find({ resumeId }).populate('skillId'),
      ResumeLanguage.find({ resumeId }).populate('languageId'),
      Experience.find({ resumeId }).populate('companyId'),
      Project.find({ resumeId }),
      Certification.find({ resumeId })
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
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * UPDATE RESUME BY ID
 */
exports.updateResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const {
      title,
      templateId,
      objective,
      personal,
      education,
      skills,
      languages,
      experience,
      projects,
      certifications
    } = req.body;

    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.userId
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (title) resume.title = title;
    if (templateId) resume.templateId = templateId;
    if (objective) resume.objective = objective;
    await resume.save();

    if (personal) {
      await PersonalDetails.findOneAndUpdate(
        { resumeId },
        personal,
        { upsert: true }
      );
    }

    if (education) {
      await Education.deleteMany({ resumeId });
      if (education.length)
        await Education.insertMany(
          education.map(e => ({ resumeId, ...e }))
        );
    }

    if (skills) {
      await ResumeSkill.deleteMany({ resumeId });
      if (skills.length)
        await ResumeSkill.insertMany(
          skills.map(id => ({ resumeId, skillId: id }))
        );
    }

    if (languages) {
      await ResumeLanguage.deleteMany({ resumeId });
      if (languages.length)
        await ResumeLanguage.insertMany(
          languages.map(id => ({ resumeId, languageId: id }))
        );
    }

    if (experience) {
      await Experience.deleteMany({ resumeId });
      if (experience.length)
        await Experience.insertMany(
          experience.map(e => ({ resumeId, ...e }))
        );
    }

    if (projects) {
      await Project.deleteMany({ resumeId });
      if (projects.length)
        await Project.insertMany(
          projects.map(p => ({ resumeId, ...p }))
        );
    }

    if (certifications) {
      await Certification.deleteMany({ resumeId });
      if (certifications.length)
        await Certification.insertMany(
          certifications.map(c => ({ resumeId, ...c }))
        );
    }

    res.json({ message: 'Resume updated successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * DELETE RESUME BY ID
 */
exports.deleteResume = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOneAndDelete({
      _id: resumeId,
      userId: req.userId
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    await Promise.all([
      PersonalDetails.deleteOne({ resumeId }),
      Education.deleteMany({ resumeId }),
      ResumeSkill.deleteMany({ resumeId }),
      ResumeLanguage.deleteMany({ resumeId }),
      Experience.deleteMany({ resumeId }),
      Project.deleteMany({ resumeId }),
      Certification.deleteMany({ resumeId })
    ]);

    res.json({ message: 'Resume deleted successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};



const latexService = require('../services/latex.service');

exports.generateResume = async (req, res) => {
  try {
    const resumeData = req.body;

    // 1. Generate PDF
    const { pdfUrl } = await latexService.generateResumePDF(resumeData);

    // 2. Create FULL URL (IMPORTANT)
    const fullPdfUrl = `${req.protocol}://${req.get('host')}${pdfUrl}`;

    // 3. Save URL in DB
    await Resume.findByIdAndUpdate(resumeData.resume._id, {
      pdfUrl: fullPdfUrl,
    });

    // 4. Send to frontend
    res.json({
      success: true,
      pdfUrl: fullPdfUrl,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
