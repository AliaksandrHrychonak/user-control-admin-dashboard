'use client';

import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

interface NoopStorageReturnType {
    getItem: (_key: string) => Promise<null>;
    setItem: (_key: string, value: unknown) => Promise<unknown>;
    removeItem: (_key: string) => Promise<void>;
}

const createNoopStorage = (): NoopStorageReturnType => {
    return {
        getItem(_key: string): Promise<null> {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: unknown): Promise<unknown> {
            return Promise.resolve(value);
        },
        removeItem(_key: string): Promise<void> {
            return Promise.resolve();
        },
    };
};

export const storage = typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();