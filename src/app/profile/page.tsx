"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Page = () => {
  const { data } = useSession();

  return (
    <>
      {data ? (
        <div className="w-full flex flex-col h-screen items-center mt-48">
          <div className="border-b border-b-slate-700 flex w-full items-center justify-center pb-10">
            <FaUserCircle size={50} />
          </div>
          <div className="flex flex-col text-4xl text-black pt-10 gap-10">
            <span>username : {data?.user?.name}</span>
            <span>Email: {data.user?.email}</span>
            <div className="flex items-center justify-center">
                <Link href={"/home"}>Home</Link>
                <button onClick={()=>signOut({callbackUrl:"/"})}>Logout</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-black absolute text-4xl text-center w-full mt-52">
            Something went wrong check back again later
        </div>
      )}
    </>
  );
};

export default Page;
