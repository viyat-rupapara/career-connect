import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Input from '../common/Input'
import Button from '../common/Button'
import { toast } from 'react-toastify'

const schema = yup.object().shape({
  title: yup.string().required('Job title is required'),
  company: yup.string().required('Company name is required'),
  location: yup.string().required('Location is required'),
  type: yup.string().required('Job type is required'),
  category: yup.string().required('Category is required'),
  experience: yup.string().required('Experience level is required'),
  salary: yup.string().required('Salary range is required'),
  description: yup.string().required('Job description is required').min(50, 'Description should be at least 50 characters'),
  requirements: yup.array().of(yup.string()).min(1, 'At least one requirement is needed'),
  deadline: yup.date().min(new Date(), 'Deadline must be in the future')
})

const PostJobForm = ({ initialData = null, onSubmit, isEdit = false }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentRequirement, setCurrentRequirement] = useState('')
  const [currentBenefit, setCurrentBenefit] = useState('')
  
  const defaultValues = {
    title: '',
    company: '',
    location: '',
    type: '',
    category: '',
    experience: '',
    salary: '',
    description: '',
    requirements: [],
    benefits: [],
    deadline: '',
    isUrgent: false,
    isFeatured: false,
    ...initialData
  }
  
  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues
  })
  
  const requirements = watch('requirements', [])
  const benefits = watch('benefits', [])
  
  const addRequirement = () => {
    if (currentRequirement.trim()) {
      setValue('requirements', [...requirements, currentRequirement.trim()])
      setCurrentRequirement('')
    }
  }
  
  const removeRequirement = (index) => {
    const updatedRequirements = [...requirements]
    updatedRequirements.splice(index, 1)
    setValue('requirements', updatedRequirements)
  }
  
  const addBenefit = () => {
    if (currentBenefit.trim()) {
      setValue('benefits', [...benefits, currentBenefit.trim()])
      setCurrentBenefit('')
    }
  }
  
  const removeBenefit = (index) => {
    const updatedBenefits = [...benefits]
    updatedBenefits.splice(index, 1)
    setValue('benefits', updatedBenefits)
  }
  
  const handleFormSubmit = async (data) => {
    setIsSubmitting(true)
    
    try {
      await onSubmit(data)
      toast.success(isEdit ? 'Job updated successfully!' : 'Job posted successfully!')
    } catch (error) {
      console.error('Error submitting job:', error)
      toast.error('Failed to submit job. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Internship",
    "Remote"
  ]
  
  const jobCategories = [
    "Technology",
    "Design",
    "Marketing",
    "Sales",
    "Customer Service",
    "Finance",
    "Healthcare",
    "Education",
    "Engineering",
    "Administrative",
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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Job Title"
          id="title"
          error={errors.title?.message}
          {...register('title')}
        />
        
        <Input
          label="Company"
          id="company"
          error={errors.company?.message}
          {...register('company')}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="Location"
          id="location"
          error={errors.location?.message}
          {...register('location')}
        />
        
        <div>
          <label htmlFor="type" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            Job Type
          </label>
          <select
            id="type"
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2
              ${errors.type 
                ? 'border-danger focus:border-danger focus:ring-danger/50' 
                : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/50'
              }
              dark:bg-gray-700 dark:text-gray-100
            `}
            {...register('type')}
          >
            <option value="">Select job type</option>
            {jobTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-danger">{errors.type.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="category" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2
              ${errors.category 
                ? 'border-danger focus:border-danger focus:ring-danger/50' 
                : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/50'
              }
              dark:bg-gray-700 dark:text-gray-100
            `}
            {...register('category')}
          >
            <option value="">Select category</option>
            {jobCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-danger">{errors.category.message}</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="experience" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            Experience Level
          </label>
          <select
            id="experience"
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2
              ${errors.experience 
                ? 'border-danger focus:border-danger focus:ring-danger/50' 
                : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/50'
              }
              dark:bg-gray-700 dark:text-gray-100
            `}
            {...register('experience')}
          >
            <option value="">Select experience level</option>
            {experienceLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          {errors.experience && (
            <p className="mt-1 text-sm text-danger">{errors.experience.message}</p>
          )}
        </div>
        
        <Input
          label="Salary Range"
          id="salary"
          placeholder="e.g. $50,000 - $70,000"
          error={errors.salary?.message}
          {...register('salary')}
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
          Job Description
        </label>
        <textarea
          id="description"
          rows={6}
          className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2
            ${errors.description 
              ? 'border-danger focus:border-danger focus:ring-danger/50' 
              : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/50'
            }
            dark:bg-gray-700 dark:text-gray-100
          `}
          placeholder="Describe the role, responsibilities, and ideal candidate..."
          {...register('description')}
        ></textarea>
        {errors.description && (
          <p className="mt-1 text-sm text-danger">{errors.description.message}</p>
        )}
      </div>
      
      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
          Requirements
        </label>
        <div className="flex">
          <input
            type="text"
            value={currentRequirement}
            onChange={(e) => setCurrentRequirement(e.target.value)}
            className="flex-1 p-3 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary/50 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Add a job requirement"
          />
          <button
            type="button"
            onClick={addRequirement}
            className="bg-primary text-white px-4 rounded-r-md hover:bg-primary/90"
          >
            Add
          </button>
        </div>
        {errors.requirements && (
          <p className="mt-1 text-sm text-danger">{errors.requirements.message}</p>
        )}
        
        <ul className="mt-3 space-y-2">
          {requirements.map((req, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
              <span className="text-gray-700 dark:text-gray-300">{req}</span>
              <button
                type="button"
                onClick={() => removeRequirement(index)}
                className="text-danger hover:text-danger/80"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
          Benefits (Optional)
        </label>
        <div className="flex">
          <input
            type="text"
            value={currentBenefit}
            onChange={(e) => setCurrentBenefit(e.target.value)}
            className="flex-1 p-3 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary/50 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Add a job benefit"
          />
          <button
            type="button"
            onClick={addBenefit}
            className="bg-primary text-white px-4 rounded-r-md hover:bg-primary/90"
          >
            Add
          </button>
        </div>
        
        <ul className="mt-3 space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
              <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
              <button
                type="button"
                onClick={() => removeBenefit(index)}
                className="text-danger hover:text-danger/80"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="Application Deadline"
          id="deadline"
          type="date"
          error={errors.deadline?.message}
          {...register('deadline')}
        />
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isUrgent"
            className="w-5 h-5 text-primary focus:ring-primary/50 rounded border-gray-300 dark:border-gray-600"
            {...register('isUrgent')}
          />
          <label htmlFor="isUrgent" className="ml-2 text-gray-700 dark:text-gray-300">
            Mark as Urgent
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isFeatured"
            className="w-5 h-5 text-primary focus:ring-primary/50 rounded border-gray-300 dark:border-gray-600"
            {...register('isFeatured')}
          />
          <label htmlFor="isFeatured" className="ml-2 text-gray-700 dark:text-gray-300">
            Feature this Job
          </label>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {isEdit ? 'Update Job' : 'Post Job'}
        </Button>
      </div>
    </form>
  )
}

export default PostJobForm
