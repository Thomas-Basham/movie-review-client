"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Movie from "@/components/Movie";
import Reviews from "@/components/Reviews";
export default function Page({ params }) {
  return (
    <>
      <div className="min-h-screen text-white bg-gradient-to-r from-purple-800 to-pink-600">
        <div className="max-w-4xl p-6 mx-auto">
          <Movie id={params.id} />

          <Reviews movieId={params.id} />
        </div>
      </div>
    </>
  );
}
