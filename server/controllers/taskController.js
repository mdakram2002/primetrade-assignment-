
const Task = require("../models/Task");
const { validationResult } = require("express-validator");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");

exports.createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(400, "Validation failed", errors.array());
    }

    const taskData = {
      ...req.body,
      createdBy: req.user.userId,
    };

    // Convert tags string to array if provided
    if (taskData.tags && typeof taskData.tags === "string") {
      taskData.tags = taskData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
    }
    
    const task = await Task.create(taskData);

    res
      .status(201)
      .json(new ApiResponse(201, "Task created successfully", { task }));
  } catch (error) {
    next(error);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const { status, priority, page = 1, limit = 10, search } = req.query;
    const skip = (page - 1) * limit;

    // Build query
    const query = { createdBy: req.user.userId };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    // Execute query
    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Task.countDocuments(query);

    res.status(200).json(
      new ApiResponse(200, "Tasks retrieved successfully", {
        tasks,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      })
    );
  } catch (error) {
    next(error);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user.userId,
    });

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, "Task retrieved successfully", { task }));
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(400, "Validation failed", errors.array());
    }

    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user.userId,
    });

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    // Update task fields
    const updateData = { ...req.body };

    // Handle tags conversion if needed
    if (updateData.tags && typeof updateData.tags === "string") {
      updateData.tags = updateData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
    }

    Object.assign(task, updateData);
    await task.save();

    res
      .status(200)
      .json(new ApiResponse(200, "Task updated successfully", { task }));
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId,
    });

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    res.status(200).json(new ApiResponse(200, "Task deleted successfully"));
  } catch (error) {
    next(error);
  }
};

exports.getTaskStats = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const stats = await Task.aggregate([
      { $match: { createdBy: userId } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const formattedStats = {
      total: 0,
      pending: 0,
      "in-progress": 0,
      completed: 0,
    };

    stats.forEach((stat) => {
      formattedStats[stat._id] = stat.count;
      formattedStats.total += stat.count;
    });

    res
      .status(200)
      .json(
        new ApiResponse(200, "Task statistics retrieved", {
          stats: formattedStats,
        })
      );
  } catch (error) {
    next(error);
  }
};
