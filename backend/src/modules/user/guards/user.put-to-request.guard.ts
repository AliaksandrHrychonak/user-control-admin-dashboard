import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class UserPutToRequestGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<IRequestApp & { __user: UserEntity }>();
        const { user } = request;

        request.__user = await this.userService.findOneById(user.id);
        await this.userService.updateLastSeen(user.id);

        return true;
    }
}
