import React, { useState } from 'react';
import useCartStore from '../stores/useCartStore';
import { initiateCheckout } from '../api/productApi';

const CartContent = () => {
    const { items, removeFromCart, clearCart, updateQuantity } = useCartStore();
    const [tempQuantities, setTempQuantities] = useState({});

    const handleCheckout = async () => {
        const cartItems = items.map(item => ({
            price: item.product.priceId,
            quantity: item.quantity
        }));

        initiateCheckout(cartItems);
    };

    const handleQuantityChange = (productId, newQuantity) => {
        setTempQuantities({ ...tempQuantities, [productId]: newQuantity });
    };

    const handleUpdateQuantityClick = (productId) => {
        const newQuantity = parseInt(tempQuantities[productId], 10);
        if (!isNaN(newQuantity) && newQuantity > 0) {
            updateQuantity(productId, newQuantity);
        }
    };

    const subtotal = items.reduce((total, item) => total + ((item.product.prices[0].unit_amount / 100) * item.quantity), 0);

    return (
        <div>
            {items.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (
                <div>
                    {items.map(({ product, quantity }) => (
                        <div key={product.id} className="flex items-center justify-between py-2 border-b">
                            <img src={product.images[0]} alt={product.name} className="w-20 h-20 object-cover mr-4" />
                            <div className="flex-grow">
                                <p className="font-bold">{product.name}</p>
                                <div className="flex items-center justify-normal mt-2">
                                    <input
                                        type="number"
                                        value={tempQuantities[product.id] ?? quantity}
                                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                        className="w-12 p-1 border rounded text-center"
                                        min="1"
                                    />
                                    <p>{((product.prices[0].unit_amount / 100) * quantity).toFixed(2)} €</p>
                                </div>
                                <p
                                    onClick={() => handleUpdateQuantityClick(product.id)}
                                    className="text-blue-500 hover:underline cursor-pointer text-sm mt-1"
                                >
                                    Mettre à jour
                                </p>
                            </div>
                            <button onClick={() => removeFromCart(product.id)} className="text-red-500">Supprimer</button>
                        </div>
                    ))}
                    <div className="flex justify-end py-2">
                        <p className="font-bold">Sous-total : {subtotal.toFixed(2)} €</p>
                    </div>
                    <div className="flex justify-end py-2 space-x-2">
                        <button onClick={clearCart} className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors">
                            Vider le panier
                        </button>
                        <button onClick={handleCheckout} className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
                            Valider le panier
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default CartContent;
