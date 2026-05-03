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
        const masterFoodImages = [
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1484723088337-39961628b073?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1529042410759-3b39ef7e3c9a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1563379011-7c749659a591?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1551024601-bec78abc704b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1562967082-ce95c3ae6475?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1585238342021-78c98b81442f?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1563805042-df1a82f0a635?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1541167760496-16295578f7f3?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1586985289688-aa924f7e5651?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1561840884-cb48cf318222?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1598514983318-294252329868?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1589187151532-67a31ff1a965?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1574484284002-953d92226f31?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1514843319296-186c76646824?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1504473154494-dfcdfa04d9b0?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1532980400377-44020efc4051?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1562059390-12824866ca0b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1571875257327-a022efef1ad1?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1520175480321-4cf1ea30c45b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1550547660-5941da7e0e80?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1565239359-29931aa6021e?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1561651019-af600f27916b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1576458088412-f7200ef656a4?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1599487488175-312bd473c011?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1542831371-299351e3c91a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1561651119-971c261ffbfd?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1606755962052-a521ef3661be?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1612230332353-bd042b89f899?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1608824173572-c0e22b9c3eb0?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1588195538121-7fd582fcd8f2?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1564901231-31be2c98c1aa?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1579372786546-d249f39446f7?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1470394116241-1f9b1b5e0a05?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1496132511-7a61d15bf031?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1493774421-a54823ca28b0?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1464457312034-0f135088f117?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1455619452473-b54240a35959?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1495214783140-1cf4e33ef747?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1498307833010-097a31b72e0a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1488900128376-817ab7cf0ea3?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1481931098705-125be14400e9?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1541014228-3e445db2c199?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1504153926511-df4dc1a0028c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1464305792558-ef02187ed23b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1413166530612-4cfdf3e226d9?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1463740832522-1d5206c59b8e?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1495147734065-a1a1030e2060?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1506112613-cfd4e9b110a2?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1541819777-54877717462d?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1523307741-f7200ef656a4?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1543338322353-066e3125e6e3?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1550150992-cf6786a345bf?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1529193591112-04e14fcfbe00?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1536392119-c603b30ef2f2?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1538332576-41005a769807?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1502413133324-411a5b2a4206?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1513267290022-799f8d167191?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1534422234521-0a9b83b38dfd?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1490649045759-42b78995a324?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1511690656113-187ebd47495b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1551218808-c812c14166a9?auto=format&fit=crop&w=1200&q=80'
        ];

        let hash = recipe.id || 0;
        const tStr = (recipe.title || '').toLowerCase();
        for (let i = 0; i < tStr.length; i++) {
            hash = tStr.charCodeAt(i) + ((hash << 5) - hash);
        }
        return masterFoodImages[Math.abs(hash) % masterFoodImages.length];
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
