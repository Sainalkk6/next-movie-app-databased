import mongoose, { models, Schema } from "mongoose";

const movieSchema = new Schema({
    id:Number,
    title:String,
    poster_path:String,
    overview:String,
    vote_average:Number,
    release_date:String,
})


export const Movie = models.Movie ||  mongoose.model('Movie', movieSchema);
 
// export const url = "https://api.themoviedb.org/3/movie/top_rated?api_key=61a84222e3030e9a1ad4d3ecdf191897&language=en-US&page=16"