# Motorcycle Parts and Services Shop Management System

A full-stack web application for managing a motorcycle parts and services shop with customer and admin modules.

## Tech Stack

- **Frontend**: React.js (Vite)
- **Authentication**: Clerk
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **Styling**: Tailwind CSS

## Project Structure

```
Motorcycle/
├── frontend/          # React + Vite application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   │   ├── customer/  # Customer module pages
│   │   │   └── admin/      # Admin module pages
│   │   └── utils/          # Utility functions
│   └── package.json
├── backend/           # Node.js + Express API
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   └── server.js     # Server entry point
└── README.md
```

## Features

### Customer Module
- ✅ User Signup and Login using Clerk Authentication
- ✅ Browse motorcycle parts
- ✅ View product details
- ✅ Add products to cart
- ✅ Book motorcycle repair or maintenance service
- ✅ Place orders
- ✅ Online payment UI (mock payment)
- ✅ Track order and service status

### Admin Module
- ✅ Secure admin login
- ✅ Admin dashboard with statistics
- ✅ Add, update, delete motorcycle parts
- ✅ Add service packages
- ✅ View customer orders
- ✅ Update service status
- ✅ Manage inventory
- ✅ View customer list

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- Clerk account for authentication

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=your_jwt_secret_here
```

4. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

### Clerk Setup

1. Create an account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your Publishable Key and add it to the frontend `.env` file
4. Configure authentication methods in Clerk dashboard

### MongoDB Atlas Setup

1. Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and add it to the backend `.env` file

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service (Admin)
- `PUT /api/services/:id` - Update service (Admin)
- `DELETE /api/services/:id` - Delete service (Admin)
- `POST /api/services/book` - Book a service
- `GET /api/services/bookings` - Get all service bookings (Admin)
- `PUT /api/services/bookings/:id` - Update service booking status (Admin)

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status (Admin)

### Customers
- `GET /api/customers` - Get all customers (Admin)
- `GET /api/customers/:id` - Get single customer
- `POST /api/customers` - Create or update customer

### Inventory
- `GET /api/inventory` - Get all inventory items (Admin)
- `PUT /api/inventory/:id` - Update inventory (Admin)

## Development Notes

- The application uses Clerk for authentication. Make sure to configure Clerk properly.
- MongoDB connection string should be added to the backend `.env` file.
- The frontend makes API calls to the backend. Ensure the backend is running before starting the frontend.
- Cart functionality is currently stored in component state. Consider implementing persistent storage or backend cart management for production.

## Future Enhancements

- Implement persistent cart storage
- Add real payment integration
- Add email notifications
- Implement admin role-based access control
- Add product image upload functionality
- Add search and filtering capabilities
- Implement order tracking with real-time updates
- Add customer reviews and ratings

## License

ISC



