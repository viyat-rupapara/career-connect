import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { motion } from 'framer-motion'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { useAuth } from '../../hooks/useAuth'

const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  role: yup.string().required('Please select user type')
})

const Register = () => {
  const { register: registerUser, user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationError, setRegistrationError] = useState(null)
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'user'
    }
  })
  
  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setRegistrationError(null)
    
    try {
      const success = await registerUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        role: data.role
      })
      
      if (!success) {
        setRegistrationError('Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('Registration error:', error)
      setRegistrationError(error.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // If user is already logged in, redirect to dashboard
  if (user) {
    const dashboardPath = user.role === 'admin' 
      ? '/admin/dashboard' 
      : user.role === 'recruiter' 
        ? '/recruiter/dashboard' 
        : '/dashboard'
        
    return <Navigate to={dashboardPath} replace />
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Join CareerConnect to find your dream job
          </p>
        </div>
        
        {registrationError && (
          <div className="mt-4 p-3 bg-danger/10 text-danger rounded-lg">
            {registrationError}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Full Name"
              id="fullName"
              type="text"
              error={errors.fullName?.message}
              {...register('fullName')}
            />
            
            <Input
              label="Email Address"
              id="email"
              type="email"
              error={errors.email?.message}
              {...register('email')}
            />
            
            <Input
              label="Password"
              id="password"
              type="password"
              error={errors.password?.message}
              {...register('password')}
            />
            
            <Input
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                I am a:
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register('role')}
                    value="user"
                    className="h-4 w-4 text-primary focus:ring-primary/50 border-gray-300 dark:border-gray-600"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Job Seeker</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register('role')}
                    value="recruiter"
                    className="h-4 w-4 text-primary focus:ring-primary/50 border-gray-300 dark:border-gray-600"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Employer</span>
                </label>
              </div>
              {errors.role && (
                <p className="mt-1 text-sm text-danger">{errors.role.message}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary focus:ring-primary/50 border-gray-300 dark:border-gray-600 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              I agree to the{' '}
              <Link to="/terms" className="text-primary hover:text-primary/80">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary hover:text-primary/80">
                Privacy Policy
              </Link>
            </label>
          </div>
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Create Account
          </Button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:text-primary/80">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default Register
