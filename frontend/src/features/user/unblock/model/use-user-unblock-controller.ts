'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';

import { useUnblockMutation } from '@entities/user';
import { createMessageBaseQueryError, isFetchBaseQueryError } from '@shared/api';

import type { IError, IUserUnblockRequest } from '@shared/api';

interface UnblockUserControllerProps {
    onComplete?: () => void;
}

export const useUserUnblockController = ({
    onComplete,
}: UnblockUserControllerProps): {
    onUnblock: (data: IUserUnblockRequest) => Promise<void>;
    isLoading: boolean;
} => {
    const [unblock, { isLoading }] = useUnblockMutation();

    const onUnblock = useCallback(
        async (data: IUserUnblockRequest) => {
            try {
                await unblock(data).unwrap();
                onComplete?.();
                // TODO Texts should be in the config, need fix after review
                toast.success('User unblock successfully');
            } catch (error) {
                if (isFetchBaseQueryError(error)) {
                    const errorData = error.data as IError;
                    const message = createMessageBaseQueryError(errorData?.errors);
                    toast.error(`${errorData.statusCode || error.status}. Failed to unblock user`, {
                        description: message || errorData.message,
                    });
                }
            }
        },
        [onComplete, unblock]
    );

    return { onUnblock, isLoading };
};
