import { connect } from "@/dbConfig/mongoDb";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest)=>{
    try{
        await connect()
        const {email} = await req.json()
        const user = await User.findOne({email}).select("_id")
        return NextResponse.json({user})
    } catch(err:any){
        return NextResponse.json({message:err.message})
    }
}
