
// error default
import type { ValidationError } from 'class-validator';
import type { ERROR_TYPE } from '../constants/error.enum.constant';
import type { HttpStatus } from '@nestjs/common';

export interface IErrors {
    readonly message: string;
}

export interface IValidationErrorImport  {
    errors: ValidationError[];
}

// error exception

export interface IResponseCustomPropertyMetadata {
    statusCode?: number;
    message?: string;
    httpStatus?: HttpStatus;
    messageProperties?: string;
}


export type IErrorCustomPropertyMetadata = Pick<
    IResponseCustomPropertyMetadata,
    'messageProperties'
>;

export interface IErrorMetadata {
    customProperty?: IErrorCustomPropertyMetadata;
    [key: string]: any;
}

export interface IErrorException {
    statusCode: number;
    message: string;
    errors?: ValidationError[] | IValidationErrorImport[];
    data?: Record<string, any>;
    _error?: string;
    _errorType?: ERROR_TYPE;
    _metadata?: IErrorMetadata;
}

export interface IErrorHttpFilter
    extends Omit<IErrorException, '_errorType' | 'message'> {
    message: string;
}
