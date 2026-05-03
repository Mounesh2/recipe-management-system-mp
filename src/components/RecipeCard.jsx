import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ id, title, image, cookingTime, price, tags = [] }) => {
    const getBeautifulFoodImage = () => {
        const t = (title || '').toLowerCase();
        const tagNames = tags.map(tag => (typeof tag === 'object' ? tag.name : String(tag)).toLowerCase());

        const biryaniImages = [
            'https://images.unsplash.com/photo-1563379011-7c749659a591?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1631515233263-d64cb245a864?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1589302110074-d24244bc0b4a?auto=format&fit=crop&w=800&q=80'
        ];
        const curryImages = [
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1589302110074-d24244bc0b4a?auto=format&fit=crop&w=800&q=80'
        ];
        const pizzaImages = [
            'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80'
        ];
        const cakeImages = [
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1535141192574-5d4897c82536?auto=format&fit=crop&w=800&q=80'
        ];
        const iceCreamImages = [
            'https://images.unsplash.com/photo-1501443762994-82bd5dabb892?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=800&q=80'
        ];
        const shakeImages = [
            'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1532713107108-7b51c228c231?auto=format&fit=crop&w=800&q=80'
        ];

        const pick = (arr) => arr[id % arr.length];

        if (t.includes('biryani') || tagNames.some(name => name.includes('biryani'))) {
            return pick(biryaniImages);
        }
        if (t.includes('pizza') || tagNames.some(name => name.includes('pizza'))) {
            return pick(pizzaImages);
        }
        if (t.includes('cake') || tagNames.some(name => name.includes('cake'))) {
            return pick(cakeImages);
        }
        if (t.includes('ice cream') || t.includes('sorbet') || tagNames.some(name => name.includes('ice cream'))) {
            return pick(iceCreamImages);
        }
        if (t.includes('shake') || tagNames.some(name => name.includes('shake'))) {
            return pick(shakeImages);
        }
        if (t.includes('curry') || t.includes('masala') || t.includes('paneer') || t.includes('kofta') || t.includes('dal') || tagNames.some(name => name.includes('curry'))) {
            return pick(curryImages);
        }
        if (t.includes('dessert') || t.includes('pudding') || t.includes('jamun') || t.includes('pie') || tagNames.some(name => name.includes('dessert'))) {
            return pick(cakeImages);
        }

        return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80';
    };

    let imageSource = image || 'https://via.placeholder.com/400x300?text=No+Image+Available';
    try {
        imageSource = decodeURIComponent(imageSource);
    } catch (e) {}

    if (imageSource && typeof imageSource === 'string') {
        if (imageSource.includes('recipes/') && imageSource.includes('.jpg')) {
            const match = imageSource.match(/recipes\/([^/.]+)\.jpg/);
            if (match && match[1]) {
                const unsplashId = match[1].split('_')[0];
                imageSource = `https://images.unsplash.com/photo-${unsplashId}?auto=format&fit=crop&w=800&q=80`;
            }
        }
    }

    if (imageSource && imageSource.includes('http')) {
        const lastIndex = imageSource.lastIndexOf('http');
        imageSource = imageSource.substring(lastIndex);
    }

    // Always use the curated beautiful food image to avoid any broken image or steak and salad fallback
    imageSource = getBeautifulFoodImage();

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
