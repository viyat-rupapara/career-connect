import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../../components/common/Button'
import JobCard from '../../components/job/JobCard'
import { useJobs } from '../../hooks/useJobs'

const Home = () => {
  const { featuredJobs, fetchFeaturedJobs } = useJobs()
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const loadData = async () => {
      await fetchFeaturedJobs()
      setIsLoading(false)
    }
    
    loadData()
  }, [fetchFeaturedJobs])
  
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-secondary text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Find Your Dream Job with CareerConnect
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Connect with top employers and discover opportunities that match your skills and ambitions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  as={Link}
                  to="/jobs"
                  variant="primary"
                  className="bg-white text-primary hover:bg-gray-100"
                  size="lg"
                >
                  Browse Jobs
                </Button>
                <Button
                  as={Link}
                  to="/register"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  size="lg"
                >
                  Create Account
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src="/images/hero-illustration.svg" 
                alt="Job Search Illustration" 
                className="w-full max-w-lg mx-auto"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://via.placeholder.com/600x400?text=Career+Connect'
                }}
              />
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
      </section>
      
      {/* Search Bar Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6 md:p-8 -mt-20 relative z-20"
            {...fadeInUp}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
              Find Your Next Opportunity
            </h2>
            
            <form className="flex flex-col md:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <label htmlFor="keywords" className="sr-only">Keywords</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="keywords"
                    className="form-input block w-full pl-10"
                    placeholder="Job title, keywords, or company"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <label htmlFor="location" className="sr-only">Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="location"
                    className="form-input block w-full pl-10"
                    placeholder="City, state, or remote"
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                className="md:w-auto w-full py-3 sm:py-4"
              >
                Search Jobs
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Jobs Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <motion.h2 
              className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Featured Jobs
            </motion.h2>
            <Link to="/jobs" className="text-primary hover:text-primary/80 font-medium flex items-center">
              View All Jobs
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 animate-pulse">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6 mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/6"></div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-28"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {featuredJobs.map((job, index) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onSaveToggle={() => {}}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container">
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Popular Categories
          </motion.h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
            {[
              { name: 'Technology', icon: 'computer', count: 120 },
              { name: 'Marketing', icon: 'chart-bar', count: 87 },
              { name: 'Design', icon: 'pencil', count: 65 },
              { name: 'Finance', icon: 'cash', count: 92 },
              { name: 'Healthcare', icon: 'medical', count: 110 },
              { name: 'Education', icon: 'academic-cap', count: 78 },
              { name: 'Engineering', icon: 'cog', count: 95 },
              { name: 'Sales', icon: 'currency-dollar', count: 82 },
              { name: 'Customer Service', icon: 'chat', count: 68 },
              { name: 'Human Resources', icon: 'users', count: 54 },
              { name: 'Administrative', icon: 'clipboard', count: 43 },
              { name: 'Hospitality', icon: 'home', count: 61 }
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link 
                  to={`/jobs?category=${category.name}`}
                  className="block bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center hover:bg-primary/10 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20">
                    <span className="text-primary text-xl">
                      {category.icon === 'computer' && '💻'}
                      {category.icon === 'chart-bar' && '📊'}
                      {category.icon === 'pencil' && '✏️'}
                      {category.icon === 'cash' && '💰'}
                      {category.icon === 'medical' && '🩺'}
                      {category.icon === 'academic-cap' && '🎓'}
                      {category.icon === 'cog' && '⚙️'}
                      {category.icon === 'currency-dollar' && '💵'}
                      {category.icon === 'chat' && '💬'}
                      {category.icon === 'users' && '👥'}
                      {category.icon === 'clipboard' && '📋'}
                      {category.icon === 'home' && '🏠'}
                    </span>
                  </div>
                  <h3 className="text-gray-900 dark:text-white font-medium mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{category.count} jobs</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">How CareerConnect Works</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-3 sm:mt-4 max-w-2xl mx-auto">
              Find your dream job in just a few simple steps - CareerConnect makes the job search process seamless and efficient.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            {[
              {
                title: 'Create Your Profile',
                description: 'Sign up and build your professional profile with your skills, experience, and preferences.',
                icon: 'user-circle',
                color: 'blue'
              },
              {
                title: 'Discover Opportunities',
                description: 'Browse through thousands of job listings or get personalized job recommendations.',
                icon: 'search',
                color: 'green'
              },
              {
                title: 'Apply & Connect',
                description: 'Apply to jobs with just a few clicks and connect directly with employers.',
                icon: 'paper-airplane',
                color: 'purple'
              }
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-5 sm:p-8 text-center"
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-${step.color}-100 dark:bg-${step.color}-900/30 text-${step.color}-600 dark:text-${step.color}-400 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6`}>
                  {step.icon === 'user-circle' && (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {step.icon === 'search' && (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                  {step.icon === 'paper-airplane' && (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-primary">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left mb-6 md:mb-0 md:w-2/3">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Ready to Take the Next Step in Your Career?</h2>
              <p className="text-white/90 text-base sm:text-lg">
                Join thousands of professionals who have already found their dream jobs on CareerConnect.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <Button
                as={Link}
                to="/register"
                variant="primary"
                className="bg-white text-primary hover:bg-gray-100 px-6 py-3 sm:px-8"
                size="lg"
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
