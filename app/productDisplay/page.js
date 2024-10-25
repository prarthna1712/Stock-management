// pages/ProductsPage.js
"use client";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data.products || []);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto p-6 bg-purple-50">
        <h1 className="text-3xl font-semibold mb-6 text-center text-purple-800">
          Product Inventory
        </h1>
        <table className="min-w-full bg-white border border-purple-300">
          <thead className="bg-purple-100">
            <tr>
              <th className="py-2 px-4 border-b text-purple-700">Product ID</th>
              <th className="py-2 px-4 border-b text-purple-700">
                Product Name
              </th>
              <th className="py-2 px-4 border-b text-purple-700">Price</th>
              <th className="py-2 px-4 border-b text-purple-700">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
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
