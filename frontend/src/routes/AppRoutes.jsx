import { lazy, Suspense } from 'react'
import ProtectedRoute from './ProtectedRoute'
import Loader from '../components/common/Loader'

// Lazy load pages for better performance
const Home = lazy(() => import('../pages/Home/Home'))
const Login = lazy(() => import('../pages/Auth/Login'))
const Register = lazy(() => import('../pages/Auth/Register'))
const ForgotPassword = lazy(() => import('../pages/Auth/ForgotPassword'))
const Jobs = lazy(() => import('../pages/Jobs/AllJobs'))
const JobDetailsPage = lazy(() => import('../pages/Jobs/JobDetailsPage'))
const UserDashboard = lazy(() => import('../pages/Dashboard/UserDashboard'))
const RecruiterDashboard = lazy(() => import('../pages/Dashboard/RecruiterDashboard'))
const AdminDashboard = lazy(() => import('../pages/Dashboard/AdminDashboard'))
const UserProfile = lazy(() => import('../pages/Profile/UserProfile'))
const EditProfile = lazy(() => import('../pages/Profile/EditProfile'))
const NotFound = lazy(() => import('../pages/NotFound'))

const LazyWrapper = (Component) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
)

const AppRoutes = [
  { 
    path: '/', 
    element: LazyWrapper(Home)
  },
  { 
    path: '/login', 
    element: LazyWrapper(Login)
  },
  { 
    path: '/register', 
    element: LazyWrapper(Register)
  },
  { 
    path: '/forgot-password', 
    element: LazyWrapper(ForgotPassword)
  },
  { 
    path: '/jobs', 
    element: LazyWrapper(Jobs)
  },
  { 
    path: '/jobs/:id', 
    element: LazyWrapper(JobDetailsPage)
  },
  { 
    path: '/dashboard', 
    element: <ProtectedRoute roles={["user"]}>{LazyWrapper(UserDashboard)}</ProtectedRoute>
  },
  { 
    path: '/recruiter/dashboard', 
    element: <ProtectedRoute roles={["recruiter"]}>{LazyWrapper(RecruiterDashboard)}</ProtectedRoute>
  },
  { 
    path: '/admin/dashboard', 
    element: <ProtectedRoute roles={["admin"]}>{LazyWrapper(AdminDashboard)}</ProtectedRoute>
  },
  { 
    path: '/profile', 
    element: <ProtectedRoute>{LazyWrapper(UserProfile)}</ProtectedRoute>
  },
  { 
    path: '/profile/edit', 
    element: <ProtectedRoute>{LazyWrapper(EditProfile)}</ProtectedRoute>
  },
  { 
    path: '*', 
    element: LazyWrapper(NotFound)
  }
]

export default AppRoutes
