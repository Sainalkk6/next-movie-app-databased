import mongoose, { models, Schema } from "mongoose";

const userFavoriteSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    id:{
        type:Number,
        required:true
    }
})

export const UserFavorites = models.UserFavorites || mongoose.model("UserFavorites",userFavoriteSchema)
