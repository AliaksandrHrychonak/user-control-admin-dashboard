import { createAsyncThunk, createListenerMiddleware, type TypedStartListening } from '@reduxjs/toolkit';
import { redirect } from 'next/navigation';

import { invalidateTokens, SESSION_MARK, sessionDelete } from '@/shared/api';
import { clearSessionData, sessionApi } from '@entities/session';
import { wait } from '@shared/lib';


export const invalidateTokensListener = createListenerMiddleware();

// @see https://redux-toolkit.js.org/api/createListenerMiddleware#typescript-usage
export type TypedListening = TypedStartListening<RootState, AppDispatch>;

export const logoutThunk = createAsyncThunk<void, void, { state: RootState }>(
    'authentication/logout',
    async (_: unknown, { dispatch }) => {
        dispatch(clearSessionData());

        // Wait 10ms to invalidateTags in next event loop tick.
        // Otherwise after invalidate related requests with SESSION_TAG
        // will be started, but isAuthorized will still be equal to true
        await wait(10);

        // 👇 ATTENTION: This line clear all baseApi state instead of sessionApi
        // dispatch(api.util.resetApiState())

        dispatch(sessionApi.util.invalidateTags([SESSION_MARK]));
        sessionStorage.clear();
        localStorage.clear();
        sessionDelete();
        // TODO Routes should be taken from the config, need fix after review
        redirect('/sign-in');
    }
);

export const startInvalidateTokensListener = invalidateTokensListener.startListening as TypedListening;

startInvalidateTokensListener({
    actionCreator: invalidateTokens,
    effect: async (_, api) => {
        // In the future here may be logic with refresh access token
        // @see https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#preventing-multiple-unauthorized-errors
        api.dispatch(logoutThunk());
    },
});
