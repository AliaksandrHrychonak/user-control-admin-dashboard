'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';

import { useCreateMutation } from '@entities/user';

import type { UserFormData } from './create-user.schema';
import type { IUserCreateRequest } from '@shared/api';


interface CreateUserControllerProps {
    onComplete?: () => void;
}

export const useUserCreateFormController = ({
    onComplete,
}: CreateUserControllerProps): {
    handleSubmit: (data: UserFormData) => Promise<void>;
    isLoading: boolean;
} => {
    const [create, { isLoading }] = useCreateMutation();

    const handleSubmit = useCallback(
        async (data: UserFormData) => {
            try {
                const newUser: IUserCreateRequest = {
                    firstName: data.profileInfo.firstName,
                    lastName: data.profileInfo.lastName,
                    signUpFrom: data.profileInfo.signUpForm,
                    email: data.contactInfo.email,
                    password: data.passwordInfo.password,
                };
                await create(newUser).unwrap();
                onComplete?.();
                // TODO Texts should be in the config, need fix after review
                toast.success('User created successfully');
            } catch (error) {
                toast.error(`Failed to create user: ${error}`);
            }
        },
        [onComplete]
    );

    return { handleSubmit, isLoading };
};
