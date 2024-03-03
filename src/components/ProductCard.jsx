import React from 'react';

const ProductCard = ({ product, onClick }) => {
    return (
        <div className="flex flex-col bg-gray-200 rounded-lg shadow-lg overflow-hidden cursor-pointer" onClick={() => onClick(product)}>
            <div className="flex-shrink-0">
                <img src={product.images[0]} alt={product.name} className="h-48 w-full object-cover" />
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                    <p className="text-xl font-semibold text-gray-900">{product.name}</p>
                    <p className="mt-3 text-base text-gray-500">{product.description}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                    {product.prices[0].unit_amount / 100} {product.prices[0].currency.toUpperCase()}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
