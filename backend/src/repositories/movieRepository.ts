import Movie, { IMovie } from "../models/movie.model";
import Actor, { IActor } from "../models/actor.model";

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
  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    genre?: string,
    year?: number,
    popularity?: number,
    sortBy: string = "title",
    order: "asc" | "desc" = "asc"
  ) {
    const skip = (page - 1) * limit;
    const query: any = {
      ...(search && { title: { $regex: search, $options: "i" } }),
      ...(year && {
        release_date: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      }),
      ...(popularity && { popularity: { $gte: popularity } }),
    };

    // Consulta en MongoDB con filtros, orden y paginación
    const movies = await Movie.find(query)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    // Obtener total de documentos que coinciden con el filtro
    const totalMovies = await Movie.countDocuments(query);

    return {
      movies,
      totalMovies,
      totalPages: Math.ceil(totalMovies / limit),
      currentPage: page,
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
