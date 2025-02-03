import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { MoviesService } from './movies/movies.service';
import { ActorsService } from './actors/actors.service';
import { UsersService } from './users/users.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesitoryService {
  private movies: MoviesService = new MoviesService(this.httpClient);
  private actors: ActorsService = new ActorsService(this.httpClient);
  private users: UsersService = new UsersService(this.httpClient);

  constructor(private httpClient: HttpClient) {}

  getMoviesService(): MoviesService {
    return this.movies;
  }

  getActorsService(): ActorsService {
    return this.actors;
  }

  getUsersService(): UsersService {
    return this.users;
  }
}
