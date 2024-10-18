import { HandleLikesProp } from "@/types/types"

export const handleLikes = async({id,email}:HandleLikesProp)=>{
    const response = await fetch("/api/userFavorites",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({id:id,email:email})
    })

    const data = await response.json()
    return data
  }
