'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useDialogContext } from '@shared/lib';
import { MultiStepFormProvider } from '@shared/ui';

import { createDefaultValues } from './create-default-values';
import { userFormSchema } from './create-user.schema';
import { useUserCreateFormController } from './use-user-create-form-controller';
import { UserCreateFormContext } from './user-create-form-context';

import type { UserFormData } from './create-user.schema';
import type { FC, ReactNode } from 'react';

interface UserCreateProviderProps {
    children: ReactNode;
}

export const UserCreateFormProvider: FC<UserCreateProviderProps> = ({ children }) => {
    const { closeDialog } = useDialogContext();

    const form = useForm<UserFormData>({
        defaultValues: createDefaultValues(),
        resolver: zodResolver(userFormSchema),
        mode: 'onChange',
    });

    const { handleSubmit, isLoading } = useUserCreateFormController({
        onComplete: () => {
            closeDialog();
            form.reset();
        },
    });

    return (
        <UserCreateFormContext.Provider
            value={{
                handleSubmit,
                form,
                isLoading,
            }}
        >
            <MultiStepFormProvider form={form} onSubmit={handleSubmit} schema={userFormSchema}>
                {children}
            </MultiStepFormProvider>
        </UserCreateFormContext.Provider>
    );
};
