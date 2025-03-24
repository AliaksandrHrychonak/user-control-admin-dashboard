import {
    baseApi
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
                url: `/admin/user/create`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['USER_MARK'],
        }),
        delete: build.mutation<IResponseCustomPropertyMetadata, IUserDeleteRequest>({
            query: (body) => ({
                url: `/admin/user/delete`,
                method: 'DELETE',
                body,
            }),
            invalidatesTags: ['USER_MARK'],
        }),
        block: build.mutation<IResponseCustomPropertyMetadata, IUserBlockRequest>({
            query: (body) => ({
                url: `/admin/user/update/blocked`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['USER_MARK'],
        }),
        unblock: build.mutation<IResponseCustomPropertyMetadata, IUserUnblockRequest>({
            query: (body) => ({
                url: `/admin/user/update/unblocked`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['USER_MARK'],
        }),
        list: build.query<IResponsePagination<IUser>, IPaginateQuery>({
            query: ({ page, search, limit, sortBy }) => ({
                url: `/admin/user/list`,
                method: 'GET',
                params: {
                    page,
                    limit,
                    sortBy,
                    search,
                },
            }),
            providesTags: (result) => {
                if (!result?.data?.length) {
                    return ['USER_MARK'];
                }
                return [
                    ...result.data.map(({ id }) => ({ type: 'USER_MARK' as const, id })),
                    { type: 'USER_MARK' as const, id: 'LIST' }
                ];
            },
        }),
    }),
});

export const { useCreateMutation, useBlockMutation, useDeleteMutation, useUnblockMutation, useListQuery } = userApi;
