import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/common/auth/services/auth.service';
import { UserService } from 'src/modules/user/services/user.service';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
import { ENUM_USER_SIGN_UP_FROM } from 'src/modules/user/constants/user.enum.constant';

@Injectable()
export class MigrationUserSeed {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Command({
        command: 'seed:user',
        describe: 'seed users',
    })
    async seeds(): Promise<void> {
        const password = process.env.ADMIN_PASSWORD;
        const passwordHash = await this.authService.createPassword(
            process.env.ADMIN_PASSWORD
        );
        const user1: Promise<UserEntity> = this.userService.create(
            {
                firstName: 'superadmin',
                lastName: 'test',
                email: 'superadmin@mail.com',
                password,
                signUpFrom: ENUM_USER_SIGN_UP_FROM.LOCAL,
            },
            passwordHash
        );
        const user2: Promise<UserEntity> = this.userService.create(
            {
                firstName: 'admin',
                lastName: 'test',
                email: 'admin@mail.com',
                password,
                signUpFrom: ENUM_USER_SIGN_UP_FROM.LOCAL,
            },
            passwordHash
        );
        const user3: Promise<UserEntity> = this.userService.create(
            {
                firstName: 'user',
                lastName: 'test',
                email: 'user@mail.com',
                password,
                signUpFrom: ENUM_USER_SIGN_UP_FROM.LOCAL,
            },
            passwordHash
        );
        const user4: Promise<UserEntity> = this.userService.create(
            {
                firstName: 'member',
                lastName: 'test',
                email: 'member@mail.com',
                password,
                signUpFrom: ENUM_USER_SIGN_UP_FROM.LOCAL,
            },
            passwordHash
        );

        try {
            await Promise.all([user1, user2, user3, user4]);
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }

    @Command({
        command: 'remove:user',
        describe: 'remove users',
    })
    async remove(): Promise<void> {
        try {
            await this.userService.clear();
        } catch (err: any) {
            throw new Error(err.message);
        }

        return;
    }
}
