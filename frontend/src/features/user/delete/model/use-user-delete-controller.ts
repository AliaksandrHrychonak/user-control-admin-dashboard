'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';

import { useDeleteMutation } from '@entities/user';

import type { IUserDeleteRequest } from '@shared/api';

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
                toast.error(`Failed to delete user: ${error}`);
            }
        },
        [block, onComplete]
    );

    return { onDelete, isLoading };
};
