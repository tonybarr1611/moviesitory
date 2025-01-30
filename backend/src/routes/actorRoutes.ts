import express from "express";
import { ActorController } from "../controllers/actorController";

const ActorRouter = express.Router();

const actorController = new ActorController();

ActorRouter.get("/:id", actorController.findByID);
ActorRouter.get("/", actorController.findAll);
ActorRouter.post("/", actorController.create);
ActorRouter.put("/:id", actorController.update);
ActorRouter.delete("/:id", actorController.delete);

export default ActorRouter;
