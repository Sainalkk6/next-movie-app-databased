"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { dataQueryKey } from "../../../../QueryKeys/dataQueryKeys";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { BsClockHistory } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { handleWatchLater } from "@/helpers/handleWatchLater";
import { useSession } from "next-auth/react";
import { handleLikes } from "@/helpers/handleLikes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = ({ params }: { params: { id: string } }) => {
  const { data } = useSession();
  const email = data?.user?.email || "";
  const id = Number(params.id);

  const { data: movies, isLoading } = useQuery({
    queryKey: [dataQueryKey.movies, params.id],
    queryFn: async () => {
      const response = await fetch("/api/movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: params.id }),
      });
      return response.json();
    },
  });

  const handleLikeClicks = async () => {
    const message = await handleLikes({ id, email });
    toast.info(message.message, { closeOnClick: true, autoClose: 1500 });
  };

  const handleWatchLaterClicks = async () => {
    const message = await handleWatchLater({ id, email });
    toast.info(message.message, { closeOnClick: true, autoClose: 1500 });
  };

  const movie = movies?.movie;

  return (
    <div>
      <Navbar />
      <ToastContainer />
      {movie && !isLoading ? (
        <div className="w-full pb-10">
          <div className="p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6">
            <img src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`} className="md:w-[550px] w-full md:h-[400px] h-[500px] max-w-[100%]" alt="" />
            <div className="p-2">
              <h2 className="text-xl mb-3 font-bold">{movie.title}</h2>
              <p className="text-xl mb-3">{movie.overview}</p>
              <p className="mb-3 text-lg">
                <span className="font-semibold mr-1">Date Released</span>
                {movie.release_date}
              </p>
              <p className="mb-3 text-lg">
                <span className="font-semibold mr-1">Rating</span>
                {movie.vote_average}
              </p>
            </div>
          </div>
          <div className="flex gap-10 items-center md:pl-0 pl-10 justify-center mt-10 flex-col md:flex-row">
            <button className="flex items-center justify-center hover:bg-[#3563e9] transition-colors duration-300 hover:text-white dark:border-white/30 p-[10px] rounded-[90px] border border-slate-500/20" onClick={handleLikeClicks}>
              <IoMdHeartEmpty size={35} />
            </button>
            <Link className="flex px-9 py-2 rounded items-center justify-center bg-black hover:scale-105 text-white transition-all duration-300 hover:bg-slate-500 text-lg font-poppins font-medium dark:bg-white dark:text-black" href="/home">
              Home
            </Link>
            <button className="flex items-center justify-center hover:bg-[#3563e9] transition-colors duration-300 hover:text-white dark:border-white/30 p-[10px] rounded-[90px] border border-slate-500/20" onClick={handleWatchLaterClicks}>
              <BsClockHistory size={30} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-24">
          <img src="spinner.svg" alt="Loading..." className="h-52" />
        </div>
      )}
    </div>
  );
};

export default Page;
