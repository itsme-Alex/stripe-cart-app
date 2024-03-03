/* import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchProducts } from '../api/productApi';
import Modal from '../ui/Modal';
import useCartStore from '../stores/useCartStore';

const ProductsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();

  const { data, error, isLoading } = useQuery('products', fetchProducts);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(Number(e.target.value), 1));
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setIsModalOpen(false);
    setQuantity(1);
  };

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Une erreur est survenue: {error.message}</div>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data?.map((product) => (
            <div key={product.id} className="flex flex-col bg-gray-200 rounded-lg shadow-lg overflow-hidden cursor-pointer" onClick={() => handleProductClick(product)}>
              <div className="flex-shrink-0">
                <img src={product.images[0]} alt={product.name} className="h-48 w-full object-cover" />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <a href="#" className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">{product.name}</p>
                    <p className="mt-3 text-base text-gray-500">{product.description}</p>
                  </a>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.prices[0].unit_amount / 100} {product.prices[0].currency.toUpperCase()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedProduct?.name}>
        {selectedProduct && (
          <>
            <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="w-full my-3" />
            <p className="text-gray-600">{selectedProduct?.description}</p>
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
              Prix: {(selectedProduct.prices[0].unit_amount / 100 * quantity).toFixed(2)} {selectedProduct.prices[0].currency.toUpperCase()}
            </p>
            <button onClick={handleAddToCart} className="w-full py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
              Ajouter au panier
            </button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ProductsList;
 */


import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchProducts } from '../api/productApi';
import Modal from '../ui/Modal';
import ProductDetail from './ProductDetail';
import ProductCard from './ProductCard';

const ProductsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data, error, isLoading } = useQuery('products', fetchProducts);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Une erreur est survenue: {error.message}</div>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data?.map((product) => (
            <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product)} />
          ))}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedProduct?.name}>
        {selectedProduct && <ProductDetail product={selectedProduct} onClose={() => setIsModalOpen(false)} />}
      </Modal>
    </div>
  );
};

export default ProductsList;
