import { connect } from "@/dbConfig/mongoDb";

import { UserFavorites } from "@/models/userFavorites";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async(req:NextRequest)=>{
    try{
        await connect()
        const {id} = await req.json()
        await UserFavorites.findOneAndDelete({id})
        return NextResponse.json({message:"Successfully deleted"})
    } catch(err:any){   
        return NextResponse.json({message:"Something went wrong",err})
    }
}