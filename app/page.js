import React from "react";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      {/* Search a Product Section */}
      <div className="container bg-green-50 mx-auto p-4">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-green-700">
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
      <div className="container bg-red-50 mx-auto p-4">
        <h1 className="text-2xl font-extrabold mb-6 text-center">
          Add a Product
        </h1>

        {/* Form for adding products (UI only) */}
        <form className="mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Product Name
            </label>
            <input
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
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Enter quantity"
            />
          </div>

          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* Display Current Stock Section */}
      <div className="container bg-white mx-auto p-4">
        <h1 className="text-2xl font-extrabold mb-6 text-center">
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
            <tr>
              <td className="py-2 px-4 border-b">1</td>
              <td className="py-2 px-4 border-b">Product A</td>
              <td className="py-2 px-4 border-b">$100</td>
              <td className="py-2 px-4 border-b">50</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">2</td>
              <td className="py-2 px-4 border-b">Product B</td>
              <td className="py-2 px-4 border-b">$200</td>
              <td className="py-2 px-4 border-b">30</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">3</td>
              <td className="py-2 px-4 border-b">Product C</td>
              <td className="py-2 px-4 border-b">$150</td>
              <td className="py-2 px-4 border-b">70</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
