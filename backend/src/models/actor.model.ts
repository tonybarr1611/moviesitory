import mongoose, { Schema, Document } from "mongoose";

interface IActor extends Document {
  id: number;
  name: string;
  biography: string;
  birthdate: Date;
  pob: string;
  gender: number;
  popularity: number;
  images: string[];
}

const ActorSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  biography: { type: String, required: true },
  birthdate: { type: Date, required: true },
  pob: { type: String, required: true },
  gender: { type: Number, required: true },
  popularity: { type: Number, required: true },
  images: { type: [String], required: true },
});

const Actor = mongoose.model<IActor>("Actor", ActorSchema);
