# Stock Management Application

This project is a stock management application built using a modern full-stack architecture. It utilizes Next.js for the interactive frontend and integrates MongoDB for database management through Next.js API routes. This design provides a complete, scalable solution for handling inventory data, searching products, and managing reviews without needing a separate backend framework.

## Key Technologies

- **Frontend**: Next.js, Tailwind CSS (using Tailblock components)
- **Backend**: Next.js API Routes (serverless API layer)
- **Database**: MongoDB (cloud-based via MongoDB Atlas)

## Table of Contents

1.  [Getting Started](#getting-started)
2.  [Project Structure](#project-structure)
3.  [Prerequisites](#prerequisites)
4.  [Installation](#installation)
5.  [Environment Setup](#environment-setup)
6.  [Running the Application](#running-the-application)
7.  [API Endpoints](#api-endpoints)
8.  [Features](#features)
9.  [Screenshots](#screenshots)
10. [Contributing](#contributing)

---

## Getting Started

To get this stock management application up and running, follow the steps below to set up the frontend and database connectivity.

---

## Project Structure

graphql

project-root/
├── app/ # Next.js app directory
│ ├── page.js # Main Home page
│ ├── products/ # Product-related pages and components
│ ├── contact/ # Contact and feedback page
├── components/ # Reusable UI components (e.g., navbar, mobile menu)
├── lib/ # Utility libraries
├── public/ # Static assets like images
├── pages/api/ # API route directory (acts as backend)
│ ├── products.js # Handles product-related API requests
│ └── reviews.js # Handles review-related API requests
├── README.md # Project documentation
├── package.json # Project dependencies
└── ...

---

## Prerequisites

This project requires the following tools installed on your system:

- **Node.js** (v14 or later)
- **MongoDB Atlas** account for database storage
- **Git**: For cloning the repository

---

## Installation

### 1. Clone the Repository

Begin by cloning the repository using Git:

git clone https://github.com/prarthna1712/stock-management.git
cd stock-management

### 2. Install Dependencies

Navigate to the project root directory and install the required Next.js dependencies:

npm install

---

## Environment Setup

To connect to MongoDB, create a `.env.local` file in the root directory and add the following environment variable for MongoDB connectivity:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority

Replace `<username>`, `<password>`, and `<database>` with your MongoDB credentials. Ensure the `.env.local` file is not pushed to version control to keep your credentials secure.

---

## Running the Application

1.  **Starting the Frontend**  
    In the project root directory, run the Next.js development server:

    `npm run dev`

    By default, the frontend should be available at `http://localhost:3000`.

2.  **API Routes**  
    Next.js API routes (located in `pages/api/`) handle requests for managing products and reviews, eliminating the need for a separate backend server. The API routes will automatically be available at endpoints like `http://localhost:3000/api/products` and `http://localhost:3000/api/reviews`.

---

## API Endpoints

### Products API

- **GET** `/api/products`: Fetches all products in the inventory.
- **POST** `/api/products`: Adds a new product to the inventory.

### Reviews API

- **GET** `/api/reviews`: Fetches all reviews.
- **POST** `/api/reviews`: Adds a new review.

### Example API Usage

The example code below shows a `POST` request to add a new product:

javascript

Copy code

`fetch('/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Product Name',
    quantity: 10,
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));`

---

## Features

- **Product Management**: Add, remove, or update product quantities using the dropdown search.
- **Dynamic Search**: Search products by name and view product details.
- **General Review Section**: Allows users to submit and view feedback.
- **Responsive UI**: Built with Tailwind CSS and Tailblock components for a polished user interface.
- **Serverless API**: API routes provided by Next.js eliminate the need for a separate backend server.

---

## Screenshots

Here are some screenshots showcasing different parts of the application:

1.  **Home Page**: Shows an overview of the stock inventory.
2.  **Product Search**: Dynamic search functionality for finding specific products.
3.  **Review Section**: Submit and display user reviews.
4.  **Responsive Navigation**: Responsive navbar using Tailblock components.

_Screenshots can be added here to visually demonstrate the app's features._

---

## Contributing

1.  Fork the repository
2.  Create a new branch (`git checkout -b feature/YourFeature`)
3.  Commit your changes (`git commit -m 'Add YourFeature'`)
4.  Push to the branch (`git push origin feature/YourFeature`)
5.  Open a Pull Request
