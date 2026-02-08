const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const OUTPUT_DIR = path.join(__dirname, '../../output');
const TEMPLATES_DIR = path.join(__dirname, '../templates');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}



/**
 * Generate Resume PDF from LaTeX template
 */
exports.generateResumePDF = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      // Get template path
      let templatePath = TEMPLATES_DIR + '/jack.tex';
      if (data.template?.filePath) {
        templatePath = path.join(TEMPLATES_DIR, data.template.filePath);
      }

      if (!fs.existsSync(templatePath)) {
        throw new Error(`Template not found: ${templatePath}`);
      }

      let tex = fs.readFileSync(templatePath, 'utf8');

      const r = (k, v) => {
        tex = tex.replace(new RegExp(`{{{${k}}}}`, 'g'), v || '');
      };

      // ===== PERSONAL =====
      if (data.personal) {
        r('FULL_NAME', data.personal?.fullName || '');
        r('EMAIL', data.personal?.email || '');
        r('PHONE', data.personal?.phone || '');
        r('LINKEDIN', data.personal?.linkedin || '');
        r('GITHUB', data.personal?.github || '');
        r('ADDRESS', data.personal?.address || '');
        r('WEBSITE', data.personal?.website || '');
      }

      // ===== OBJECTIVE =====
      r('OBJECTIVE', data.resume?.objective || '');

      // ===== SKILLS =====
      if (data.skills && data.skills.length > 0) {
        const skillsList = data.skills.map(s => s.skillId?.skillName).filter(Boolean).join(', ');
        r('SKILLS', skillsList);
      }

      // ===== LANGUAGES =====
      if (data.languages && data.languages.length > 0) {
        const languagesList = data.languages.map(l => l.languageId?.languageName).filter(Boolean).join(', ');
        r('LANGUAGES', languagesList);
      }

      // ===== EXPERIENCE =====
      if (data.experience && data.experience.length > 0) {
        let experienceText = '';
        data.experience.forEach((exp, idx) => {
          experienceText += `\\textbf{${exp.jobTitle || ''}} - ${exp.companyId?.companyName || ''} \\\\
${exp.startDate || ''} - ${exp.endDate || ''} \\\\
${exp.description || ''}

`;
        });
        r('EXPERIENCES', experienceText);

        // Also fill single experience fields for backward compatibility
        if (data.experience[0]) {
          const e = data.experience[0];
          r('COMPANY', e.companyId?.companyName || '');
          r('JOB_TITLE', e.jobTitle || '');
          r('START_DATE', e.startDate || '');
          r('END_DATE', e.endDate || '');
          r('EXPERIENCE_DESC', e.description || '');
        }
      }

      // ===== EDUCATION =====
      if (data.education && data.education.length > 0) {
        let educationText = '';
        data.education.forEach((edu) => {
          educationText += `\\textbf{${edu.collegeId?.collegeName || ''}} \\\\
${edu.collegeId?.degree || ''} in ${edu.collegeId?.specialization || ''} \\\\
${edu.graduationYear || ''}

`;
        });
        r('EDUCATIONS', educationText);

        // Also fill single education fields
        if (data.education[0]) {
          const edu = data.education[0];
          r('COLLEGE_NAME', edu.collegeId?.collegeName || '');
          r('DEGREE', edu.collegeId?.degree || '');
          r('SPECIALIZATION', edu.collegeId?.specialization || '');
          r('GRAD_YEAR', edu.graduationYear || '');
        }
      }

      // ===== PROJECTS =====
      if (data.projects && data.projects.length > 0) {
        let projectsText = '';
        data.projects.forEach((proj) => {
          projectsText += `\\textbf{${proj.title || ''}} \\\\
Tech Stack: ${proj.techStack || ''} \\\\
${proj.description || ''}

`;
        });
        r('PROJECTS', projectsText);

        // Single project
        if (data.projects[0]) {
          const p = data.projects[0];
          r('PROJECT_TITLE', p.title || '');
          r('PROJECT_DESC', p.description || '');
          r('TECH_STACK', p.techStack || '');
        }
      }

      // ===== CERTIFICATIONS =====
      if (data.certifications && data.certifications.length > 0) {
        let certsText = '';
        data.certifications.forEach((cert) => {
          certsText += `\\textbf{${cert.name || ''}} - ${cert.date || ''} \\\\
${cert.description || ''}

`;
        });
        r('CERTIFICATIONS', certsText);

        // Single cert
        if (data.certifications[0]) {
          const c = data.certifications[0];
          r('CERT_NAME', c.name || '');
          r('CERT_DATE', c.date || '');
        }
      }

      // Generate unique filename
      const timestamp = Date.now();
      const userId = data.resume?._id || 'unknown';
      const texFileName = `resume_${userId}_${timestamp}.tex`;
      const texPath = path.join(OUTPUT_DIR, texFileName);
      const pdfFileName = texFileName.replace('.tex', '.pdf');
      const pdfPath = path.join(OUTPUT_DIR, pdfFileName);

      fs.writeFileSync(texPath, tex);

      // Compile LaTeX to PDF
      exec(
        `pdflatex -interaction=nonstopmode -output-directory=${OUTPUT_DIR} ${texPath}`,
        { timeout: 30000 },
        (err, stdout, stderr) => {
          // Clean up temporary files
          const auxFile = texPath.replace('.tex', '.aux');
          const logFile = texPath.replace('.tex', '.log');
          const outFile = texPath.replace('.tex', '.out');

          [texPath, auxFile, logFile, outFile].forEach(file => {
            if (fs.existsSync(file)) {
              fs.unlinkSync(file);
            }
          });

          if (err) {
            if (!fs.existsSync(pdfPath)) {
              return reject(new Error(`PDF generation failed: ${stderr || err.message}`));
            }
          }

          if (!fs.existsSync(pdfPath)) {
            return reject(new Error('PDF file not created'));
          }

          const pdfUrl = `/output/${pdfFileName}`;
          resolve({
            pdfPath,
            pdfUrl
          });

        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Get all available templates
 */
exports.getTemplates = async () => {
  return new Promise((resolve, reject) => {
    try {
      const templates = [];
      const files = fs.readdirSync(TEMPLATES_DIR);

      files.forEach(file => {
        if (file.endsWith('.tex')) {
          templates.push({
            id: file.replace('.tex', ''),
            name: file.replace('.tex', '').charAt(0).toUpperCase() + file.replace('.tex', '').slice(1),
            filePath: file
          });
        }
      });

      resolve(templates);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Get template by name
 */
exports.getTemplate = async (templateName) => {
  return new Promise((resolve, reject) => {
    try {
      const templatePath = path.join(TEMPLATES_DIR, `${templateName}.tex`);
      if (fs.existsSync(templatePath)) {
        const content = fs.readFileSync(templatePath, 'utf8');
        resolve({ name: templateName, content });
      } else {
        reject(new Error('Template not found'));
      }
    } catch (err) {
      reject(err);
    }
  });
};

