import { QueryFailedError } from 'typeorm';
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { ENUM_REQUEST_STATUS_CODE_ERROR } from '../../request/constants/request.status-code.constant';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError & { code?: string }, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const detail = (exception as any).detail;
        const field = this.extractFieldFromError(detail);

        const formatErrors = [{
            property: field || 'unknown',
            constraints: {
                [exception.code || 'unknown']: this.getErrorMessage(exception.code || 'unknown')
            },
            value: detail,
            children: []
        }];

        response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
            statusCode: ENUM_REQUEST_STATUS_CODE_ERROR.REQUEST_VALIDATION_ERROR,
            message: 'request.error.validation',
            errors: formatErrors
        });
    }

    private getErrorMessage(code: string): string {
        const messages = {
            '23505': 'database.error.unique',
            '23503': 'database.error.foreignKey'
        };
        return messages[code] || 'database.error.unknown';
    }

    private extractFieldFromError(detail: string): string | null {
        if (!detail) return null;

        const uniqueMatch = detail.match(/Key \((.*?)\)=/);
        if (uniqueMatch) return uniqueMatch[1];

        const foreignKeyMatch = detail.match(/foreign key.*?"(\w+)"/i);
        if (foreignKeyMatch) return foreignKeyMatch[1];

        return null;
    }
}