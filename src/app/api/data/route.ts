import { connect } from "@/dbConfig/mongoDb";
import { Movie } from "@/models/movies";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest)=>{
    try{
        await connect()
        const perPage = Number(req.nextUrl.searchParams.get("limit")) || 10
        const page = Number(req.nextUrl.searchParams.get("page")) || 1
        const data = await Movie.find().limit(perPage).skip(perPage * (page-1))
        const itemCount = await Movie.countDocuments({})
        return  NextResponse.json({data,itemCount})
    } catch(error){
        return NextResponse.json({message:"Fetch failed",error},{status:200})
    }
}
