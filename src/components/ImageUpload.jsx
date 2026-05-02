import React, { useState, useRef } from 'react';
import { uploadRecipeImage } from '../services/api';

const ImageUpload = ({ recipeId, currentImage, onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(currentImage || null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setupFile(selectedFile);
        }
    };

    const setupFile = (selectedFile) => {
        if (!selectedFile.type.startsWith('image/')) {
            setMessage('Please select an image file');
            return;
        }
        setFile(selectedFile);
        
        // Generate preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
        setMessage('');
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setupFile(droppedFile);
        }
    };

    const handleUploadClick = async () => {
        if (!file) {
            setMessage('Please select a file first.');
            return;
        }

        setUploading(true);
        setMessage('');

        try {
            const data = await uploadRecipeImage(recipeId, file);
            setMessage('Image uploaded successfully 🎉');
            // If parent provided a callback, inform it with the new returned URL
            if (onUploadSuccess && data.image) {
                onUploadSuccess(data.image);
            }
        } catch (error) {
            console.error('Upload failed', error);
            setMessage('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const resetSelection = () => {
        setFile(null);
        setPreview(currentImage || null);
        setMessage('');
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recipe Image</h3>
            
            {/* Drag & Drop Zone */}
            <div 
                className={`relative group border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors duration-200 ${isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {/* Preview vs Placeholder */}
                {preview ? (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black mb-4">
                        <img 
                            src={preview} 
                            alt="Preview" 
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                        <button
                            onClick={(e) => { e.stopPropagation(); resetSelection(); }}
                            className="absolute top-2 right-2 p-1.5 bg-red-600/80 text-white rounded-full hover:bg-red-600 transition-colors"
                            disabled={uploading}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                ) : (
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                )}

                <div className="space-y-1 text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                        <span>Upload a file</span>
                        <input 
                            id="file-upload" 
                            name="file-upload" 
                            type="file" 
                            className="sr-only" 
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            disabled={uploading}
                        />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 5MB</p>
            </div>

            {/* Actions & Feedback */}
            <div className="mt-6 flex flex-col items-center">
                {file && (
                    <button
                        onClick={handleUploadClick}
                        disabled={uploading}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {uploading && (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {uploading ? 'Uploading...' : 'Confirm Upload'}
                    </button>
                )}
                
                {message && (
                    <p className={`mt-3 text-sm font-medium ${message.includes('fail') || message.includes('select') ? 'text-red-500' : 'text-emerald-600'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
