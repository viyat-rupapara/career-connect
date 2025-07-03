import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { motion } from 'framer-motion'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { toast } from 'react-toastify'
import api from '../../services/axiosInstance'

const schema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email is required')
})

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(schema)
  })
  
  const onSubmit = async (data) => {
    setIsSubmitting(true)
    
    try {
      // In a real application, this would make an API call
      // await api.post('/auth/forgot-password', data)
      
      // For demo purposes, we'll simulate success after a delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsSuccess(true)
      toast.success('Password reset instructions sent to your email.')
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to process your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reset Password</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Enter your email to receive password reset instructions
          </p>
        </div>
        
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center"
          >
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
              <svg className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-900 dark:text-white">Check your email</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              We've sent password reset instructions to your email address.
            </p>
            <div className="mt-6">
              <Button as={Link} to="/login" variant="primary">
                Return to Login
              </Button>
            </div>
          </motion.div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email Address"
              id="email"
              type="email"
              error={errors.email?.message}
              {...register('email')}
            />
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Send Reset Instructions
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Remember your password?{' '}
                <Link to="/login" className="font-medium text-primary hover:text-primary/80">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  )
}

export default ForgotPassword
