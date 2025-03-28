import { baseApi, sessionSet , SESSION_MARK } from '@shared/api';

import type { ISession, IRequestSignIn, IRequestSignUp, IResponseCustomPropertyMetadata, IUser , IResponse } from '@shared/api';

// TODO It is better to store requests directly in the feature, need fix after review
export const sessionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<ISession, IRequestSignIn>({
            query: (body) => ({
                url: `/public/user/login`,
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
                url: `/public/user/sign-up`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [SESSION_MARK],
        }),
        profile: build.query<IResponse<IUser>, void>({
            query: () => ({
                url: `/auth/user/profile`,
                method: 'Get',
            }),
        }),
    }),
});

export const { useLoginMutation, useSignUpMutation, useProfileQuery } = sessionApi;
