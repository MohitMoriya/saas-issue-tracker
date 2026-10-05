const express = require('express');
const { createProject, getProjects, getProjectById, addMember } = require('../controllers/projectController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.use(protect); // All project routes require auth

router.route('/')
  .post(createProject)
  .get(getProjects);

router.route('/:id')
  .get(getProjectById);

router.post('/:id/members', addMember);

module.exports = router;
