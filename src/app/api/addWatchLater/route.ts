
import { connect } from "@/dbConfig/mongoDb";
import { WatchLater } from "@/models/watchLater";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest)=>{
    try{
        await connect()
        const {id,email} = await req.json()
        const exist = await WatchLater.findOne({id})
        if(!exist){
            await WatchLater.create({id:id,email:email})
            return NextResponse.json({message:"Added to watch later"})
        } else{
            return NextResponse.json({message:"This movie already exists in the watchlater"})
        }
    } catch(err:any){
        return NextResponse.json({message:"Something went wrong"})
    }

}