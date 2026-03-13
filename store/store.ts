import { configureStore, combineReducers } from '@reduxjs/toolkit';
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
import { notespitaraApi } from './services/notespitara';
import authReducer from './authSlice';

// Create a custom storage that only works on the client side
const createNoopStorage = () => {
  return {
    getItem: () => Promise.resolve(null),
    setItem: () => Promise.resolve(),
    removeItem: () => Promise.resolve(),
  };
};

// Use client-side storage only in the browser, noop storage on server
const storage = typeof window !== 'undefined' 
  ? require('redux-persist/lib/storage').default 
  : createNoopStorage();

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'], // persist auth user info across refreshes
};

const rootReducer = combineReducers({
  auth: authReducer,
  [notespitaraApi.reducerPath]: notespitaraApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(notespitaraApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
