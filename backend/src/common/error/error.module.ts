import {
    Global,
    HttpStatus,
    Module,
    UnprocessableEntityException,
    ValidationPipe,
} from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ErrorHttpFilter } from './filters/error.http.filter';
import { TypeOrmExceptionFilter } from './filters/error.typeorm.filter';
import { ValidationError } from 'class-validator';
import { ENUM_REQUEST_STATUS_CODE_ERROR } from '../request/constants/request.status-code.constant';

@Global()
@Module({
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: TypeOrmExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: ErrorHttpFilter,
        },
        {
            provide: APP_PIPE,
            useFactory: () =>
                new ValidationPipe({
                    transform: true,
                    skipNullProperties: false,
                    skipUndefinedProperties: false,
                    skipMissingProperties: false,
                    forbidUnknownValues: false,
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                    exceptionFactory: (errors: ValidationError[]) => {
                        const formatErrors = errors.map((error) => {
                            return {
                                property: error.property,
                                constraints: error.constraints,
                                value: error.value,
                                children: error.children
                            };
                        });

                        return new UnprocessableEntityException({
                            statusCode: ENUM_REQUEST_STATUS_CODE_ERROR.REQUEST_VALIDATION_ERROR,
                            message: 'request.validation',
                            errors: formatErrors
                        });
                    },
                }),
        },

    ],
    imports: [],
})
export class ErrorModule {}
