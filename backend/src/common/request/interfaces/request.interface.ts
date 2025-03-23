import type { Request } from 'express';

export interface IRequestApp extends Request {
    user?: Record<string, any>;

    __id: string;
    __timestamp: number;
    __version: string;
    __repoVersion: string;

    __class?: string;
    __function?: string;

    __filters?: Record<string, string | number | boolean | Array<string | number | boolean>>;
}
