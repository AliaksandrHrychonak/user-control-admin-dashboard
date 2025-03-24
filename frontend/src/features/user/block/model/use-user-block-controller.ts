'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';

import { useBlockMutation } from '@entities/user';
import {createMessageBaseQueryError, isFetchBaseQueryError} from '@shared/api';

import type {IError, IUserBlockRequest} from '@shared/api';

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
                if(isFetchBaseQueryError(error)) {
                    const errorData = error.data as IError;
                    const message = createMessageBaseQueryError(errorData?.errors);
                    toast.error(`${errorData.statusCode || error.status}. Failed to block user`,{
                        description: message || errorData.message
                    });
                }
            }
        },
        [block, onComplete]
    );

    return { onBlock, isLoading };
};
