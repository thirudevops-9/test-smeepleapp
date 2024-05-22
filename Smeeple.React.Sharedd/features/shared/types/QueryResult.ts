export type QueryResult<T> = {
  data: T[];
  page: number;
  totalCount: number;
};
