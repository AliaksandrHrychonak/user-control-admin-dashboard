import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Config } from '../../config';
import { CredentialsNames } from '../types';
import { sessionGet } from './session';

const { API_MAIN_URL, API_MAIN_URL_PREFIX, API_MAIN_URL_VERSION } = Config;

export const baseQuery = fetchBaseQuery({
    baseUrl: `${API_MAIN_URL}/${API_MAIN_URL_PREFIX}/${API_MAIN_URL_VERSION}`,
    prepareHeaders: (headers) => {
        headers.set(
            'authorization',
            `${sessionGet(CredentialsNames.tokenType)} ${sessionGet(CredentialsNames.accessToken) || sessionGet(CredentialsNames.refreshToken)}`
        );
        return headers;
    },
});
