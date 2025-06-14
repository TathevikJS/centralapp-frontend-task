// CentralApp API types based on the documentation
export interface CategoryTranslations {
  ca: string;
  es: string;
  de: string;
  el: string;
  pt: string;
  fr: string;
  nl: string;
  zh: string;
  it: string;
  en: string;
}

export interface CategoryParent {
  parent: null;
  path: string;
  slug: string;
  name: string;
  id: number;
  translations: CategoryTranslations;
  level: number;
}

export interface Category {
  id: number;
  name: string;
  path: string;
  slug: string;
  translations: CategoryTranslations;
  level: number;
  parent?: CategoryParent;
}

// Internal category type for our UI
export interface UICategory {
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
  language?: string;
  level?: string;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
} 