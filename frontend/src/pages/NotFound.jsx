import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/common/Button'

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">Page Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <div className="mt-8 flex items-center justify-center space-x-4">
            <Button as={Link} to="/" variant="primary">
              Go Home
            </Button>
            <Button as={Link} to="/jobs" variant="outline">
              Browse Jobs
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound
