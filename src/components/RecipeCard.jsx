import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ id, title, image, cookingTime, price, tags = [] }) => {
    const getBeautifulFoodImage = () => {
        const t = (title || '').toLowerCase();

        const biryanis = [
            '1561651119-971c261ffbfd', '1589302110074-d24244bc0b4a', '1631515233263-d64cb245a864'
        ];

        const curries = [
            '1574484284002-953d92226f31', '1561651019-af600f27916b', '1576458088412-f7200ef656a4', '1455619452473-b54240a35959'
        ];

        const cakes = [
            '1565958011703-44f9829ba187', '1586985289688-aa924f7e5651', '1571875257327-a022efef1ad1', '1588195538121-7fd582fcd8f2',
            '1538332576-41005a769807', '1464457312034-0f135088f117'
        ];

        const pizzas = [
            '1565299624946-b28f40a0ae38', '1513104890138-7c749659a591', '1506354666786-959d6d497f1a', '1565239359-29931aa6021e',
            '1604382354936-07c5d9983bd3', '1585238342021-78c98b81442f'
        ];

        const shakes = [
            '1579954115545-a95591f28bfc', '1532713107108-7b51c228c231', '1572490122747-3968b75cc699', '1497034825429-c343d7c6a68f',
            '1529193591112-04e14fcfbe00', '1550150992-cf6786a345bf'
        ];

        const icecreams = [
            '1563805042-df1a82f0a635', '1606755962052-a521ef3661be', '1612230332353-bd042b89f899', '1495147734065-a1a1030e2060',
            '1536392119-c603b30ef2f2', '1502413133324-411a5b2a4206'
        ];

        const salads = [
            '1546069901-ba9599a7e63c', '1540189549336-e6e99c3679fe', '1512621776951-a57141f2eefd', '1579372786546-d249f39446f7',
            '1490649045759-42b78995a324'
        ];

        const burgers = [
            '1499028344343-cd173ffc68a9', '1520175480321-4cf1ea30c45b', '1550547660-5941da7e0e80', '1541014228-3e445db2c199',
            '1562967082-ce95c3ae6475', '1551218808-c812c14166a9'
        ];

        const pastas = [
            '1473093295043-cdd812d0e601', '1599487488175-312bd473c011', '1470394116241-1f9b1b5e0a05', '1550150992-cf6786a345bf',
            '1495214783140-1cf4e33ef747', '1488900128376-817ab7cf0ea3'
        ];

        const generalDessert = [
            '1551024601-bec78abc704b', '1567620832903-9fc6debc209f', '1515037893149-de7f840978e2', '1496132511-7a61d15bf031',
            '1463740832522-1d5206c59b8e', '1511690656113-187ebd47495b'
        ];

        const generalFood = [
            '1555939594-58d7cb561ad1', '1476224203421-9ac39bcb3327', '1482049016688-2d3e1b311543', '1484723088337-39961628b073',
            '1529042410759-3b39ef7e3c9a', '1504754524776-8f4f37790ca0', '1504473154494-dfcdfa04d9b0', '1532980400377-44020efc4051',
            '1561651019-af600f27916b', '1493774421-a54823ca28b0', '1498307833010-097a31b72e0a', '1413166530612-4cfdf3e226d9',
            '1506112613-cfd4e9b110a2', '1541819777-54877717462d', '1523307741-f7200ef656a4', '1543338322353-066e3125e6e3',
            '1513267290022-799f8d167191', '1534422234521-0a9b83b38dfd', '1551218808-c812c14166a9'
        ];

        let hash = id || 0;
        for (let i = 0; i < t.length; i++) {
            hash = t.charCodeAt(i) + ((hash << 5) - hash);
        }
        hash = Math.abs(hash);

        let unsplashId = '';
        if (t.includes('biryani')) {
            unsplashId = biryanis[hash % biryanis.length];
        } else if (t.includes('curry')) {
            unsplashId = curries[hash % curries.length];
        } else if (t.includes('cake')) {
            unsplashId = cakes[hash % cakes.length];
        } else if (t.includes('pizza')) {
            unsplashId = pizzas[hash % pizzas.length];
        } else if (t.includes('shake') || t.includes('smoothie')) {
            unsplashId = shakes[hash % shakes.length];
        } else if (t.includes('ice cream') || t.includes('tiramisu')) {
            unsplashId = icecreams[hash % icecreams.length];
        } else if (t.includes('salad')) {
            unsplashId = salads[hash % salads.length];
        } else if (t.includes('burger')) {
            unsplashId = burgers[hash % burgers.length];
        } else if (t.includes('pasta')) {
            unsplashId = pastas[hash % pastas.length];
        } else if (t.includes('dessert') || t.includes('sweet')) {
            unsplashId = generalDessert[hash % generalDessert.length];
        } else {
            unsplashId = generalFood[hash % generalFood.length];
        }

        return `https://images.unsplash.com/photo-${unsplashId}?auto=format&fit=crop&w=800&q=80`;
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
                        e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
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
