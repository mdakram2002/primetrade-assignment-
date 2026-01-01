import React, { createContext, useState, useContext } from 'react';
import { taskService } from '../services/taskService';
import { toast } from 'react-hot-toast';

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({});

  const fetchTasks = async (filters = {}) => {
    try {
      setLoading(true);
      const response = await taskService.getTasks(filters);
      setTasks(response.data.tasks || []);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to fetch tasks';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const fetchTaskStats = async () => {
    try {
      const response = await taskService.getTaskStats();
      setStats(response.data.stats || {});
      return { success: true };
    } catch (error) {
      console.error('Error fetching task stats:', error);
      return { success: false };
    }
  };

  const createTask = async (taskData) => {
    try {
      setLoading(true);
      const response = await taskService.createTask(taskData);
      setTasks(prev => [response.data.task, ...prev]);
      toast.success('Task created successfully!');
      await fetchTaskStats();
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to create task';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (taskId, taskData) => {
    try {
      setLoading(true);
      const response = await taskService.updateTask(taskId, taskData);
      setTasks(prev => prev.map(task =>
        task._id === taskId ? response.data.task : task
      ));
      toast.success('Task updated successfully!');
      await fetchTaskStats();
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to update task';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setLoading(true);
      await taskService.deleteTask(taskId);
      setTasks(prev => prev.filter(task => task._id !== taskId));
      toast.success('Task deleted successfully!');
      await fetchTaskStats();
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to delete task';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskStatus = async (taskId, currentStatus) => {
    try {
      let newStatus;
      switch (currentStatus) {
        case 'pending':
          newStatus = 'in-progress';
          break;
        case 'in-progress':
          newStatus = 'completed';
          break;
        default:
          newStatus = 'pending';
      }

      const response = await taskService.updateTask(taskId, { status: newStatus });
      setTasks(prev => prev.map(task =>
        task._id === taskId ? response.data.task : task
      ));
      toast.success(`Task marked as ${newStatus.replace('-', ' ')}!`);
      await fetchTaskStats();
      return { success: true };
    } catch (error) {
      toast.error('Failed to update task status');
      return { success: false };
    }
  };

  const value = {
    tasks,
    loading,
    stats,
    fetchTasks,
    fetchTaskStats,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};