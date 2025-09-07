// lib/api/clientApi.ts




// lib/api/clientApi.ts
import { api } from './api';
import { User, LoginData, RegisterData, UpdateUserData } from '@/types/user';

export const authApi = {
  login: async (data: LoginData): Promise<User> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<User> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  getSession: async (): Promise<User | null> => {
    try {
      const response = await api.get('/auth/session');
      return response.data;
    } catch (error) {
      return null;
    }
  },
};

export const usersApi = {
  getMe: async (): Promise<User> => {
    const response = await api.get('/users/me');
    return response.data;
  },

  updateMe: async (data: UpdateUserData): Promise<User> => {
    const response = await api.patch('/users/me', data);
    return response.data;
  },
};

export const notesApi = {
  getNotes: async (params?: {
    search?: string;
    page?: number;
    tag?: string;
  }) => {
    const response = await api.get('/notes', { params: { ...params, perPage: 12 } });
    return response.data;
  },

  getNote: async (id: string) => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  },

  createNote: async (data: { title: string; content: string; tag: string }) => {
    const response = await api.post('/notes', data);
    return response.data;
  },

  deleteNote: async (id: string) => {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  },
};