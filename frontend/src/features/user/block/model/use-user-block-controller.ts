'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';

import { useBlockMutation } from '@entities/user';

import type { IUserBlockRequest } from '@shared/api';

interface BlockUserControllerProps {
    onComplete?: () => void;
}

export const useUserBlockController = ({
    onComplete,
}: BlockUserControllerProps): {
    onBlock: (data: IUserBlockRequest) => Promise<void>;
    isLoading: boolean;
} => {
    const [block, { isLoading }] = useBlockMutation();

    const onBlock = useCallback(
        async (data: IUserBlockRequest) => {
            try {
                await block(data).unwrap();
                onComplete?.();
                // TODO Texts should be in the config, need fix after review
                toast.success('User block successfully');
            } catch (error) {
                toast.error(`Failed to block user: ${error}`);
            }
        },
        [block, onComplete]
    );

    return { onBlock, isLoading };
};
