export type ServerSideQueryResult<T> = {
  data: T[];
  page: number;
  totalCount: number;
};
