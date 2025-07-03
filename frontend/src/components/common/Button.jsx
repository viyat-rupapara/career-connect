import { forwardRef } from 'react'

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  as: Component = 'button',
  className = '',
  ...props
}, ref) => {
  const baseClassName = "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
  
  const variants = {
    primary: "bg-primary hover:bg-primary/90 text-white focus:ring-primary/50",
    secondary: "bg-secondary hover:bg-secondary/90 text-white focus:ring-secondary/50",
    success: "bg-success hover:bg-success/90 text-white focus:ring-success/50",
    danger: "bg-danger hover:bg-danger/90 text-white focus:ring-danger/50",
    outline: "bg-transparent border border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/50",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
  }
  
  const sizes = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg"
  }
  
  const buttonClassName = `
    ${baseClassName}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
    ${className}
  `
  
  return (
    <Component
      ref={ref}
      className={buttonClassName}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </Component>
  )
})

Button.displayName = 'Button'

export default Button
