"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";
// Fetch movie details based on the movie ID
const fetchMovie = async (id) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies`
  );
  return data.find((movie) => movie.id == id); // Find the movie by ID
};

// Fetch the average rating for the movie
const fetchAvgRating = async (id) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/${id}/average-rating`
  );
  return data || { averageRating: 0, amountOfRatings: 0 }; // Default rating if no data
};

export default function Movie({ id }) {
  // Fetch movie details
  const {
    data: movieData,
    error: movieError,
    isLoading: isMovieLoading,
    isError: isMovieError,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovie(id),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  // Fetch the average rating for the movie
  const { data: avgRating, isLoading: isAvgRatingLoading } = useQuery({
    queryKey: ["avgRating", id],
    queryFn: () => fetchAvgRating(id),
    enabled: !!movieData,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  if (isMovieLoading) return <LoadingSpinner />;
  if (isMovieError) return <div>Error... {movieError.message}</div>;

  return (
    <div
      className="relative max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md"
      // style={{
      //   backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      {/* Display the average rating in the top-right corner */}
      {!isAvgRatingLoading && (
        <div className="absolute p-2 text-center text-white bg-yellow-500 rounded-md shadow-lg top-4 right-4">
          <h2 className="text-xs font-bold tracking-wider uppercase">
            Our Rating
          </h2>
          <div className="mt-2">
            <span className="text-4xl font-extrabold">
              {avgRating?.averageRating?.toFixed(1)}
            </span>
            <span className="text-sm font-medium">/ 5</span>
          </div>
          <p className="mt-1 text-xs text-gray-100">
            {avgRating?.amountOfRatings} ratings
          </p>
        </div>
      )}

      <div className="flex flex-col items-center md:flex-row md:items-start">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
          alt={movieData.title}
          width={200}
          height={300}
          className="rounded-lg shadow-lg"
        />

        <div className="w-full mt-6 md:ml-8 md:mt-0">
          {/* Movie Title */}
          <h1 className="mb-2 text-4xl font-extrabold leading-tight text-gray-900">
            {movieData?.title}
          </h1>

          {/* Release Year */}
          <p className="mb-4 text-xl font-medium text-gray-600">
            Released: {movieData?.release_year}
          </p>

          {/* Movie Description */}
          <p className="text-base leading-relaxed text-gray-700">
            {movieData?.overview}
          </p>
        </div>
      </div>
    </div>
  );
}
