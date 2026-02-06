const Template = require('../models/template');
const latexService = require('../services/latex.service');

/**
 * GET ALL TEMPLATES
 */
exports.getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.find({ isActive: true });
    
    if (templates.length === 0) {
      // Return file system templates if no DB templates
      const fsTemplates = await latexService.getTemplates();
      return res.json(fsTemplates);
    }

    res.json(templates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * GET SINGLE TEMPLATE
 */
exports.getTemplate = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });

    res.json(template);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * CREATE TEMPLATE (Admin only)
 */
exports.createTemplate = async (req, res) => {
  try {
    const { name, description, filePath, previewUrl } = req.body;

    if (!name || !filePath) {
      return res.status(400).json({ message: 'Name and filePath are required' });
    }

    const template = await Template.create({
      name,
      description,
      filePath,
      previewUrl,
      isActive: true
    });

    res.status(201).json({ message: 'Template created', template });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * UPDATE TEMPLATE
 */
exports.updateTemplate = async (req, res) => {
  try {
    const { name, description, previewUrl, isActive } = req.body;

    const template = await Template.findByIdAndUpdate(
      req.params.id,
      { name, description, previewUrl, isActive },
      { new: true }
    );

    if (!template) return res.status(404).json({ message: 'Template not found' });

    res.json({ message: 'Template updated', template });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * DELETE TEMPLATE
 */
exports.deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndDelete(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });

    res.json({ message: 'Template deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
