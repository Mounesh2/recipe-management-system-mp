import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ id, title, image, cookingTime, price, tags = [] }) => {
    let imageSource = image || 'https://via.placeholder.com/400x300?text=No+Image+Available';
    try {
        imageSource = decodeURIComponent(imageSource);
    } catch (e) {}

    if (imageSource && typeof imageSource === 'string') {
        if (imageSource.includes('recipes/') && imageSource.includes('.jpg')) {
            const match = imageSource.match(/recipes\/([^/.]+)\.jpg/);
            if (match && match[1]) {
                imageSource = `https://images.unsplash.com/photo-${match[1]}?auto=format&fit=crop&w=800&q=80`;
            }
        }
    }

    if (imageSource && imageSource.includes('http')) {
        const lastIndex = imageSource.lastIndexOf('http');
        imageSource = imageSource.substring(lastIndex);
    }

    return (
        <Link 
            to={`/recipes/${id}`} 
            className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
        >
            <div className="relative aspect-auto h-48 w-full overflow-hidden bg-gray-200">
                <img 
                    src={imageSource} 
                    alt={title} 
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            
            <div className="flex flex-col flex-grow p-5 space-y-4">
                <h3 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight">
                    {title}
                </h3>
                
                {/* Tag Badges */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <span 
                                key={index} 
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800"
                            >
                                {tag.name || `Tag #${tag}`}
                            </span>
                        ))}
                    </div>
                )}
                
                <div className="flex-grow"></div>
                
                {/* Bottom Footer Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-600 font-medium">
                        <svg className="w-4 h-4 mr-1.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {cookingTime} min
                    </div>
                    <div className="flex items-center text-lg font-black text-emerald-600">
                        ₹{price}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default RecipeCard;
