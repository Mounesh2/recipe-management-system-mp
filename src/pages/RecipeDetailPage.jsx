import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getRecipe, deleteRecipe } from '../services/api';
import { useAuth } from '../context/AuthContext';

const RecipeDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const data = await getRecipe(id);
                setRecipe(data);
            } catch (error) {
                console.error("Failed to load recipe:", error);
                // Optionally redirect to 404 or show an error
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this recipe?")) return;
        
        setIsDeleting(true);
        try {
            await deleteRecipe(id);
            navigate('/');
        } catch (error) {
            console.error("Failed to delete:", error);
            setIsDeleting(false);
            alert("Failed to delete recipe.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-800">Recipe not found</h2>
                <button onClick={() => navigate('/')} className="mt-4 text-emerald-600 hover:underline">
                    Go back to home
                </button>
            </div>
        );
    }

    const getBeautifulFoodImage = () => {
        const t = (recipe.title || '').toLowerCase();
        const tagNames = (recipe.tags || []).map(tag => (typeof tag === 'object' ? tag.name : String(tag)).toLowerCase());

        const biryaniImages = [
            'https://images.unsplash.com/photo-1563379011-7c749659a591?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1631515233263-d64cb245a864?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1589302110074-d24244bc0b4a?auto=format&fit=crop&w=1200&q=80'
        ];
        const curryImages = [
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1589302110074-d24244bc0b4a?auto=format&fit=crop&w=1200&q=80'
        ];
        const pizzaImages = [
            'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80'
        ];
        const cakeImages = [
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1535141192574-5d4897c82536?auto=format&fit=crop&w=1200&q=80'
        ];
        const iceCreamImages = [
            'https://images.unsplash.com/photo-1501443762994-82bd5dabb892?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=1200&q=80'
        ];
        const shakeImages = [
            'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1532713107108-7b51c228c231?auto=format&fit=crop&w=1200&q=80'
        ];

        const pick = (arr) => arr[recipe.id % arr.length];

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

        return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80';
    };

    let imageSource = recipe.image || 'https://via.placeholder.com/1200x600?text=No+Image+Available';
    try {
        imageSource = decodeURIComponent(imageSource);
    } catch (e) {}

    if (imageSource && typeof imageSource === 'string') {
        if (imageSource.includes('recipes/') && imageSource.includes('.jpg')) {
            const match = imageSource.match(/recipes\/([^/.]+)\.jpg/);
            if (match && match[1]) {
                const unsplashId = match[1].split('_')[0];
                imageSource = `https://images.unsplash.com/photo-${unsplashId}?auto=format&fit=crop&w=1200&q=80`;
            }
        }
    }

    if (imageSource && imageSource.includes('http')) {
        const lastIndex = imageSource.lastIndexOf('http');
        imageSource = imageSource.substring(lastIndex);
    }

    // Use our curated direct image to ensure flawless display
    imageSource = getBeautifulFoodImage();

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* Navigation Bar */}
                <div className="flex items-center justify-between">
                    <button 
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                    </button>
                    
                    {/* Action Buttons (Visible globally since model lacks owner, but bound by auth) */}
                    {isAuthenticated && (
                       <div className="flex space-x-3">
                           <Link
                               to={`/recipes/edit/${recipe.id}`}
                               className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                           >
                               Edit
                           </Link>
                           <button
                               onClick={handleDelete}
                               disabled={isDeleting}
                               className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                           >
                               {isDeleting ? 'Deleting...' : 'Delete'}
                           </button>
                       </div>
                    )}
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Hero Image */}
                    <div className="w-full h-80 sm:h-96 relative">
                        <img 
                            src={imageSource} 
                            alt={recipe.title} 
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80';
                            }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                    
                    <div className="p-8 sm:p-10">
                        {/* Tags */}
                        {recipe.tags && recipe.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {recipe.tags.map((tag, idx) => (
                                    <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold leading-4 bg-emerald-100 text-emerald-800">
                                        {typeof tag === 'object' ? tag.name : `Tag #${tag}`}
                                    </span>
                                ))}
                            </div>
                        )}
                        
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                            {recipe.title}
                        </h1>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-600 font-medium mb-8 pb-8 border-b border-gray-200">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {recipe.cooking_time} minutes
                            </div>
                            <div className="flex items-center text-emerald-600">
                                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {recipe.price}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Ingredients Sidebar */}
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                    Ingredients
                                </h3>
                                
                                {recipe.ingredients && recipe.ingredients.length > 0 ? (
                                    <ul className="space-y-3">
                                        {recipe.ingredients.map((ing, idx) => (
                                            <li key={idx} className="flex justify-between items-start text-sm">
                                                <span className="font-semibold text-gray-700">{ing.name}</span>
                                                <span className="text-gray-500 text-right ml-4">{ing.quantity}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500">No ingredients listed.</p>
                                )}
                            </div>
                            
                            {/* Instructions/Description block */}
                            <div className="md:col-span-2 space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">About this recipe</h3>
                                    <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                                        {recipe.description}
                                    </p>
                                </div>
                                
                                {recipe.instructions && (
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Preparation Instructions</h3>
                                        <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                                            <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                                                {recipe.instructions}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {recipe.youtube_url && (
                                    <div className="mt-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Video Tutorial</h3>
                                        <div className="aspect-video w-full rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                                            {(() => {
                                                const url = recipe.youtube_url;
                                                const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
                                                const videoId = match ? match[1] : null;

                                                if (videoId) {
                                                    return (
                                                        <iframe
                                                            className="w-full h-full"
                                                            src={`https://www.youtube.com/embed/${videoId}`}
                                                            title="YouTube video player"
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        ></iframe>
                                                    );
                                                } else {
                                                    return (
                                                        <div className="w-full h-full flex items-center justify-center p-4">
                                                            <a href={url} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline font-medium text-center">
                                                                Watch Video on YouTube
                                                            </a>
                                                        </div>
                                                    );
                                                }
                                            })()}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetailPage;
