import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Input from '../common/Input'
import Button from '../common/Button'
import { useJobs } from '../../hooks/useJobs'

const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  coverLetter: yup.string().required('Cover letter is required'),
  resumeUrl: yup.string().when('resumeFile', {
    is: (value) => !value || value.length === 0,
    then: () => yup.string().required('Either resume URL or file is required'),
    otherwise: () => yup.string()
  })
})

const JobApplyForm = ({ jobId, onSuccess }) => {
  const { applyForJob } = useJobs()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resumeFile, setResumeFile] = useState(null)
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      coverLetter: '',
      resumeUrl: '',
      resumeFile: null
    }
  })
  
  const onSubmit = async (data) => {
    setIsSubmitting(true)
    
    try {
      // For this frontend-only demo, we'll simulate file upload
      // In a real app, you'd use FormData to send the file
      const applicationData = {
        ...data,
        resumeFile: resumeFile ? resumeFile.name : null
      }
      
      const success = await applyForJob(jobId, applicationData)
      
      if (success) {
        onSuccess()
      }
    } catch (error) {
      console.error('Error applying for job:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
      <div>
        <Input
          label="Full Name"
          id="fullName"
          type="text"
          placeholder="Enter your full name"
          error={errors.fullName?.message}
          {...register('fullName')}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email address"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>
        
        <div>
          <Input
            label="Phone Number"
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            error={errors.phone?.message}
            {...register('phone')}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
          Resume / CV
        </label>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Input
              label="Resume URL (LinkedIn or Portfolio)"
              id="resumeUrl"
              type="text"
              placeholder="https://your-resume-url.com"
              error={errors.resumeUrl?.message}
              {...register('resumeUrl')}
              labelClassName="text-xs sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-medium mb-2">
              Or Upload Resume File
            </label>
            <div className="mt-1 flex justify-center px-3 sm:px-6 pt-3 sm:pt-5 pb-4 sm:pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex flex-col sm:flex-row text-xs sm:text-sm text-gray-600 dark:text-gray-400 items-center justify-center">
                  <label className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-primary hover:text-primary/80 px-2 py-1">
                    <span>Upload a file</span>
                    <input
                      id="resumeFile"
                      name="resumeFile"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="sm:pl-1 mt-1 sm:mt-0">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PDF, DOC, DOCX up to 2MB
                </p>
                {resumeFile && (
                  <p className="text-xs sm:text-sm text-green-500 truncate max-w-xs">{resumeFile.name}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <label htmlFor="coverLetter" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
          Cover Letter
        </label>
        <textarea
          id="coverLetter"
          rows={5}
          className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base
            ${errors.coverLetter 
              ? 'border-danger focus:border-danger focus:ring-danger/50' 
              : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/50'
            }
            dark:bg-gray-700 dark:text-gray-100
          `}
          placeholder="Tell us why you're a good fit for this position..."
          {...register('coverLetter')}
        ></textarea>
        {errors.coverLetter && (
          <p className="mt-1 text-xs sm:text-sm text-danger">{errors.coverLetter.message}</p>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          Submit Application
        </Button>
      </div>
    </form>
  )
}

export default JobApplyForm
