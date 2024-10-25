"use client";
import React from "react";
import Header from "../components/Header";
import { useState, useEffect } from "react";

export default function Home() {
  const [productForm, setproductForm] = useState({});
  const [products, setproducts] = useState({});
  const [alert, setAlert] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingaction, setLoadingaction] = useState(false);
  const [dropdown, setDropdown] = useState([]);

  useEffect(() => {
    const fetchproducts = async () => {
      const response = await fetch("/api/products");
      let rjson = await response.json();
      setproducts(rjson.products);
    };
    fetchproducts();
  }, []);

  const addproduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        setAlert("Your product has been added!");
        setproductForm({
          slug: "",
          price: "",
          quantity: "",
        });
      } else {
        console.error("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleChange = (e) => {
    setproductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (query === "") {
      setDropdown([]);
      return;
    }
  });

  const onDropdownEdit = async (e) => {
    setQuery(e.target.value);
    if (!loading) {
      setLoading(true);
      setDropdown([]);
      const response = await fetch(`/api/search?query=${query}`);
      let rjson = await response.json();
      setDropdown(rjson.products);
      setLoading(false);
    }
  };

  const buttonAction = async (action, slug, initialQuantity) => {
    setLoadingaction(true);
    const response = await fetch("/api/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, slug, initialQuantity }),
    });
    const result = await response.json();

    if (result.success) {
      setDropdown((prevDropdown) =>
        prevDropdown.map((item) =>
          item.slug === slug ? { ...item, quantity: result.newQuantity } : item
        )
      );
    }
    setLoadingaction(false);
  };

  return (
    <>
      <Header />

      {/* Search a Product Section */}
      <div className="container mx-auto p-6 bg-purple-50">
        <div className="text-purple-600 text-center p-2">{alert}</div>
        <h1 className="text-3xl font-semibold mb-6 text-center text-purple-800">
          Search a Product
        </h1>

        <form className="mb-8">
          <div className="mb-4">
            <input
              onChange={onDropdownEdit}
              type="text"
              className="shadow appearance-none border border-purple-400 rounded w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-purple-400"
              placeholder="Search by product name"
            />
            {loading && (
              <div className="flex justify-center items-center h-20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="animate-spin h-5 w-5 text-black-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="4" />
                </svg>
              </div>
            )}

            <div className="dropcontainer absolute w-[96vw] border bg-purple-100 rounded-md mt-2 shadow-lg">
              {dropdown.map((item) => {
                return (
                  <div
                    key={item.slug}
                    className="flex justify-between p-2 my-1 border-b border-purple-200"
                  >
                    <span>
                      {item.slug} ({item.quantity}) available for ${item.price}
                    </span>
                    <div className="flex">
                      <button
                        onClick={() => {
                          buttonAction("minus", item.slug, item.quantity);
                        }}
                        disabled={loadingaction}
                        className="cursor-pointer px-2 py-1 bg-purple-500 text-white font-semibold rounded-lg shadow-md disabled:bg-purple-200"
                      >
                        -
                      </button>
                      <span className="quantity mx-3">{item.quantity}</span>
                      <button
                        onClick={() => {
                          buttonAction("plus", item.slug, item.quantity);
                        }}
                        disabled={loadingaction}
                        className="cursor-pointer px-2 py-1 bg-purple-500 text-white font-semibold rounded-lg shadow-md disabled:bg-purple-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-4">
            <select className="shadow border border-purple-400 rounded w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-purple-400">
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="furniture">Furniture</option>
              <option value="beauty">Beauty</option>
            </select>
          </div>

          <button
            type="button"
            className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
          >
            Search
          </button>
        </form>
      </div>

      {/* Add Product Section */}
      <div className="container mx-auto p-6 bg-purple-50">
        <h1 className="text-3xl font-semibold mb-6 text-center text-purple-800">
          Add a Product
        </h1>

        <form className="mb-8">
          <div className="mb-4">
            <label className="block text-purple-700 text-sm font-bold mb-2">
              Product Slug
            </label>
            <input
              value={productForm?.slug || ""}
              onChange={handleChange}
              name="slug"
              type="text"
              className="shadow border border-purple-400 rounded w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-purple-400"
              placeholder="Enter product name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-purple-700 text-sm font-bold mb-2">
              Price
            </label>
            <input
              value={productForm?.price || ""}
              onChange={handleChange}
              name="price"
              type="number"
              className="shadow border border-purple-400 rounded w-[98vw] py-2 px-3 text-gray-700 focus:ring-2 focus:ring-purple-400"
              placeholder="Enter price"
            />
          </div>

          <div className="mb-4">
            <label className="block text-purple-700 text-sm font-bold mb-2">
              Quantity
            </label>
            <input
              value={productForm?.quantity || ""}
              onChange={handleChange}
              name="quantity"
              type="number"
              className="shadow border border-purple-400 rounded w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-purple-400"
              placeholder="Enter quantity"
            />
          </div>

          <button
            type="submit"
            onClick={addproduct}
            className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* Display Current Stock Section */}
      <div className="container mx-auto p-6 bg-purple-50">
        <h1 className="text-3xl font-semibold mb-6 text-center text-purple-800">
          Display Current Stock
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
