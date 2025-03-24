'use client';

import { configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import { sessionSlice } from '@entities/session';
import { invalidateTokensListener, logoutThunk } from '@features/session';
import { baseApi, isFetchBaseQueryError } from '@shared/api';

import { rootReducer } from './reducer';
import { storage } from './storage';

import type { Middleware } from '@reduxjs/toolkit';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [sessionSlice.name],
};

export const handle403Error: Middleware = (store) => (next) => (action) => {
    if (isRejectedWithValue(action) && isFetchBaseQueryError(action.payload)) {
        if (action.payload.status === 403) {
            store.dispatch(logoutThunk() as never);
        }

        return;
    }

    return next(action);
};

export function createStore(): ReturnType<typeof configureStore> {
    const store = configureStore({
        // persistReducer broken https://github.com/reduxjs/redux-toolkit/issues/324
        reducer: persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer),
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }).concat([baseApi.middleware, invalidateTokensListener.middleware, handle403Error]),
    });

    setupListeners(store.dispatch);

    return store;
}
