import React from 'react';
import {
  FunnelIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const TaskFilter = ({ filters, onChange }) => {
  const handleChange = (name, value) => {
    if (value === '') {
      // Remove filter if empty value
      const newFilters = { ...filters };
      delete newFilters[name];
      onChange(newFilters);
    } else {
      onChange({ [name]: value });
    }
  };

  const clearFilter = (name) => {
    const newFilters = { ...filters };
    delete newFilters[name];
    onChange(newFilters);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Status Filter */}
      <div className="relative">
        <select
          value={filters.status || ''}
          onChange={(e) => handleChange('status', e.target.value)}
          className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <FunnelIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        <ChevronDownIcon className="absolute right-2 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>

      {/* Priority Filter */}
      <div className="relative">
        <select
          value={filters.priority || ''}
          onChange={(e) => handleChange('priority', e.target.value)}
          className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <FunnelIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        <ChevronDownIcon className="absolute right-2 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>

      {/* Search Filter */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search || ''}
          onChange={(e) => handleChange('search', e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <FunnelIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        {filters.search && (
          <button
            onClick={() => clearFilter('search')}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Clear All Filters Button (only show if filters exist) */}
      {Object.keys(filters).length > 0 && (
        <button
          onClick={() => onChange({})}
          className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 whitespace-nowrap"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default TaskFilter;