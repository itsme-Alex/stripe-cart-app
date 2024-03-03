import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import ProductsList from './components/ProductsList';
import CartIcon from './components/CartIcon';
import Modal from './ui/Modal';
import CartContent from './components/CartContent';

const queryClient = new QueryClient();

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div>
      <header className="w-full flex justify-center items-center p-4 bg-gray-100">
        <div className="flex justify-between items-center max-w-xl w-full">
          <h1>Hello</h1>
          <CartIcon onClick={() => setIsCartOpen(true)} />
        </div>
      </header>
      <Modal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} title="Mon Panier">
        <CartContent />
      </Modal>
      <main>
        <QueryClientProvider client={queryClient}>
          <ProductsList />
        </QueryClientProvider>
      </main>
    </div>
  );
}

export default App;
