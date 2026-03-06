const express = require('express');
const router = express.Router();
const { getJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobController');
const { protect } = require('../middleware/auth');
const { validate, jobValidation } = require('../middleware/validate');

router.get('/', getJobs);
router.get('/:id', getJob);
router.post('/', protect, jobValidation, validate, createJob);
router.put('/:id', protect, jobValidation, validate, updateJob);
router.delete('/:id', protect, deleteJob);

module.exports = router;
