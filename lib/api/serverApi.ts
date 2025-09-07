// lib/api/serverApi.ts


import { api } from './api';
import { User, UpdateUserData } from '@/types/user';
import { cookies } from 'next/headers';

export const serverAuthApi = {
  getSession: async (): Promise<User | null> => {
    try {
      const cookieStore = cookies();
      const response = await api.get('/auth/session', {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      return response.data;
    } catch (error) {
      return null;
    }
  },
};

export const serverUsersApi = {
  getMe: async (): Promise<User> => {
    const cookieStore = cookies();
    const response = await api.get('/users/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return response.data;
  },
};