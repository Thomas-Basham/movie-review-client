"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Movie({ id }) {
  const fetchMovie = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies`
    );
    console.log(data);
    const movie = data.filter((elm) => elm.id == id);
    console.log(movie);
    return movie[0];
  };
  // Fetch movie thumbnail from an external API like OMDb
  const fetchThumbnail = async (title, year) => {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?s=${title.replaceAll(" ", "_")}&apikey=${
        process.env.NEXT_PUBLIC_OMDB_API_KEY
      }`
    );
    // console.log(data);
    return data.Search[0];
  };

  const {
    data: movieData,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: fetchMovie,
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Data stays in the cache for 10 minutes
  });

  const { data: thumbnail, isLoading: isThumbnailLoading } = useQuery({
    queryKey: ["thumbnail", movieData?.title, movieData?.release_year],
    queryFn: () => fetchThumbnail(movieData?.title, movieData?.release_year),
    enabled: !!movieData, // Only fetch thumbnail if movie data is available
  });

  if (isLoading) return <div> Loading....</div>;
  if (isError)
    return <div> Error... {error.message} Our servers are having trouble </div>;

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center md:flex-row">
          {/* Display the thumbnail if available */}
          {isThumbnailLoading ? (
            <div className="w-48 bg-gray-200 h-72 animate-pulse" />
          ) : thumbnail ? (
            <Image
              src={thumbnail.Poster}
              alt={movieData?.title}
              width={200}
              height={300}
              className="rounded-lg"
            />
          ) : (
            <div className="flex items-center justify-center w-48 text-center bg-gray-200 h-72">
              No Image Available
            </div>
          )}

          <div className="mt-6 md:ml-8 md:mt-0">
            <h1 className="text-3xl font-bold text-gray-900">
              {movieData?.title}
            </h1>
            <p className="text-lg text-gray-700">{movieData?.release_year}</p>
            <p className="mt-4 text-gray-700">{movieData?.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
