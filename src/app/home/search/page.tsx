"use client"
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { dataQueryKey } from '../../../../QueryKeys/dataQueryKeys'
import MovieCard from '@/components/MovieCard'
import { DataType } from '@/types/types'
import { ReactTyped } from 'react-typed'

const page = () => {
  const searchParams = useSearchParams();
  const [count,setCount] = useState(0)
  const search = searchParams.get('search') ?? '';
  const [message,setMessage] = useState("")
  setTimeout(() => {
    setMessage("Sorry we couldnt find what you are looking for")
  }, 3000);
  useEffect(()=>{
    setMessage("We are working on it")
  },[search])

  const { data, isLoading, error } = useQuery({
    queryKey: [dataQueryKey.movies,search ],
    queryFn: async () => {
      if (!search) return []
      const response = await fetch(`/api/search?search=${search}`);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      if(data.response === undefined) return []

      return data.response
    },
    enabled: !!search
  });
  return (
    <div>
      
      {data && data.length > 0 ? data.map((movie: DataType) => <MovieCard description={movie.overview} id={movie.id} poster={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`} rating={movie.vote_average} releaseData={movie.release_date} title={movie.title} key={movie.id} />): <div className='flex items-center justify-center mt-48 text-4xl text-center text-[#3563e9]'> {message.includes("working") ? (
      <>
        {message} <ReactTyped strings={["..."]} typeSpeed={100} backSpeed={100} loop />
      </>
    ) : (
      message
    )}</div>
      }
    </div>
  )
}

export default page
