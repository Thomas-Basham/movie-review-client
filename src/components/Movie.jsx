"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

// Fetch movie details based on the movie ID
const fetchMovie = async (id) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies`
  );
  return data.find((movie) => movie.id == id); // Find the movie by ID
};

// Fetch movie thumbnail from OMDb API
const fetchThumbnail = async (title, year) => {
  const { data } = await axios.get(
    `https://www.omdbapi.com/?s=${title.replaceAll(" ", "_")}&apikey=${
      process.env.NEXT_PUBLIC_OMDB_API_KEY
    }`
  );
  return data?.Search[0];
};

// Fetch the average rating for the movie
const fetchAvgRating = async (id) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/${id}/average-rating`
  );
  return data || 0; // Assuming data returns the average rating
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
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Data stays in the cache for 10 minutes
  });

  // Fetch movie thumbnail
  const { data: thumbnail, isLoading: isThumbnailLoading } = useQuery({
    queryKey: ["thumbnail", movieData?.title, movieData?.release_year],
    queryFn: () => fetchThumbnail(movieData?.title, movieData?.release_year),
    enabled: !!movieData, // Only fetch thumbnail if movie data is available
  });

  // Fetch the average rating for the movie
  const { data: avgRating = 0, isLoading: isAvgRatingLoading } = useQuery({
    queryKey: ["avgRating", id],
    queryFn: () => fetchAvgRating(id),
    enabled: !!movieData, // Only fetch average rating if movie data is available
  });

  if (isMovieLoading) return <div>Loading...</div>;
  if (isMovieError) return <div>Error... {movieError.message}</div>;

  return (
    <div className="relative max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md">
      {/* Display the average rating in the top-right corner */}
      {!isAvgRatingLoading && (
        <div className="absolute p-2 text-center text-white bg-yellow-500 rounded-md shadow-lg top-4 right-4">
          <h2 className="text-xs font-bold tracking-wider uppercase">
            Our Rating
          </h2>
          <div className="mt-2">
            <span className="text-4xl font-extrabold">
              {avgRating.averageRating?.toFixed(1)}
            </span>
            <span className="text-sm font-medium">/ 5</span>
          </div>
          <p className="mt-1 text-xs text-gray-100">
            {avgRating.amountOfRatings} ratings
          </p>
        </div>
      )}

      <div className="flex flex-col items-center md:flex-row md:items-start">
        {/* Display the thumbnail if available */}
        {isThumbnailLoading ? (
          <div className="w-48 bg-gray-200 rounded-lg h-72 animate-pulse" />
        ) : thumbnail ? (
          <Image
            src={thumbnail.Poster}
            alt={movieData?.title}
            width={250}
            height={375}
            className="rounded-lg shadow-lg"
          />
        ) : (
          <div className="flex items-center justify-center w-48 bg-gray-200 rounded-lg h-72">
            <span className="text-sm text-gray-500">No Image Available</span>
          </div>
        )}

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
            {movieData?.description}
          </p>
        </div>
      </div>
    </div>
  );
}
