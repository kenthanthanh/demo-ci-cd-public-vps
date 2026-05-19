export interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
}

export interface PostFormData {
  title: string;
  content: string;
  author: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}
