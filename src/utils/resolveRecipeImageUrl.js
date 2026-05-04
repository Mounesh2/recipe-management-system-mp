import { getRecipeCoverUrlWithAliases } from '../data/recipeCoverImages';

/**
 * Strip invisible chars / odd whitespace so API titles still match the catalog map.
 */
export function normalizeRecipeTitle(title) {
    if (!title || typeof title !== 'string') return '';
    return title
        .replace(/[\u200B-\u200D\uFEFF]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function hashFoodImage(title, id) {
    const t = (title || '').toLowerCase();
    const universalFood = [
        '1546069901-ba9599a7e63c', '1540189549336-e6e99c3679fe', '1565299624946-b28f40a0ae38', '1567620905732-2d1ec7ab7445',
        '1512621776951-a57141f2eefd', '1513104890138-7c749659a591', '1555939594-58d7cb561ad1', '1499028344343-cd173ffc68a9',
        '1476224203421-9ac39bcb3327', '1482049016688-2d3e1b311543', '1473093295043-cdd812d0e601', '1544025162-d76694265947',
        '1579954115545-a95591f28bfc', '1567620832903-9fc6debc209f', '1506354666786-959d6d497f1a', '1504754524776-8f4f37790ca0',
        '1551024506-0bccd828d307', '1604382354936-07c5d9983bd3', '1515037893149-de7f840978e2', '1565958011703-44f9829ba187',
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
}

/**
 * Pick the image URL shown for a recipe card or hero.
 * - Catalog titles always use bundled Unsplash map (works even when API still returns broken /media/ links).
 * - Never prefer Django /media/ on remote hosts (Render) for display when we have a hash fallback.
 */
export function resolveRecipeImageUrl(title, recipeId, apiImage) {
    const cleanTitle = normalizeRecipeTitle(title);
    const catalog = getRecipeCoverUrlWithAliases(cleanTitle) || getRecipeCoverUrlWithAliases(title);
    if (catalog) {
        return catalog;
    }

    const raw = String(apiImage || '').trim();
    if (!raw) {
        return hashFoodImage(cleanTitle, recipeId);
    }
    if (raw.startsWith('data:image/')) {
        return raw;
    }
    if (raw.includes('images.unsplash.com')) {
        return raw;
    }
    if (raw.startsWith('http://') || raw.startsWith('https://')) {
        return raw;
    }
    return hashFoodImage(cleanTitle, recipeId);
}
