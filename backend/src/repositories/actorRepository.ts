import Actor, { IActor } from "../models/actor.model";

export class ActorRepository {
  async findByID(id: number) {
    return await Actor.findOne({
      id: id,
    }).populate({
      path: "movies",
      model: "Movie",
      localField: "movies",
      foreignField: "id",
      justOne: false,
    });
  }

  //   Paginated find all
  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit;
    const query: any = {
      ...(search && { name: { $regex: search, $options: "i" } }),
    };

    // Consulta en MongoDB con filtros, orden y paginación
    const actors = await Actor.find(query).skip(skip).limit(limit).exec();

    // Obtener total de documentos que coinciden con el filtro
    const totalActors = await Actor.countDocuments(query);

    return {
      actors,
      totalActors,
      totalPages: Math.ceil(totalActors / limit),
      currentPage: page,
    };
  }

  async create(actor: IActor) {
    return await Actor.create(actor);
  }

  async update(id: number, actor: IActor) {
    return await Actor.updateOne({ id: id }, actor);
  }

  async delete(id: number) {
    return await Actor.deleteOne({ id: id });
  }
}
