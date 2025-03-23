import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserBlockedGuard } from 'src/modules/user/guards/user.blocked.guard';
import { UserNotFoundGuard } from 'src/modules/user/guards/user.not-found.guard';
import { UserPutToRequestGuard } from 'src/modules/user/guards/user.put-to-request.guard';

export function UserAdminGuard(): MethodDecorator {
    return applyDecorators(
        UseGuards(UserPutToRequestGuard, UserNotFoundGuard, UserBlockedGuard),
    );
}
