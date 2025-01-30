import express from "express";
import { MovieController } from "../controllers/movieController";

const MovieRouter = express.Router();
const movieController = new MovieController();

MovieRouter.get("/:id", movieController.findByID);
MovieRouter.get("/", movieController.findAll);
MovieRouter.post("/", movieController.create);
MovieRouter.put("/:id", movieController.update);
MovieRouter.delete("/:id", movieController.delete);

export default MovieRouter;
