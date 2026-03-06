const Job = require('./Job');
const Application = require('./Application');
const User = require('./User');
const sequelize = require('../config/db');

// Relationships
Job.hasMany(Application, { foreignKey: 'job_id', as: 'applications' });
Application.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });

module.exports = {
    Job,
    Application,
    User,
    sequelize
};
