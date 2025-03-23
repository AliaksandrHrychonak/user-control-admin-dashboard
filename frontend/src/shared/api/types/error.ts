import type { IResponseCustomPropertyMetadata } from './response';

export interface ValidationError {
    target?: object;
    property: string;
    value?: never;
    constraints?: {
        [type: string]: string;
    };
    children?: ValidationError[];
    contexts?: {
        [type: string]: never;
    };
    toString(
        shouldDecorate?: boolean,
        hasParent?: boolean,
        parentPath?: string,
        showConstraintMessages?: boolean
    ): string;
}

export interface IErrors {
    readonly message: string | Record<string, string>;
    readonly property: string;
}

export interface IErrorsImport {
    row: number;
    file?: string;
    sheet?: number;
    errors: IErrors[];
}

export interface IValidationErrorImport extends Omit<IErrorsImport, 'errors'> {
    errors: ValidationError[];
}

export type IErrorCustomPropertyMetadata = Pick<IResponseCustomPropertyMetadata, 'messageProperties'>;

export interface IErrorMetadata {
    customProperty?: IErrorCustomPropertyMetadata;
    [key: string]: unknown;
}

export interface IErrorException {
    statusCode: number;
    message: string;
    errors?: ValidationError[] | IValidationErrorImport[];
    data?: Record<string, never>;
    _error?: string;
    _metadata?: IErrorMetadata;
}
