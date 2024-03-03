import React, { useState } from 'react';
import useCartStore from '../stores/useCartStore';
import Slideshow from '../ui/Slideshow'

const ProductDetail = ({ product, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCartStore();

    const imageUrls = Object.keys(product.metadata)
        .filter(key => key.startsWith('image_'))
        .map(key => product.metadata[key]);

    const handleQuantityChange = (e) => {
        setQuantity(Math.max(Number(e.target.value), 1));
    };

    const handleAddToCartClick = () => {
        addToCart(product, quantity);
        onClose();
    };

    return (
        <>
            {imageUrls.length > 0 ? (
                <Slideshow images={imageUrls} />
            ) : (
                <img src={product.images[0]} alt={product.name} className="w-full my-3 h-96" />
            )}
            <p className="text-gray-600">{product.description}</p>
            <div className="flex items-center my-2">
                <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="form-input mt-1 block w-12"
                    min="1"
                />
            </div>
            <p className="text-gray-900">
                Prix: {(product.prices[0].unit_amount / 100 * quantity).toFixed(2)} {product.prices[0].currency.toUpperCase()}
            </p>
            <button onClick={handleAddToCartClick} className="w-full py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                Ajouter au panier
            </button>
        </>
    );
};

export default ProductDetail;
