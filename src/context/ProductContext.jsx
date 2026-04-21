import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockProducts, mockSellers, mockCategories, mockChats } from '../utils/mockData';

const ProductContext = createContext(null);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setSellers(mockSellers);
      setCategories(mockCategories);
      setChats(mockChats);
      setIsLoading(false);
    }, 500);
  }, []);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setProducts([newProduct, ...products]);
    return newProduct;
  };

  const updateProduct = (id, updates) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const getProductById = (id) => {
    return products.find(p => p.id === id);
  };

  const getSellerById = (id) => {
    return sellers.find(s => s.id === id);
  };

  const getProductsBySeller = (sellerId) => {
    return products.filter(p => p.sellerId === sellerId);
  };

  const getProductsByCategory = (category) => {
    if (category === 'All') return products;
    return products.filter(p => p.category === category);
  };

  const searchProducts = (query) => {
    const lowerQuery = query.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.sellerName.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    );
  };

  const sendMessage = (chatId, message) => {
    setChats(chats.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: [...chat.messages, { ...message, timestamp: new Date().toISOString() }],
          lastMessage: message.text,
          lastMessageTime: new Date().toISOString(),
        };
      }
      return chat;
    }));
  };

  const value = {
    products,
    sellers,
    categories,
    chats,
    selectedProduct,
    isLoading,
    setSelectedProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getSellerById,
    getProductsBySeller,
    getProductsByCategory,
    searchProducts,
    sendMessage,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export { ProductProvider };
export default ProductContext;
