# e-commerce-platform

# Backend Structure

backend/
├── server.js
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Order.js
├── routes/
│   ├── auth.js
│   ├── products.js
│   ├── cart.js
│   └── orders.js
└── middleware/
    └── auth.js

# Frontend Structure

frontend/
│   vite.config.js
│   package.json
│   index.html
│
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   │
│   ├── data/
│   │   └── products.ts
│   │
│   ├── context/
│   │   └── ShopContext.tsx
│   │
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductFilter.tsx
│   │   ├── CartItem.tsx
│   │   ├── OrderCard.tsx
│   │   └── MobileMenu.tsx
│   │
│   ├── pages/
│   │   ├── ProductsPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   └── OrdersPage.tsx
│   │
│   └── styles/
│       └── index.css
│
└── tsconfig.json
