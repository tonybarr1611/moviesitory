export type Actor = {
  id: number;
  name: string;
  biography: string;
  birthdate: Date;
  pob: string;
  gender: number;
  popularity: number;
  images: string[];
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
