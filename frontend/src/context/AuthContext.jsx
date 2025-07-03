import { createContext, useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../services/axiosInstance'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const login = async (credentials) => {
    try {
      const data = await api.post('/auth/login', credentials)
      
      if (data.success) {
        localStorage.setItem('token', data.token)
        setUser(data.user)
        toast.success('Login successful!')
        
        // Navigate based on user role
        if (data.user.role === 'admin') {
          navigate('/admin/dashboard')
        } else if (data.user.role === 'recruiter') {
          navigate('/recruiter/dashboard')
        } else {
          navigate('/dashboard')
        }
        
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      toast.error(error.response?.data?.message || 'Login failed')
      return false
    }
  }

  const register = async (userData) => {
    try {
      // Rename fullName to name for backend compatibility
      const { fullName, ...rest } = userData
      const dataToSend = { name: fullName, ...rest }
      
      const data = await api.post('/auth/register', dataToSend)
      
      if (data.success) {
        toast.success('Registration successful! Please login.')
        navigate('/login')
        return true
      }
      return false
    } catch (error) {
      console.error('Registration error:', error)
      toast.error(error.response?.data?.message || 'Registration failed')
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    toast.info('You have been logged out')
    navigate('/')
  }

  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setIsLoading(false)
        return
      }
      
      const data = await api.get('/auth/me')
      
      if (data.success) {
        setUser(data.user)
      } else {
        // If token is invalid, clean up
        localStorage.removeItem('token')
      }
    } catch (error) {
      console.error('Auth check error:', error)
      localStorage.removeItem('token')
    } finally {
      setIsLoading(false)
    }
  }, [])
  
  // Check auth status on mount
  useEffect(() => {
    checkAuthStatus()
  }, [checkAuthStatus])

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isLoading,
      checkAuthStatus 
    }}>
      {children}
    </AuthContext.Provider>
  )
}
