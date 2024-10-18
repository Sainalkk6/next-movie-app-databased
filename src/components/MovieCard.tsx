"use client"
import React from "react";
import star from "../../public/star.svg";
import Image from "next/image";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsClockHistory } from "react-icons/bs";
import { MovieCardProps } from "@/types/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { handleWatchLater } from "@/helpers/handleWatchLater";
import { handleLikes } from "@/helpers/handleLikes";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";

const MovieCard = ({description,poster,rating,releaseData,title,id}:MovieCardProps) => {

  const {data} = useSession()
  const router = useRouter()
 
  const handleLikeClicks = async()=>{
    const message = await handleLikes({email:data?.user?.email!,id:id})
    toast.info(message.message,{closeOnClick:true,autoClose:1500})
  }

  const handleWatchLaterClicks = async()=>{
    const message = await handleWatchLater({email:data?.user?.email!,id:id})
    toast.info(message.message,{closeOnClick:true,autoClose:1500})
  }

  return (
    <div className="w-full flex py-[30px]  px-9 items-center justify-center gap-6 ">
      <div></div>
      <div className="flex max-w-[1200px] border border-[#dadada] sm:border-r-0 sm:border-t-0 sm:border-l-0 md:pt-0 pt-5 sm:flex-row flex-col  w-full justify-end items-center px-6 gap-6 hover:shadow-lg transition-all duration-300 border-b pb-10 dark:border-slate-700 dark:border-b-slate-700 border-b-[#dadada]">
        <div className="cursor-pointer hover:scale-105 duration-300 transition"  onClick={()=> router.push(`/movie/${id}`)} >
          <img height={245} width={166} src={poster} alt="" />
        </div>
        <div className="flex flex-1 flex-col items-start gap-3 justify-center">
          <h1 className="text-[32px] font-medium font-poppins hover:text-[#4b77de] cursor-pointer transition-colors duration-300"  onClick={()=> router.push(`/movie/${id}`)}  >{title}</h1>
          <div className="flex items-center gap-[6px]">
            <div className="bg-[#3563e9] rounded-[4px] px-2 flex items-center justify-center gap-1">
              <span className="text-white font-medium tracking-[-0.048px]">{rating.toFixed(1)}</span>
              <Image src={star} alt="star" height={16} width={16} />
            </div>
            <span className="text-[#444] font-poppins text-[14px] tracking-[-0.048px] dark:text-slate-400">{releaseData}</span>
          </div>
          <p className="text-[20px] opacity-50 text-black line-clamp-2 dark:text-slate-200">{description}</p>
        </div>
        <div className="flex sm:flex-col items-center gap-6 justify-center">
          <button className="flex items-center justify-center" onClick={handleLikeClicks}><IoMdHeartEmpty size={25}/></button>
          <button className="flex items-center justify-center" onClick={handleWatchLaterClicks}> <BsClockHistory size={20}/></button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default MovieCard;
