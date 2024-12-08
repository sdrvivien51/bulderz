export interface ApiResponse<T> {
  data: T;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface ProfileFilters {
  search?: string;
  skills?: string[];
  tools?: string[];
  availableForHire?: boolean;
  page?: number;
  limit?: number;
}
