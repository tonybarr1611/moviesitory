import { Movie } from './movie.model';

export type Actor = {
  id: number;
  name: string;
  biography: string;
  birthdate: string;
  pob: string;
  gender: number;
  popularity: number;
  images: string[];
  movies: number[];
};

export type ActorPopulated = {
  id: number;
  name: string;
  biography: string;
  birthdate: string;
  pob: string;
  gender: number;
  popularity: number;
  images: string[];
  movies: Movie[];
};

export type ActorSearchParams = {
  page: number;
  limit: number;
  search?: string;
};

export type ActorRequestResponse = {
  actors: Actor[];
  totalActors: number;
  totalPages: number;
  currentPage: number;
};
