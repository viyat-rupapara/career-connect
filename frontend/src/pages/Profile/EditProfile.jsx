import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button, Input } from '../../components'
import { useAuth } from '../../contexts/AuthContext'
import { useProfile } from '../../contexts/ProfileContext'

const EditProfile = () => {
  const { user } = useAuth()
  const { profile, updateProfile, isLoading } = useProfile()
  const navigate = useNavigate()
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      fullName: profile?.fullName || '',
      email: profile?.email || '',
      title: profile?.title || '',
      location: profile?.location || '',
      bio: profile?.bio || '',
      linkedin: profile?.linkedin || '',
      github: profile?.github || '',
      twitter: profile?.twitter || '',
    }
  })
  const [profileImage, setProfileImage] = useState(null)
  const [profileImageUrl, setProfileImageUrl] = useState(profile?.profileImageUrl || '')
  const [skills, setSkills] = useState(profile?.skills || [])
  const [currentSkill, setCurrentSkill] = useState('')

  useEffect(() => {
    if (profile) {
      setValue('fullName', profile.fullName)
      setValue('email', profile.email)
      setValue('title', profile.title)
      setValue('location', profile.location)
      setValue('bio', profile.bio)
      setValue('linkedin', profile.linkedin)
      setValue('github', profile.github)
      setValue('twitter', profile.twitter)
    }
  }, [profile, setValue])

  const onSubmit = async (data) => {
    const updatedProfile = {
      ...data,
      profileImage,
      skills,
    }
    await updateProfile(updatedProfile)
    navigate('/profile')
  }

  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setProfileImage(file)
      setProfileImageUrl(URL.createObjectURL(file))
    }
  }
  
  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()])
      setCurrentSkill('')
    }
  }
  
  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 px-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h1>
            <Button
              variant="outline"
              onClick={() => navigate('/profile')}
            >
              Cancel
            </Button>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Image Upload */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                Profile Image
              </label>
              <div className="flex items-center">
                <div className="mr-4">
                  {profileImageUrl ? (
                    <img
                      src={profileImageUrl}
                      alt="Profile preview"
                      className="h-24 w-24 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-500 dark:text-gray-400">
                        {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="cursor-pointer bg-gray-100 dark:bg-gray-700 py-2 px-3 rounded-md inline-block text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    Choose File
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                    />
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    JPG, PNG, GIF up to 2MB
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                id="fullName"
                error={errors.fullName?.message}
                {...register('fullName')}
              />
              
              <Input
                label="Email Address"
                id="email"
                type="email"
                error={errors.email?.message}
                {...register('email')}
                disabled
              />
              
              <Input
                label="Professional Title"
                id="title"
                placeholder="e.g. Senior Software Developer"
                error={errors.title?.message}
                {...register('title')}
              />
              
              <Input
                label="Location"
                id="location"
                placeholder="e.g. San Francisco, CA"
                error={errors.location?.message}
                {...register('location')}
              />
            </div>
            
            <div>
              <label htmlFor="bio" className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                Bio
              </label>
              <textarea
                id="bio"
                rows={4}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2
                  ${errors.bio 
                    ? 'border-danger focus:border-danger focus:ring-danger/50' 
                    : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/50'
                  }
                  dark:bg-gray-700 dark:text-gray-100
                `}
                placeholder="Tell us about yourself..."
                {...register('bio')}
              ></textarea>
              {errors.bio && (
                <p className="mt-1 text-sm text-danger">{errors.bio.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                Skills
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  className="flex-1 p-3 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary/50 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Add a skill"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="bg-primary text-white px-4 rounded-r-md hover:bg-primary/90"
                >
                  Add
                </button>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full flex items-center"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300">{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-2 text-gray-500 hover:text-danger"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                Social Links
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-500 p-2 rounded-l-md">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </span>
                  <Input
                    id="linkedin"
                    placeholder="LinkedIn URL"
                    className="rounded-l-none"
                    error={errors.linkedin?.message}
                    {...register('linkedin')}
                  />
                </div>
                
                <div className="flex items-center">
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-2 rounded-l-md">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.934.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.48A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </span>
                  <Input
                    id="github"
                    placeholder="GitHub URL"
                    className="rounded-l-none"
                    error={errors.github?.message}
                    {...register('github')}
                  />
                </div>
                
                <div className="flex items-center">
                  <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-400 p-2 rounded-l-md">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </span>
                  <Input
                    id="twitter"
                    placeholder="Twitter URL"
                    className="rounded-l-none"
                    error={errors.twitter?.message}
                    {...register('twitter')}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default EditProfile