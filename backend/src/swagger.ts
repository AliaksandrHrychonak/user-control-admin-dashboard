import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { NestApplication } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ENUM_APP_ENVIRONMENT } from 'src/app/constants/app.enum.constant';
import { SwaggerTheme } from 'swagger-themes';
import { mkdir } from 'fs/promises';
import { dirname } from 'path';
import { writeFileSync } from 'fs';

export default async function (app: NestApplication) {
    const configService = app.get(ConfigService);
    const env: string = configService.get<string>('app.env');
    const logger = new Logger();

    const docName: string = configService.get<string>('doc.name');
    const docDesc: string = configService.get<string>('doc.description');
    const docVersion: string = configService.get<string>('doc.version');
    const docPrefix: string = configService.get<string>('doc.prefix');

    if (env !== ENUM_APP_ENVIRONMENT.PRODUCTION) {
        const documentBuild = new DocumentBuilder()
            .setTitle(docName)
            .setDescription(docDesc)
            .setVersion(docVersion)
            .addTag("API's")
            .addServer('/')
            .addServer('/staging')
            .addServer('/prod')
            .addBearerAuth(
                { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
                'accessToken'
            )
            .addBearerAuth(
                { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
                'refreshToken'
            )
            .build();

        const document = SwaggerModule.createDocument(app, documentBuild, {
            deepScanRoutes: true,
        });

        try {
            const swaggerPath = './data/swagger.json';
            await mkdir(dirname(swaggerPath), { recursive: true });
            writeFileSync(swaggerPath, JSON.stringify(document));
        } catch (error) {
            logger.error(`Failed to write swagger file: ${error.message}`);
        }
        new SwaggerTheme('v3');
        SwaggerModule.setup(docPrefix, app, document, {
            jsonDocumentUrl: `${docPrefix}/json`,
            yamlDocumentUrl: `${docPrefix}/yaml`,
            explorer: false,
            customSiteTitle: docName,
            swaggerOptions: {
                docExpansion: 'none',
                persistAuthorization: true,
                displayOperationId: true,
                operationsSorter: 'alpha',
                tagsSorter: 'alpha',
                tryItOutEnabled: true,
                filter: true,
                deepLinking: true,
                syntaxHighlight: {
                    activate: true,
                    theme: 'tomorrow-night',
                },
            },
        });

        logger.log(
            `==========================================================`
        );

        logger.log(`Docs will serve on ${docPrefix}`, 'NestApplication');

        logger.log(
            `==========================================================`
        );
    }
}
