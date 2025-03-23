import { createContext } from 'react';

import type { UserFormData } from './create-user.schema';
import type { UseFormReturn } from 'react-hook-form';

export interface UserCreateFormContextState {
    handleSubmit: (data: UserFormData) => Promise<void>;
    form: UseFormReturn<UserFormData>;
    isLoading: boolean;
}

export const UserCreateFormContext = createContext<UserCreateFormContextState | null>(null);
