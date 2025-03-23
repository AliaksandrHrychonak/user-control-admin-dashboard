import {
    baseApi,
    sessionSet
} from '@shared/api';
import { SESSION_MARK } from '@shared/api/tags';

import type {
    ISession,
    IRequestSignIn,
    IRequestSignUp,
    IResponseCustomPropertyMetadata} from '@shared/api';
import type { IResponse } from '@shared/api/types';

// TODO It is better to store requests directly in the feature, need fix after review
export const sessionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<ISession, IRequestSignIn>({
            query: (body) => ({
                url: `/user/login`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [SESSION_MARK],
            transformResponse: (response: IResponse<ISession>) => {
                const { accessToken, refreshToken, tokenType, expiresIn } = response.data;
                sessionSet({ accessToken, refreshToken, tokenType, expiresIn });
                return response.data;
            },
        }),
        signUp: build.mutation<IResponseCustomPropertyMetadata, IRequestSignUp>({
            query: (body) => ({
                url: `/user/sign-up`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [SESSION_MARK],
        }),
    }),
});

export const { useLoginMutation, useSignUpMutation } = sessionApi;
