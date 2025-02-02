import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { MoviesService } from './movies/movies.service';
import { ActorsService } from './actors/actors.service';
import { Movie, MovieSearchParams } from '../models/movie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesitoryService {
  private url = environment.baseUrl;
  private movies: MoviesService = new MoviesService(this.httpClient);
  private actors: ActorsService = new ActorsService(this.httpClient);

  constructor(private httpClient: HttpClient) {}

  getMoviesService(): MoviesService {
    return this.movies;
  }

  getActorsService(): ActorsService {
    return this.actors;
  }
}
