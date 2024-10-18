"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";
import { dataQueryKey } from "../../../../QueryKeys/dataQueryKeys";

import { DataType } from "@/types/types";
import MovieCardOtherPage from "@/components/MovieCardOtherPage";

const page = () => {
  const { data: session, status } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: [dataQueryKey.watchlaters],
    queryFn: async () => {
      const response = await fetch("/api/watchlater", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session?.user?.email }),
      });
      if (!response.ok) throw new Error("Something went wrong");
      return await response.json();
    },
    enabled: status === "authenticated",
  });

  return (
    <div>
      {data && !isLoading ? (
        data.map((movie: DataType) => <MovieCardOtherPage key={movie.id} page="WatchLaterPage" description={movie.overview} id={movie.id} poster={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`} rating={movie.vote_average} releaseData={movie.release_date} title={movie.title} />)
      ) : (
        <div className="flex justify-center mt-24">
          <img src="spinner.svg" alt="Loading..." className="h-52" />
        </div>
      )}

      {data && data.length < 1 && <div className="flex items-center text-center justify-center text-3xl font-semibold pt-52">Nothing to see here!</div>}
    </div>
  );
};

export default page;
