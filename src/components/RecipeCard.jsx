import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ id, title, image, cookingTime, price, tags = [] }) => {
    const getBeautifulFoodImage = () => {
        const masterFoodImages = [
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1484723088337-39961628b073?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1529042410759-3b39ef7e3c9a?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1563379011-7c749659a591?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1551024601-bec78abc704b?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1562967082-ce95c3ae6475?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1585238342021-78c98b81442f?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1563805042-df1a82f0a635?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1541167760496-16295578f7f3?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1586985289688-aa924f7e5651?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1561840884-cb48cf318222?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1598514983318-294252329868?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1589187151532-67a31ff1a965?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1574484284002-953d92226f31?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1514843319296-186c76646824?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1504473154494-dfcdfa04d9b0?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1532980400377-44020efc4051?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1562059390-12824866ca0b?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1571875257327-a022efef1ad1?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1520175480321-4cf1ea30c45b?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1550547660-5941da7e0e80?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1565239359-29931aa6021e?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1561651019-af600f27916b?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1576458088412-f7200ef656a4?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1599487488175-312bd473c011?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1542831371-299351e3c91a?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1561651119-971c261ffbfd?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1606755962052-a521ef3661be?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1612230332353-bd042b89f899?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1608824173572-c0e22b9c3eb0?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1588195538121-7fd582fcd8f2?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1564901231-31be2c98c1aa?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1579372786546-d249f39446f7?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1470394116241-1f9b1b5e0a05?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1496132511-7a61d15bf031?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1493774421-a54823ca28b0?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1464457312034-0f135088f117?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1455619452473-b54240a35959?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1495214783140-1cf4e33ef747?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1498307833010-097a31b72e0a?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1488900128376-817ab7cf0ea3?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1481931098705-125be14400e9?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1541014228-3e445db2c199?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1504153926511-df4dc1a0028c?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1464305792558-ef02187ed23b?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1413166530612-4cfdf3e226d9?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1463740832522-1d5206c59b8e?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1495147734065-a1a1030e2060?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1506112613-cfd4e9b110a2?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1541819777-54877717462d?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1523307741-f7200ef656a4?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1543338322353-066e3125e6e3?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1550150992-cf6786a345bf?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1529193591112-04e14fcfbe00?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1536392119-c603b30ef2f2?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1538332576-41005a769807?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1502413133324-411a5b2a4206?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1513267290022-799f8d167191?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1534422234521-0a9b83b38dfd?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1490649045759-42b78995a324?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1511690656113-187ebd47495b?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1551218808-c812c14166a9?auto=format&fit=crop&w=800&q=80'
        ];

        let hash = id || 0;
        const tStr = (title || '').toLowerCase();
        for (let i = 0; i < tStr.length; i++) {
            hash = tStr.charCodeAt(i) + ((hash << 5) - hash);
        }
        return masterFoodImages[Math.abs(hash) % masterFoodImages.length];
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

    // Always use the curated beautiful food image to avoid any broken image or steak and salad fallback
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
                        e.target.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80';
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
