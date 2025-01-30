import { MovieRepository } from "../repositories/movieRepository";

const movieRepository = new MovieRepository();

export class MovieService {
  async findByID(id: number) {
    return await movieRepository.findByID(id);
  }

  async findAll(
    page: number,
    limit: number,
    search?: string,
    genre?: string,
    year?: number,
    popularity?: number,
    sortBy?: string,
    order?: "asc" | "desc"
  ) {
    return await movieRepository.findAll(
      page,
      limit,
      search,
      genre,
      year,
      popularity,
      sortBy,
      order
    );
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
