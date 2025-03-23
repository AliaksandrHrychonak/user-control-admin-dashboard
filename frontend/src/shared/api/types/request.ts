export interface IPaginateQuery {
    page?: number;
    limit?: number;
    sortBy?: string;
    searchBy?: string;
    search?: string;
    filter?: {
        [column: string]: string | string[];
    };
    select?: string[];
    cursor?: string;
    cursorColumn?: string;
    cursorDirection?: 'before' | 'after';
}
