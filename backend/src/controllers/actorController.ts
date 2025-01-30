import { Request, Response } from "express";
import { ActorService } from "../services/actorService";

const actorService = new ActorService();

export class ActorController {
  async findByID(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const actor = await actorService.findByID(id);
      if (actor) {
        res.json(actor);
      } else {
        res.status(404).json({ error: "Actor not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;

      const actors = await actorService.findAll(page, limit, search);
      res.json(actors);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const actor = req.body;
      const newActor = await actorService.create(actor);
      res.json(newActor);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const actor = req.body;
      const updatedActor = await actorService.update(id, actor);
      res.json(updatedActor);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deletedActor = await actorService.delete(id);
      res.json(deletedActor);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
