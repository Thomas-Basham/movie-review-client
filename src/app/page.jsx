"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default function Home() {
  const fetchMovies = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies`
    );
    console.log(data);
    return data;
  };

  // Access the client
  // const queryClient = useQueryClient();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });
  if (isLoading) return <div> Loading....</div>;
  if (isError) return <div> Error... {error.message}</div>;
  return (
    <div>
      <ul>
        {data?.map((movie, index) => (
          <li key={index}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
