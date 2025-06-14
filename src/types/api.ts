export interface Category {
  id: string;
  name: string;
  path: string;
  description?: string;
  imageUrl?: string;
  parentId?: string;
}

export interface SearchResponse {
  categories: Category[];
  total: number;
}

export interface SearchParams {
  query: string;
  page?: number;
  limit?: number;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
} 