export type movieFindAllPayload = {
  page: number;
  limit: number;
  search?: string;
  genre?: string;
  year?: number;
  popularity?: number;
  sortBy: string;
  order: "asc" | "desc";
};
