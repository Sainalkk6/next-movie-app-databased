"use client";
import React from "react";
import { dataQueryKey } from "../../../QueryKeys/dataQueryKeys";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import MovieCard from "@/components/MovieCard";
import { DataType } from "@/types/types";
import { CustomPaginationButtons } from "@/components/CustomPaginationButtons";


const page = ({ searchParams }: { searchParams: { page: string } }) => {
  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 10;
  const { data, isLoading } = useQuery({
    queryKey: [dataQueryKey.movies, page],
    queryFn: async () => {
      const res = await fetch(`/api/data?page=${page}&limit=${perPage}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    },
    placeholderData: keepPreviousData,
  });


  const totalPages = data ? Math.ceil(data.itemCount / perPage) : 1;
  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const start = 1;

  const nextPage = page + 1;
  let pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pb-14">
      <div>
        {isLoading ? (
          <div className="flex justify-center mt-24">
            <img src="spinner.svg" alt="Loading..." className="h-52" />
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {data.data && data.data.map((movie: DataType) => <MovieCard description={movie.overview} id={movie.id} poster={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`} rating={movie.vote_average} releaseData={movie.release_date} title={movie.title} key={movie.id} />)}
            <div className="flex justify-center items-center gap-[5px]">
              <CustomPaginationButtons href={`?page=${start}`} icon label="First.svg" />
              <CustomPaginationButtons href={`?page=${prevPage}`} icon label="Prev.svg" />
              {/* {pageNumbers.map((p,index) => (
                <Link key={index} scroll={false} onClick={scrollToTop} className={`flex items-center justify-center w-8 h-8 p-[10px] rounded-lg border border-[#f1f1f1] ${page===p ? "bg-blue-600 text-white" : null}`} href={`?page=${p}`}>{p}</Link>
              ))} */}
              <CustomPaginationButtons href={`?page=${nextPage}`} icon label="Next.svg" />
              <CustomPaginationButtons href={`?page=${totalPages}`} icon label="Last.svg" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
