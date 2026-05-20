import axios from 'axios';

const PRODUCTION_API_URL =
    'https://recipe-management-system-mp.onrender.com/api';
const LOCAL_API_URL = 'http://127.0.0.1:8000/api';

const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD ? PRODUCTION_API_URL : LOCAL_API_URL);

const RECIPES_CACHE_KEY = 'recipe_app_recipes_v1';
const CACHE_TTL_MS = 5 * 60 * 1000;
const API_TIMEOUT_MS = 20000;

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT_MS,
    headers: {
        'Content-Type': 'application/json',
    },
});

export function getCachedRecipes() {
    try {
        const raw = sessionStorage.getItem(RECIPES_CACHE_KEY);
        if (!raw) return null;
        const { data, at } = JSON.parse(raw);
        if (!Array.isArray(data) || Date.now() - at > CACHE_TTL_MS) return null;
        return data;
    } catch {
        return null;
    }
}

function setCachedRecipes(data) {
    try {
        sessionStorage.setItem(
            RECIPES_CACHE_KEY,
            JSON.stringify({ data, at: Date.now() })
        );
    } catch {
        /* ignore quota errors */
    }
}

/** Wake Render free tier while the app shell loads. */
export function warmupApi() {
    if (import.meta.env.DEV) return;
    api.get('/recipes/', { timeout: 8000 }).catch(() => {});
}

// Helper to clean image URLs
const cleanImageUrl = (url) => {
    if (!url) return url;
    if (url.startsWith('data:image')) return url;
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

const mapRecipes = (data) =>
    (data || []).map((recipe) => ({
        ...recipe,
        image: cleanImageUrl(recipe.image),
    }));

export const getRecipes = async () => {
    let lastError;
    for (let attempt = 0; attempt < 2; attempt++) {
        try {
            const response = await api.get('/recipes/');
            const mapped = mapRecipes(response.data);
            setCachedRecipes(mapped);
            return mapped;
        } catch (error) {
            lastError = error;
            if (attempt === 0) {
                await new Promise((r) => setTimeout(r, 1200));
            }
        }
    }
    throw lastError;
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
