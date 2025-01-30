import { ActorRepository } from "../repositories/actorRepository";

const actorRepository = new ActorRepository();

export class ActorService {
  async findByID(id: number) {
    return await actorRepository.findByID(id);
  }

  async findAll(page: number, limit: number, search?: string) {
    return await actorRepository.findAll(page, limit, search);
  }

  async create(actor: any) {
    return await actorRepository.create(actor);
  }

  async update(id: number, actor: any) {
    return await actorRepository.update(id, actor);
  }

  async delete(id: number) {
    return await actorRepository.delete(id);
  }
}
