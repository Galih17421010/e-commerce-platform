const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
    { name: 'Wireless Headphones', price: 29900, category: 'Electronics', image: '🎧', stock: 15 },
    { name: 'Smart Watch', price: 149000, category: 'Electronics', image: '⌚', description: 'Fitnes tracking smartwatch', stock: 8 },
    { name: 'Laptop Backpack', price: 450000, category: 'Accessories', image: '🎒', description: ' Durable laptop backpack', stock: 20 },
    { name: 'USB-C Hub', price: 350000, category: 'Electronics', image: '🔌', description: '7-in-1 USB-C hub', stock: 12 },
    { name: 'Mechanical Keyboard', price: 850000, category: 'Electronics', image: '⌨️', description: 'RGB mechanical keyboard', stock: 10 },
    { name: 'Wireless Mouse', price: 250000, category: 'Electronics', image: '🖱️', description: 'Ergonomic wireless mouse', stock: 25 },
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce')
    .then(async () => {
        console.log('Connected to MongoDB');
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log('Database seeded successfully');
        process.exit(0);
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });