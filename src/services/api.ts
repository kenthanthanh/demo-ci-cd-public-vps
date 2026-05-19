import axios from 'axios';
import type { Post, PostFormData, PaginatedResponse, ApiResponse } from '../types';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const postApi = {
  getAll: async (page = 1, perPage = 10): Promise<PaginatedResponse<Post>> => {
    const { data } = await apiClient.get('/posts', {
      params: { page, per_page: perPage },
    });
    return data;
  },

  getById: async (id: string): Promise<Post> => {
    const { data } = await apiClient.get<ApiResponse<Post>>(`/posts/${id}`);
    return data.data;
  },

  create: async (postData: PostFormData): Promise<Post> => {
    const { data } = await apiClient.post<ApiResponse<Post>>('/posts', postData);
    return data.data;
  },

  update: async (id: string, postData: Partial<PostFormData>): Promise<Post> => {
    const { data } = await apiClient.put<ApiResponse<Post>>(`/posts/${id}`, postData);
    return data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/posts/${id}`);
  },
};

export default apiClient;
