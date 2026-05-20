import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRecipes, getCachedRecipes } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import { resolveRecipeImageUrl } from '../utils/resolveRecipeImageUrl';

const RecipeListPage = () => {
    const [recipes, setRecipes] = useState(() => getCachedRecipes() || []);
    const [loading, setLoading] = useState(() => !getCachedRecipes());
    const [loadError, setLoadError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState('');

    useEffect(() => {
        let cancelled = false;

        const fetchRecipes = async () => {
            try {
                setLoadError(null);
                const data = await getRecipes();
                if (!cancelled) setRecipes(data);
            } catch (error) {
                console.error("Failed to fetch recipes:", error);
                if (!cancelled && !(getCachedRecipes()?.length)) {
                    setLoadError('Server is waking up. Please wait a moment and try again.');
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchRecipes();
        return () => {
            cancelled = true;
        };
    }, []);

    // Extract unique tags from the recipes for our dropdown
    // Note: handles both objects (if nested) or IDs/Strings
    const uniqueTags = Array.from(
        new Set(
            recipes.flatMap(recipe => {
                if (!recipe || !recipe.tags) return [];
                if (!Array.isArray(recipe.tags)) return [recipe.tags];
                return recipe.tags.map(tag => typeof tag === 'object' ? tag?.name : tag);
            })
        )
    ).filter(Boolean);

    // Client-side filtering logic
    const filteredRecipes = recipes.filter((recipe) => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase().trim());
        
        if (!selectedTag) return matchesSearch;

        const title = (recipe.title || '').toLowerCase();
        const desc = (recipe.description || '').toLowerCase();
        const lowerTag = selectedTag.toLowerCase().trim();

        // Lenient matching for quick filters
        if (lowerTag === 'veg biryani') {
            return matchesSearch && (title.includes('biryani') && (title.includes('veg') || title.includes('paneer') || title.includes('mushroom') || (!title.includes('chicken') && !title.includes('mutton') && !title.includes('egg') && !title.includes('fish'))));
        }
        if (lowerTag === 'non-veg biryani') {
            return matchesSearch && (title.includes('biryani') && (title.includes('chicken') || title.includes('mutton') || title.includes('egg') || title.includes('fish') || title.includes('prawn')));
        }
        if (lowerTag === 'veg curry') {
            return matchesSearch && ((title.includes('masala') || title.includes('curry') || title.includes('paneer') || title.includes('dal') || title.includes('aloo') || title.includes('bhindi') || title.includes('baingan') || title.includes('malai kofta') || title.includes('korma')) && !title.includes('chicken') && !title.includes('mutton'));
        }
        if (lowerTag === 'non-veg curry') {
            return matchesSearch && ((title.includes('masala') || title.includes('curry')) && (title.includes('chicken') || title.includes('mutton') || title.includes('fish') || title.includes('egg')));
        }
        if (lowerTag === 'italian & pizzas') {
            const tagNames = (recipe.tags || []).map((tag) => (typeof tag === 'object' ? tag.name : tag)).filter(Boolean);
            return matchesSearch && (
                tagNames.some((n) => (n || '').toLowerCase() === 'italian & pizzas') ||
                title.includes('pizza') ||
                title.includes('pasta')
            );
        }

        const matchesTag = title.includes(lowerTag) || desc.includes(lowerTag);
        return matchesSearch && matchesTag;
    });

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Explore Recipes
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Discover and manage your favorite culinary creations.
                        </p>
                    </div>
                    
                    <Link
                        to="/recipes/create"
                        className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                    >
                        + Create Recipe
                    </Link>
                </div>

                {/* Category Quick Filters */}
                <div className="flex overflow-x-auto gap-4 py-4 border-y border-gray-100 bg-white/50 backdrop-blur-sm sticky top-0 z-10 no-scrollbar scroll-smooth px-4 shadow-sm items-center">
                    {[
                        'All',
                        'Veg Biryani',
                        'Non-Veg Biryani',
                        'Veg Curry',
                        'Non-Veg Curry',
                        'Italian & Pizzas',
                        'Cake',
                        'Ice Cream',
                        'Shake',
                        'Dessert'
                    ].map((catName) => (
                        <button
                            key={catName}
                            onClick={() => setSelectedTag(catName === 'All' ? '' : catName)}
                            className={`flex-none px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 ${
                                (selectedTag === catName || (catName === 'All' && !selectedTag))
                                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 transform scale-105'
                                    : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200 hover:border-emerald-200'
                            }`}
                        >
                            {catName}
                        </button>
                    ))}
                </div>

                {/* Search & Secondary Filter */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label htmlFor="search" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="search"
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
                                placeholder="Search by recipe title..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="sm:w-64">
                        <select
                            className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg transition-colors bg-white cursor-pointer"
                            value={selectedTag}
                            onChange={(e) => setSelectedTag(e.target.value)}
                        >
                            <option value="">Filter by Tag...</option>
                            {uniqueTags.map((tag, idx) => (
                                <option value={tag} key={idx}>
                                    {typeof tag === 'number' ? `Tag ID: ${tag}` : tag}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {loadError && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 flex flex-wrap items-center justify-between gap-3">
                        <span>{loadError}</span>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="font-semibold text-emerald-700 hover:text-emerald-800"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
                                <div className="h-48 bg-gray-200" />
                                <div className="p-5 space-y-3">
                                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredRecipes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredRecipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                id={recipe.id}
                                title={recipe.title}
                                image={resolveRecipeImageUrl(
                                    recipe.title,
                                    recipe.id,
                                    recipe.image
                                )}
                                cookingTime={recipe.cooking_time}
                                price={recipe.price}
                                tags={recipe.tags}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No recipes found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            We couldn't find anything matching your current filters.
                        </p>
                        <div className="mt-6">
                            <button
                                onClick={() => { setSearchTerm(''); setSelectedTag(''); }}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeListPage;
