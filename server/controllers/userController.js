const User = require('../models/User');
const Task = require('../models/Task');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');

exports.getUserStats = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      throw new ApiError(403, 'Not authorized');
    }

    const totalUsers = await User.countDocuments();
    const totalTasks = await Task.countDocuments();
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('-password');

    res.status(200).json(
      new ApiResponse(200, 'User statistics retrieved', {
        totalUsers,
        totalTasks,
        recentUsers
      })
    );
  } catch (error) {
    next(error);
  }
};