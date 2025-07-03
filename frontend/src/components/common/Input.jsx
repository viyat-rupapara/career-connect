import { forwardRef } from 'react'

const Input = forwardRef(({
  label,
  error,
  type = 'text',
  id,
  className = '',
  fullWidth = true,
  ...props
}, ref) => {
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label 
          htmlFor={id} 
          className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        id={id}
        className={`
          w-full p-3 border rounded-md focus:outline-none focus:ring-2
          ${error 
            ? 'border-danger focus:border-danger focus:ring-danger/50' 
            : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/50'
          }
          ${className}
          dark:bg-gray-700 dark:text-gray-100
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-danger">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
