import React from 'react';
import {
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  FireIcon,
  TagIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { useTask } from '../../contexts/TaskContext';
import { toast } from 'react-hot-toast';

const TaskItem = ({ task, onEdit }) => {
  const { deleteTask, toggleTaskStatus } = useTask();

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const result = await deleteTask(task._id);
      if (result.success) {
        toast.success('Task deleted successfully');
      }
    }
  };

  const handleStatusToggle = async () => {
    const result = await toggleTaskStatus(task._id, task.status);
    if (result.success) {
      toast.success('Task status updated');
    }
  };

  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <FireIcon className="w-5 h-5 text-blue-600" />;
      default:
        return <ClockIcon className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getPriorityBadge = () => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-blue-100 text-blue-800',
      low: 'bg-gray-100 text-gray-800'
    };

    const labels = {
      high: 'High',
      medium: 'Medium',
      low: 'Low'
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${colors[task.priority]}`}>
        {labels[task.priority]}
      </span>
    );
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={handleStatusToggle}
              className="flex-shrink-0"
            >
              {getStatusIcon()}
            </button>
            <h4 className="font-medium text-gray-900">{task.title}</h4>
            {getPriorityBadge()}
            {isOverdue && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                Overdue
              </span>
            )}
          </div>

          {task.description && (
            <p className="text-gray-600 text-sm mb-3">{task.description}</p>
          )}

          <div className="flex flex-wrap gap-2 items-center text-sm text-gray-500">
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            )}

            {task.tags && task.tags.length > 0 && (
              <div className="flex items-center gap-1">
                <TagIcon className="w-4 h-4" />
                <div className="flex gap-1">
                  {task.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                  {task.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{task.tags.length - 3}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 ml-4">
          <button
            onClick={onEdit}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
            title="Edit task"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
            title="Delete task"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>
            Created: {formatDate(task.createdAt)}
          </span>
          <span className="capitalize">{task.status.replace('-', ' ')}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;