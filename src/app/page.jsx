"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import axios from "axios";
import { FilmIcon, PlayIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const fetchMovies = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies`
    );
    console.log(data);
    return data;
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Data stays in the cache for 10 minutes
  });
  if (isLoading) return <div> Loading....</div>;
  if (isError)
    return <div> Error... {error.message} Our servers are having trouble </div>;

  return (
    <div className="min-h-screen text-white bg-gradient-to-r from-purple-800 to-pink-600">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen px-6 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-lg">
          Welcome to <span className="text-yellow-400">Movie Reviewer</span>
        </h1>
        <p className="max-w-2xl mt-4 text-xl leading-relaxed drop-shadow-md">
          Your go-to spot for movie reviews, recommendations, and ratings. Let
          the rhythm of cinema take over!
        </p>

        <div className="mt-8 space-x-4">
          <Link href="/movies">
            <div className="inline-flex items-center px-6 py-3 font-bold text-black transition transform bg-yellow-500 rounded-full shadow-lg hover:bg-yellow-400 hover:scale-105">
              <FilmIcon className="w-6 h-6 mr-2" />
              Explore Movies
            </div>
          </Link>
          <Link href="/movies">
            <div className="inline-flex items-center px-6 py-3 font-bold text-white transition transform bg-purple-500 rounded-full shadow-lg hover:bg-purple-400 hover:scale-105">
              <PlayIcon className="w-6 h-6 mr-2" />
              Latest Reviews
            </div>
          </Link>
        </div>
      </section>

      <section className="px-6 py-12 bg-black">
        <h2 className="text-4xl font-bold text-center text-yellow-400">
          Featured Movies
        </h2>
        <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array(6)
            .fill("")
            .map((_, idx) => (
              <div
                key={idx}
                className="p-4 text-black transition transform bg-white rounded-lg shadow-lg hover:scale-105"
              >
                <div className="mt-4">
                  <h3 className="text-2xl font-bold">Movie Title {idx + 1}</h3>
                  <p className="mt-2 text-sm">
                    A quick synopsis of the movie. Get ready for an exciting
                    adventure!
                  </p>
                  <Link href={`/movie/${idx + 1}`} disabled>
                    <div className="block mt-2 font-semibold text-purple-600 hover:underline">
                      Read More
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
