import { useState } from 'react'
import { motion } from 'framer-motion'

const DashboardAnalytics = ({ stats }) => {
  const [timeframe, setTimeframe] = useState('week')
  
  const {
    totalUsers = 0,
    activeUsers = 0,
    totalJobs = 0,
    activeJobs = 0,
    totalApplications = 0,
    recentApplications = 0,
    jobsCreatedToday = 0,
    topJobCategories = [],
    usersByRole = {
      user: 0,
      recruiter: 0,
      admin: 0
    },
    conversionRate = 0,
    monthlyJobPostings = []
  } = stats
  
  const getPercentage = (value, total) => {
    if (total === 0) return 0
    return Math.round((value / total) * 100)
  }
  
  const userPercentage = getPercentage(activeUsers, totalUsers)
  const jobPercentage = getPercentage(activeJobs, totalJobs)
  
  // Find max value in monthly data to scale graph
  const maxMonthlyValue = Math.max(...monthlyJobPostings.map(item => item.count), 0)
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Users Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{totalUsers}</h3>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${userPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            <span className="text-green-500 font-medium">{activeUsers}</span> active users ({userPercentage}%)
          </p>
        </div>
      </motion.div>

      {/* Total Jobs Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Jobs</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{totalJobs}</h3>
          </div>
          <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: `${jobPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
            <span><span className="text-green-500 font-medium">{activeJobs}</span> active</span>
            <span>+{jobsCreatedToday} today</span>
          </div>
        </div>
      </motion.div>

      {/* Applications Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Applications</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{totalApplications}</h3>
          </div>
          <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="text-purple-500 font-medium">+{recentApplications}</span> in the last {timeframe}
          </p>
          <div className="mt-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Conversion rate: {conversionRate}%
            </span>
          </div>
        </div>
      </motion.div>

      {/* User Roles Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
      >
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">User Distribution</p>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{totalUsers}</h3>
        
        <div className="mt-4 space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-blue-500 dark:text-blue-400">Job Seekers</span>
              <span className="text-gray-500 dark:text-gray-400">
                {getPercentage(usersByRole.user, totalUsers)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${getPercentage(usersByRole.user, totalUsers)}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-green-500 dark:text-green-400">Recruiters</span>
              <span className="text-gray-500 dark:text-gray-400">
                {getPercentage(usersByRole.recruiter, totalUsers)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${getPercentage(usersByRole.recruiter, totalUsers)}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-purple-500 dark:text-purple-400">Admins</span>
              <span className="text-gray-500 dark:text-gray-400">
                {getPercentage(usersByRole.admin, totalUsers)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full" 
                style={{ width: `${getPercentage(usersByRole.admin, totalUsers)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Job Categories Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:col-span-2"
      >
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Top Job Categories</h3>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {topJobCategories.map((category, index) => (
            <div key={category.name} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{category.count}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mt-2">
                <div 
                  className="bg-primary h-1.5 rounded-full" 
                  style={{ width: `${category.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Job Postings Trend Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:col-span-2"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Job Posting Trend</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeframe('week')}
              className={`px-3 py-1 text-xs rounded-md ${
                timeframe === 'week' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeframe('month')}
              className={`px-3 py-1 text-xs rounded-md ${
                timeframe === 'month' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeframe('year')}
              className={`px-3 py-1 text-xs rounded-md ${
                timeframe === 'year' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              Year
            </button>
          </div>
        </div>
        
        <div className="h-60 flex items-end space-x-2">
          {monthlyJobPostings.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-primary hover:bg-primary/80 rounded-t-md transition-all duration-300 tooltip-container"
                style={{ 
                  height: `${maxMonthlyValue ? (item.count / maxMonthlyValue) * 100 : 0}%`,
                  minHeight: item.count > 0 ? '10%' : '2%'
                }}
              >
                <div className="tooltip opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-sm rounded">
                  {item.count} jobs
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default DashboardAnalytics
