import {
    baseApi,
    USER_MARK
} from '@shared/api';

import type {
    IPaginateQuery,
    IResponseCustomPropertyMetadata,
    IUser,
    IUserCreateRequest,
    IUserDeleteRequest,
    IUserUnblockRequest,
    IResponsePagination,
    IUserBlockRequest} from '@shared/api';

// TODO It is better to store requests directly in the feature, need fix after review
export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        create: build.mutation<IResponseCustomPropertyMetadata, IUserCreateRequest>({
            query: (body) => ({
                url: `/user/sign-up`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [USER_MARK],
        }),
        delete: build.mutation<IResponseCustomPropertyMetadata, IUserDeleteRequest>({
            query: (body) => ({
                url: `/user/delete`,
                method: 'DELETE',
                body,
            }),
            invalidatesTags: [USER_MARK],
        }),
        block: build.mutation<IResponseCustomPropertyMetadata, IUserBlockRequest>({
            query: (body) => ({
                url: `/user/update/blocked`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: [USER_MARK],
        }),
        unblock: build.mutation<IResponseCustomPropertyMetadata, IUserUnblockRequest>({
            query: (body) => ({
                url: `/user/update/unblocked`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: [USER_MARK],
        }),
        list: build.query<IResponsePagination<IUser>, IPaginateQuery>({
            query: ({ page, search, limit, sortBy }) => ({
                url: `/user/list`,
                method: 'GET',
                params: {
                    page,
                    limit,
                    sortBy,
                    search,
                },
            }),
            providesTags: (result: IResponsePagination<IUser> | undefined) =>
                // TODO fix bug { type: 'USER_TAG' as const, _id }
                result?.data && result?.data.length !== 0
                    ? [...result.data.map(({ id }: { id: string }) => ({ type: 'USER_MARK' as const, id }))]
                    : [USER_MARK],
        }),
    }),
});

export const { useCreateMutation, useBlockMutation, useDeleteMutation, useUnblockMutation, useListQuery } = userApi;
