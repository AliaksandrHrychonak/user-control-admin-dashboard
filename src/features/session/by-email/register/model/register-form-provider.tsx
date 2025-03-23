'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { MultiStepFormProvider } from '@shared/ui';

import { createDefaultValues } from './create-default-values';
import { RegisterFormContext } from './register-form-context';
import { RegisterFormSchema } from './register.schema';
import { useRegisterFormController } from './use-register-form-controller';

import type { RegisterFormData} from './register.schema';
import type { FC, ReactNode } from 'react';

interface UserCreateProviderProps {
    children: ReactNode;
    onComplete?: (() => void) | undefined;
}

export const RegisterFormProvider: FC<UserCreateProviderProps> = ({ onComplete, children }) => {
    const form = useForm<RegisterFormData>({
        defaultValues: createDefaultValues(),
        resolver: zodResolver(RegisterFormSchema),
        mode: 'onChange',
    });

    const { handleSubmit, isLoading } = useRegisterFormController({
        onComplete: () => {
            onComplete?.();
            form.reset();
        },
    });

    return (
        <RegisterFormContext.Provider
            value={{
                handleSubmit,
                form,
                isLoading,
            }}
        >
            <MultiStepFormProvider
                form={form}
                onSubmit={handleSubmit}
                schema={RegisterFormSchema}
                className='w-full max-w-sm'
            >
                {children}
            </MultiStepFormProvider>
        </RegisterFormContext.Provider>
    );
};
