import { connect } from "@/dbConfig/mongoDb";
import { Movie } from "@/models/movies";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        await connect()
        const params = req.nextUrl.searchParams.get('search')?.trim()
        const regex = new RegExp(params ?? '')
        const response = await Movie.find({ "title": { $regex: regex , $options:"i"} })
        return NextResponse.json({ response:response}) 
    } catch (error) {
        return NextResponse.json({ message: "Something is not right", error })
    }
}