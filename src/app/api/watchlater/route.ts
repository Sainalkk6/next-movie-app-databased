import { connect } from "@/dbConfig/mongoDb";
import { Movie } from "@/models/movies";
import { WatchLater } from "@/models/watchLater";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest)=>{
    try{
        await connect()
        const {email} = await req.json()
        const watchlater = await WatchLater.find({email}).select("id")
        const ids = watchlater.map(i=> i.id)
        const myWatchList = await Promise.all(
            ids.map(async(movie)=>await Movie.findOne({id:Number(movie)}))
        )    
        return NextResponse.json(myWatchList)
    } catch(err:any){
        return NextResponse.json(err)
    }
}