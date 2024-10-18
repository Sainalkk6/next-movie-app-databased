import { connect } from "@/dbConfig/mongoDb";
import { WatchLater } from "@/models/watchLater";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async(req:NextRequest)=>{
    try{
        await connect()
        const {id} = await req.json()
        await WatchLater.findOneAndDelete({id})
        return NextResponse.json({message:"Successfully removed from the list"})
    } catch(err:any){   
        return NextResponse.json({message:"Something went wrong",err})
    }
}