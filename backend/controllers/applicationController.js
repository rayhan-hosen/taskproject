const { Application, Job } = require('../models');
const { Op } = require('sequelize');

// @desc    Get all applications with pagination
// @route   GET /api/applications
exports.getApplications = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const search = req.query.search || '';

        const where = {};
        if (search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } }
            ];
        }

        const { count, rows: applications } = await Application.findAndCountAll({
            where,
            include: [{
                model: Job,
                as: 'job',
                attributes: ['id', 'title', 'company', 'location']
            }],
            limit,
            offset,
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            success: true,
            count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            applications
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Submit application
// @route   POST /api/applications
exports.submitApplication = async (req, res) => {
    try {
        const { jobId, name, email, resumeLink, coverNote } = req.body;

        // Basic presence validation
        if (!jobId || !name || !email || !resumeLink) {
            return res.status(400).json({
                success: false,
                message: 'All required fields (jobId, name, email, resumeLink) must be provided.'
            });
        }

        // Check if job exists
        const job = await Job.findByPk(jobId);
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        const application = await Application.create({
            jobId, name, email, resumeLink, coverNote
        });

        res.status(201).json({ success: true, application });
    } catch (error) {
        // Handle Sequelize validation errors separately for cleaner messages
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ success: false, message: error.errors[0].message });
        }
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete application (Admin)
// @route   DELETE /api/applications/:id
exports.deleteApplication = async (req, res) => {
    try {
        const application = await Application.findByPk(req.params.id);
        if (!application) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }
        await application.destroy();
        res.status(200).json({ success: true, message: 'Application deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
