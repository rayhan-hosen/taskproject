const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');

// All admin routes are protected
router.get('/stats', protect, getStats);

module.exports = router;
