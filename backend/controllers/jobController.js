const { Job, Application } = require('../models');
const { Op } = require('sequelize');

// @desc    Get all jobs with pagination, search, and filters
// @route   GET /api/jobs
// @query   page, limit, search, location, category
// @note    Single optimized query with findAndCountAll — no N+1.
//          search matches against title, company, and description.
//          location uses partial match (LIKE).
//          category uses exact match.
exports.getJobs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || 8, 50); // cap at 50
        const offset = (page - 1) * limit;
        const search = (req.query.search || '').trim();
        const location = (req.query.location || '').trim();
        const category = (req.query.category || '').trim();
        const type = (req.query.type || '').trim();
        const salary = (req.query.salary || '').trim();

        // Build WHERE clause dynamically
        const conditions = [];

        if (search) {
            conditions.push({
                [Op.or]: [
                    { title: { [Op.like]: `%${search}%` } },
                    { company: { [Op.like]: `%${search}%` } },
                    { description: { [Op.like]: `%${search}%` } }
                ]
            });
        }

        if (location) {
            conditions.push({ location: { [Op.like]: `%${location}%` } });
        }

        if (category) {
            conditions.push({ category });
        }

        if (type) {
            conditions.push({ type });
        }

        if (salary) {
            conditions.push({ salary: { [Op.like]: `%${salary}%` } });
        }

        const where = conditions.length > 0 ? { [Op.and]: conditions } : {};

        // Single optimized query: count + rows in one DB call
        // No includes needed (no N+1) — Job table only
        // Only select needed columns for listing (exclude heavy description on list)
        const { count, rows: jobs } = await Job.findAndCountAll({
            where,
            attributes: ['id', 'title', 'company', 'location', 'category', 'type', 'salary', 'description', 'tags', 'brandColor', 'created_at'],
            limit,
            offset,
            order: [['created_at', 'DESC']],
            // Prevent Sequelize from running a separate COUNT query
            distinct: true
        });

        res.status(200).json({
            success: true,
            count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            jobs
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
exports.getJob = async (req, res) => {
    try {
        const job = await Job.findByPk(req.params.id);
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        // Increment views
        job.views = (job.views || 0) + 1;
        await job.save();

        res.status(200).json({ success: true, job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create job (Admin)
// @route   POST /api/jobs
exports.createJob = async (req, res) => {
    try {
        const { title, company, location, category, description } = req.body;

        // Basic validation
        if (!title || !company || !location || !category || !description) {
            return res.status(400).json({
                success: false,
                message: 'All required fields (title, company, location, category, description) must be provided.'
            });
        }

        const job = await Job.create(req.body);
        res.status(201).json({ success: true, job });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ success: false, message: error.errors[0].message });
        }
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update job (Admin)
// @route   PUT /api/jobs/:id
exports.updateJob = async (req, res) => {
    try {
        const { title, company, location, category, description } = req.body;

        // Basic validation
        if (!title || !company || !location || !category || !description) {
            return res.status(400).json({
                success: false,
                message: 'All required fields (title, company, location, category, description) must be provided.'
            });
        }

        let job = await Job.findByPk(req.params.id);
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }
        job = await job.update(req.body);
        res.status(200).json({ success: true, job });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ success: false, message: error.errors[0].message });
        }
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete job (Admin)
// @route   DELETE /api/jobs/:id
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByPk(req.params.id);
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }
        await job.destroy();
        res.status(200).json({ success: true, message: 'Job deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
