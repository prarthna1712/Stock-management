"use client";
import Header from "@/components/Header";
import React, { useState, useEffect } from "react";

export default function Contact() {
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  // Fetch reviews when the page loads
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/review");
        if (response.ok) {
          const data = await response.json();
          setReviews(data.review || []);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  // Handle form submission for new review
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (review.trim()) {
      try {
        const response = await fetch("/api/review", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ review }),
        });

        if (response.ok) {
          const result = await response.json();
          // Add the new review to the top of the list
          setReviews([{ review, createdAt: new Date() }, ...reviews]);
          setReview("");
        } else {
          console.error("Failed to save review");
        }
      } catch (error) {
        console.error("Error saving review:", error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
        <p className="mb-4">
          <strong>Project Owner:</strong> <b>Prarthana Bhalerao</b>
        </p>
        <p className="mb-4">
          <strong>Email:</strong>{" "}
          <a href="mailto:prarthanab1703@gmail.com">
            <b>prarthanab1703@gmail.com</b>
          </a>
        </p>

        <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
        <form className="mb-4">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
            className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-4"
            rows="4"
          ></textarea>
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
          >
            Submit Review
          </button>
        </form>

        <div className="reviews">
          <h3 className="text-xl font-semibold mb-2">Reviews:</h3>
          {reviews.length > 0 ? (
            reviews.map((reviewItem, index) => (
              <div
                key={index}
                className="bg-purple-100 p-3 rounded mb-2 shadow"
              >
                <p className="text-gray-800">{reviewItem.review}</p>
                <p className="text-sm text-gray-500">
                  {new Date(reviewItem.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to leave one!</p>
          )}
        </div>
      </div>
    </>
  );
}
