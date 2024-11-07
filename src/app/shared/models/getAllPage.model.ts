export interface GetAllPage<T> {
  content: T[];
  pageable: Pageable;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  empty: boolean;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
}
