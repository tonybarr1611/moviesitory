import { Request, Response } from "express";
import { MovieService } from "../services/movieService";

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
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;
      const genre = req.query.genre as string;
      const year = req.query.year
        ? parseInt(req.query.year as string)
        : undefined;
      const rating = req.query.rating
        ? parseFloat(req.query.rating as string)
        : undefined;
      const sortBy = (req.query.sortBy as string) || "title";
      const order = (req.query.order as "asc" | "desc") || "asc";

      const movies = await movieService.findAll(
        page,
        limit,
        search,
        genre,
        year,
        rating,
        sortBy,
        order
      );
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
}
