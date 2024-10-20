"use client";
import React from "react";
import Header from "../components/Header";
import { useState, useEffect } from "react";

export default function Home() {
  const [productForm, setproductForm] = useState({});
  const [products, setproducts] = useState({});
  useEffect(() => {
    const fetchproducts = async () => {
      const response = await fetch("/api/products");
      let rjson = await response.json();
      setproducts(rjson.products);
    };
    fetchproducts();
  }, []);
  const addproduct = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm), // Convert product data to JSON format
      });

      if (response.ok) {
        // Handle successful product addition
        alert("Product added successfully!");
        setproductForm({
          slug: "",
          price: "",
          quantity: "",
        });
      } else {
        // Handle error response
        alert("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product.");
    }
  };

  const handleChange = (e) => {
    setproductForm({ ...productForm, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Header />
      {/* Search a Product Section */}
      <div className="container  mx-auto p-2">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-700">
          Search a Product
        </h1>

        {/* Search form with input and dropdown */}
        <form className="mb-8">
          <div className="mb-4">
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Search by product name"
            />
          </div>

          <div className="mb-4">
            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700">
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="furniture">Furniture</option>
              <option value="beauty">Beauty</option>
            </select>
          </div>

          <button
            type="button"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Search
          </button>
        </form>
      </div>

      {/* Add Product Section */}
      <div className="container mx-auto p-2">
        <h1 className="text-2xl font-bold mb-6 text-center">Add a Product</h1>

        {/* Form for adding products (UI only) */}
        <form className="mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Product Slug
            </label>
            <input
              onChange={handleChange}
              name="slug"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Enter product name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Price
            </label>
            <input
              onChange={handleChange}
              name="price"
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Enter price"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Quantity
            </label>
            <input
              onChange={handleChange}
              name="quantity"
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Enter quantity"
            />
          </div>

          <button
            type="submit"
            onClick={addproduct}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* Display Current Stock Section */}
      <div className="container mx-auto p-2">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Display Current Stock
        </h1>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Product ID</th>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product.slug}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{product.slug}</td>
                  <td className="py-2 px-4 border-b">${product.price}</td>
                  <td className="py-2 px-4 border-b">{product.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-2 px-4 border-b text-center">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
