import { connect } from "@/dbConfig/mongoDb";
import { User } from "@/models/user";
import NextAuth, { AuthOptions } from "next-auth";
import bcrypt from "bcryptjs"
import CredentialsProvider  from "next-auth/providers/credentials";

export const authOption:AuthOptions ={
    providers:[
        CredentialsProvider ({
            name:"credentials",
            credentials:{},
            async authorize(credentials){
                const {email,password} = credentials
                try{
                    await connect()
                    const user = await User.findOne({email})
                    if(!user){
                        return null
                    }
                    const passMatch =  await bcrypt.compare(password,user.password)
                    if(!passMatch){
                        return null
                    }

                    return user
                } catch(err:any){
                }
            }
        })
    ],
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:"/login"
    }
}

const handler = NextAuth(authOption)

export {handler as GET , handler as POST}