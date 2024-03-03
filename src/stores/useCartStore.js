import { create } from 'zustand';

const useCartStore = create((set) => ({
    items: [],
    addToCart: (product, quantity) => set((state) => {
        // Extrait le priceId du premier objet de prix dans le tableau prices du produit
        const priceId = product.prices[0].id;

        const existingItem = state.items.find((item) => item.product.id === product.id);
        if (existingItem) {
            // Si le produit existe déjà, augmente la quantité
            return {
                items: state.items.map((item) =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                ),
            };
        } else {
            // Ajoute un nouveau produit dans le panier, incluant explicitement le priceId
            return {
                items: [...state.items, { product: { ...product, priceId }, quantity }]
            };
        }
    }),
    updateQuantity: (productId, newQuantity) => set((state) => {
        // Trouve le produit dans le panier et met à jour sa quantité
        const updatedItems = state.items.map((item) => {
            if (item.product.id === productId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        return { items: updatedItems };
    }),
    removeFromCart: (productId) => set((state) => ({
        items: state.items.filter((item) => item.product.id !== productId),
    })),
    clearCart: () => set(() => ({ items: [] })),
}));


export default useCartStore;
