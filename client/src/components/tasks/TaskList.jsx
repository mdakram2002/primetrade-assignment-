import React from 'react';
import TaskItem from './TaskItem';
import Loader from '../common/Loader';

const TaskList = ({ tasks, onEdit, loading }) => {
  if (loading && tasks.length === 0) {
    return <Loader />;
  }

  if (tasks.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-gray-400 text-2xl">📝</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
        <p className="text-gray-600">Create your first task to get started</p>
      </div>
    );
  }

  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  const renderTaskSection = (title, taskList, colorClass) => (
    <div className="mb-6">
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colorClass} mb-4`}>
        <span>{title} ({taskList.length})</span>
      </div>
      <div className="space-y-3">
        {taskList.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onEdit={() => onEdit(task)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="divide-y divide-gray-200">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">All Tasks</h3>
            <p className="text-sm text-gray-600">
              {tasks.length} task{tasks.length !== 1 ? 's' : ''} total
            </p>
          </div>
        </div>

        {pendingTasks.length > 0 && renderTaskSection(
          'Pending',
          pendingTasks,
          'bg-yellow-100 text-yellow-800'
        )}

        {inProgressTasks.length > 0 && renderTaskSection(
          'In Progress',
          inProgressTasks,
          'bg-blue-100 text-blue-800'
        )}

        {completedTasks.length > 0 && renderTaskSection(
          'Completed',
          completedTasks,
          'bg-green-100 text-green-800'
        )}

        {loading && tasks.length > 0 && (
          <div className="pt-4">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;