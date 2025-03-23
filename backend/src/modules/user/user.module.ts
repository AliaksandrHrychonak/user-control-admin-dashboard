import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserAdminController } from './controllers/user.admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './repository/entities/user.entity';
import { UserPublicController } from './controllers/user.public.controller';
import { UserUserController } from './controllers/user.user.controller';
import { UserAuthController } from './controllers/user.auth.controller';
import { HelperModule } from '../../common/helper/helper.module';
import { AuthModule } from '../../common/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), HelperModule, AuthModule],
    exports: [UserService],
    providers: [UserService],
    controllers: [UserAdminController, UserPublicController, UserUserController, UserAuthController],
})
export class UserModule {}
