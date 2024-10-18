import { connect } from "@/dbConfig/mongoDb";
import { Movie } from "@/models/movies";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        await connect()
        const { id } = await req.json()
        const movie = await Movie.findOne({ id })
        return NextResponse.json({movie})
    } catch(err:any){
        return NextResponse.json({message:"Something went wrong"})
    }
}