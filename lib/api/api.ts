// lib/api.ts


// import axios from "axios";
// import { Note, NewNote } from "../types/note";

// export interface NotesResponse {
//   notes: Note[];
//   totalPages: number;
// }

// const BASE_URL = "https://notehub-public.goit.study/api";

// // Захисник від подвійних запитів (тільки для клієнтських запитів)
// let lastRequestTime = 0;
// const REQUEST_DELAY = 500; // мс

// // Допоміжна функція для перевірки, чи виконується на клієнті
// const isClient = () => typeof window !== "undefined";

// const shouldCheckRateLimit = () => {
//   return isClient();
// };

// export const fetchNotes = async (
//   page = 1,
//   perPage = 12,
//   search = "",
//   tag?: string
// ): Promise<NotesResponse> => {
//   // Перевіряємо rate limit тільки на клієнті
//   if (shouldCheckRateLimit()) {
//     const now = Date.now();
//     if (now - lastRequestTime < REQUEST_DELAY) {
//       console.log("Запит відхилено: занадто швидко після попереднього");
//       throw new Error("Request too fast");
//     }
//     lastRequestTime = now;
//   }

//   try {
//     // Використовуємо Record замість any
//     const params: Record<string, string | number> = {
//       page,
//       perPage,
//       search
//     };
    
//     // Додаємо tag тільки якщо він переданий і не дорівнює "All"
//     if (tag && tag !== "All") {
//       params.tag = tag;
//     }
    
//     const response = await axios.get<NotesResponse>(`${BASE_URL}/notes`, {
//       params,
//       headers: {
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Помилка запиту:", error);
//     throw error;
//   }
// };

// export const fetchNoteById = async (id: string): Promise<Note> => {
//   // Перевіряємо rate limit тільки на клієнті
//   if (shouldCheckRateLimit()) {
//     const now = Date.now();
//     if (now - lastRequestTime < REQUEST_DELAY) {
//       console.log("Запит відхилено: занадто швидко після попереднього");
//       throw new Error("Request too fast");
//     }
//     lastRequestTime = now;
//   }

//   try {
//     const response = await axios.get<Note>(`${BASE_URL}/notes/${id}`, {
//       headers: {
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
//       },
//     });
//     return response.data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       if (error.response?.status === 404) {
//         throw new Error(`Note with ID "${id}" not found`);
//       }
//       if (error.response?.status === 401) {
//         throw new Error("Authorization error. Please check access token");
//       }
//     }

//     console.error("Error fetching note:", error);
//     throw new Error("Failed to fetch note");
//   }
// };

// export const createNote = async (note: NewNote): Promise<Note> => {
//   try {
//     const response = await axios.post<Note>(`${BASE_URL}/notes`, note, {
//       headers: {
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Помилка створення:", error);
//     throw error;
//   }
// };

// export const deleteNote = async (id: string): Promise<Note> => {
//   try {
//     const response = await axios.delete<Note>(`${BASE_URL}/notes/${id}`, {
//       headers: {
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Помилка видалення:", error);
//     throw error;
//   }
// };




// lib/api/api.ts


// import axios from 'axios';

// export const api = axios.create({
//   baseURL: 'https://notehub-api.goit.study',
//   withCredentials: true,
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API Error:', error);
//     return Promise.reject(error);
//   }
// );




import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
    }
    return Promise.reject(error);
  }
);