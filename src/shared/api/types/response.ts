export interface IResponsePagination<T> {
    data: T[];
    meta: {
        itemsPerPage: number;
        totalItems?: number;
        currentPage?: number;
        totalPages?: number;
        sortBy: string;
        searchBy: string;
        search: string;
        select: string[];
        filter?: {
            [column: string]: string | string[];
        };
        cursor?: string;
        firstCursor?: string;
        lastCursor?: string;
    };
    links: {
        first?: string;
        previous?: string;
        current: string;
        next?: string;
        last?: string;
    };
}

export interface IResponseCustomPropertyMetadata {
    statusCode?: number;
    message?: string;
    httpStatus?: number;
    messageProperties?: number | string | unknown;
}

interface IResponseMetadata<T> {
    customProperty?: IResponseCustomPropertyMetadata;
    pagination?: IResponsePagination<T>;
    [key: string]: unknown;
}

export interface IResponse<T> extends IResponseCustomPropertyMetadata {
    _metadata?: IResponseMetadata<T>;
    data: T;
}
