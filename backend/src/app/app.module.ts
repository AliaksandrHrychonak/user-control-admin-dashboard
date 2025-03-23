import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configs from '../configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../modules/user/repository/entities/user.entity';
import { HelperModule } from '../common/helper/helper.module';
import { AuthModule } from '../common/auth/auth.module';
import { UserModule } from '../modules/user/user.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as Joi from 'joi';
import { APP_LANGUAGE } from './constants/app.constant';
import { ENUM_APP_ENVIRONMENT } from './constants/app.enum.constant';
import { ErrorModule } from '../common/error/error.module';
import { RequestModule } from '../common/request/request.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
    controllers: [AppController],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            load: configs,
            isGlobal: true,
            cache: true,
            envFilePath: ['.env'],
            expandVariables: true,
            validationSchema: Joi.object({
                APP_NAME: Joi.string().required(),
                APP_ENV: Joi.string()
                    .valid(...Object.values(ENUM_APP_ENVIRONMENT))
                    .default('development')
                    .required(),
                APP_LANGUAGE: Joi.string().default(APP_LANGUAGE).required(),
                HTTP_ENABLE: Joi.boolean().default(true).required(),
                HTTP_HOST: [Joi.string().ip({ version: 'ipv4' }).required(), Joi.valid('localhost').required()],
                HTTP_PORT: Joi.number().default(3001).required(),
                HTTP_VERSIONING_ENABLE: Joi.boolean().default(true).required(),
                HTTP_VERSION: Joi.number().required(),

                DEBUGGER_HTTP_WRITE_INTO_FILE: Joi.boolean().default(false).required(),
                DEBUGGER_HTTP_WRITE_INTO_CONSOLE: Joi.boolean().default(false).required(),
                DEBUGGER_SYSTEM_WRITE_INTO_FILE: Joi.boolean().default(false).required(),
                DEBUGGER_SYSTEM_WRITE_INTO_CONSOLE: Joi.boolean().default(false).required(),

                JOB_ENABLE: Joi.boolean().default(false).required(),

                DATABASE_HOST: Joi.string().default('localhost').required(),
                DATABASE_PORT: Joi.number().default(5432).required(),
                DATABASE_NAME: Joi.string().default('user_control_dashboard_db').required(),
                DATABASE_USER: Joi.string().allow(null, '').optional(),
                DATABASE_PASSWORD: Joi.string().allow(null, '').optional(),
                DATABASE_SYNCHRONIZE: Joi.boolean().default(false).required(),
                DATABASE_DEBUG: Joi.boolean().default(false).required(),
                DATABASE_OPTIONS: Joi.string().allow(null, '').optional(),

                AUTH_JWT_SUBJECT: Joi.string().required(),
                AUTH_JWT_AUDIENCE: Joi.string().required(),
                AUTH_JWT_ISSUER: Joi.string().required(),

                AUTH_JWT_ACCESS_TOKEN_SECRET_KEY: Joi.string().alphanum().min(5).max(50).required(),
                AUTH_JWT_ACCESS_TOKEN_EXPIRED: Joi.string().default('15m').required(),

                AUTH_JWT_REFRESH_TOKEN_SECRET_KEY: Joi.string().alphanum().min(5).max(50).required(),
                AUTH_JWT_REFRESH_TOKEN_EXPIRED: Joi.string().default('7d').required(),
                AUTH_JWT_REFRESH_TOKEN_NOT_BEFORE_EXPIRATION: Joi.string().default('15m').required(),

                AUTH_JWT_PAYLOAD_ENCRYPT: Joi.boolean().default(false).required(),
                AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_KEY: Joi.string().allow(null, '').min(20).max(50).optional(),
                AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_IV: Joi.string().allow(null, '').min(16).max(50).optional(),
                AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_KEY: Joi.string().allow(null, '').min(20).max(50).optional(),
                AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_IV: Joi.string().allow(null, '').min(16).max(50).optional(),
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DATABASE_HOST'),
                port: configService.get('DATABASE_PORT'),
                username: configService.get('DATABASE_USER'),
                password: configService.get('DATABASE_PASSWORD'),
                database: configService.get('DATABASE_NAME'),
                entities: [UserEntity],
                autoLoadEntities: true,
                synchronize: configService.get('DATABASE_SYNCHRONIZE'),
                namingStrategy: new SnakeNamingStrategy(),
                logging: configService.get('DATABASE_DEBUG'),
            }),
            inject: [ConfigService],
        }),
        ThrottlerModule.forRoot({
            throttlers: [{
                ttl: 60,
                limit: 10,
            }],
        }),
        HelperModule,
        RequestModule,
        ErrorModule,
        AuthModule,
        UserModule,
    ],
})
export class AppModule {}
