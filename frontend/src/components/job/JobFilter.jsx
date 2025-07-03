import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../common/Button'
import Input from '../common/Input'
import { useJobs } from '../../hooks/useJobs'
import { useDebounce } from '../../hooks/useDebounce'

const JobFilter = () => {
  const { filters, updateFilters, clearFilters } = useJobs()
  const [localFilters, setLocalFilters] = useState(filters)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLocalFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateFilters(localFilters)
  }

  const handleClear = () => {
    setLocalFilters({
      search: '',
      location: '',
      type: '',
      category: '',
      experience: '',
      salary: ''
    })
    clearFilters()
  }

  const debouncedSearch = useDebounce(localFilters.search, 500)
  
  // Apply search filter automatically when debounced value changes
  useState(() => {
    if (debouncedSearch !== undefined) {
      updateFilters({ search: debouncedSearch })
    }
  }, [debouncedSearch, updateFilters])

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Internship",
    "Remote"
  ]

  const categories = [
    "Technology",
    "Design",
    "Marketing",
    "Sales",
    "Customer Service",
    "Finance",
    "Healthcare",
    "Education",
    "Engineering",
    "Other"
  ]

  const experienceLevels = [
    "Entry Level",
    "Junior",
    "Mid-Level",
    "Senior",
    "Lead",
    "Manager",
    "Director",
    "Executive"
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-5">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:gap-4">
          <div className="flex-1">
            <Input
              type="text"
              name="search"
              placeholder="Job title, keywords, or company"
              value={localFilters.search || ''}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          
          <div className="flex-1">
            <Input
              type="text"
              name="location"
              placeholder="Location"
              value={localFilters.location || ''}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          
          <div className="flex md:flex-shrink-0 justify-between md:justify-normal md:items-end gap-2 mt-3 md:mt-0">
            <Button type="button" onClick={() => setIsExpanded(!isExpanded)} variant="ghost" className="text-sm py-2">
              {isExpanded ? 'Less Filters' : 'More Filters'}
              <svg 
                className={`w-5 h-5 ml-1 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
          
            <Button type="submit" variant="primary" className="whitespace-nowrap">
              Search Jobs
            </Button>
          </div>
        </div>
        
        <motion.div 
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Job Type
              </label>
              <select
                name="type"
                value={localFilters.type || ''}
                onChange={handleInputChange}
                className="form-select w-full"
              >
                <option value="">All Types</option>
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                name="category"
                value={localFilters.category || ''}
                onChange={handleInputChange}
                className="form-select w-full"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Experience Level
              </label>
              <select
                name="experience"
                value={localFilters.experience || ''}
                onChange={handleInputChange}
                className="form-select w-full"
              >
                <option value="">All Levels</option>
                {experienceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Salary Range
              </label>
              <select
                name="salary"
                value={localFilters.salary || ''}
                onChange={handleInputChange}
                className="form-select w-full"
              >
                <option value="">Any Salary</option>
                <option value="0-30000">$0 - $30,000</option>
                <option value="30000-60000">$30,000 - $60,000</option>
                <option value="60000-90000">$60,000 - $90,000</option>
                <option value="90000-120000">$90,000 - $120,000</option>
                <option value="120000-150000">$120,000 - $150,000</option>
                <option value="150000+">$150,000+</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button type="button" onClick={handleClear} variant="ghost" className="text-sm">
              Clear All Filters
            </Button>
          </div>
        </motion.div>
      </form>
    </div>
  )
}

export default JobFilter
