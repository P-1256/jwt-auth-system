# JWT Authentication System

A secure backend authentication system built with **Node.js**, **Express.js**, **MongoDB**, and **JWT (JSON Web Tokens)**.

This project provides a complete user authentication workflow including:
- User registration
- User login
- JWT token generation
- Protected routes
- Authentication middleware
- MongoDB integration with Mongoose

---

## Features

- User Signup/Register
- User Login Authentication
- JWT-based Authorization
- Protected API Routes
- Password Hashing
- MongoDB Database Integration
- Middleware-based Route Protection
- Clean MVC Folder Structure

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs

---

## Project Structure

jwt-auth-system-main/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── authController.js
│
├── middlewares/
│   └── authMiddleware.js
│
├── models/
│   └── User.js
│
├── routes/
│   ├── authRoutes.js
│   └── userRoutes.js
│
├── utils/
│   └── generateToken.js
│
├── server.js
├── package.json
└── .gitignore
