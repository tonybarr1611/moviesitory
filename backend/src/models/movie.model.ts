import mongoose, { Schema, Document } from "mongoose";

interface IMovie extends Document {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  release_date: Date;
  cast: number[];
  images: string[];
}

const MovieSchema: Schema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    overview: { type: String, required: true },
    popularity: { type: Number, required: true },
    release_date: { type: Date, required: true },
    cast: { type: [Number], required: true, ref: "Actor" },
    images: { type: [String], required: true },
  },
  { collection: "Movie" }
);

const Movie = mongoose.model<IMovie>("Movie", MovieSchema);

export default Movie;
export type { IMovie };
