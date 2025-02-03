import express, { Request } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import MovieRouter from "./routes/movieRoutes";
import ActorRouter from "./routes/actorRoutes";
import UserRouter from "./routes/userRoutes";

dotenv.config({ path: `${__dirname}/config/.env` });

const app = express();

app.use(express.json());
app.use(cors<Request>());
app.use("/api/movies", MovieRouter);
app.use("/api/actors", ActorRouter);
app.use("/api/user", UserRouter);

mongoose
  .connect(process.env.MONGO_URI || "", { dbName: "moviesitory" })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));
