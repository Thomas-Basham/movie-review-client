"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
export default function Reviews({ movieId }) {
  const [review, setReview] = useState("");

  const queryClient = useQueryClient();

  // Fetch reviews for a specific movie
  const fetchReviews = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/${movieId}/reviews`
    );

    console.log(res.data);
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

  // Add a new review using useMutation
  const addReview = async (newReview) => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/${movieId}/reviews`,
      newReview
    );
  };

  const mutation = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      // Invalidate and refetch the reviews query after posting
      queryClient.invalidateQueries(["reviews", movieId]);

      // reset our review state
      setReview("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!review) return; // Don't submit incomplete reviews

    const newReview = { content: review };
    mutation.mutate(newReview);
  };

  if (isLoading)
    return <div className="text-center text-white">Loading....</div>;
  if (isError)
    return (
      <div className="text-center text-red-500">
        Error... {error.message}. Our servers are having trouble
      </div>
    );

  return (
    <div>
      <h2 className="py-3 mb-5 text-3xl border-b">Reviews</h2>

      <form onSubmit={handleSubmit} className="mb-6 text-black">
        <textarea
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
          rows={3}
          required
        />

        <button
          type="submit"
          className="px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-500"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Posting..." : "Post Review"}
        </button>
      </form>
      {reviews?.length > 0 ? (
        <ul className="space-y-4">
          {reviews.map((review, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded-lg shadow">
              <p className="text-gray-600">{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>No reviews yet. Be the first to review!</div>
      )}
    </div>
  );
}
