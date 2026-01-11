import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';
import { User } from './types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: Config.API_URL }),
  tagTypes: ['User', 'Friends'],
  endpoints: builder => ({
    // Query para buscar dados do usuário (GET)
    getUser: builder.query({
      query: (id: string) => `/users/${id}`, // MongoDB ID é string
      providesTags: ['User'],
      keepUnusedDataFor: 300, // Mantém os dados em cache por 5 minutos
    }),
    getUsersByBatch: builder.query<User[], string[]>({
      query: ids => ({
        url: '/users/batch',
        method: 'POST',
        body: { ids }, // O backend espera um array de IDs no corpo da requisição
      }),
      providesTags: ['Friends'],
    }),
    // Mutation para enviar dados (POST)
    addFriend: builder.mutation<any, { userId: string; friendId: string }>({
      query: ({ userId, friendId }) => ({
        url: `/users/${userId}/friend`,
        method: 'POST',
        body: { friendId },
      }),
      // Isso força as queries de 'Friends' a recarregarem
      invalidatesTags: ['Friends'],
    }),
  }),
});

// Você precisa exportar os hooks gerados automaticamente
export const {
  useGetUserQuery,
  useGetUsersByBatchQuery,
  useAddFriendMutation, // Exportando a mutation
} = apiSlice;
