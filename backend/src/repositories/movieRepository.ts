import Movie, { IMovie } from "../models/movie.model";
import Actor, { IActor } from "../models/actor.model";
import { movieFindAllPayload } from "../utils/movieFindAll.model";

Actor.countDocuments({});

export class MovieRepository {
  async findByID(id: number) {
    return await Movie.findOne({
      id: id,
    }).populate({
      path: "cast",
      model: "Actor",
      localField: "cast",
      foreignField: "id",
      justOne: false,
    });
  }

  //   Paginated find all
  async findAll(params: movieFindAllPayload) {
    const skip = (params.page - 1) * params.limit;
    const query: any = {
      ...(params.search && { title: { $regex: params.search, $options: "i" } }),
      ...(params.year && {
        release_date: {
          $gte: new Date(`${params.year}-01-01`),
          $lte: new Date(`${params.year}-12-31`),
        },
      }),
      ...(params.popularity && { popularity: { $gte: params.popularity } }),
    };

    // Consulta en MongoDB con filtros, orden y paginación
    const movies = await Movie.find(query)
      .sort({ [params.sortBy]: params.order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(params.limit)
      .exec();

    // Obtener total de documentos que coinciden con el filtro
    const totalMovies = await Movie.countDocuments(query);

    return {
      movies,
      totalMovies,
      totalPages: Math.ceil(totalMovies / params.limit),
      currentPage: params.page,
    };
  }

  async create(movie: IMovie) {
    return await Movie.create(movie);
  }

  async update(id: number, movie: IMovie) {
    return await Movie.updateOne({ id: id }, movie);
  }

  async delete(id: number) {
    return await Movie.deleteOne({ id: id });
  }
}
