
import { connect } from "@/dbConfig/mongoDb";
import { UserFavorites } from "@/models/userFavorites";

import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest)=>{
    try{
        await connect()
        const {id,email} = await  req.json()
        const exist = await UserFavorites.findOne({id})
        if(!exist){
            await UserFavorites.create({email:email,id:id})
            return  NextResponse.json({message:"Added to userfavorites"})
        } else {
            return NextResponse.json({message:"This movie already exists in the user favorite list"})
        }
    } catch(err:any){
        return NextResponse.json({message:"Something went wrong"})
    }
}