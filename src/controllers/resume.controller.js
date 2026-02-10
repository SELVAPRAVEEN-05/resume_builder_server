const Resume = require('../models/resume');
const PersonalDetails = require('../models/personalDetails');
const Education = require('../models/education');
const ResumeSkill = require('../models/resumeSkill');
const ResumeLanguage = require('../models/resumeLanguage');
const Experience = require('../models/experience');
const Project = require('../models/project');
const Certification = require('../models/certification');
const ResumeSection = require('../models/resumeSection');


exports.createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      templateKey = 'classic',
      objective = '',
      personal,
      education,
      skills,
      languages,
      experience,
      projects,
      certifications
    } = req.body;

    // Create base resume
    const resume = await Resume.create({
      userId,
      templateKey,
      objective
    });

    // Add personal details if provided
    if (personal) {
      await PersonalDetails.create({
        resumeId: resume._id,
        ...personal
      });
    }

    // Add education if provided
    if (education && Array.isArray(education) && education.length > 0) {
      const educationData = education.map((edu, index) => ({
        resumeId: resume._id,
        ...edu,
        orderIndex: edu.orderIndex !== undefined ? edu.orderIndex : index
      }));
      await Education.insertMany(educationData);
    }

    // Add skills if provided
    if (skills && Array.isArray(skills) && skills.length > 0) {
      const skillsData = skills.map((skillId, index) => ({
        resumeId: resume._id,
        skillId,
        orderIndex: index
      }));
      await ResumeSkill.insertMany(skillsData);
    }

    // Add languages if provided
    if (languages && Array.isArray(languages) && languages.length > 0) {
      const languagesData = languages.map((languageId, index) => ({
        resumeId: resume._id,
        languageId,
        orderIndex: index
      }));
      await ResumeLanguage.insertMany(languagesData);
    }

    // Add experience if provided
    if (experience && Array.isArray(experience) && experience.length > 0) {
      const experienceData = experience.map((exp, index) => ({
        resumeId: resume._id,
        ...exp,
        orderIndex: exp.orderIndex !== undefined ? exp.orderIndex : index
      }));
      await Experience.insertMany(experienceData);
    }

    // Add projects if provided
    if (projects && Array.isArray(projects) && projects.length > 0) {
      const projectsData = projects.map((proj, index) => ({
        resumeId: resume._id,
        ...proj,
        orderIndex: proj.orderIndex !== undefined ? proj.orderIndex : index
      }));
      await Project.insertMany(projectsData);
    }

    // Add certifications if provided
    if (certifications && Array.isArray(certifications) && certifications.length > 0) {
      const certificationsData = certifications.map((cert, index) => ({
        resumeId: resume._id,
        ...cert,
        orderIndex: cert.orderIndex !== undefined ? cert.orderIndex : index
      }));
      await Certification.insertMany(certificationsData);
    }

    res.status(201).json({
      success: true,
      message: 'Resume created successfully',
      resumeId: resume._id,
      resume
    });

  } catch (err) {
    console.error('Error creating resume:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while creating resume',
      error: err.message
    });
  }
};

exports.getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume
      .find({ userId: req.userId })
      .select('_id userId templateKey objective createdAt updatedAt')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: resumes.length,
      resumes
    });

  } catch (err) {
    console.error('Error fetching resumes:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching resumes',
      error: err.message
    });
  }
};

exports.getResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    // Verify resume belongs to user
    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.userId
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    // Fetch all related data in parallel
    const [
      personalDetails,
      educationList,
      skillsList,
      languagesList,
      experienceList,
      projectsList,
      certificationsList,
      sectionsList
    ] = await Promise.all([
      PersonalDetails.findOne({ resumeId }),
      Education.find({ resumeId })
        .populate('collegeId', 'collegeName')
        .populate('degreeId', 'degreeName')
        .populate('specializationId', 'specializationName')
        .sort({ orderIndex: 1 }),
      ResumeSkill.find({ resumeId })
        .populate('skillId', 'skillName')
        .sort({ orderIndex: 1 }),
      ResumeLanguage.find({ resumeId })
        .populate('languageId', 'languageName')
        .sort({ orderIndex: 1 }),
      Experience.find({ resumeId })
        .populate('companyId', 'companyName')
        .sort({ orderIndex: 1 }),
      Project.find({ resumeId })
        .sort({ orderIndex: 1 }),
      Certification.find({ resumeId })
        .sort({ orderIndex: 1 }),
      ResumeSection.find({ resumeId })
        .sort({ orderIndex: 1 })
    ]);

    res.json({
      success: true,
      resume,
      personalDetails,
      education: educationList,
      skills: skillsList,
      languages: languagesList,
      experience: experienceList,
      projects: projectsList,
      certifications: certificationsList,
      sections: sectionsList
    });

  } catch (err) {
    console.error('Error fetching resume:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching resume',
      error: err.message
    });
  }
};

exports.updateResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const {
      templateKey,
      objective,
      personal,
      education,
      skills,
      languages,
      experience,
      projects,
      certifications
    } = req.body;

    // Verify resume belongs to user
    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.userId
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    // Update resume main fields
    if (templateKey !== undefined) resume.templateKey = templateKey;
    if (objective !== undefined) resume.objective = objective;
    await resume.save();

    // Update personal details
    if (personal !== undefined) {
      await PersonalDetails.findOneAndUpdate(
        { resumeId },
        { resumeId, ...personal },
        { upsert: true, new: true }
      );
    }

    // Update education (delete and recreate)
    if (education !== undefined) {
      await Education.deleteMany({ resumeId });
      if (Array.isArray(education) && education.length > 0) {
        const educationData = education.map((edu, index) => ({
          resumeId,
          ...edu,
          orderIndex: edu.orderIndex !== undefined ? edu.orderIndex : index
        }));
        await Education.insertMany(educationData);
      }
    }

    // Update skills (delete and recreate)
    if (skills !== undefined) {
      await ResumeSkill.deleteMany({ resumeId });
      if (Array.isArray(skills) && skills.length > 0) {
        const skillsData = skills.map((skillId, index) => ({
          resumeId,
          skillId,
          orderIndex: index
        }));
        await ResumeSkill.insertMany(skillsData);
      }
    }

    // Update languages (delete and recreate)
    if (languages !== undefined) {
      await ResumeLanguage.deleteMany({ resumeId });
      if (Array.isArray(languages) && languages.length > 0) {
        const languagesData = languages.map((languageId, index) => ({
          resumeId,
          languageId,
          orderIndex: index
        }));
        await ResumeLanguage.insertMany(languagesData);
      }
    }

    // Update experience (delete and recreate)
    if (experience !== undefined) {
      await Experience.deleteMany({ resumeId });
      if (Array.isArray(experience) && experience.length > 0) {
        const experienceData = experience.map((exp, index) => ({
          resumeId,
          ...exp,
          orderIndex: exp.orderIndex !== undefined ? exp.orderIndex : index
        }));
        await Experience.insertMany(experienceData);
      }
    }

    // Update projects (delete and recreate)
    if (projects !== undefined) {
      await Project.deleteMany({ resumeId });
      if (Array.isArray(projects) && projects.length > 0) {
        const projectsData = projects.map((proj, index) => ({
          resumeId,
          ...proj,
          orderIndex: proj.orderIndex !== undefined ? proj.orderIndex : index
        }));
        await Project.insertMany(projectsData);
      }
    }

    // Update certifications (delete and recreate)
    if (certifications !== undefined) {
      await Certification.deleteMany({ resumeId });
      if (Array.isArray(certifications) && certifications.length > 0) {
        const certificationsData = certifications.map((cert, index) => ({
          resumeId,
          ...cert,
          orderIndex: cert.orderIndex !== undefined ? cert.orderIndex : index
        }));
        await Certification.insertMany(certificationsData);
      }
    }

    res.json({
      success: true,
      message: 'Resume updated successfully',
      resume
    });

  } catch (err) {
    console.error('Error updating resume:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while updating resume',
      error: err.message
    });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    const { resumeId } = req.params;

    // Verify resume belongs to user
    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.userId
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    // Delete all related data
    await Promise.all([
      PersonalDetails.deleteMany({ resumeId }),
      Education.deleteMany({ resumeId }),
      ResumeSkill.deleteMany({ resumeId }),
      ResumeLanguage.deleteMany({ resumeId }),
      Experience.deleteMany({ resumeId }),
      Project.deleteMany({ resumeId }),
      Certification.deleteMany({ resumeId }),
      ResumeSection.deleteMany({ resumeId }),
      Resume.deleteOne({ _id: resumeId })
    ]);

    res.json({
      success: true,
      message: 'Resume deleted successfully'
    });

  } catch (err) {
    console.error('Error deleting resume:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting resume',
      error: err.message
    });
  }
};
