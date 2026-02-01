# 🚀 Frontend Improvements Roadmap

## Visão Geral

Relatório técnico com melhorias arquiteturais para o React Native Frontend focando em:

- ✅ Autenticação real com JWT
- ✅ Persistência local com Redux Persist
- ✅ Gerenciamento de states de rede
- ✅ Navegação dinâmica e performática
- ✅ Atualizações otimistas

---

## 📋 Quick Wins (Implementação Rápida: 15h total)

| #   | Tarefa                                             | Esforço | Impacto    |
| --- | -------------------------------------------------- | ------- | ---------- |
| 1   | Remover `HARDCODED_USER_ID`, mover para Auth Slice | 2h      | 🔴 CRÍTICO |
| 2   | Implementar `NetworkStateView` em todos screens    | 3h      | 🟠 ALTO    |
| 3   | Adicionar Redux Persist para auth tokens           | 2h      | 🟠 ALTO    |
| 4   | Implementar Optimistic Updates em `addFriend`      | 2h      | 🟠 ALTO    |
| 5   | Criar hook `useNavigationDepth` com limite stack   | 1h      | 🟡 MÉDIO   |
| 6   | Memoizar `FriendCard` com `memo`                   | 30m     | 🟡 MÉDIO   |
| 7   | Adicionar histórico de buscas persistido           | 2h      | 🟡 MÉDIO   |
| 8   | Criar skeleton loading reutilizável                | 3h      | 🟡 MÉDIO   |

---

## 1️⃣ Real Authentication Flow

### Problema Atual ❌

```tsx
const HARDCODED_USER_ID = '697e875c8eeaae9817ed5f5b';
```

### Solução: JWT + Redux Auth Slice

#### Arquivo: `src/store/authSlice.tsx`

```tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

interface AuthState {
  tokens: {
    accessToken: string | null;
    refreshToken: string | null;
  };
  user: {
    _id: string;
    email: string;
    username: string;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  tokens: { accessToken: null, refreshToken: null },
  user: null,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>,
    ) => {
      state.tokens = action.payload;
    },
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
    },
    logout: state => {
      state.tokens = { accessToken: null, refreshToken: null };
      state.user = null;
      SecureStore.deleteItemAsync('accessToken');
      SecureStore.deleteItemAsync('refreshToken');
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setTokens, setUser, logout, setError } = authSlice.actions;
export default authSlice.reducer;
```

#### Arquivo: `src/store/authApiSlice.tsx`

```tsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';
import * as SecureStore from 'expo-secure-store';
import { RootState } from './index';
import { setTokens, logout } from './authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_URL,
  prepareHeaders: async (headers, { getState }) => {
    const token = (getState() as RootState).auth.tokens.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Auto refresh token
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.tokens.refreshToken;

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const { accessToken } = refreshResult.data as any;
        api.dispatch(setTokens({ accessToken, refreshToken }));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    }
  }

  return result;
};

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    login: builder.mutation<
      { accessToken: string; refreshToken: string; user: any },
      { email: string; password: string }
    >({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          await SecureStore.setItemAsync('accessToken', data.accessToken);
          await SecureStore.setItemAsync('refreshToken', data.refreshToken);

          dispatch(
            setTokens({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            }),
          );
          dispatch(setUser(data.user));
        } catch (error) {
          dispatch(
            setError((error as any).error?.data?.message || 'Login failed'),
          );
        }
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
      async onQueryStarted(arg, { dispatch }) {
        dispatch(logout());
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
```

---

## 2️⃣ Local Persistence

### Dependências

```bash
npm install redux-persist expo-secure-store
```

#### Arquivo: `src/store/persistConfig.ts`

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

// Storage seguro para tokens
const secureStorage = {
  getItem: async (key: string) => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  setItem: async (key: string, value: string) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch {
      console.error(`Failed to save ${key}`);
    }
  },
  removeItem: async (key: string) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch {
      console.error(`Failed to remove ${key}`);
    }
  },
};

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'search'],
};

export const authPersistConfig = {
  key: 'auth',
  storage: secureStorage,
  whitelist: ['tokens', 'user'],
};
```

#### Arquivo: `src/store/searchSlice.tsx`

```tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  history: Array<{
    query: string;
    timestamp: number;
  }>;
}

const initialState: SearchState = {
  history: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearchTerm: (state, action: PayloadAction<string>) => {
      const term = action.payload.trim();
      if (!term) return;

      state.history = state.history.filter(s => s.query !== term);
      state.history.unshift({ query: term, timestamp: Date.now() });
      state.history = state.history.slice(0, 20);
    },
    clearSearchHistory: state => {
      state.history = [];
    },
  },
});

export const { addSearchTerm, clearSearchHistory } = searchSlice.actions;
export default searchSlice.reducer;
```

#### Atualizar: `src/store/index.tsx`

```tsx
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { apiSlice } from './apiSlice';
import { authApiSlice } from './authApiSlice';
import authReducer from './authSlice';
import searchReducer from './searchSlice';
import { persistConfig, authPersistConfig } from './persistConfig';

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedSearchReducer = persistReducer(persistConfig, searchReducer);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    auth: persistedAuthReducer,
    search: persistedSearchReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(apiSlice.middleware)
      .concat(authApiSlice.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
```

#### Atualizar: `src/App.tsx`

```tsx
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/index';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* App Navigator */}
      </PersistGate>
    </Provider>
  );
};
```

---

## 3️⃣ Network State Management

### Arquivo: `src/hooks/useNetworkState.ts`

```tsx
interface NetworkState {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isEmpty: boolean;
  error?: any;
}

interface UseNetworkStateConfig {
  data: any;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error?: any;
  isEmpty?: boolean;
}

export const useNetworkState = (config: UseNetworkStateConfig) => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    isEmpty = !data || (Array.isArray(data) && data.length === 0),
  } = config;

  return {
    isLoading,
    isFetching,
    isError,
    isEmpty,
    error,
    isInitialLoading: isLoading && !data,
    isRefetching: isFetching && !!data,
    shouldShowSkeleton: isLoading && !data,
    shouldShowContent: !!data && !isEmpty,
    shouldShowEmpty: isEmpty && !isLoading,
  };
};
```

### Arquivo: `src/components/NetworkStateView.tsx`

```tsx
import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';

interface NetworkStateViewProps {
  isLoading: boolean;
  isEmpty: boolean;
  isError: boolean;
  error?: any;
  onRetry?: () => void;
  emptyMessage?: string;
  children: React.ReactNode;
}

const NetworkStateView: React.FC<NetworkStateViewProps> = ({
  isLoading,
  isEmpty,
  isError,
  error,
  onRetry,
  emptyMessage,
  children,
}) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          {error?.message || t('errors.generic')}
        </Text>
        {onRetry && (
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Text style={styles.retryButtonText}>{t('common.retry')}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  if (isEmpty) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>
          {emptyMessage || t('errors.noDataFound')}
        </Text>
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default NetworkStateView;
```

---

## 4️⃣ Dynamic Navigation

### Arquivo: `src/hooks/useNavigationDepth.ts`

```tsx
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCallback } from 'react';

const MAX_STACK_DEPTH = 5;

export const useNavigationDepth = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const getPushDepth = useCallback((): number => {
    let depth = 0;
    let currentRoute = route as any;

    while (currentRoute?.params?.friendID) {
      depth++;
      currentRoute = currentRoute.params?.previousRoute;
    }

    return depth;
  }, [route]);

  const canPush = useCallback((): boolean => {
    return getPushDepth() < MAX_STACK_DEPTH;
  }, [getPushDepth]);

  const safePush = useCallback(
    (screenName: string, params: any) => {
      if (canPush()) {
        navigation.push(screenName, {
          ...params,
          previousRoute: route,
        });
      } else {
        navigation.replace(screenName, params);
      }
    },
    [navigation, route, canPush],
  );

  return { safePush, canPush, depth: getPushDepth() };
};
```

---

## 5️⃣ Optimistic Updates

### Atualizar: `src/store/apiSlice.tsx`

```tsx
addFriend: builder.mutation<
  any,
  { userId: string; friendId: string }
>({
  query: ({ userId, friendId }) => ({
    url: `/users/${userId}/add-friend`,
    method: 'POST',
    body: { friendId },
  }),
  async onQueryStarted({ userId, friendId }, { dispatch, queryFulfilled }) {
    // Update otimista ANTES de enviar
    const patchResult = dispatch(
      apiSlice.util.updateQueryData('getCurrentUser', undefined, (draft) => {
        if (draft && !draft.friends.includes(friendId)) {
          draft.friends.push(friendId);
        }
      }),
    );

    try {
      await queryFulfilled;
      dispatch(apiSlice.util.invalidateTags([{ type: 'Friends' as const }]));
    } catch (error) {
      console.error('Failed to add friend, rolling back:', error);
      patchResult.undo();
    }
  },
  invalidatesTags: ['Friends'],
}),
```

### Arquivo: `src/components/FriendActionButton.tsx`

```tsx
import React, { useCallback, useState } from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAddFriendMutation } from '../store/apiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';

interface FriendActionButtonProps {
  friendId: string;
  isFriend: boolean;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const FriendActionButton: React.FC<FriendActionButtonProps> = ({
  friendId,
  isFriend,
  onSuccess,
  onError,
}) => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const [addFriend, { isLoading }] = useAddFriendMutation();
  const [showFeedback, setShowFeedback] = useState(false);

  const handlePress = useCallback(async () => {
    if (!currentUser) return;

    try {
      await addFriend({
        userId: currentUser._id,
        friendId,
      }).unwrap();

      setShowFeedback(true);
      onSuccess?.();

      setTimeout(() => setShowFeedback(false), 2000);
    } catch (error) {
      onError?.((error as any).message || 'Erro ao atualizar');
    }
  }, [currentUser, friendId, addFriend, onSuccess, onError]);

  if (showFeedback) {
    return (
      <View style={styles.feedbackContainer}>
        <Icon name="checkmark-circle" size={24} color="#4CAF50" />
        <Text style={styles.feedbackText}>Adicionado</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isLoading}
      style={styles.button}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Icon name="person-add" size={20} color="#fff" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#E8F5E9',
    borderRadius: 22,
  },
  feedbackText: {
    marginLeft: 8,
    color: '#4CAF50',
    fontWeight: '600',
  },
});

export default FriendActionButton;
```

---

## 📦 Checklist de Implementação

### Sprint 1: Foundation (Semanas 1-2)

- [ ] Setup AuthSlice + authApiSlice
- [ ] Implementar Login Screen
- [ ] Conectar baseQuery com tokens dinâmicos
- [ ] Remover HARDCODED_USER_ID
- [ ] Testar refresh token flow

### Sprint 2: Persistence & State (Semanas 3-4)

- [ ] Redux Persist setup (AsyncStorage + SecureStore)
- [ ] Search history persistence
- [ ] NetworkStateView em todos screens
- [ ] Optimistic updates em addFriend
- [ ] Error boundary global

### Sprint 3: Navigation & Performance (Semanas 5-6)

- [ ] useNavigationDepth hook
- [ ] FriendCard memoization
- [ ] Skeleton loading components
- [ ] Lazy loading de imagens
- [ ] Profile stack infinite navigation

### Sprint 4: Polish & Deploy (Semanas 7-8)

- [ ] E2E tests com Detox
- [ ] Performance profiling
- [ ] i18n tradução completa
- [ ] Beta testing

---

## 🔧 Comandos Úteis

```bash
# Instalar dependências novas
npm install expo-secure-store redux-persist

# Criar branch de desenvolvimento
git checkout -b feat/auth-jwt-refactor

# Iniciar aplicação
npm start

# Executar testes
npm test

# Build Android
npm run android

# Build iOS
npm run ios
```

---

## 📊 Métricas de Sucesso

| Métrica                   | Target |
| ------------------------- | ------ |
| Time to Interactive (TTI) | < 2s   |
| Lighthouse Score          | 90+    |
| Cache Hit Rate            | > 80%  |
| API Requests/Session      | < 10   |
| User Login Success        | 99%    |
| Offline Capability        | 100%   |

---

## 🎯 Próximos Passos

1. **Hoje:** Remover HARDCODED_USER_ID
2. **Semana 1:** Implementar Auth Flow completo
3. **Semana 2:** Adicionar Redux Persist
4. **Semana 3:** Otimizar Network States
5. **Semana 4:** Performance & Navigation

---

**Documentação:** Frontend Architecture Improvements v1.0  
**Data:** Fevereiro 2026
