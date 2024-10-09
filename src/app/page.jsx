"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import axios from "axios";
import { FilmIcon, PlayIcon } from "@heroicons/react/24/solid";
import LoadingSpinner from "@/components/LoadingSpinner";
export default function Home() {
  const fetchMovies = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies`
    );
    return data;
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Data stays in the cache for 10 minutes
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return <div>Error... {error.message}. Our servers are having trouble.</div>;

  return (
    <div className="min-h-screen text-white bg-gradient-to-r from-purple-800 to-pink-600">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-screen px-6 text-center">
        <div className="absolute inset-0 opacity-20">
          {/* <Image
            src="/path-to-your-background-image.jpg" // Add a movie-themed image
            alt="Movie Background"
            layout="fill"
            objectFit="cover"
            quality={100}
          /> */}
        </div>
        <h1 className="z-10 text-6xl font-extrabold tracking-tight drop-shadow-lg">
          Codex January 2024 Cohort{" "}
          <span className="text-yellow-400">Movie Reviewer</span>
        </h1>
        <p className="z-10 max-w-2xl mt-4 text-2xl leading-relaxed drop-shadow-md">
          This is a collection of 50 movies that were released while our cohort
          was learning how to code full stack apps!
        </p>

        <div className="z-10 mt-8 space-x-4">
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

      {/* Featured Movies Section */}
      <section className="px-6 py-12 bg-black">
        <h2 className="text-4xl font-bold text-center text-yellow-400">
          Featured Movies
        </h2>
        <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.slice(0, 6).map((movie) => (
            <div
              key={movie.TMDBid}
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
                <Link href={`/movie/${movie.id}`}>
                  <div className="block mt-4 font-semibold text-yellow-400 hover:underline">
                    See Reviews
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
