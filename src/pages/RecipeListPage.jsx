import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRecipes } from '../services/api';
import RecipeCard from '../components/RecipeCard';

const RecipeListPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState('');

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const data = await getRecipes();
                setRecipes(data);
            } catch (error) {
                console.error("Failed to fetch recipes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    // Extract unique tags from the recipes for our dropdown
    // Note: handles both objects (if nested) or IDs/Strings
    const uniqueTags = Array.from(
        new Set(
            recipes.flatMap(recipe => 
                recipe.tags?.map(tag => typeof tag === 'object' ? tag.name : tag) || []
            )
        )
    ).filter(Boolean);

    // Client-side filtering logic
    const filteredRecipes = recipes.filter((recipe) => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase().trim());
        
        // Extract tag names and normalize them for comparison
        const recipeTagsList = recipe.tags?.map(tag => 
            (typeof tag === 'object' ? tag.name : String(tag)).toLowerCase().trim()
        ) || [];

        const normalizedSelectedTag = selectedTag.toLowerCase().trim();
        const matchesTag = selectedTag 
            ? (recipeTagsList.includes(normalizedSelectedTag) ||
               recipe.title.toLowerCase().includes(normalizedSelectedTag) ||
               recipe.description?.toLowerCase().includes(normalizedSelectedTag))
            : true;

        return matchesSearch && matchesTag;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

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
                <div className="flex flex-wrap justify-center gap-8 py-8 border-y border-gray-100 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                    {[
                        { name: 'All', img: '/media/categories/cat_all_icon_1777296658287.png' },
                        { name: 'Pizza', img: '/media/categories/cat_pizza_icon_1777296674548.png' },
                        { name: 'Cake', img: '/media/categories/cat_cake_icon_1777296691169.png' },
                        { name: 'Ice Cream', img: '/media/categories/cat_ice_cream_icon_1777296707644.png' },
                        { name: 'Shake', img: '/media/categories/cat_shake_icon_1777296722963.png' },
                        { name: 'Dessert', img: '/media/recipes/dessert_brownie_1777295590855.png' }
                    ].map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setSelectedTag(cat.name === 'All' ? '' : cat.name)}
                            className={`flex flex-col items-center group transition-all duration-500 ${
                                (selectedTag === cat.name || (cat.name === 'All' && !selectedTag))
                                    ? 'scale-110'
                                    : 'opacity-70 hover:opacity-100'
                            }`}
                        >
                            <div className={`w-20 h-20 rounded-full overflow-hidden mb-3 border-4 transition-all duration-500 shadow-md ${
                                (selectedTag === cat.name || (cat.name === 'All' && !selectedTag))
                                    ? 'border-emerald-500 shadow-emerald-200 ring-4 ring-emerald-50'
                                    : 'border-white group-hover:border-emerald-200'
                            }`}>
                                <img 
                                    src={cat.img} 
                                    alt={cat.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <span className={`text-sm font-black uppercase tracking-widest ${
                                (selectedTag === cat.name || (cat.name === 'All' && !selectedTag))
                                    ? 'text-emerald-700'
                                    : 'text-gray-600'
                            }`}>
                                {cat.name}
                            </span>
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

                {/* Recipe Grid */}
                {filteredRecipes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredRecipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                id={recipe.id}
                                title={recipe.title}
                                image={recipe.image}
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
