import type { ExecutionContext} from '@nestjs/common';
import { applyDecorators, createParamDecorator, UseGuards } from '@nestjs/common';
import { UserPayloadPutToRequestGuard } from 'src/modules/user/guards/payload/user.payload.put-to-request.guard';
import { UserBlockedGuard } from 'src/modules/user/guards/user.blocked.guard';
import { UserNotFoundGuard } from 'src/modules/user/guards/user.not-found.guard';
import type { UserDoc, UserEntity } from 'src/modules/user/repository/entities/user.entity';
import type { IRequestApp } from '../../../common/request/interfaces/request.interface';

export const GetUser = createParamDecorator((returnPlain: boolean, ctx: ExecutionContext): UserDoc | UserEntity => {
    const { __user } = ctx.switchToHttp().getRequest<IRequestApp & { __user: UserDoc }>();
    return returnPlain ? { ...__user } : __user;
});

export function UserProtected(): MethodDecorator {
    return applyDecorators(UseGuards(UserPayloadPutToRequestGuard, UserNotFoundGuard, UserBlockedGuard));
}

export function UserAuthProtected(): MethodDecorator {
    return applyDecorators(UseGuards(UserBlockedGuard));
}
