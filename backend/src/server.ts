import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import MovieRouter from "./routes/movieRoutes";
import ActorRouter from "./routes/actorRoutes";

dotenv.config({ path: `${__dirname}/config/.env` });

const app = express();

app.use(express.json());
app.use("/api/movies", MovieRouter);
app.use("/api/actors", ActorRouter);

mongoose
  .connect(process.env.MONGO_URI || "", { dbName: "moviesitory" })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));
