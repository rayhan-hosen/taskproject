const { Job, Application, sequelize } = require('../models');

// @desc    Get dashboard analytics
// @route   GET /api/admin/stats
exports.getStats = async (req, res) => {
    try {
        // Run major queries in parallel for maximum performance
        const [
            totalJobs,
            totalApplications,
            totalViewsData,
            jobsByLocation,
            jobsByType,
            topJobs,
            mostViewedJobs,
            allSalaries
        ] = await Promise.all([
            Job.count(),
            Application.count(),
            Job.findOne({
                attributes: [[sequelize.fn('SUM', sequelize.col('views')), 'totalViews']],
                raw: true
            }),
            // Jobs by Location - Grouped at DB level
            Job.findAll({
                attributes: ['location', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
                group: ['location'],
                order: [[sequelize.literal('count'), 'DESC']],
                limit: 10,
                raw: true
            }),
            // Jobs by Type - Grouped at DB level
            Job.findAll({
                attributes: ['type', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
                group: ['type'],
                order: [[sequelize.literal('count'), 'DESC']],
                raw: true
            }),
            // Top Jobs by Application Count (Optimized Join + Grouping)
            Application.findAll({
                attributes: [
                    'jobId',
                    [sequelize.fn('COUNT', sequelize.col('Application.id')), 'count']
                ],
                include: [{
                    model: Job,
                    as: 'job',
                    attributes: ['title', 'company', 'brandColor']
                }],
                group: ['jobId', 'job.id'], // job.id ensures title/company available
                order: [[sequelize.literal('count'), 'DESC']],
                limit: 5
            }),
            // Most Viewed Jobs
            Job.findAll({
                attributes: ['id', 'title', 'company', 'views'],
                order: [['views', 'DESC']],
                limit: 5,
                raw: true
            }),
            // Fetch only salary field for JS bucketing (most reliable across DB dialects)
            Job.findAll({
                attributes: ['salary'],
                where: { salary: { [sequelize.Sequelize.Op.ne]: null } },
                raw: true
            })
        ]);

        const totalViews = totalViewsData ? (totalViewsData.totalViews || 0) : 0;

        // Salary range bucketing
        const salaryRanges = {
            'Under 20k': 0,
            '20k - 40k': 0,
            '41k - 60k': 0,
            '61k - 80k': 0,
            '80k+': 0
        };

        allSalaries.forEach(j => {
            const cleanSalary = j.salary.replace(/,/g, '');
            const match = cleanSalary.match(/(\d+(\.\d+)?)/);
            if (!match) return;

            let val = parseFloat(match[0]);
            if (cleanSalary.toLowerCase().includes('lakh')) val *= 100;
            else if (val >= 1000) val /= 1000;

            if (val < 20) salaryRanges['Under 20k']++;
            else if (val >= 20 && val <= 40) salaryRanges['20k - 40k']++;
            else if (val > 40 && val <= 60) salaryRanges['41k - 60k']++;
            else if (val > 60 && val <= 80) salaryRanges['61k - 80k']++;
            else if (val > 80) salaryRanges['80k+']++;
        });

        const jobsBySalary = Object.keys(salaryRanges).map(range => ({
            salary: range,
            count: salaryRanges[range]
        }));

        res.status(200).json({
            success: true,
            stats: {
                totalJobs,
                totalApplications,
                totalViews,
                jobsByLocation,
                jobsByType,
                jobsBySalary,
                topJobs,
                mostViewedJobs
            }
        });
    } catch (error) {
        console.error('Admin Stats Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
