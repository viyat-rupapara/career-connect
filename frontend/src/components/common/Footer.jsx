import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 text-white pt-8 sm:pt-12 pb-6 sm:pb-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="text-xl sm:text-2xl font-bold text-white">
                Career<span className="text-primary">Connect</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
              Connecting talented professionals with their dream careers. Find your next opportunity with CareerConnect.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/jobs" className="text-gray-400 hover:text-primary transition-colors">Browse Jobs</Link></li>
              <li><Link to="/companies" className="text-gray-400 hover:text-primary transition-colors">Companies</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3 sm:mb-4">For Employers</h3>
            <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li><Link to="/post-job" className="text-gray-400 hover:text-primary transition-colors">Post a Job</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/resources" className="text-gray-400 hover:text-primary transition-colors">Resources</Link></li>
              <li><Link to="/recruiter/register" className="text-gray-400 hover:text-primary transition-colors">Join as Recruiter</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3 sm:mb-4">Contact Us</h3>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <p className="flex items-start text-gray-400">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>1234 Career St, Employment City</span>
              </p>
              <p className="flex items-start text-gray-400">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@careerconnect.com</span>
              </p>
              <p className="flex items-start text-gray-400">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+1 (555) 123-4567</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-0 text-center sm:text-left">
            © {currentYear} CareerConnect. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link to="/privacy" className="text-xs sm:text-sm text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-xs sm:text-sm text-gray-400 hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="text-xs sm:text-sm text-gray-400 hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
