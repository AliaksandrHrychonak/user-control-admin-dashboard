import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { ENUM_USER_STATUS_CODE_ERROR } from 'src/modules/user/constants/user.status-code.constant';
import { UserDoc } from 'src/modules/user/repository/entities/user.entity';

@Injectable()
export class UserBlockedGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<IRequestApp & { __user: UserDoc }>();
        const user = request.__user;

        if (user.blocked) {
            throw new ForbiddenException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_BLOCKED_ERROR,
                message: 'user.error.blocked',
            });
        }

        return true;
    }
}