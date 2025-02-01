import { MovieRepository } from "../repositories/movieRepository";
import { movieFindAllPayload } from "../utils/movieFindAll.model";

const movieRepository = new MovieRepository();

export class MovieService {
  async findByID(id: number) {
    return await movieRepository.findByID(id);
  }

  async findAll(params: movieFindAllPayload) {
    return await movieRepository.findAll(params);
  }

  async create(movie: any) {
    return await movieRepository.create(movie);
  }

  async update(id: number, movie: any) {
    return await movieRepository.update(id, movie);
  }

  async delete(id: number) {
    return await movieRepository.delete(id);
  }
}
