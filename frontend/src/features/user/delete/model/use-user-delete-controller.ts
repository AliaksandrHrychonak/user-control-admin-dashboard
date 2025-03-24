'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';

import { useDeleteMutation } from '@entities/user';
import { createMessageBaseQueryError, isFetchBaseQueryError } from '@shared/api';

import type { IError, IUserDeleteRequest } from '@shared/api';

interface DeleteUserControllerProps {
    onComplete?: () => void;
}

export const useUserDeleteController = ({
    onComplete,
}: DeleteUserControllerProps): {
    onDelete: (data: IUserDeleteRequest) => Promise<void>;
    isLoading: boolean;
} => {
    const [block, { isLoading }] = useDeleteMutation();

    const onDelete = useCallback(
        async (data: IUserDeleteRequest) => {
            try {
                await block(data).unwrap();
                onComplete?.();
                // TODO Texts should be in the config, need fix after review
                toast.success('User delete successfully');
            } catch (error) {
                if (isFetchBaseQueryError(error)) {
                    const errorData = error.data as IError;
                    const message = createMessageBaseQueryError(errorData?.errors);
                    toast.error(`${errorData.statusCode || error.status}. Failed to delete user`, {
                        description: message || errorData.message,
                    });
                }
            }
        },
        [block, onComplete]
    );

    return { onDelete, isLoading };
};
