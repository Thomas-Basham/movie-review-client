"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import axios from "axios";
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
  });
  if (isLoading) return <div> Loading....</div>;
  if (isError)
    return <div> Error... {error.message} Our servers are having trouble </div>;

  return (
    <div>
      <h2>Movie List</h2>
      <ul>
        {data?.map((movie, index) => (
          <li key={index}>
            <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
