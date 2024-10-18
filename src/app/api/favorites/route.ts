import { connect } from "@/dbConfig/mongoDb"
import { Movie } from "@/models/movies"
import { UserFavorites } from "@/models/userFavorites"
import { NextRequest, NextResponse } from "next/server"

export const POST = async(req:NextRequest)=>{

    try{
        await connect()
        const {email} = await req.json()
        const favorites = await UserFavorites.find({email}).select("id")
        const movieId = favorites.map(id=> id.id)
        const userMovies = await Promise.all(
            movieId.map(async(movie)=>await Movie.findOne({id:Number(movie)}))
        )
        return NextResponse.json(userMovies)
    } catch(err:any){
        return NextResponse.json({message:err})
    }
}