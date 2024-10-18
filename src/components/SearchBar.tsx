"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'

const SearchBar = () => {
    const [search,setSearch] = useState("")
    const router = useRouter()

  return (
    <div className="flex items-center h-[44px] pl-5 gap-5 justify-start border-neutral-300 border rounded-[70px]  max-w-[492px] w-full">
          <button type="submit"><CiSearch className="h-6 w-6" /></button>
          <input className="outline-none text-lg w-full" type="text" placeholder="Search for movies" value={search} onChange={(e)=> {
            setSearch(e.target.value)
            {e.target.value ? router.push(`/home/search?search=${e.target.value.trim()}`) : router.push("/home")}
            }} />
      </div>
  )
}

export default SearchBar
