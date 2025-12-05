import { useEffect, useState } from "react";
import { orderAPI, productAPI } from "./services/api";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [seachTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentView, setCurrentView] = useState('products');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('cart');
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });
  const [orders, setOrders] = useState([]);

  // load products from API 
  useEffect(() => {
    loadProducts(); 
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
      alert('Failed to load products. Using offline mode.');
    } finally {
      setLoading(false);
    }
  };

  // handle payment 
  const handlePayment = async () => {
    try {
      const orderData = {
        items: cart.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        shipping: shippingInfo,
        total: totalWithShipping,
        status: 'pending'
      };

      const response = await orderAPI.create(orderData);
      setOrders([response.data, ...orders]);
      setCart([]);
      setCheckoutStep('success');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    }
  }
};