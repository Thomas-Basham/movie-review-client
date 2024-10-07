import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactStars from "react-stars";

export default function Review({ review }) {
  const fetchRating = async (reviewId) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/${reviewId}/rating`
    );
    const rating = res.data[0]?.rating || 0; // Assuming the response contains rating data
    return rating;
  };

  const {
    data: rating = 0,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["rating", review.id], // Query key based on review id
    queryFn: () => fetchRating(review.id), // Fetch function
    refetchOnWindowFocus: false, // Disable refetch on window focus if not needed
  });

  const formattedTimestamp = new Date(review.timestamp).toLocaleString();

  return (
    <>
      <div className="flex justify-between">
        <p className="text-sm text-gray-400">{formattedTimestamp}</p>

        {isLoading ? (
          <ReactStars
            count={5}
            size={24}
            color2={"#ffd700"}
            value={0}
            edit={false}
          />
        ) : isError ? (
          <div className="text-red-400">Error: {error.message}</div>
        ) : (
          <ReactStars
            count={5}
            size={24}
            color2={"#ffd700"}
            value={rating}
            edit={false}
          />
        )}
      </div>
      <p className="text-gray-200">{review.content}</p>
    </>
  );
}
