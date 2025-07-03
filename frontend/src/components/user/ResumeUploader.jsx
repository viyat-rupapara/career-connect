import { useState } from 'react'
import Button from '../common/Button'

const ResumeUploader = ({ currentResume, onUpload }) => {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      
      // Create a preview URL if it's a PDF
      if (selectedFile.type === 'application/pdf') {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result)
        }
        reader.readAsDataURL(selectedFile)
      } else {
        setPreview(null)
      }
    }
  }
  
  const handleUpload = async () => {
    if (!file) return
    
    setIsUploading(true)
    
    try {
      // In a real app, you'd use FormData and send to your API
      // For demo, we simulate success after a delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      onUpload({
        name: file.name,
        url: URL.createObjectURL(file),
        updatedAt: new Date().toISOString()
      })
      
      setFile(null)
    } catch (error) {
      console.error('Error uploading resume:', error)
    } finally {
      setIsUploading(false)
    }
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Resume</h3>
      
      {currentResume ? (
        <div className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <svg className="w-10 h-10 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div className="ml-3">
                <h4 className="text-gray-900 dark:text-white font-medium">{currentResume.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Updated {new Date(currentResume.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <a
              href={currentResume.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80"
            >
              View
            </a>
          </div>
        </div>
      ) : (
        <div className="mb-6 text-center p-6 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            No resume uploaded yet
          </p>
        </div>
      )}
      
      <div className="space-y-4">
        <label className="block">
          <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Upload New Resume</span>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-primary hover:text-primary/80">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PDF, DOC, DOCX up to 5MB
              </p>
              {file && (
                <p className="text-sm text-green-500">{file.name}</p>
              )}
            </div>
          </div>
        </label>
        
        <div className="flex justify-end">
          <Button
            variant="primary"
            onClick={handleUpload}
            disabled={!file || isUploading}
            isLoading={isUploading}
          >
            {currentResume ? 'Update Resume' : 'Upload Resume'}
          </Button>
        </div>
      </div>
      
      {preview && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview</h4>
          <iframe
            src={preview}
            className="w-full h-80 border border-gray-300 dark:border-gray-600 rounded-md"
            title="Resume preview"
          />
        </div>
      )}
    </div>
  )
}

export default ResumeUploader
