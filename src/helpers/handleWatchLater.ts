import { HandleWatchlaterProps } from "@/types/types"

export const handleWatchLater = async({email,id}:HandleWatchlaterProps)=>{
    const response = await fetch("/api/addWatchLater",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({id:id,email:email})
    })
    const data = await response.json()
    return data
  }