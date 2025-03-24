import { createApi } from '@reduxjs/toolkit/query/react';

import { SESSION_MARK, USER_MARK, VIEWER_MARK } from '../tags';
import { baseQueryWithReauthentication } from './base-query-with-reauthentication';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithReauthentication,
    endpoints: () => ({}),
    tagTypes: [SESSION_MARK, VIEWER_MARK, USER_MARK],
});
