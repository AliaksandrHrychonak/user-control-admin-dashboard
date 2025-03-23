'use client';

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import { sessionSlice } from '@entities/session';
import { invalidateTokensListener } from '@features/session';
import { baseApi } from '@shared/api';

import { rootReducer } from './reducer';
import { storage } from './storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [sessionSlice.name],
};

export function createStore() {
    const store = configureStore({
        // persistReducer broken https://github.com/reduxjs/redux-toolkit/issues/324
        reducer: persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer),
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }).concat([baseApi.middleware, invalidateTokensListener.middleware]),
    });

    setupListeners(store.dispatch);

    return store;
}
