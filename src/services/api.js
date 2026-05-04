import axios from 'axios';

const API_BASE_URL = 'https://recipe-management-system-mp.onrender.com/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Helper to clean image URLs
const cleanImageUrl = (url) => {
    if (!url) return url;
    try {
        const decoded = decodeURIComponent(url);
        if (decoded.includes('http')) {
            const index = decoded.lastIndexOf('http');
            return decoded.substring(index);
        }
        if (decoded.startsWith('/media/')) {
            const base = API_BASE_URL.includes('/api') ? API_BASE_URL.split('/api')[0] : API_BASE_URL;
            return `${base}${decoded}`;
        }
    } catch (e) {}
    return url;
};

// Automatically add token to headers
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

// --- Auth Endpoints ---

export const login = async (email, password) => {
    const response = await api.post('/token/', { email, username: email, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return { token: response.data.token, user: response.data.user };
};

export const register = async (email, password, name) => {
    const response = await api.post('/users/create/', { email, password, name });
    return response.data;
};

// --- Recipe Endpoints ---

export const getRecipes = async () => {
    const response = await api.get('/recipes/');
    const data = response.data || [];
    return data.map(recipe => ({
        ...recipe,
        image: cleanImageUrl(recipe.image)
    }));
};

export const getRecipe = async (id) => {
    const response = await api.get(`/recipes/${id}/`);
    const recipe = response.data;
    if (recipe) {
        recipe.image = cleanImageUrl(recipe.image);
    }
    return recipe;
};

export const createRecipe = async (recipeData) => {
    const response = await api.post('/recipes/', recipeData);
    const recipe = response.data;
    if (recipe) {
        recipe.image = cleanImageUrl(recipe.image);
    }
    return recipe;
};

export const updateRecipe = async (id, recipeData) => {
    const response = await api.put(`/recipes/${id}/`, recipeData);
    const recipe = response.data;
    if (recipe) {
        recipe.image = cleanImageUrl(recipe.image);
    }
    return recipe;
};

export const deleteRecipe = async (id) => {
    const response = await api.delete(`/recipes/${id}/`);
    return response.data;
};

export const uploadRecipeImage = async (id, file) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post(`/recipes/${id}/upload-image/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    const recipe = response.data;
    if (recipe) {
        recipe.image = cleanImageUrl(recipe.image);
    }
    return recipe;
};

export default api;
