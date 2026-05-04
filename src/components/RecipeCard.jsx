import React from 'react';
import { Link } from 'react-router-dom';
import { getRecipeCoverUrlWithAliases } from '../data/recipeCoverImages';

const RecipeCard = ({ id, title, image, cookingTime, price, tags = [] }) => {
    const getBeautifulFoodImage = () => {
        const t = (title || '').toLowerCase();

        const universalFood = [
            '1546069901-ba9599a7e63c', '1540189549336-e6e99c3679fe', '1565299624946-b28f40a0ae38', '1567620905732-2d1ec7ab7445',
            '1512621776951-a57141f2eefd', '1513104890138-7c749659a591', '1555939594-58d7cb561ad1', '1499028344343-cd173ffc68a9',
            '1476224203421-9ac39bcb3327', '1482049016688-2d3e1b311543', '1473093295043-cdd812d0e601', '1544025162-d76694265947',
            '1579954115545-a95591f28bfc', '1567620832903-9fc6debc209f', '1506354666786-959d6d497f1a', '1504754524776-8f4f37790ca0',
            '1551024506-0bccd828d307', '1604382354936-07c5d9983bd3', '1515037893149-de7f840978e2', '1565958011703-44f9829ba187'
        ];

        let hash = id || 0;
        for (let i = 0; i < t.length; i++) {
            hash = t.charCodeAt(i) + ((hash << 5) - hash);
        }
        hash = Math.abs(hash);

        const unsplashId = universalFood[hash % universalFood.length];
        const w = 800 + (hash % 15);
        const h = 600 + (hash % 15);
        return `https://images.unsplash.com/photo-${unsplashId}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
    };

    // Prefer bundled per-title covers so broken /media URLs on production never load (they 404 → same onError image).
    const catalogCover = getRecipeCoverUrlWithAliases(title);
    const imageSource = catalogCover || image || getBeautifulFoodImage();

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
                        const fallback = getBeautifulFoodImage();
                        if (e.target.src !== fallback) {
                            e.target.src = fallback;
                        }
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
