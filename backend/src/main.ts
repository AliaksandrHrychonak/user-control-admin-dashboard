import type { NestApplication} from '@nestjs/core';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {HttpStatus, Logger, VersioningType} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import swaggerInit from './swagger';
import helmet from "helmet";
import {ENUM_REQUEST_METHOD} from "./common/request/constants/request.enum.constant";

async function bootstrap() {
    const app: NestApplication = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const databaseUri: string = configService.get<string>('database.host');
    const env: string = configService.get<string>('app.env');
    const host: string = configService.get<string>('app.http.host');
    const port: number = configService.get<number>('app.http.port');
    const globalPrefix: string = configService.get<string>('app.globalPrefix');
    const versioningPrefix: string = configService.get<string>('app.versioning.prefix');
    const version: string = configService.get<string>('app.versioning.version');

    // enable
    const httpEnable: boolean = configService.get<boolean>('app.http.enable');
    const versionEnable: string = configService.get<string>('app.versioning.enable');
    const jobEnable: boolean = configService.get<boolean>('app.jobEnable');

    app.enableCors({
        methods: [
            ENUM_REQUEST_METHOD.GET,
            ENUM_REQUEST_METHOD.DELETE,
            ENUM_REQUEST_METHOD.PUT,
            ENUM_REQUEST_METHOD.PATCH,
            ENUM_REQUEST_METHOD.POST,
        ],
        // allowOrigin: '*', // allow all origin
        // allowOrigin: [/example\.com(\:\d{1,4})?$/], // allow all subdomain, and all port
        origin: env === 'production' ? [/user-control-admin-dashboard\.monster$/] : "*", // allow all subdomain without port
        allowedHeaders: [
            'Accept',
            'Accept-Language',
            'Content-Language',
            'Content-Type',
            'Origin',
            'Authorization',
            'Access-Control-Request-Method',
            'Access-Control-Request-Headers',
            'Access-Control-Allow-Headers',
            'Access-Control-Allow-Origin',
            'Access-Control-Allow-Methods',
            'Access-Control-Allow-Credentials',
            'Access-Control-Expose-Headers',
            'Access-Control-Max-Age',
            'Referer',
            'Host',
            'X-Requested-With',
            'x-custom-lang',
            'x-timestamp',
            'x-api-key',
            'x-timezone',
            'x-request-id',
            'x-version',
            'x-repo-version',
            'X-Response-Time',
            'user-agent',
        ],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: HttpStatus.NO_CONTENT,
    });
    app.use(helmet());

    const logger = new Logger();
    process.env.NODE_ENV = env;

    // Global
    app.setGlobalPrefix(globalPrefix);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    // Versioning
    if (versionEnable) {
        app.enableVersioning({
            type: VersioningType.URI,
            defaultVersion: version,
            prefix: versioningPrefix,
        });
    }
    // // Swagger
    await swaggerInit(app);

    // Listen
    await app.listen(port, host);

    logger.log(`==========================================================`);

    logger.log(`Environment Variable`, 'NestApplication');
    logger.log(JSON.parse(JSON.stringify(process.env)), 'NestApplication');

    logger.log(`==========================================================`);

    logger.log(`Job is ${jobEnable}`, 'NestApplication');
    logger.log(
        `Http is ${httpEnable}, ${httpEnable ? 'routes registered' : 'no routes registered'}`,
        'NestApplication'
    );
    logger.log(`Http versioning is ${versionEnable}`, 'NestApplication');

    logger.log(`Http Server running on ${await app.getUrl()}`, 'NestApplication');
    logger.log(`Database uri ${databaseUri}`, 'NestApplication');

    logger.log(`==========================================================`);
}
bootstrap();
