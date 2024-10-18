import { connect } from "@/dbConfig/mongoDb";
import { Movie } from "@/models/movies";
import { NextResponse } from "next/server";

export const POST = async () => {
    try {
        const dataRes = await fetch(`${process.env.URL}`)
        const data = await dataRes.json()
        await connect()
        await Movie.create(data.results)
        return NextResponse.json({ message: "Movie is in the database" }, { status: 201 })
    } catch (err: any) {
        return NextResponse.json({ message: "Something went wrong somewhere", err }, { status: 500 })
    }
}