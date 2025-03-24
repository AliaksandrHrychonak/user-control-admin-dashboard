import { AuthService } from '../../../common/auth/services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import {Body, Controller, Delete, Get, Patch, Post, UseGuards} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthJwtAdminAccessProtected } from '../../../common/auth/decorators/auth.jwt.decorator';

import { UserEntity } from '../repository/entities/user.entity';
import { IAuthPassword } from '../../../common/auth/interfaces/auth.interface';
import { UserCreateDto } from '../dtos/user.create.dto';
import { ENUM_USER_SIGN_UP_FROM } from '../constants/user.enum.constant';
import { UserBulkRequestDto } from '../dtos/user-bulk.request.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { UserAdminGuard } from '../decorators/user.admin.decorator';
import {UpdateResult} from "typeorm";
import {DeleteResult} from "typeorm/query-builder/result/DeleteResult";
import {ThrottlerGuard} from "@nestjs/throttler";


@ApiTags('modules.admin.user')
@UseGuards(ThrottlerGuard)
@Controller({
    version: '1',
    path: 'admin/user',
})
export class UserAdminController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

    @UserAdminGuard()
    @AuthJwtAdminAccessProtected()
    @Get('/list')
    async list(@Paginate() query: PaginateQuery): Promise<Paginated<UserEntity>> {
        return this.userService.findAll(query);
    }

    @UserAdminGuard()
    @AuthJwtAdminAccessProtected()
    @Post('/create')
    async create(
        @Body()
        { email, ...body }: UserCreateDto
    ): Promise<any> {
        const password: IAuthPassword = await this.authService.createPassword(body.password);

        const created: UserEntity = await this.userService.create(
            {
                email,
                signUpFrom: ENUM_USER_SIGN_UP_FROM.LOCAL,
                ...body,
            },
            password
        );

        return {
            data: { id: created.id },
        };
    }

    @UserAdminGuard()
    @AuthJwtAdminAccessProtected()
    @Patch('/update/unblocked')
    async unblockedBulk(@Body() { users }: UserBulkRequestDto): Promise<{ data: UpdateResult }> {
        const unblocked = await this.userService.unblockedBulk(users);

        return {
            data: unblocked
        }
    }

    @UserAdminGuard()
    @AuthJwtAdminAccessProtected()
    @Patch('/update/blocked')
    async blockedBulk(@Body() { users }: UserBulkRequestDto): Promise<{ data: UpdateResult }> {
        const blocked = await this.userService.blockedBulk(users);
        return {
            data: blocked
        }
    }

    @UserAdminGuard()
    @AuthJwtAdminAccessProtected()
    @Delete('/delete')
    async deleteBulk(@Body() { users }: UserBulkRequestDto): Promise<{data: DeleteResult}> {
        const deleteResult = await this.userService.deleteBulk(users);

        return {
            data: deleteResult
        }
    }
}