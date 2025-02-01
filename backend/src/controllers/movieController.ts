import { Request, Response } from "express";
import { MovieService } from "../services/movieService";
import { movieFindAllPayload } from "../utils/movieFindAll.model";

const movieService = new MovieService();
export class MovieController {
  async findByID(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const movie = await movieService.findByID(id);
      if (movie) {
        res.json(movie);
      } else {
        res.status(404).json({ error: "Movie not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const params = this.parseFindAllParams(req.query);
      const movies = await movieService.findAll(params);
      res.json(movies);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const movie = req.body;
      const newMovie = await movieService.create(movie);
      res.json(newMovie);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const movie = req.body;
      const updatedMovie = await movieService.update(id, movie);
      res.json(updatedMovie);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await movieService.delete(id);
      res.json({ message: "Movie deleted" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  private parseFindAllParams(query: any): movieFindAllPayload {
    return {
      page: parseInt(query.page as string) || 1,
      limit: parseInt(query.limit as string) || 10,
      search: query.search as string,
      genre: query.genre as string,
      year: query.year ? parseInt(query.year as string) : undefined,
      popularity: query.rating ? parseFloat(query.rating as string) : undefined,
      sortBy: (query.sortBy as string) || "title",
      order: (query.order as "asc" | "desc") || "asc",
    };
  }
}
