const express = require('express');
const router = express.Router();
const { getApplications, submitApplication, deleteApplication } = require('../controllers/applicationController');
const { protect } = require('../middleware/auth');
const { validate, applicationValidation } = require('../middleware/validate');

router.get('/', protect, getApplications);
router.post('/', applicationValidation, validate, submitApplication);
router.delete('/:id', protect, deleteApplication);

module.exports = router;
