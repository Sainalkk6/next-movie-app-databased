"use client"
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { dataQueryKey } from '../../../../QueryKeys/dataQueryKeys'
import { useSession } from 'next-auth/react'
import { DataType } from '@/types/types'
import MovieCardOtherPage from '@/components/MovieCardOtherPage'

const Page = () => {
  const {data:session,status} = useSession()

    const {data,isLoading} = useQuery({
        queryKey: [dataQueryKey.favorites],
        queryFn:async()=>{
            const res = await fetch("/api/favorites",{
              method:"POST",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify({email:session?.user?.email})
            })
            if(!res.ok) throw new Error("Something went wrong")
            const result = await res.json()
          return result
        },
        enabled: status === "authenticated"
    })

    
  return (
    <div>
      {data && !isLoading ? (
        data.map((movie: DataType) => <MovieCardOtherPage page='LikePage' description={movie.overview} id={movie.id} poster={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`} rating={movie.vote_average} key={movie.id} releaseData={movie.release_date} title={movie.title} />)
      ) : (
        <div className="flex justify-center mt-24">
          <img src="spinner.svg" alt="Loading..." className="h-52" />
        </div>
      )}
      {data && data.length < 1 && <div className="flex text-center items-center justify-center text-3xl font-semibold pt-52">Nothing to see here!</div>}
    </div>
  )
}

export default Page
