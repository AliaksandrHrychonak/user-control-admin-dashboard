import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    // eslint-disable-next-line eqeqeq
    return typeof error === 'object' && error != null && 'status' in error && 'data' in error;
}