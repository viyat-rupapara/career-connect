import { Link } from 'react-router-dom'
import Button from '../common/Button'
import { motion } from 'framer-motion'

const ProfileCard = ({ user }) => {
  const {
    fullName,
    email,
    profileImage,
    title,
    location,
    skills,
    bio,
    experience,
    education,
    socialLinks
  } = user
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
    >
      <div className="bg-primary h-24"></div>
      
      <div className="px-6 pb-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-col sm:flex-row items-center sm:items-start -mt-12">
            <div className="flex-shrink-0">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={fullName}
                  className="h-24 w-24 rounded-full border-4 border-white dark:border-gray-800 object-cover"
                />
              ) : (
                <div className="h-24 w-24 rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-500 dark:text-gray-400">
                    {fullName.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            
            <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {fullName}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{title}</p>
              
              {location && (
                <div className="flex items-center mt-1 text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">{location}</span>
                </div>
              )}
            </div>
          </div>
          
          <Link to="/profile/edit">
            <Button variant="outline" size="sm">Edit Profile</Button>
          </Link>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">About</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {bio}
          </p>
        </div>
        
        {skills && skills.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Skills</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {experience && experience.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Experience</h3>
            <div className="mt-2 space-y-4">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 py-1">
                  <h4 className="text-gray-900 dark:text-white font-medium">{exp.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </p>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {education && education.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Education</h3>
            <div className="mt-2 space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 py-1">
                  <h4 className="text-gray-900 dark:text-white font-medium">{edu.degree}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{edu.institution}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {edu.startYear} - {edu.endYear || 'Present'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Connect</h3>
            <div className="mt-2 flex space-x-3">
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              )}
              
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.934.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.48A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              )}
              
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ProfileCard
