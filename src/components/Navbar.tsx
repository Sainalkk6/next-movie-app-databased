"use client"
import React, { useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Link from "next/link";
import { MdWatchLater } from "react-icons/md";
import { HiHeart } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { CustomLink } from "./CustomLink";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import { GrClose } from "react-icons/gr";
import { PiSignOutBold } from "react-icons/pi";


const Navbar = () => {
  const {data} = useSession()
  const [showmodal,setShowmodal] = useState(false)

  const router = useRouter()
  return (
    <div className="w-full  h-[104px] gap-5 dark:border-b-slate-500 border-b-[#c3d4e9]  dark:border-t-0 dark:border-x-0 flex border items-center justify-between pl-14 pr-5 relative">
      {showmodal && <div className="absolute w-[381px] h-[386px] bg-white z-50 shadow-xl right-10 top-[103px] rounded-[30px] border-t-black">
        <div className="flex justify-end w-full px-5 pt-5"><button className="hover:text-red-500 dark:text-black dark:hover:text-red-500" onClick={()=>setShowmodal(false)}><GrClose size={25} /></button></div>
        <div className="flex items-center justify-center flex-col gap-[25px]">
          <div className="flex flex-col items-center gap-3">
            <span className="text-[#aeaeae] text-center font-poppins text-[18px]">{data?.user?.email}</span>
            <div className="flex flex-col items-center gap-3">
            <FaUserCircle className="dark:text-black" size={119} />
              <span className="text-black text-center font-medium text-[24px] ">Hi, <span className="font-poppins uppercase">{data?.user?.name}</span></span>
            </div>
          </div>
          <button className="flex py-2 px-9 items-center gap-[10px] text-white font-poppins text-[18px] text-center rounded-[50px] bg-[#3563e9] hover:opacity-90 transition-opacity duration-300"  onClick={()=> signOut({callbackUrl:"/"})}> <PiSignOutBold size={24} /> Signout</button>
        </div>  
      </div>}
      <span className="font-medium text-3xl tracking-tight cursor-pointer text-[#2563e9]" onClick={()=> router.push("/home")} >INFINITY</span>
      <SearchBar/>
      <div className="flex items-start gap-5">
        <div className="dark:border-white/30 flex p-[10px] items-center justify-center w-[44px] h-[44px] rounded-[90px] border border-slate-500/20"><ThemeSwitcher/></div>
        <CustomLink route="/home/favorites" label={<HiHeart size={24}/>}/>
        <CustomLink route="/home/watchlater" label={<MdWatchLater size={24}/>}/>
        {data?.user?.name !== undefined ? <button onClick={()=>setShowmodal(true)} className="uppercase px-5 dark:border-white/30 font-semibold flex p-[10px] items-center justify-center w-fit h-[44px] rounded-[90px] border border-slate-500/20">{data.user.name}</button> : <Link className="uppercase px-5 dark:border-white/30 font-semibold flex p-[10px] items-center justify-center w-fit h-[44px] rounded-[90px] border border-slate-500/20" href={"/login"}>Login</Link>}
      </div>
    </div>
  );
};

export default Navbar; 
