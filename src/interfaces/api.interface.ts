export type { IPagination };

interface IPagination<T> {
  total: number;
  from: number;
  to: number;
  is_last_page: boolean;
  data: T;
}
