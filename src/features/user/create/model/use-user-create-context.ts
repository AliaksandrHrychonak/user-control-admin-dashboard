import { useContext } from 'react';

import { UserCreateFormContext } from './user-create-form-context';

import type { UserCreateFormContextState } from './user-create-form-context';

export const useUserCreateFormContext = (): UserCreateFormContextState => {
    const context = useContext(UserCreateFormContext);
    if (!context) {
        throw new Error('useUserCreateContext must be used within UserCreateFormProvider');
    }
    return context;
};
