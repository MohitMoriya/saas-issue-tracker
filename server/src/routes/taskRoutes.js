const express = require('express');
const { createTask, getTasksByProject, updateTaskStatus, addComment } = require('../controllers/taskController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.use(protect); // All task routes require auth

router.post('/', createTask);
router.get('/project/:projectId', getTasksByProject);
router.patch('/:id/status', updateTaskStatus);
router.post('/:id/comments', addComment);

module.exports = router;
