"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import axios from "axios";
import { FilmIcon } from "@heroicons/react/24/solid";

export default function Movies() {
  // Fetch movies from API
  const fetchMovies = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies`
    );
    return data;
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  if (isLoading)
    return <div className="text-center text-white">Loading....</div>;
  if (isError)
    return (
      <div className="text-center text-red-500">
        Error... {error.message}. Our servers are having trouble
      </div>
    );

  return (
    <div className="min-h-screen text-white bg-gradient-to-r from-purple-800 to-pink-600">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 text-center h-80">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">
          Explore Our Movie Collection
        </h1>
        <p className="max-w-2xl mt-4 text-xl leading-relaxed drop-shadow-md">
          Dive into our curated collection of the latest and greatest movies!
        </p>
      </section>

      {/* Movies Listing */}
      <section className="px-6 py-12 bg-black">
        <h2 className="mb-8 text-4xl font-bold text-center text-yellow-400">
          Available Movies
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((movie) => (
            <div
              key={movie.id}
              className="p-4 text-black transition transform bg-white rounded-lg shadow-lg hover:scale-105"
            >
              {/* <Image
                src={`https://source.unsplash.com/random/800x600?movie-${movie.title}`}
                alt={movie.title}
                width={400}
                height={300}
                className="object-cover w-full h-48 rounded-t-lg"
              /> */}
              <div className="mt-4">
                <h3 className="text-2xl font-bold">{movie.title}</h3>
                <p className="mt-2 text-sm">{movie.description}</p>
                <Link
                  href={`/movie/${movie.id}`}
                  className="block mt-2 font-semibold text-purple-600 hover:underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
