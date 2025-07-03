import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, isLoading } = useAuth()
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // No specific role required or user has required role
  if (roles.length === 0 || roles.includes(user.role)) {
    return children
  }

  // Redirect based on user's role
  if (user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />
  } else if (user.role === 'recruiter') {
    return <Navigate to="/recruiter/dashboard" replace />
  } else {
    return <Navigate to="/dashboard" replace />
  }
}

export default ProtectedRoute
