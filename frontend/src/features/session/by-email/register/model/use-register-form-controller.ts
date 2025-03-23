'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';

import { useSignUpMutation } from '@entities/session';

import type { RegisterFormData } from './register.schema';
import type { IRequestSignUp } from '@shared/api';


interface RegisterControllerProps {
    onComplete?: () => void;
}

export const useRegisterFormController = ({
    onComplete,
}: RegisterControllerProps): {
    handleSubmit: (data: RegisterFormData) => Promise<void>;
    isLoading: boolean;
} => {
    const [signUp, { isLoading }] = useSignUpMutation();

    const handleSubmit = useCallback(
        async (data: RegisterFormData) => {
            try {
                const viewer: IRequestSignUp = {
                    firstName: data.profileInfo.firstName,
                    lastName: data.profileInfo.lastName,
                    email: data.contactInfo.email,
                    password: data.passwordInfo.password,
                };
                await signUp(viewer).unwrap();
                onComplete?.();
                // TODO Texts should be in the config, need fix after review
                toast.success('Register successfully');
            } catch (error) {
                toast.error(`Failed register: ${error}`);
            }
        },
        [onComplete, signUp]
    );

    return { handleSubmit, isLoading };
};
