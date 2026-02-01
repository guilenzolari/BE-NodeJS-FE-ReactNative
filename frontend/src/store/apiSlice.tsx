import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';
import { User } from './types';

const HARDCODED_USER_ID = '697e875c8eeaae9817ed5f5b'; //TODO: apagar quando implementar autenticação

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: Config.API_URL }),
  tagTypes: ['User', 'Friends'],
  endpoints: builder => ({
    // Query para buscar o usuário logado
    getCurrentUser: builder.query<User, void>({
      query: () => `users/${HARDCODED_USER_ID}`, // Usando ID fixo por enquanto
      providesTags: ['User'],
    }),
    // Query para buscar dados de usuários (GET)
    getUser: builder.query({
      query: (id: string) => `/users/${id}`, // MongoDB ID é string
      providesTags: ['User'],
      keepUnusedDataFor: 300, // Mantém os dados em cache por 5 minutos
    }),
    // TODO: user o ID do usuário autenticado para buscar seus dados ao invés de passar uma lista de IDs
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
        url: `/users/${userId}/add-friend`,
        method: 'POST',
        body: { friendId },
      }),
      // Isso força as queries de 'Friends' e 'User' a recarregarem
      invalidatesTags: ['Friends', 'User'],
    }),
  }),
});

// Você precisa exportar os hooks gerados automaticamente
export const {
  useGetCurrentUserQuery,
  useGetUserQuery,
  useGetUsersByBatchQuery,
  useAddFriendMutation, // Exportando a mutation
} = apiSlice;
