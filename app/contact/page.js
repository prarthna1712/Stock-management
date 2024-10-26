"use client";
import React, { useState } from "react";

export default function Contact() {
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (review.trim()) {
      try {
        const response = await fetch("/api/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ review }),
        });

        if (response.ok) {
          setReviews([...reviews, review]);
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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
      <p className="mb-4">
        <strong>Project Owner:</strong> [Your Name]
      </p>
      <p className="mb-4">
        <strong>Email:</strong>{" "}
        <a href="mailto:youremail@example.com">youremail@example.com</a>
      </p>

      <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
          className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-4"
          rows="4"
        ></textarea>
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
        >
          Submit Review
        </button>
      </form>

      <div className="reviews">
        <h3 className="text-xl font-semibold mb-2">Reviews:</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="bg-purple-100 p-3 rounded mb-2">
              {review}
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to leave one!</p>
        )}
      </div>
    </div>
  );
}
