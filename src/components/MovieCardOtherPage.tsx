"use client";
import React, { useState } from "react";
import star from "../../public/star.svg";
import Image from "next/image";
import { NewMovieTypeProps } from "@/types/types";
import { useRouter } from "next/navigation";
import { RiCloseLargeLine } from "react-icons/ri";
import { useQueryClient } from "@tanstack/react-query";
import { dataQueryKey } from "../../QueryKeys/dataQueryKeys";


const MovieCardOtherPage = ({ description, poster, rating, releaseData, title, id, page }: NewMovieTypeProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();


  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/deleteFav`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    });
    if (response.ok) {
      queryClient.invalidateQueries({ queryKey: [dataQueryKey.favorites] });
    }
    const data = await response.json();
  };


  const deleteWatchlater = async (id: number) => {
    const response = await fetch("/api/deleteWatchlater", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    });
    if (response.ok) {
      queryClient.invalidateQueries({ queryKey: [dataQueryKey.watchlaters] });
    }

    const data = await response.json();
  };

  return (
    <div className="w-full flex py-[30px] px-9 items-center justify-center gap-6 ">
      <div></div>
      <div className="flex max-w-[1200px] border border-black md:border-0 md:flex-row flex-col  w-full justify-end items-center px-6 gap-6 hover:shadow-lg transition-all duration-300 border-b pb-10 dark:border-b-slate-700 border-b-[#dadada]">
        <div className="cursor-pointer hover:scale-105 duration-300 transition" onClick={() => router.push(`/movie/${id}`)}>
          <img height={245} width={166} src={poster} alt="" />
        </div>
        <div className="flex flex-1 flex-col items-start gap-3 justify-center">
          <h1 className="text-[32px] font-medium font-poppins hover:text-[#4b77de] cursor-pointer transition-colors duration-300" onClick={() => router.push(`/movie/${id}`)}>
            {title}
          </h1>
          <div className="flex items-center gap-[6px]">
            <div className="bg-[#3563e9] rounded-[4px] px-2 flex items-center justify-center gap-1">
              <span className="text-white font-medium tracking-[-0.048px]">{rating.toFixed(1)}</span>
              <Image src={star} alt="star" height={16} width={16} />
            </div>
            <span className="text-[#444] font-poppins text-[14px] tracking-[-0.048px] dark:text-slate-400">{releaseData}</span>
          </div>
          <p className="text-[20px] opacity-50 text-black line-clamp-2 dark:text-slate-200">{description}</p>
        </div>
        <div className="flex flex-col items-center gap-6 justify-center pt-20">
          <button className="fex items-center justify-center" onClick={() => (page === "LikePage" ? handleDelete(id) : deleteWatchlater(id))}>
            <RiCloseLargeLine className="hover:text-red-600" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCardOtherPage;
