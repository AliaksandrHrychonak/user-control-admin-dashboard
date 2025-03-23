import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { CredentialsNames } from '@shared/api';

import { sessionGet } from './session';

// TODO need fix before review
const BASE_URL = `http://localhost:3001/api/v1`;
export const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
        headers.set(
            'authorization',
            `${sessionGet(CredentialsNames.tokenType)} ${sessionGet(CredentialsNames.accessToken) || sessionGet(CredentialsNames.refreshToken)}`
        );
        return headers;
    },
});
