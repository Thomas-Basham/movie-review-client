"use client";
import { useState } from "react";
import ReactStars from "react-stars";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function AddReviewForm({
  showReviewForm,
  movieId,
  setShowReviewForm,
}) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const queryClient = useQueryClient();

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
  };

  // Add a new review using useMutation
  const addReview = async (newReview) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/${movieId}/reviews`,
      newReview
    );
    return res.data; // Assuming the server returns the created review, including its ID
  };

  const mutation = useMutation({
    mutationFn: addReview,
    onSuccess: (newReview) => {
      console.log(newReview);
      // After the review is created, add the rating
      const reviewId = newReview.id || newReview[0]?.id; // Ensure correct ID access
      addRatingMutation.mutate({ reviewId, rating });

      // Invalidate and refetch the reviews query after posting
      queryClient.invalidateQueries(["reviews", movieId]);

      // Reset the form state
      setReview("");
      setRating(0);
      setShowReviewForm(false);
    },
  });

  // Add rating using useMutation
  const addRating = async (ratingData) => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/${ratingData.reviewId}/rate`,
      { rating: ratingData.rating }
    );
  };

  const addRatingMutation = useMutation({
    mutationFn: addRating,
    onSuccess: () => {
      // Invalidate and refetch the ratings query after posting
      queryClient.invalidateQueries(["ratings", movieId]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!review || rating === 0) return console.log("no rating or review!!!");

    const newReview = { content: review };
    mutation.mutate(newReview);
  };

  return (
    <>
      {showReviewForm && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="w-full mb-4">
            <ReactStars
              count={5}
              size={24}
              color2={"#ffd700"}
              onChange={handleRating}
              value={rating}
            />
          </div>
          <textarea
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-4 mb-4 text-white bg-black border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 drop-shadow-md"
            rows={3}
            required
          />

          <button
            type="submit"
            className={`px-6 py-3 font-bold text-black transition transform bg-yellow-500 rounded-full shadow-lg hover:bg-yellow-400 hover:scale-105 ${
              mutation.isLoading || addRatingMutation.isLoading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={mutation.isLoading || addRatingMutation.isLoading}
          >
            {mutation.isLoading || addRatingMutation.isLoading
              ? "Posting..."
              : "Post Review"}
          </button>
        </form>
      )}
    </>
  );
}
