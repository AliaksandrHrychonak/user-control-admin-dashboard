import { Mutex } from 'async-mutex';

import { baseQuery } from './baseQuery';
import { invalidateTokens } from './invalidate-tokens';
import { sessionSet } from './session';
import { Config } from '../../config';

import type { IResponse, ISession } from '../types';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const { API_MAIN_AUTH_REFRESH } = Config;

export type QueryReturnValue<T = unknown, E = unknown, M = unknown> =
    | {
          error: E;
          data?: undefined;
          meta?: M;
      }
    | {
          error?: undefined;
          data: T;
          meta?: M;
      };

const mutex = new Mutex();

export const baseQueryWithReauthentication: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await baseQuery(
                    {
                        url: API_MAIN_AUTH_REFRESH as string,
                        method: 'POST',
                    },
                    api,
                    extraOptions
                );
                const { data: res } = refreshResult as QueryReturnValue<IResponse<ISession>, unknown, unknown>;
                if (res && res.data.accessToken) {
                    const { accessToken, expiresIn, tokenType, refreshToken } = res.data;
                    sessionSet({ accessToken, refreshToken, tokenType, expiresIn });
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(invalidateTokens());
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};
