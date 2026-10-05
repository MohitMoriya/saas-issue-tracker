const Project = require('../models/Project');
const User = require('../models/User');

const createProject = async (req, res) => {
  const { title, key, description } = req.body;
  try {
    const existingProject = await Project.findOne({ key: key.toUpperCase() });
    if (existingProject) {
      return res.status(400).json({ message: 'Project key already exists' });
    }

    const project = await Project.create({
      title,
      key: key.toUpperCase(),
      description,
      owner: req.user._id,
      members: [{ user: req.user._id, role: 'Admin' }]
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { owner: req.user._id },
        { 'members.user': req.user._id }
      ]
    }).populate('owner', 'name email avatar');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email avatar')
      .populate('members.user', 'name email avatar');
    
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    // Check if user is member
    const isMember = project.owner.equals(req.user._id) || 
                     project.members.some(m => m.user._id.equals(req.user._id));
    if (!isMember) return res.status(403).json({ message: 'Not authorized' });

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const addMember = async (req, res) => {
  const { email, role } = req.body;
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (!project.owner.equals(req.user._id)) {
      return res.status(403).json({ message: 'Only owner can add members' });
    }

    const userToAdd = await User.findOne({ email });
    if (!userToAdd) return res.status(404).json({ message: 'User not found' });

    if (project.members.some(m => m.user.equals(userToAdd._id))) {
      return res.status(400).json({ message: 'User is already a member' });
    }

    project.members.push({ user: userToAdd._id, role: role || 'Member' });
    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createProject, getProjects, getProjectById, addMember };
