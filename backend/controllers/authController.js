const { User } = require('../models');
const jwt = require('jsonwebtoken');

// @desc    Admin login
// @route   POST /api/auth/login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });

        res.status(200).json({
            success: true,
            token,
            user: { id: user.id, username: user.username }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
