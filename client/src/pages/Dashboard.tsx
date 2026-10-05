import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Plus, FolderGit2 } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  key: string;
  description: string;
  status: string;
}

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', key: '', description: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to fetch projects', err);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/projects', newProject);
      setProjects([...projects, res.data]);
      setShowModal(false);
      setNewProject({ title: '', key: '', description: '' });
    } catch (err) {
      console.error('Failed to create project', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Your Projects</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-medium shadow-sm"
        >
          <Plus size={20} />
          New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-slate-200">
          <FolderGit2 size={48} className="mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900">No projects found</h3>
          <p className="mt-1 text-slate-500">Get started by creating a new project.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project._id}
              to={`/project/${project._id}`}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-blue-300 transition-all group block"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded">
                  {project.key}
                </span>
              </div>
              <p className="text-slate-500 text-sm line-clamp-2">{project.description || 'No description provided.'}</p>
            </Link>
          ))}
        </div>
      )}

      {/* Basic Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">Create New Project</h3>
            </div>
            <form onSubmit={handleCreateProject} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Project Name</label>
                <input
                  required
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Website Redesign"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Project Key</label>
                <input
                  required
                  type="text"
                  value={newProject.key}
                  onChange={(e) => setNewProject({ ...newProject, key: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                  placeholder="e.g. WEB"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium cursor-pointer"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
