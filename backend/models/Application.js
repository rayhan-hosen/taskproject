const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Application = sequelize.define('Application', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'job_id',
        references: {
            model: 'jobs',
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    resumeLink: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'resume_link',
        validate: {
            isUrl: true
        }
    },
    coverNote: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'cover_note'
    }
}, {
    timestamps: true,
    underscored: true
});

module.exports = Application;
