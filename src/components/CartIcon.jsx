import React from 'react';
import useCartStore from '../stores/useCartStore';

// Ajoutez onClick dans les props de CartIcon
const CartIcon = ({ onClick }) => {
    const { items } = useCartStore();
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        // Appliquez onClick au div pour rendre l'ensemble cliquable
        <div onClick={onClick} className="flex items-center relative cursor-pointer">
            <p className="mr-2">Panier</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {/* Badge pour le nombre d'articles */}
            {itemCount > 0 && (
                <span className="absolute -top-1 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {itemCount}
                </span>
            )}
        </div>
    );
};

export default CartIcon;
