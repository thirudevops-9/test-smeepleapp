export interface QueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  orderByColumn?: string;
  orderDirection: 'asc' | 'desc';
}
