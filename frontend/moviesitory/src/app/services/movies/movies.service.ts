import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import {
  Movie,
  MoviePopulated,
  MovieRequestResponse,
  MovieSearchParams,
} from '../../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private url = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getMovies(payload: MovieSearchParams): Observable<MovieRequestResponse> {
    return this.httpClient.get<MovieRequestResponse>(`${this.url}/movies`, {
      params: payload,
    });
  }

  getMovieById(id: string): Observable<MoviePopulated> {
    return this.httpClient.get<MoviePopulated>(`${this.url}/movies/${id}`);
  }

  updateMovie(movie: Movie): Observable<Movie> {
    if (!movie.id) {
      throw new Error('El id es necesario');
    }
    return this.httpClient.put<Movie>(`${this.url}/movies/${movie.id}`, movie);
  }

  deleteMovieById(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.url}/movies/${id}`);
  }

  addMovie(movie: Movie): Observable<Movie> {
    movie.id = Math.floor(Math.random() * 10000000000);
    return this.httpClient.post<Movie>(`${this.url}/movies`, movie);
  }
}
