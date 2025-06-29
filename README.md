Live Demo : https://food-ordering-five-psi.vercel.app/en/menu
Source Code : https://github.com/KHAYRE-DDINE/food-ordering

# 🍔 Delicious Bites - Modern Food Ordering Platform

![Delicious Bites Banner](https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=1380&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

## 🌟 Overview

Delicious Bites is a modern, feature-rich food ordering platform built with Next.js 15, Prisma, and Redux. It offers a seamless experience for customers to browse, customize, and order their favorite meals with just a few clicks.

## ✨ Features

- **🌐 Multi-language Support**: Built-in internationalization for global reach
- **🍕 Rich Menu Categories**: Browse food by categories (Classic, Vegetarian, Meat, Cheese, Spicy)
- **🛒 Interactive Cart**: Add items, customize with extras, and manage your order
- **📱 Responsive Design**: Perfect experience on any device
- **💳 Secure Checkout**: Complete your order with confidence
- **👤 User Accounts**: Create an account to track orders and save preferences
- **🔍 Search Functionality**: Easily find your favorite dishes

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, Redux Toolkit
- **Styling**: Tailwind CSS, DaisyUI
- **Database**: MySQL with Prisma ORM
- **Authentication**: Custom auth system
- **State Management**: Redux with RTK
- **UI Components**: Radix UI, Shadcn
- **Icons**: Lucide React

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- MySQL database

## 🏗️ Project Structure

```
food-ordering/
├── prisma/                # Database schema and migrations
├── public/                # Static assets
├── src/
│   ├── app/               # Next.js app router pages
│   ├── components/        # Reusable UI components
│   ├── constants/         # Application constants
│   ├── dictionaries/      # Internationalization files
│   ├── lib/               # Utility functions
│   ├── redux/             # Redux store configuration
│   ├── server/            # Server-side code
│   └── types/             # TypeScript type definitions
└── ...config files
```

## 🌍 Internationalization

The application supports multiple languages through Next.js internationalization features. Currently implemented languages:
- English
- Additional languages can be easily added through the dictionaries system

## 🔐 Authentication

The application includes a complete user authentication system with:
- User registration
- Login/logout functionality
- Profile management
- Role-based access (User/Admin)

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Made with ❤️ by Khayreddine
