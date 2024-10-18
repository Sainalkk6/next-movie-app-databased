import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { connect } from "@/dbConfig/mongoDb";
import { User } from "@/models/user";

export const POST = async(req:NextRequest)=>{
    try{
        const {name,email,password} = await  req.json();
        const hashedPass = await bcrypt.hash(password,10)
        await connect()
        await User.create({name,email,password:hashedPass})
        return NextResponse.json({message:"User has been created successfully"},{status:201})
    } catch(err:any){   
        return NextResponse.json({message:"Something went wrong"},{status:500})
    }
}