'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';

import { useLoginMutation } from '@entities/session';

import type { LoginFormData } from './login.schema';

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
                toast.error(`Failed to login: ${error}`);
            }
        },
        [onComplete]
    );

    return { handleSubmit, isLoading };
};
