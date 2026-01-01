import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  CheckCircleIcon,
  CalendarIcon,
  ChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <CheckCircleIcon className="w-8 h-8 text-blue-600" />,
      title: "Task Management",
      description: "Create, update, and organize your tasks with ease",
    },
    {
      icon: <CalendarIcon className="w-8 h-8 text-green-600" />,
      title: "Deadline Tracking",
      description: "Never miss a deadline with built-in reminders",
    },
    {
      icon: <ChartBarIcon className="w-8 h-8 text-purple-600" />,
      title: "Progress Analytics",
      description: "Track your productivity with detailed statistics",
    },
    {
      icon: <UserGroupIcon className="w-8 h-8 text-orange-600" />,
      title: "Secure Access",
      description: "Role-based access control with JWT authentication",
    },
  ];

  return (
    <div className="min-h-[80vh]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Organize Your Tasks Efficiently
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              A powerful task management system with authentication, real-time
              updates, and comprehensive analytics
            </p>
            {user ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Go to Dashboard
              </Link>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/register"
                  className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need to Manage Tasks
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Built with MERN stack, featuring secure authentication, RESTful
            APIs, and responsive design
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Built With Modern Technologies
            </h3>
            <p className="text-gray-600">
              Full-stack MERN application with best practices
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold">M</span>
              </div>
              <span className="text-gray-700 font-medium">MongoDB</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 font-bold">E</span>
              </div>
              <span className="text-gray-700 font-medium">Express.js</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold">R</span>
              </div>
              <span className="text-gray-700 font-medium">React.js</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 font-bold">N</span>
              </div>
              <span className="text-gray-700 font-medium">Node.js</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 font-bold">JWT</span>
              </div>
              <span className="text-gray-700 font-medium">Authentication</span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Boost Your Productivity?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their task management
            with our platform
          </p>
          {!user && (
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              Start Free Trial
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
