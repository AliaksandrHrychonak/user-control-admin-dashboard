'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { type Persistor, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { createStore } from '../store';


import type { ReactNode} from 'react';

export const WithStoreProvider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<AppStore>(undefined);
    const persistorRef = useRef<Persistor>({} as Persistor);
    if (!storeRef.current) {
        try {
            storeRef.current = createStore();
            persistorRef.current = persistStore(storeRef.current);
        } catch (error) {
            console.error('Failed to initialize store:', error);
        }
    }

    return (
        <Provider store={storeRef.current}>
            <PersistGate loading={<div>Loading withPersistGate</div>} persistor={persistorRef.current}>
                {children}
            </PersistGate>
        </Provider>
    );
};
