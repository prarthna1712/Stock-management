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
  const [dropdown, setDropdown] = useState([
    {
      slug: "sofaa",
      price: "",
      quantity: "",
    },
    {
      slug: "motor",
      price: "",
      quantity: "",
    },
  ]);
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
        console.log("Product added successfully!");
        setAlert("Your product has been added!");
        setproductForm({
          slug: "",
          price: "",
          quantity: "",
        });
      } else {
        // Handle error response
        console.error("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product.");
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
  return (
    <>
      <Header />
      {/* Search a Product Section */}
      <div className="container  mx-auto p-2">
        <div className="text-green-500 text-center p-2">{alert}</div>
        <h1 className="text-2xl font-bold mb-6 text-center text-green-700">
          Search a Product
        </h1>

        {/* Search form with input and dropdown */}
        <form className="mb-8">
          <div className="mb-4">
            <input
              onBlur={() => {
                setDropdown([]);
              }}
              onChange={onDropdownEdit}
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Search by product name"
            />
            {loading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "30vh",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    margin: "auto",
                    background: "none",
                    display: "block",
                  }}
                  width="30px"
                  height="30px"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid"
                >
                  <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="10"
                    r="35"
                    strokeDasharray="164.93361431346415 56.97787143782138"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      repeatCount="indefinite"
                      dur="1s"
                      values="0 50 50;360 50 50"
                      keyTimes="0;1"
                    />
                  </circle>
                </svg>
              </div>
            )}
            <div className="dropcontainer absolute w-[98vw]  border-1 bg-purple-100 rounded-md">
              {dropdown.map((item) => {
                return (
                  <div
                    key={item.slug}
                    className="conatainer flex justify-between  p-2 my-1 border-b-2"
                  >
                    <span className="slug">
                      {item.slug} ({item.quantity}) available for $ {item.price}
                    </span>
                    <div className="mx-5">
                      <span className="substract inline-block px-3 py-1 bg-purple-500 text-white font-semibold rounded-lg shadow-md">
                        {" "}
                        -{" "}
                      </span>
                      <span className="quantity mx-3">{item.quantity}</span>
                      <span className="add inline-block px-3 py-1 bg-purple-500 text-white font-semibold rounded-lg shadow-md">
                        {" "}
                        +{" "}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
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
              value={productForm?.slug || ""}
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
              value={productForm?.price || ""}
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
              value={productForm?.quantity || ""}
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
