"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { PlusIcon } from "@heroicons/react/24/outline";
import AddReviewForm from "./AddReviewForm";
import Review from "./Review";
export default function Reviews({ movieId }) {
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Fetch reviews for a specific movie
  const fetchReviews = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/${movieId}/reviews`
    );
    return res.data;
  };

  // Fetch reviews using useQuery
  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reviews", movieId],
    queryFn: fetchReviews,
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Data stays in the cache for 10 minutes
  });

  return (
    <div className="p-6 mt-5 rounded-lg shadow-lg bg-gradient-to-r from-purple-800 to-pink-600">
      <div className="flex items-center justify-between w-full mb-5 border-b border-gray-600">
        <h2 className="py-3 text-4xl font-extrabold text-yellow-400 drop-shadow-md">
          Reviews
        </h2>
        {!showReviewForm && (
          <button
            className="flex items-center"
            onClick={() => setShowReviewForm(true)}
          >
            <PlusIcon width={24} color="white" /> Review
          </button>
        )}
      </div>
      <AddReviewForm
        showReviewForm={showReviewForm}
        movieId={movieId}
        setShowReviewForm={() => setShowReviewForm(false)}
      />

      {reviews?.length > 0 ? (
        <ul className="space-y-4">
          {reviews.map((review, index) => (
            <li
              key={index}
              className="p-4 text-white transition transform bg-black rounded-lg shadow-lg hover:scale-105"
            >
              <Review review={review} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-400">
          No reviews yet. Be the first to review!
        </div>
      )}
    </div>
  );
}
