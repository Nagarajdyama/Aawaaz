import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, MapPin, Check, X, Camera } from 'lucide-react';
import { createComplaint, ComplaintCategory } from '../../utils/complaints';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const FileComplaintPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<ComplaintCategory>('other');
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, this would upload to Cloudinary or similar
    // For now, we'll simulate an upload with a timeout
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      // Use a sample image from Pexels for demo purposes
      const sampleImages = [
        'https://images.pexels.com/photos/247795/pexels-photo-247795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/248159/pexels-photo-248159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/2253915/pexels-photo-2253915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ];
      
      const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
      setImageUrl(randomImage);
      setIsUploading(false);
      toast.success('Image uploaded successfully');
    }, 1500);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be logged in to file a complaint');
      return;
    }
    
    if (!title || !description || !location || !category) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await createComplaint({
        title,
        description,
        location,
        category,
        imageUrl,
        userId: user.id,
      });
      
      toast.success('Complaint submitted successfully');
      
      // Simulate email notification
      toast.success('Confirmation email sent');
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting complaint:', error);
      toast.error('Failed to submit complaint');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleRemoveImage = () => {
    setImageUrl('');
  };
  
  const categories: { value: ComplaintCategory; label: string }[] = [
    { value: 'roads', label: 'Roads & Infrastructure' },
    { value: 'water', label: 'Water Supply' },
    { value: 'electricity', label: 'Electricity' },
    { value: 'sanitation', label: 'Sanitation & Waste' },
    { value: 'other', label: 'Other' },
  ];
  
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">File a New Complaint</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Please provide detailed information about your issue
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Complaint Title <span className="text-error-600">*</span>
              </label>
              <input
                type="text"
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input mt-1"
                placeholder="Brief title of your complaint"
              />
            </div>
            
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description <span className="text-error-600">*</span>
              </label>
              <textarea
                id="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="input mt-1"
                placeholder="Provide a detailed description of the issue"
              />
            </div>
            
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category <span className="text-error-600">*</span>
              </label>
              <select
                id="category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value as ComplaintCategory)}
                className="input mt-1"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Location <span className="text-error-600">*</span>
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="location"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="input pl-10"
                  placeholder="Enter the address or location of the issue"
                />
              </div>
            </div>
            
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Supporting Image
              </label>
              
              {imageUrl ? (
                <div className="relative mt-2">
                  <img 
                    src={imageUrl}
                    alt="Uploaded complaint"
                    className="h-48 w-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-1 bg-error-600 text-white rounded-full hover:bg-error-700 focus:outline-none"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md">
                  <div className="space-y-1 text-center">
                    {isUploading ? (
                      <div className="flex flex-col items-center">
                        <motion.div
                          className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          Uploading image...
                        </p>
                      </div>
                    ) : (
                      <>
                        <Camera className="mx-auto h-12 w-12 text-gray-400" stroke={1} />
                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                          <label
                            htmlFor="image-upload"
                            className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 focus-within:outline-none"
                          >
                            <span>Upload a photo</span>
                            <input 
                              id="image-upload" 
                              name="image-upload" 
                              type="file" 
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="sr-only" 
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isUploading}
                className="btn btn-primary"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <motion.div
                      className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Check className="mr-2 h-4 w-4" />
                    Submit Complaint
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default FileComplaintPage;