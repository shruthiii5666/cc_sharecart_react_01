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
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        
        // Fetch real data from your backend
        const productsRes = await fetch(`${API_URL}/products`);
        const vendorsRes = await fetch(`${API_URL}/vendors`);
        
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setProducts(productsData);
        }
        
        if (vendorsRes.ok) {
          const vendorsData = await vendorsRes.json();
          setSellers(vendorsData);
        }
        
        // Keep mock data for categories and chats until backend supports them
        setCategories(mockCategories);
        setChats(mockChats);
      } catch (error) {
        console.error("Failed to connect to backend:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const addProduct = async (product) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      
      if (response.ok) {
        const newProduct = await response.json();
        setProducts([newProduct, ...products]);
        return newProduct;
      } else {
        console.error("Failed to create product");
        throw new Error("Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  };

  const updateProduct = async (id, updates) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(products.map(p => p.id === id ? updatedProduct : p));
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setProducts(products.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const getProductById = (id) => {
    return products.find(p => String(p.id) === String(id));
  };

  const getSellerById = (id) => {
    return sellers.find(s => String(s.id) === String(id));
  };

  const getProductsBySeller = (sellerId) => {
    return products.filter(p => String(p.vendorId || p.sellerId) === String(sellerId));
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
