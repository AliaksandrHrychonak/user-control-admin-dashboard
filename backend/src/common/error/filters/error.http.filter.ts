import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { HelperDateService } from '../../helper/services/helper.date.service';

@Catch(HttpException)
export class ErrorHttpFilter implements ExceptionFilter {
    constructor(
        private readonly configService: ConfigService,
        private readonly helperDateService: HelperDateService,
    ) {}

    async catch(exception: HttpException, host: ArgumentsHost): Promise<void> {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        const messageKey = typeof exceptionResponse === 'object'
            ? exceptionResponse['message']
            : `error.${status}`;

        const message = await this.configService.get(`messages.${messageKey}`)
            || messageKey;

        const responseBody = {
            statusCode: status,
            message,
            timestamp: this.helperDateService.timestamp(),
            ...(typeof exceptionResponse === 'object' && exceptionResponse['errors'] && {
                errors: exceptionResponse['errors']
            })
        };

        response
            .status(status)
            .json(responseBody);
    }
}