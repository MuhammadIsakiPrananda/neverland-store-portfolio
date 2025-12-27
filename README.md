<div align="center">
  <a href="https://isaki-prananda.github.io/neverland-store/">
    <img src="./src/assets/Neverland Games Store.png" alt="Neverland Store Logo" width="120" />
  </a>
  <h1 align="center">🎮 Neverland Store - Full Stack Gaming Platform</h1>
  <p align="center">
    Platform e-commerce modern untuk layanan top-up game premium dengan sistem autentikasi lengkap dan RESTful API backend.
    <br />
    <a href="https://isaki-prananda.github.io/neverland-store/"><strong>🌐 View Live Demo</strong></a>
    <br />
    <br />
    <a href="https://github.com/MuhammadIsakiPrananda/neverland-store-portfolio/issues">🐛 Report Bug</a>
    ·
    <a href="https://github.com/MuhammadIsakiPrananda/neverland-store-portfolio/issues">✨ Request Feature</a>
  </p>
  <p align="center">
    <img src="https://img.shields.io/github/license/MuhammadIsakiPrananda/neverland-store-portfolio?style=for-the-badge" alt="License">
    <img src="https://img.shields.io/github/stars/MuhammadIsakiPrananda/neverland-store-portfolio?style=for-the-badge" alt="Stars">
    <img src="https://img.shields.io/github/forks/MuhammadIsakiPrananda/neverland-store-portfolio?style=for-the-badge" alt="Forks">
    <img src="https://img.shields.io/github/issues/MuhammadIsakiPrananda/neverland-store-portfolio?style=for-the-badge" alt="Issues">
  </p>
</div>

---

## 📋 Table of Contents

- [📋 Table of Contents](#-table-of-contents)
- [📖 About The Project](#-about-the-project)
  - [🎯 Project Goals](#-project-goals)
- [✨ Key Features](#-key-features)
  - [Frontend Features](#frontend-features)
  - [Backend Features](#backend-features)
- [🛠️ Built With](#️-built-with)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [DevOps \& Tools](#devops--tools)
  - [Additional Libraries](#additional-libraries)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation \& Local Development](#installation--local-development)
    - [1. Clone the repository](#1-clone-the-repository)
    - [2. Setup Frontend](#2-setup-frontend)
    - [3. Setup Backend](#3-setup-backend)
    - [4. Setup Database](#4-setup-database)
    - [5. Run the Application](#5-run-the-application)
  - [🐳 Running with Docker](#-running-with-docker)
    - [Full Stack with Docker Compose](#full-stack-with-docker-compose)
- [📂 Project Structure](#-project-structure)
- [🔌 Backend API](#-backend-api)
  - [Authentication Endpoints](#authentication-endpoints)
    - [1. **Register (Signup)**](#1-register-signup)
    - [2. **Login**](#2-login)
    - [3. **Get Profile** (Protected)](#3-get-profile-protected)
    - [4. **Change Password** (Protected)](#4-change-password-protected)
  - [Other API Endpoints](#other-api-endpoints)
    - [Game Management Endpoints](#game-management-endpoints)
    - [Cart \& Order Endpoints](#cart--order-endpoints)
    - [Flash Sale Endpoints](#flash-sale-endpoints)
    - [Other Endpoints](#other-endpoints)
- [💻 Frontend Integration](#-frontend-integration)
  - [Using Authentication Context](#using-authentication-context)
    - [1. Wrap your app with AuthProvider](#1-wrap-your-app-with-authprovider)
    - [2. Use authentication in components](#2-use-authentication-in-components)
    - [3. Protected Routes](#3-protected-routes)
- [🔐 Environment Variables](#-environment-variables)
  - [Frontend (.env)](#frontend-env)
  - [Backend (.env)](#backend-env)
- [🗄️ Database Schema](#️-database-schema)
  - [Users Table](#users-table)
  - [Games Table](#games-table)
  - [FlashSales Table](#flashsales-table)
  - [Cart Table](#cart-table)
  - [Orders Table](#orders-table)
  - [OrderItems Table](#orderitems-table)
  - [Testimonials Table](#testimonials-table)
  - [FAQ Table](#faq-table)
  - [Newsletter Table](#newsletter-table)
  - [Reviews Table](#reviews-table)
  - [Database Relationships](#database-relationships)
- [🎨 UI/UX Features](#-uiux-features)
  - [Design System](#design-system)
  - [Animations \& Interactions](#animations--interactions)
  - [Responsive Design](#responsive-design)
  - [Accessibility](#accessibility)
- [🔒 Security Features](#-security-features)
  - [Authentication \& Authorization](#authentication--authorization)
  - [API Security](#api-security)
  - [Data Protection](#data-protection)
  - [Best Practices](#best-practices)
- [📊 Admin Dashboard](#-admin-dashboard)
  - [Dashboard Features](#dashboard-features)
    - [📈 Overview Statistics](#-overview-statistics)
    - [🎮 Game Management](#-game-management)
    - [⚡ Flash Sale Management](#-flash-sale-management)
    - [📦 Order Management](#-order-management)
    - [👥 User Management](#-user-management)
    - [💬 Testimonial Management](#-testimonial-management)
    - [❓ FAQ Management](#-faq-management)
    - [📧 Newsletter Management](#-newsletter-management)
  - [Dashboard Navigation](#dashboard-navigation)
- [🚀 Deployment](#-deployment)
  - [Production Deployment dengan Docker](#production-deployment-dengan-docker)
    - [1. Prerequisites](#1-prerequisites)
    - [2. Setup Environment Variables](#2-setup-environment-variables)
    - [3. Build dan Deploy](#3-build-dan-deploy)
    - [4. SSL/TLS Setup (HTTPS)](#4-ssltls-setup-https)
    - [5. Nginx Configuration](#5-nginx-configuration)
  - [Alternative Deployment Options](#alternative-deployment-options)
    - [Vercel (Frontend Only)](#vercel-frontend-only)
    - [Heroku (Full Stack)](#heroku-full-stack)
    - [Railway](#railway)
    - [DigitalOcean App Platform](#digitalocean-app-platform)
  - [Monitoring \& Maintenance](#monitoring--maintenance)
- [🧪 Testing](#-testing)
  - [Manual Testing](#manual-testing)
    - [Test Backend API](#test-backend-api)
  - [Using Postman](#using-postman)
  - [Frontend Testing](#frontend-testing)
  - [Testing Checklist](#testing-checklist)
    - [Authentication ✅](#authentication-)
    - [Game Browsing ✅](#game-browsing-)
    - [Shopping Cart ✅](#shopping-cart-)
    - [Orders ✅](#orders-)
    - [Flash Sales ✅](#flash-sales-)
    - [Admin Dashboard ✅](#admin-dashboard-)
  - [Performance Testing](#performance-testing)
  - [Security Testing](#security-testing)
- [🤝 Contributing](#-contributing)
  - [Development Workflow](#development-workflow)
  - [Contribution Guidelines](#contribution-guidelines)
    - [Code Style](#code-style)
    - [Commit Messages](#commit-messages)
    - [Pull Request Process](#pull-request-process)
  - [Areas for Contribution](#areas-for-contribution)
    - [🐛 Bug Fixes](#-bug-fixes)
    - [✨ New Features](#-new-features)
    - [📚 Documentation](#-documentation)
    - [🎨 UI/UX](#-uiux)
    - [🧪 Testing](#-testing-1)
  - [Development Setup untuk Contributors](#development-setup-untuk-contributors)
  - [Code Review Process](#code-review-process)
  - [Getting Help](#getting-help)
  - [Recognition](#recognition)
- [📄 License](#-license)
  - [MIT License](#mit-license)
- [📞 Contact](#-contact)
  - [Muhammad Isaki Prananda](#muhammad-isaki-prananda)
  - [Project Links](#project-links)
  - [Support](#support)
- [🙏 Acknowledgments](#-acknowledgments)
  - [Technologies \& Libraries](#technologies--libraries)
  - [Inspiration \& Resources](#inspiration--resources)
  - [Special Thanks](#special-thanks)
- [📈 Project Stats](#-project-stats)
- [🗺️ Roadmap](#️-roadmap)
  - [Version 1.0 ✅ (Current)](#version-10--current)
  - [Version 1.1 🚧 (In Progress)](#version-11--in-progress)
  - [Version 2.0 🔮 (Planned)](#version-20--planned)
  - [Future Enhancements 💡](#future-enhancements-)

---

## 📖 About The Project

**Neverland Store** adalah platform e-commerce full-stack yang dirancang khusus untuk gamers dalam melakukan top-up game favorit mereka. Dibangun dengan teknologi modern dan mengikuti best practices dalam pengembangan web, platform ini menawarkan:

- 🔐 **Sistem Autentikasi Aman** dengan JWT tokens dan password hashing
- 🌐 **RESTful Backend API** powered by Express.js dan MariaDB
- ⚛️ **Modern React Frontend** dengan desain responsive dan glassmorphic UI
- 👨‍💼 **Admin Dashboard** untuk mengelola game, flash sales, orders, dan lebih banyak lagi
- ⏱️ **Flash Sales Real-time** dengan countdown timer yang akurat
- 👤 **User Profile Management** dengan fitur ganti password
- 🐳 **Containerized Deployment** siap untuk production dengan Docker
- 📱 **Fully Responsive** bekerja sempurna di semua devices
- 🎨 **Modern UI/UX** dengan animasi smooth menggunakan Framer Motion
- 🛒 **Shopping Cart System** yang terintegrasi penuh
- 💳 **Order Management** untuk tracking pembelian user

### 🎯 Project Goals

Project ini dibuat untuk mendemonstrasikan kemampuan dalam:
- Full-stack development dengan React dan Node.js
- Implementasi sistem autentikasi JWT yang aman
- Desain RESTful API yang scalable
- Database modeling dengan Sequelize ORM
- Containerization dengan Docker
- Modern UI/UX design dengan Tailwind CSS
- State management dengan React Context API

---

## ✨ Key Features

### Frontend Features
- ✅ **Modern & Responsive UI** - Glassmorphic design dengan smooth animations (Framer Motion)
- ✅ **Dynamic Game Catalog** - Browse, filter, dan search games
- ✅ **Interactive Modals** - Game details, authentication, shopping cart
- ✅ **Flash Sale Banner** - Real-time countdown dengan promotional offers
- ✅ **User Authentication UI** - Login/Register dengan form validation
- ✅ **Protected Routes** - Secure pages untuk authenticated users
- ✅ **Admin Dashboard** - Comprehensive dashboard untuk manage semua aspek
- ✅ **Testimonials & FAQ** - User reviews dan frequently asked questions
- ✅ **Newsletter Subscription** - Stay updated dengan latest offers
- ✅ **Shopping Cart** - Add to cart, update quantity, remove items
- ✅ **Wishlist Feature** - Save favorite games untuk nanti
- ✅ **Order History** - Track semua purchases user
- ✅ **Profile Management** - Update profile dan change password
- ✅ **Toast Notifications** - Real-time feedback untuk user actions
- ✅ **Loading States** - Skeleton loaders dan spinner components
- ✅ **Error Boundaries** - Graceful error handling di frontend
- ✅ **SEO Optimized** - Meta tags dan structured data
- ✅ **Dark Theme** - Modern dark-themed interface

### Backend Features
- ✅ **User Authentication** - Signup, Login, JWT token generation
- ✅ **Password Management** - Secure password hashing with bcryptjs (10 salt rounds)
- ✅ **Protected API Routes** - Middleware-based authentication & authorization
- ✅ **Role-Based Access Control (RBAC)** - User dan Admin roles
- ✅ **RESTful API** - Complete CRUD operations untuk semua resources
- ✅ **Database Integration** - MariaDB dengan Sequelize ORM
- ✅ **Input Validation** - Comprehensive validation dengan express-validator
- ✅ **Error Handling** - Centralized error handler dengan detailed messages
- ✅ **CORS Enabled** - Cross-origin resource sharing support
- ✅ **Rate Limiting** - Protection terhadap brute force attacks
- ✅ **Security Headers** - Helmet.js untuk HTTP security headers
- ✅ **Session Management** - Token-based sessions
- ✅ **API Documentation** - Comprehensive API endpoint documentation

---

## 🛠️ Built With

### Frontend
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) - UI Library
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) - Build Tool
- ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) - CSS Framework
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) - Routing

### Backend
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) - Runtime Environment
- ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) - Web Framework
- ![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white) - Database
- ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white) - ORM
- ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white) - Authentication

### DevOps & Tools
- ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) - Containerization
- ![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white) - Multi-container orchestration
- ![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white) - Web Server & Reverse Proxy
- ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) - Version Control
- ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) - Code Linting

### Additional Libraries
- **Framer Motion** - Advanced animations
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Elegant notifications
- **date-fns** - Date formatting
- **Recharts** - Data visualization untuk dashboard
- **Helmet** - Security headers
- **Express Rate Limit** - Rate limiting
- **Express Validator** - Input validation

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18.x or later)
- **npm** (comes with Node.js)
- **MariaDB** (v10.x or later)
- **Docker & Docker Compose** (optional, for containerized deployment)

### Installation & Local Development

#### 1. Clone the repository

```bash
git clone https://github.com/MuhammadIsakiPrananda/neverland-store-portfolio.git
cd neverland-store-portfolio
```

#### 2. Setup Frontend

```bash
# Install frontend dependencies
npm install

# Create .env file for frontend (optional)
# VITE_API_URL=http://store.neverlandstudio.my.id/api
```

#### 3. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Create .env file (REQUIRED)
# Copy the example below and modify as needed
```

Create `backend/.env` file:

```env
# Database Configuration (MariaDB)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=neverlandstore
DB_DIALECT=mariadb

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (Generate a secure random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Production API URL (optional)
PROD_API_URL=http://store.neverlandstudio.my.id
```

#### 4. Setup Database

```bash
# Start MariaDB service
# On Linux/Mac:
sudo systemctl start mariadb

# On Windows (if using XAMPP/MySQL):
# Start MySQL from XAMPP Control Panel

# Create database
mysql -u root -p
```

In MySQL console:

```sql
CREATE DATABASE neverlandstore;
EXIT;
```

#### 5. Run the Application

```bash
# Terminal 1 - Run Backend (from /backend directory)
npm run dev

# Terminal 2 - Run Frontend (from root directory)
cd ..
npm run dev
```

**Access the application:**
- Frontend: `http://store.neverlandstudio.my.id`
- Backend API: `http://store.neverlandstudio.my.id/api`

---

### 🐳 Running with Docker

#### Full Stack with Docker Compose

```bash
# Build and run all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Remove all containers and volumes
docker-compose down -v
```

**Services:**
- Frontend: `http://store.neverlandstudio.my.id`
- Backend API: `http://store.neverlandstudio.my.id/api`
- MariaDB: `store.neverlandstudio.my.id:3308` (external access)

---

## 📂 Project Structure

```
neverland-store/
├── backend/                     # Backend API
│   ├── controllers/             # Request handlers
│   │   ├── authController.js    # Authentication logic
│   │   ├── gameController.js    # Game management
│   │   ├── cartController.js    # Shopping cart
│   │   ├── orderController.js   # Order processing
│   │   └── flashSaleController.js
│   ├── models/                  # Database models (Sequelize)
│   │   ├── User.js              # User model
│   │   ├── Game.js              # Game model
│   │   ├── Cart.js              # Cart model
│   │   ├── Order.js             # Order model
│   │   └── FlashSale.js         # Flash sale model
│   ├── routes/                  # API routes
│   │   ├── auth.js              # Auth routes (/api/auth)
│   │   ├── games.js             # Game routes (/api/games)
│   │   ├── cart.js              # Cart routes (/api/cart)
│   │   ├── orders.js            # Order routes (/api/orders)
│   │   └── flashSales.js        # Flash sale routes (/api/flashsales)
│   ├── middlewares/             # Express middlewares
│   │   └── auth.js              # JWT authentication middleware
│   ├── utils/                   # Utility functions
│   │   └── sequelize.js         # Database connection
│   ├── .env                     # Environment variables
│   ├── server.js                # Express app entry point
│   ├── package.json             # Backend dependencies
│   └── README_AUTH.md           # Authentication documentation
│
├── src/                         # Frontend source
│   ├── components/              # React components
│   │   ├── Auth/                # Authentication components
│   │   │   ├── AuthForm.jsx     # Login/Register forms
│   │   │   └── AuthForm.css     # Auth form styles
│   │   ├── Dashboard/           # Admin dashboard
│   │   │   ├── Dashboard.jsx
│   │   │   ├── FlashSaleManagement.jsx
│   │   │   └── ...
│   │   ├── Game/                # Game-related components
│   │   │   ├── GameCard.jsx
│   │   │   ├── GameModal.jsx
│   │   │   └── GameList.jsx
│   │   ├── FlashSale/           # Flash sale components
│   │   ├── Hero.jsx             # Hero section
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── Footer.jsx           # Footer
│   │   └── ...
│   ├── contexts/                # React contexts
│   │   ├── AuthContext.jsx      # Authentication context
│   │   └── DashboardContext.jsx # Dashboard context
│   ├── services/                # API services
│   │   ├── api.js               # API utilities
│   │   └── dashboardApi.js      # Dashboard API calls
│   ├── assets/                  # Static assets
│   ├── data/                    # Static data
│   ├── App.jsx                  # Main app component
│   └── main.jsx                 # React entry point
│
├── public/                      # Public static files
├── docker-compose.yml           # Docker orchestration
├── Dockerfile                   # Frontend Docker image
├── nginx.conf                   # Nginx configuration
├── package.json                 # Frontend dependencies
└── README.md                    # This file
```

---

## 🔌 Backend API

Base URL: `http://store.neverlandstudio.my.id/api`

### Authentication Endpoints

#### 1. **Register (Signup)**

Create a new user account.

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Registrasi berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Password Requirements:**
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character

---

#### 2. **Login**

Authenticate existing user.

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

#### 3. **Get Profile** (Protected)

Get current user profile.

```http
GET /api/auth/profile
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2025-12-18T00:00:00.000Z"
  }
}
```

---

#### 4. **Change Password** (Protected)

Update user password.

```http
PUT /api/auth/change-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "currentPassword": "OldPass123!",
  "newPassword": "NewSecurePass456!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password berhasil diubah"
}
```

---

### Other API Endpoints

#### Game Management Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/games` | Get all games with pagination | ❌ | - |
| GET | `/api/games/:id` | Get game by ID | ❌ | - |
| POST | `/api/games` | Create new game | ✅ | Admin |
| PUT | `/api/games/:id` | Update game | ✅ | Admin |
| DELETE | `/api/games/:id` | Delete game | ✅ | Admin |

**Example - Get All Games:**
```http
GET /api/games?page=1&limit=12&category=Action
```

**Response:**
```json
{
  "success": true,
  "data": {
    "games": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 12
    }
  }
}
```

---

#### Cart & Order Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/cart` | Get user's cart | ✅ | User |
| POST | `/api/cart` | Add item to cart | ✅ | User |
| PUT | `/api/cart/:id` | Update cart item | ✅ | User |
| DELETE | `/api/cart/:id` | Remove from cart | ✅ | User |
| DELETE | `/api/cart` | Clear cart | ✅ | User |
| GET | `/api/orders` | Get user orders | ✅ | User |
| GET | `/api/orders/:id` | Get order details | ✅ | User |
| POST | `/api/orders` | Create order | ✅ | User |
| GET | `/api/dashboard/orders` | Get all orders | ✅ | Admin |

**Example - Add to Cart:**
```http
POST /api/cart
Authorization: Bearer {token}
Content-Type: application/json

{
  "gameId": 1,
  "quantity": 2,
  "selectedPackage": "100 Diamonds"
}
```

---

#### Flash Sale Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/flashsales` | Get all active flash sales | ❌ | - |
| GET | `/api/flashsales/:id` | Get flash sale details | ❌ | - |
| POST | `/api/flashsales` | Create flash sale | ✅ | Admin |
| PUT | `/api/flashsales/:id` | Update flash sale | ✅ | Admin |
| DELETE | `/api/flashsales/:id` | Delete flash sale | ✅ | Admin |

---

#### Other Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/testimonials` | Get all testimonials | ❌ | - |
| POST | `/api/testimonials` | Add testimonial | ✅ | User |
| PUT | `/api/testimonials/:id` | Update testimonial | ✅ | Admin |
| DELETE | `/api/testimonials/:id` | Delete testimonial | ✅ | Admin |
| GET | `/api/faq` | Get all FAQs | ❌ | - |
| POST | `/api/faq` | Create FAQ | ✅ | Admin |
| PUT | `/api/faq/:id` | Update FAQ | ✅ | Admin |
| DELETE | `/api/faq/:id` | Delete FAQ | ✅ | Admin |
| POST | `/api/newsletter` | Subscribe to newsletter | ❌ | - |
| GET | `/api/reviews/:gameId` | Get game reviews | ❌ | - |
| POST | `/api/reviews` | Add review | ✅ | User |
| GET | `/api/dashboard/stats` | Get dashboard statistics | ✅ | Admin |
| GET | `/api/dashboard/users` | Get all users | ✅ | Admin |
| GET | `/api/applicants` | Get job applicants | ✅ | Admin |
| POST | `/api/collaborations` | Submit collaboration request | ❌ | - |

---

## 💻 Frontend Integration

### Using Authentication Context

#### 1. Wrap your app with AuthProvider

```jsx
// main.jsx
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
```

#### 2. Use authentication in components

```jsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout, register } = useAuth();

  const handleLogin = async () => {
    const result = await login('user@example.com', 'password');
    if (result.success) {
      console.log('Login successful!');
    } else {
      console.error(result.error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

#### 3. Protected Routes

```jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// Usage in App.jsx
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

---

## 🔐 Environment Variables

### Frontend (.env)

```env
VITE_API_URL=http://store.neverlandstudio.my.id/api
```

### Backend (.env)

```env
# Database
DB_HOST=mariadb_neverland
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=neverlandstore
DB_DIALECT=mariadb

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long

# Production
PROD_API_URL=http://store.neverlandstudio.my.id
```

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE Users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  phoneNumber VARCHAR(20),
  address TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Games Table
```sql
CREATE TABLE Games (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  image VARCHAR(500),
  description TEXT,
  price DECIMAL(10,2),
  rating DECIMAL(3,2) DEFAULT 0.00,
  popular BOOLEAN DEFAULT false,
  stock INT DEFAULT 0,
  publisher VARCHAR(255),
  releaseDate DATE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### FlashSales Table
```sql
CREATE TABLE FlashSales (
  id INT PRIMARY KEY AUTO_INCREMENT,
  gameId INT NOT NULL,
  discount INT NOT NULL,
  originalPrice DECIMAL(10,2),
  discountedPrice DECIMAL(10,2),
  startTime DATETIME NOT NULL,
  endTime DATETIME NOT NULL,
  isActive BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (gameId) REFERENCES Games(id) ON DELETE CASCADE
);
```

### Cart Table
```sql
CREATE TABLE Carts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  gameId INT NOT NULL,
  quantity INT DEFAULT 1,
  selectedPackage VARCHAR(255),
  price DECIMAL(10,2),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (gameId) REFERENCES Games(id) ON DELETE CASCADE
);
```

### Orders Table
```sql
CREATE TABLE Orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  orderNumber VARCHAR(50) UNIQUE NOT NULL,
  totalAmount DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
  paymentMethod VARCHAR(50),
  paymentStatus ENUM('unpaid', 'paid', 'refunded') DEFAULT 'unpaid',
  shippingAddress TEXT,
  notes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);
```

### OrderItems Table
```sql
CREATE TABLE OrderItems (
  id INT PRIMARY KEY AUTO_INCREMENT,
  orderId INT NOT NULL,
  gameId INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  selectedPackage VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (orderId) REFERENCES Orders(id) ON DELETE CASCADE,
  FOREIGN KEY (gameId) REFERENCES Games(id) ON DELETE CASCADE
);
```

### Testimonials Table
```sql
CREATE TABLE Testimonials (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  content TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  isApproved BOOLEAN DEFAULT false,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);
```

### FAQ Table
```sql
CREATE TABLE FAQs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100),
  order INT DEFAULT 0,
  isActive BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Newsletter Table
```sql
CREATE TABLE Newsletters (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  isActive BOOLEAN DEFAULT true,
  subscribedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Reviews Table
```sql
CREATE TABLE Reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  gameId INT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  isApproved BOOLEAN DEFAULT false,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (gameId) REFERENCES Games(id) ON DELETE CASCADE
);
```

### Database Relationships

```
Users (1) -----> (N) Orders
Users (1) -----> (N) Cart
Users (1) -----> (N) Testimonials
Users (1) -----> (N) Reviews

Games (1) -----> (N) Cart
Games (1) -----> (N) FlashSales
Games (1) -----> (N) OrderItems
Games (1) -----> (N) Reviews

Orders (1) -----> (N) OrderItems
```

---

## 🎨 UI/UX Features

### Design System
- **Color Palette**: Dark theme dengan accent colors
  - Primary: Purple/Blue gradient
  - Secondary: Teal/Cyan
  - Background: Dark navy dengan glassmorphism effects
- **Typography**: Modern font stack dengan clear hierarchy
- **Spacing**: Consistent spacing system (4px base unit)
- **Border Radius**: Soft corners untuk modern look

### Animations & Interactions
- **Page Transitions**: Smooth fade-in animations
- **Hover Effects**: Interactive card transformations
- **Loading States**: Skeleton screens dan spinners
- **Micro-interactions**: Button clicks, form inputs
- **Parallax Effects**: Hero section dengan depth
- **Scroll Animations**: Elements fade in on scroll

### Responsive Design
- **Mobile First**: Optimized untuk mobile devices
- **Breakpoints**:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
- **Touch Friendly**: Large tap targets untuk mobile
- **Adaptive Layouts**: Grid systems yang responsive

### Accessibility
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard support
- **Focus States**: Clear focus indicators
- **Color Contrast**: WCAG AA compliant
- **Alt Text**: Semua images memiliki descriptive alt text

---

## 🔒 Security Features

### Authentication & Authorization
- ✅ **JWT Tokens**: Secure token-based authentication
- ✅ **Password Hashing**: bcrypt dengan 10 salt rounds
- ✅ **Role-Based Access Control**: User dan Admin roles
- ✅ **Protected Routes**: Middleware untuk route protection
- ✅ **Token Expiration**: Automatic token expiry (24 hours)
- ✅ **Secure Sessions**: httpOnly cookies untuk production

### API Security
- ✅ **Rate Limiting**: 100 requests per 15 minutes per IP
- ✅ **CORS Configuration**: Controlled cross-origin access
- ✅ **Helmet.js**: Security headers (XSS, CSP, etc.)
- ✅ **Input Validation**: express-validator untuk semua inputs
- ✅ **SQL Injection Prevention**: Sequelize ORM parameterized queries
- ✅ **XSS Prevention**: Input sanitization
- ✅ **CSRF Protection**: Token-based protection

### Data Protection
- ✅ **Password Requirements**: 
  - Minimum 8 characters
  - Mixed case (uppercase & lowercase)
  - Numbers and special characters
- ✅ **Email Validation**: RFC-compliant email validation
- ✅ **Sensitive Data**: Never log passwords or tokens
- ✅ **Error Messages**: Generic messages untuk prevent information leakage

### Best Practices
- ✅ **Environment Variables**: Sensitive data di .env files
- ✅ **HTTPS Ready**: SSL/TLS certificate support
- ✅ **Database Credentials**: Never committed to repository
- ✅ **API Keys**: Stored securely dalam environment
- ✅ **Regular Dependencies Update**: Keep packages up-to-date

---

## 📊 Admin Dashboard

### Dashboard Features

#### 📈 Overview Statistics
- Total Revenue dengan trend chart
- Total Orders (Today, This Week, This Month)
- Total Users dengan growth percentage
- Active Flash Sales count
- Revenue chart (Recharts visualization)

#### 🎮 Game Management
- **CRUD Operations**: Create, Read, Update, Delete games
- **Features**:
  - Upload game images
  - Set pricing and discounts
  - Manage categories
  - Toggle popular status
  - Stock management
  - Bulk actions
- **Filters**: Search, category filter, sort options

#### ⚡ Flash Sale Management
- **Create Flash Sales**:
  - Select game
  - Set discount percentage
  - Choose start/end time
  - Auto-calculate discounted price
- **Manage Active Sales**:
  - View countdown timers
  - Edit running sales
  - Deactivate sales
  - View analytics

#### 📦 Order Management
- **Order Tracking**:
  - View all orders dengan pagination
  - Filter by status (Pending, Processing, Completed, Cancelled)
  - Search by order number atau customer name
  - View order details
- **Order Actions**:
  - Update order status
  - Mark as paid/unpaid
  - View order items
  - Cancel orders
  - Print invoices

#### 👥 User Management
- View all registered users
- User statistics
- User activity logs
- Role management (User/Admin)
- Ban/Suspend users
- View user orders

#### 💬 Testimonial Management
- Approve/Reject testimonials
- Edit testimonials
- Delete testimonials
- View ratings statistics

#### ❓ FAQ Management
- Create/Edit/Delete FAQs
- Organize by categories
- Set display order
- Toggle active status

#### 📧 Newsletter Management
- View subscribers list
- Export email list
- Send bulk emails
- Unsubscribe management

### Dashboard Navigation
```
/dashboard
  ├── /overview          # Dashboard home
  ├── /games             # Game management
  ├── /flash-sales       # Flash sale management
  ├── /orders            # Order management
  ├── /users             # User management
  ├── /testimonials      # Testimonial management
  └── /faq               # FAQ management
```

---

## 🚀 Deployment

### Production Deployment dengan Docker

#### 1. Prerequisites
```bash
# Install Docker dan Docker Compose
# https://docs.docker.com/get-docker/

# Verify installation
docker --version
docker-compose --version
```

#### 2. Setup Environment Variables

**Backend `.env`:**
```env
# Production Database
DB_HOST=mariadb_neverland
DB_PORT=3306
DB_USER=your_production_user
DB_PASSWORD=your_strong_password
DB_NAME=neverlandstore_production
DB_DIALECT=mariadb

# Production Server
PORT=5000
NODE_ENV=production

# JWT Secret (MUST BE STRONG)
JWT_SECRET=your_super_secret_production_jwt_key_minimum_32_characters

# Production URL
PROD_API_URL=https://yourdomain.com
```

#### 3. Build dan Deploy

```bash
# Clone repository
git clone https://github.com/MuhammadIsakiPrananda/neverland-store-portfolio.git
cd neverland-store-portfolio

# Create network
docker network create app-network

# Build dan start services
docker-compose up -d --build

# Check logs
docker-compose logs -f

# Check running containers
docker ps
```

#### 4. SSL/TLS Setup (HTTPS)

```bash
# Using Let's Encrypt (Certbot)
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

#### 5. Nginx Configuration

Update `nginx.conf` untuk production:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Alternative Deployment Options

#### Vercel (Frontend Only)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

#### Heroku (Full Stack)
```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create neverland-store

# Add MariaDB addon
heroku addons:create jawsdb:kitefin

# Deploy
git push heroku main
```

#### Railway
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically on push

#### DigitalOcean App Platform
1. Create new app
2. Connect repository
3. Configure build settings
4. Add environment variables
5. Deploy

### Monitoring & Maintenance

```bash
# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Restart services
docker-compose restart backend
docker-compose restart frontend

# Update application
git pull origin main
docker-compose up -d --build

# Database backup
docker exec mariadb_neverland mysqldump -u root -p neverlandstore > backup.sql

# Database restore
docker exec -i mariadb_neverland mysql -u root -p neverlandstore < backup.sql
```

---

## 🧪 Testing

### Manual Testing

#### Test Backend API

**1. Test Authentication**
```bash
# Register new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123!@#"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!@#"
  }'

# Get profile (requires token)
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**2. Test Game Endpoints**
```bash
# Get all games
curl -X GET http://localhost:5000/api/games

# Get specific game
curl -X GET http://localhost:5000/api/games/1

# Create game (Admin only)
curl -X POST http://localhost:5000/api/games \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mobile Legends",
    "category": "MOBA",
    "price": 50000,
    "description": "Popular MOBA game"
  }'
```

**3. Test Cart & Orders**
```bash
# Add to cart
curl -X POST http://localhost:5000/api/cart \
  -H "Authorization: Bearer USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "gameId": 1,
    "quantity": 2,
    "selectedPackage": "100 Diamonds"
  }'

# View cart
curl -X GET http://localhost:5000/api/cart \
  -H "Authorization: Bearer USER_TOKEN"

# Create order
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "paymentMethod": "credit_card",
    "shippingAddress": "Jl. Contoh No. 123"
  }'
```

### Using Postman

**1. Import Collection**
- Create new collection: "Neverland Store API"
- Add environment variables:
  - `base_url`: `http://localhost:5000/api`
  - `token`: (akan diisi setelah login)

**2. Test Workflow**
1. Register → Save token
2. Login → Update token
3. Get Profile
4. Browse Games
5. Add to Cart
6. Create Order
7. View Orders

### Frontend Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Testing Checklist

#### Authentication ✅
- [ ] User dapat register dengan email valid
- [ ] Password validation bekerja
- [ ] User dapat login dengan credentials yang benar
- [ ] Token disimpan di localStorage
- [ ] Protected routes redirect ke login jika tidak authenticated
- [ ] Logout menghapus token dan redirect

#### Game Browsing ✅
- [ ] Games tampil di homepage
- [ ] Filter by category bekerja
- [ ] Search functionality bekerja
- [ ] Game modal menampilkan detail lengkap
- [ ] Rating dan reviews tampil

#### Shopping Cart ✅
- [ ] User dapat add game ke cart
- [ ] Quantity update bekerja
- [ ] Remove item dari cart bekerja
- [ ] Cart badge menampilkan jumlah items
- [ ] Cart modal menampilkan semua items

#### Orders ✅
- [ ] User dapat create order dari cart
- [ ] Order number di-generate otomatis
- [ ] Order status tracking bekerja
- [ ] Order history tampil di profile

#### Flash Sales ✅
- [ ] Flash sale banner tampil
- [ ] Countdown timer akurat
- [ ] Discounted price ditampilkan
- [ ] Flash sale games highlighted

#### Admin Dashboard ✅
- [ ] Hanya admin yang dapat akses
- [ ] Statistics ditampilkan dengan benar
- [ ] CRUD operations untuk games bekerja
- [ ] Flash sale management bekerja
- [ ] Order management bekerja

### Performance Testing

```bash
# Check bundle size
npm run build
# Analyze dist folder size

# Test API response time
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:5000/api/games
```

**curl-format.txt:**
```
    time_namelookup:  %{time_namelookup}s\n
       time_connect:  %{time_connect}s\n
    time_appconnect:  %{time_appconnect}s\n
   time_pretransfer:  %{time_pretransfer}s\n
      time_redirect:  %{time_redirect}s\n
 time_starttransfer:  %{time_starttransfer}s\n
                    ----------\n
         time_total:  %{time_total}s\n
```

### Security Testing

```bash
# Test rate limiting
for i in {1..150}; do
  curl -X POST http://localhost:5000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"wrong"}'
done
# Should return 429 after 100 requests

# Test SQL injection
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com OR 1=1--","password":"anything"}'
# Should be prevented by validation

# Test XSS
curl -X POST http://localhost:5000/api/testimonials \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"content":"<script>alert(\"XSS\")</script>"}'
# Should be sanitized
```

---

## 🤝 Contributing

Kontribusi sangat diapresiasi! Berikut cara berkontribusi ke project ini:

### Development Workflow

1. **Fork the Project**
   ```bash
   # Click 'Fork' button di GitHub
   ```

2. **Clone your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/neverland-store.git
   cd neverland-store
   ```

3. **Create Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

4. **Make Changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments where necessary
   - Test your changes thoroughly

5. **Commit Changes**
   ```bash
   git add .
   git commit -m 'Add some AmazingFeature'
   ```

6. **Push to Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

7. **Open Pull Request**
   - Go to your fork on GitHub
   - Click 'Pull Request'
   - Describe your changes in detail
   - Link related issues

### Contribution Guidelines

#### Code Style
- **JavaScript/React**: Follow Airbnb style guide
- **Indentation**: 2 spaces
- **Quotes**: Single quotes untuk strings
- **Semicolons**: Use semicolons
- **Comments**: JSDoc style untuk functions

#### Commit Messages
Follow conventional commits:
```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semicolons
refactor: code restructuring
test: adding tests
chore: maintenance tasks
```

#### Pull Request Process
1. Update README.md jika ada perubahan features
2. Update dokumentasi API jika ada endpoint baru
3. Pastikan semua tests pass
4. Request review dari maintainer
5. Merge setelah approved

### Areas for Contribution

#### 🐛 Bug Fixes
- Fix reported bugs
- Improve error handling
- Resolve console warnings

#### ✨ New Features
- Payment gateway integration (Midtrans, PayPal)
- Email notifications
- Advanced search filters
- Wishlist functionality enhancement
- Social media login (Google, Facebook)
- Multi-language support
- Dark/Light theme toggle

#### 📚 Documentation
- Improve README
- Add code comments
- Create tutorials
- API documentation
- Deployment guides

#### 🎨 UI/UX
- Design improvements
- Accessibility enhancements
- Mobile optimization
- Animation refinements

#### 🧪 Testing
- Write unit tests
- Integration tests
- E2E tests
- Performance tests

### Development Setup untuk Contributors

```bash
# Install dependencies
npm install
cd backend && npm install

# Setup database
# Create .env file dengan credentials

# Run in development mode
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev
```

### Code Review Process

Pull requests akan di-review berdasarkan:
- ✅ Code quality dan style
- ✅ Functionality dan correctness
- ✅ Test coverage
- ✅ Documentation completeness
- ✅ Performance impact
- ✅ Security considerations

### Getting Help

Jika ada pertanyaan tentang contribution:
- Open an issue dengan label "question"
- Join discussions di GitHub Discussions
- Check existing issues dan PRs
- Read documentation thoroughly

### Recognition

Contributors akan di-list di:
- README.md Contributors section
- GitHub contributors page
- Release notes untuk significant contributions

Terima kasih untuk contribution Anda! 🙏

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) file for more information.

### MIT License

```
MIT License

Copyright (c) 2024-2025 Muhammad Isaki Prananda

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

**What this means:**
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❌ Liability: Software is provided "as is"
- ❌ Warranty: No warranty provided

---

## 📞 Contact

### Muhammad Isaki Prananda

- **GitHub**: [@Isaki-Prananda](https://github.com/Isaki-Prananda)
- **LinkedIn**: [Muhammad Isaki Prananda](https://linkedin.com/in/muhammad-isaki-prananda)
- **Email**: isakiprananda@gmail.com
- **Portfolio**: [isaki-prananda.github.io](https://isaki-prananda.github.io)

### Project Links

- **Live Demo**: [https://isaki-prananda.github.io/neverland-store/](https://isaki-prananda.github.io/neverland-store/)
- **Repository**: [https://github.com/MuhammadIsakiPrananda/neverland-store-portfolio](https://github.com/MuhammadIsakiPrananda/neverland-store-portfolio)
- **Report Bug**: [Open Issue](https://github.com/MuhammadIsakiPrananda/neverland-store-portfolio/issues)
- **Request Feature**: [Open Issue](https://github.com/MuhammadIsakiPrananda/neverland-store-portfolio/issues)

### Support

Jika Anda menemukan project ini bermanfaat:
- ⭐ Star repository ini
- 🐛 Report bugs yang Anda temukan
- 💡 Suggest fitur baru
- 🤝 Contribute ke codebase
- 📢 Share dengan teman-teman

---

## 🙏 Acknowledgments

### Technologies & Libraries

- [React](https://reactjs.org/) - UI Library yang amazing
- [Vite](https://vitejs.dev/) - Lightning fast build tool
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- [Sequelize](https://sequelize.org/) - Promise-based ORM
- [MariaDB](https://mariadb.org/) - Open source relational database
- [JWT](https://jwt.io/) - JSON Web Tokens for authentication
- [Docker](https://www.docker.com/) - Containerization platform
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Beautiful icon set
- [React Router](https://reactrouter.com/) - Declarative routing
- [Axios](https://axios-http.com/) - HTTP client
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - Password hashing
- [date-fns](https://date-fns.org/) - Date utility library
- [Recharts](https://recharts.org/) - Charting library
- [React Hot Toast](https://react-hot-toast.com/) - Toast notifications

### Inspiration & Resources

- [Dribbble](https://dribbble.com/) - UI/UX inspiration
- [Behance](https://www.behance.net/) - Design inspiration
- [Frontend Mentor](https://www.frontendmentor.io/) - Coding challenges
- [Dev.to](https://dev.to/) - Development articles
- [Stack Overflow](https://stackoverflow.com/) - Problem solving

### Special Thanks

- Semua contributors yang telah membantu improve project ini
- Open source community untuk amazing tools dan libraries
- GitHub untuk hosting platform
- Vercel untuk deployment services

---

## 📈 Project Stats

![GitHub stars](https://img.shields.io/github/stars/MuhammadIsakiPrananda/neverland-store-portfolio?style=social)
![GitHub forks](https://img.shields.io/github/forks/MuhammadIsakiPrananda/neverland-store-portfolio?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/MuhammadIsakiPrananda/neverland-store-portfolio?style=social)
![GitHub issues](https://img.shields.io/github/issues/MuhammadIsakiPrananda/neverland-store-portfolio)
![GitHub pull requests](https://img.shields.io/github/issues-pr/MuhammadIsakiPrananda/neverland-store-portfolio)
![GitHub last commit](https://img.shields.io/github/last-commit/MuhammadIsakiPrananda/neverland-store-portfolio)
![GitHub repo size](https://img.shields.io/github/repo-size/MuhammadIsakiPrananda/neverland-store-portfolio)
![Lines of code](https://img.shields.io/tokei/lines/github/MuhammadIsakiPrananda/neverland-store-portfolio)

---

## 🗺️ Roadmap

### Version 1.0 ✅ (Current)
- [x] User authentication system
- [x] Game catalog dengan search & filter
- [x] Shopping cart functionality
- [x] Order management
- [x] Flash sales feature
- [x] Admin dashboard
- [x] Testimonials & FAQ
- [x] Newsletter subscription
- [x] Responsive design
- [x] Docker deployment

### Version 1.1 🚧 (In Progress)
- [ ] Payment gateway integration (Midtrans)
- [ ] Email notifications
- [ ] Order tracking system
- [ ] Invoice generation (PDF)
- [ ] Advanced analytics dashboard

### Version 2.0 🔮 (Planned)
- [ ] Social media login (Google, Facebook)
- [ ] Wishlist functionality
- [ ] Product reviews & ratings system
- [ ] Live chat support
- [ ] Multi-language support (EN, ID)
- [ ] Push notifications
- [ ] Mobile app (React Native)
- [ ] Loyalty points system
- [ ] Referral program
- [ ] Advanced search with filters
- [ ] Recommendation engine
- [ ] GraphQL API

### Future Enhancements 💡
- [ ] PWA (Progressive Web App)
- [ ] Dark/Light theme toggle
- [ ] Voice search
- [ ] AR preview untuk game items
- [ ] Blockchain payment integration
- [ ] AI-powered chatbot
- [ ] Video tutorials integration
- [ ] Community forum
- [ ] Streaming integration
- [ ] Tournament management

---

<div align="center">
  <h3>⚡ Built with passion by Muhammad Isaki Prananda ⚡</h3>
  <p>If you find this project helpful, please consider giving it a ⭐</p>
  <p>
    <a href="https://github.com/MuhammadIsakiPrananda/neverland-store-portfolio">
      <img src="https://img.shields.io/badge/GitHub-View%20Repository-blue?style=for-the-badge&logo=github" alt="View Repository">
    </a>
    <a href="https://isaki-prananda.github.io/neverland-store/">
      <img src="https://img.shields.io/badge/Demo-Visit%20Live%20Site-green?style=for-the-badge&logo=vercel" alt="Live Demo">
    </a>
  </p>
  <br>
  <p>Made with ❤️ using React, Node.js, and lots of ☕</p>
  <p>© 2024-2025 Muhammad Isaki Prananda. All rights reserved.</p>
</div>
