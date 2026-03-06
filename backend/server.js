const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xssMiddleware = require('./middleware/xssMiddleware');
const morgan = require('morgan');
require('dotenv').config();

const sequelize = require('./config/db');
const { User } = require('./models');

// Route files
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xssMiddleware);
app.use(morgan('dev'));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);

// Database connection and seeder
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL Connected...');

        // Sync models
        await sequelize.sync({ alter: true });

        // Seed Admin User
        const adminExists = await User.findOne({ where: { username: 'admin' } });
        if (!adminExists) {
            await User.create({
                username: 'admin',
                password: 'admin' // Will be hashed by model hook
            });
            console.log('Admin user seeded: admin / admin');
        }

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
