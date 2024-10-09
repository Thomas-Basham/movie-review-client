"use client";

import Image from "next/image";
import { useQuery, useQueries } from "@tanstack/react-query";
import Link from "next/link";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";
// Fetch the average rating for the movie
const fetchAvgRating = async (id) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies/${id}/average-rating`
  );
  return data || { averageRating: 0 }; // Assuming data returns the average rating
};

export default function Movies() {
  // Fetch movies from API
  const fetchMovies = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies`
    );
    return data;
  };

  const {
    data: movies,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Data stays in the cache for 10 minutes
  });

  // Fetch ratings for all movies using useQueries
  const ratingQueries = useQueries({
    queries: (movies ?? []).map((movie) => ({
      queryKey: ["average-rating", movie.id],
      queryFn: () => fetchAvgRating(movie.id),
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      enabled: !!movie, // Fetch only if the movie exists
    })),
  });

  // Combine movies and their ratings
  const moviesWithRatings = movies?.map((movie, index) => {
    const rating = ratingQueries[index]?.data?.averageRating || 0;
    return { ...movie, rating };
  });

  // Sort movies by rating
  const sortedMovies = moviesWithRatings?.sort((a, b) => b.rating - a.rating);

  if (isLoading || ratingQueries.some((query) => query.isLoading))
    return <LoadingSpinner />;

  if (isError || ratingQueries.some((query) => query.isError))
    return (
      <div className="text-center text-red-500">
        Error... {error.message || "Error loading ratings"}. Our servers are
        having trouble.
      </div>
    );

  return (
    <div className="min-h-screen text-white bg-gradient-to-r from-purple-800 to-pink-600">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 text-center h-80">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">
          2024 Movie Collection
        </h1>
        <p className="max-w-2xl mt-4 text-xl leading-relaxed drop-shadow-md">
          Check out some movies that were released while we were working
          overtime to learn how to code!
        </p>
      </section>

      {/* Movies Listing */}
      <section className="px-6 py-12 bg-black">
        <h2 className="mb-8 text-4xl font-bold text-center text-yellow-400">
          Available Movies (Sorted by Rating)
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sortedMovies?.map((movie) => (
            <div
              key={movie.id}
              className="relative p-4 text-white transition transform bg-gray-900 rounded-lg shadow-lg hover:scale-105"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>

              {/* Movie Poster */}
              <div className="relative z-10">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </div>

              {/* Movie Info */}
              <div className="relative z-10 mt-4">
                <h3 className="text-2xl font-bold">{movie.title}</h3>
                <p className="text-lg font-semibold text-yellow-400">
                  {movie.release_year}
                </p>
                <p className="mt-2 text-sm line-clamp-3">{movie.overview}</p>

                {/* Display Rating */}
                <p className="mt-2 font-semibold text-yellow-400">
                  Rating: {movie.rating.toFixed(1)} / 5
                </p>

                <Link
                  href={`/movie/${movie.id}`}
                  className="block mt-4 font-semibold text-yellow-400 hover:underline"
                >
                  See Reviews
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
