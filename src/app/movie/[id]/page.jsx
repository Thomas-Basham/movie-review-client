"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Page({ params }) {
  const fetchMovie = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/movies`
    );
    console.log(data);
    const movie = data.filter((elm) => elm.id == params.id);
    console.log(movie);
    return movie[0];
  };
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["movie"],
    queryFn: fetchMovie,
  });

  if (isLoading) return <div> Loading....</div>;
  if (isError)
    return <div> Error... {error.message} Our servers are having trouble </div>;

  return <div>{data?.title}</div>;
}
