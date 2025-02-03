import { Actor } from './actor.model';

export type Movie = {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  release_date: string;
  cast: number[];
  images: string[];
};

export type MoviePopulated = {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  release_date: string;
  cast: Actor[];
  images: string[];
};

export type MovieSearchParams = {
  page: number;
  limit: number;
  search?: string;
  genre?: string;
  year?: number;
  popularity?: number;
  sortBy: string;
  order: 'asc' | 'desc';
};

export type MovieRequestResponse = {
  movies: Movie[];
  totalMovies: number;
  totalPages: number;
  currentPage: number;
};
