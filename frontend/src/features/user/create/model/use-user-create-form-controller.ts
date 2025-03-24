'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';

import { useCreateMutation } from '@entities/user';
import { createMessageBaseQueryError, isFetchBaseQueryError} from '@shared/api';

import type { UserFormData } from './create-user.schema';
import type { IUserCreateRequest, IError} from '@shared/api';


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
                if(isFetchBaseQueryError(error)) {
                    const errorData = error.data as IError;
                    const message = createMessageBaseQueryError(errorData?.errors);
                    toast.error(`${errorData.statusCode || error.status}. Failed to create user`,{
                        description: message || errorData.message
                    });
                }
            }
        },
        [create, onComplete]
    );

    return { handleSubmit, isLoading };
};
