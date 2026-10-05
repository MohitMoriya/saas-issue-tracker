import React from 'react';
import type { Task } from '../pages/ProjectBoard';
import { GripVertical } from 'lucide-react';

interface TaskCardProps {
  task: Task;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'URGENT': return 'bg-red-100 text-red-700';
    case 'HIGH': return 'bg-orange-100 text-orange-700';
    case 'MEDIUM': return 'bg-yellow-100 text-yellow-700';
    case 'LOW': return 'bg-green-100 text-green-700';
    default: return 'bg-slate-100 text-slate-700';
  }
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all group flex gap-2">
      <div className="text-slate-300 mt-1 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical size={16} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold text-slate-400">{task.taskKey}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
            {task.priority || 'MEDIUM'}
          </span>
        </div>
        <h4 className="font-semibold text-slate-800 text-sm leading-tight mb-2">
          {task.title}
        </h4>
        {task.description && (
          <p className="text-xs text-slate-500 line-clamp-2 mb-3">
            {task.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
