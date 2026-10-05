const Task = require('../models/Task');
const Project = require('../models/Project');

const createTask = async (req, res) => {
  const { title, description, priority, projectId, assignee } = req.body;
  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Generate Task Key (e.g., PROJ-1)
    const taskCount = await Task.countDocuments({ project: projectId });
    const taskKey = `${project.key}-${taskCount + 1}`;

    const task = await Task.create({
      title,
      taskKey,
      description,
      priority,
      project: projectId,
      reporter: req.user._id,
      assignee: assignee || null
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .populate('assignee', 'name avatar')
      .populate('reporter', 'name avatar')
      .populate('comments.user', 'name avatar');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const addComment = async (req, res) => {
  const { content } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.comments.push({
      user: req.user._id,
      content
    });
    
    await task.save();
    
    const updatedTask = await Task.findById(req.params.id).populate('comments.user', 'name avatar');
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createTask, getTasksByProject, updateTaskStatus, addComment };
