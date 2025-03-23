import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthJwtAccessGuard } from '../guards/jwt-access/auth.jwt-access.guard';
import { AuthJwtRefreshGuard } from '../guards/jwt-refresh/auth.jwt-refresh.guard';
import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import type { IRequestApp } from '../../request/interfaces/request.interface';
import type { UserPayloadSerialization } from '../../../modules/user/serializations/user.payload.serialization';

export const AuthJwtPayload = createParamDecorator((data: string, ctx: ExecutionContext): Record<string, any> => {
    const { user } = ctx.switchToHttp().getRequest<IRequestApp & { user: UserPayloadSerialization }>();
    return data ? user[data] : user;
});

export const AuthJwtToken = createParamDecorator((data: string, ctx: ExecutionContext): string => {
    const { headers } = ctx.switchToHttp().getRequest<IRequestApp>();
    const { authorization } = headers;
    const authorizations: string[] = authorization.split(' ');

    return authorizations.length >= 2 ? authorizations[1] : undefined;
});

export function AuthJwtAccessProtected(): MethodDecorator {
    return applyDecorators(UseGuards(AuthJwtAccessGuard));
}

export function AuthJwtRefreshProtected(): MethodDecorator {
    return applyDecorators(UseGuards(AuthJwtRefreshGuard));
}

export function AuthJwtAdminAccessProtected(): MethodDecorator {
    return applyDecorators(UseGuards(AuthJwtAccessGuard));
}
