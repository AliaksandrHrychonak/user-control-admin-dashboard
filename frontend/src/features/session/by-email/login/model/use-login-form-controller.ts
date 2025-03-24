'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';

import { useLoginMutation } from '@entities/session';
import { createMessageBaseQueryError, isFetchBaseQueryError } from '@shared/api';

import type { LoginFormData } from './login.schema';
import type { IError } from '@shared/api';

interface LoginControllerProps {
    onComplete?: () => void | unknown;
}

export const useLoginFormController = ({
    onComplete,
}: LoginControllerProps): {
    handleSubmit: (data: LoginFormData) => Promise<void>;
    isLoading: boolean;
} => {
    const [login, { isLoading }] = useLoginMutation();

    const handleSubmit = useCallback(
        async (data: LoginFormData) => {
            try {
                await login(data).unwrap();
                onComplete?.();
                // TODO Texts should be in the config, need fix after review
                toast.success('Login successfully');
            } catch (error) {
                if (isFetchBaseQueryError(error)) {
                    const errorData = error.data as IError;
                    const message = createMessageBaseQueryError(errorData?.errors);
                    toast.error(`${errorData.statusCode || error.status}. Failed to login`, {
                        description: message || errorData.message,
                    });
                }
            }
        },
        [login, onComplete]
    );

    return { handleSubmit, isLoading };
};
