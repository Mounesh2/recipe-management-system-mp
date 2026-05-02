import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createRecipe, updateRecipe, getRecipe } from '../services/api';
import ImageUpload from '../components/ImageUpload';

const CreateRecipePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [loading, setLoading] = useState(isEditing);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        instructions: '',
        cooking_time: '',
        price: '',
        tags: [],
        ingredients: [{ name: '', quantity: '' }],
        image: '',
        youtube_url: ''
    });

    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (isEditing) {
            const fetchRecipe = async () => {
                try {
                    const data = await getRecipe(id);
                    setFormData({
                        title: data.title || '',
                        description: data.description || '',
                        instructions: data.instructions || '',
                        cooking_time: data.cooking_time || '',
                        price: data.price || '',
                        // Handle tags assuming they are either IDs or objects with ID
                        tags: data.tags?.map(t => typeof t === 'object' ? t.id.toString() : t.toString()) || [],
                        ingredients: data.ingredients?.length > 0 
                            ? data.ingredients.map(i => ({ name: i.name || '', quantity: i.quantity || '' }))
                            : [{ name: '', quantity: '' }],
                        youtube_url: data.youtube_url || ''
                    });
                    if (data.image) setImagePreview(data.image);
                } catch (error) {
                    console.error("Failed to load recipe for editing", error);
                    setError("Failed to load recipe details.");
                } finally {
                    setLoading(false);
                }
            };
            fetchRecipe();
        }
    }, [id, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTagsChange = (e) => {
        // Multi-select converts HTMLCollection to array of values
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setFormData(prev => ({ ...prev, tags: selectedOptions }));
    };

    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...formData.ingredients];
        newIngredients[index][field] = value;
        setFormData(prev => ({ ...prev, ingredients: newIngredients }));
    };

    const addIngredientRow = () => {
        setFormData(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, { name: '', quantity: '' }]
        }));
    };

    const removeIngredientRow = (index) => {
        const newIngredients = formData.ingredients.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, ingredients: newIngredients }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            // Clean up payload
            const payload = {
                ...formData,
                cooking_time: parseInt(formData.cooking_time, 10),
                price: parseFloat(formData.price),
                tags: formData.tags.map(t => parseInt(t, 10)) // Ensure tags are integers if backend expects IDs
            };

            let response;
            if (isEditing) {
                response = await updateRecipe(id, payload);
            } else {
                response = await createRecipe(payload);
            }

            // Note: If you need to POST ingredients separately to an Ingredients API, 
            // you would loop through formData.ingredients here and POST to `/ingredients/` with recipe_id = response.id

            navigate(`/recipes/${response.id}`);
        } catch (error) {
            console.error("Save failed:", error);
            setError(error.response?.data?.detail || "An error occurred while saving the recipe.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        {isEditing ? 'Edit Recipe' : 'Create New Recipe'}
                    </h1>
                    <button onClick={() => navigate(-1)} className="text-sm font-medium text-gray-500 hover:text-gray-700">
                        Cancel
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        
                        {/* Basic Info */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Basic Information</h3>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                    placeholder="e.g., Spicy Chicken Curry"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                    placeholder="Tell us about this recipe..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Video URL (Optional)</label>
                                <input
                                    type="url"
                                    name="youtube_url"
                                    value={formData.youtube_url || ''}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                    placeholder="e.g., https://www.youtube.com/watch?v=... or https://youtu.be/..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Preparation Instructions</label>
                                <textarea
                                    name="instructions"
                                    rows="6"
                                    value={formData.instructions}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                    placeholder="Step-by-step instructions..."
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cooking Time (minutes)</label>
                                    <input
                                        type="number"
                                        name="cooking_time"
                                        required
                                        min="1"
                                        value={formData.cooking_time}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        required
                                        step="0.01"
                                        min="0"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (Hold Ctrl/Cmd to multi-select)</label>
                                <select
                                    multiple
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleTagsChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm h-32"
                                >
                                    {/* These are dummy IDs for the demonstration. Ideally fetched from API */}
                                    <option value="1">Vegetarian</option>
                                    <option value="2">Non-Vegetarian</option>
                                    <option value="3">Spicy</option>
                                    <option value="4">Mild</option>
                                    <option value="5">Dessert</option>
                                </select>
                            </div>
                        </div>

                        {/* Ingredients */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                <h3 className="text-lg font-medium text-gray-900">Ingredients</h3>
                                <button type="button" onClick={addIngredientRow} className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
                                    + Add Ingredient
                                </button>
                            </div>
                            
                            <div className="space-y-3">
                                {formData.ingredients.map((ingredient, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <input
                                            type="text"
                                            placeholder="Ingredient Name (e.g., Paneer)"
                                            required
                                            value={ingredient.name}
                                            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Quantity (e.g., 200g)"
                                            required
                                            value={ingredient.quantity}
                                            onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                                            className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeIngredientRow(index)}
                                            className={`p-2 text-gray-400 hover:text-red-600 transition-colors ${formData.ingredients.length === 1 ? 'invisible' : ''}`}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-8 py-3 border border-transparent shadow-sm text-sm font-bold rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-colors"
                                >
                                    {submitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Recipe')}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="mt-8">
                    <ImageUpload 
                        recipeId={id} 
                        currentImage={imagePreview} 
                        onUploadSuccess={(newImageUrl) => {
                            setImagePreview(newImageUrl);
                            setFormData(prev => ({ ...prev, image: newImageUrl }));
                        }} 
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateRecipePage;
