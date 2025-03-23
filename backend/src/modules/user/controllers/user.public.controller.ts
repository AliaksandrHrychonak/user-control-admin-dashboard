import {
    BadRequestException,
    Body,
    Controller,
    ForbiddenException,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ENUM_AUTH_LOGIN_WITH } from 'src/common/auth/constants/auth.enum.constant';
import { AuthService } from 'src/common/auth/services/auth.service';
import { ENUM_USER_SIGN_UP_FROM } from 'src/modules/user/constants/user.enum.constant';
import {
    ENUM_USER_STATUS_CODE_ERROR,
    ENUM_USER_STATUS_CODE_SUCCESS,
} from 'src/modules/user/constants/user.status-code.constant';
import { UserLoginDto } from 'src/modules/user/dtos/user.login.dto';
import { UserSignUpDto } from 'src/modules/user/dtos/user.sign-up.dto';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
import { UserPayloadSerialization } from 'src/modules/user/serializations/user.payload.serialization';
import { UserService } from 'src/modules/user/services/user.service';

@ApiTags('modules.public.user')
@Controller({
    version: '1',
    path: 'public/user',
})
export class UserPublicController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(@Body() { email, password }: UserLoginDto): Promise<any> {
        const user: UserEntity = await this.userService.findOneByEmail(email);
        if (!user) {
            throw new NotFoundException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
                message: 'user.error.notFound',
            });
        }

        const passwordAttempt: boolean = true;
        const maxPasswordAttempt: number = 5;
        if (passwordAttempt && user.passwordAttempt >= maxPasswordAttempt) {
            throw new ForbiddenException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_PASSWORD_ATTEMPT_MAX_ERROR,
                message: 'user.error.passwordAttemptMax',
            });
        }

        const validate: boolean = await this.authService.validateUser(password, user.password);
        if (!validate) {
            await this.userService.increasePasswordAttempt(user);

            throw new BadRequestException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_PASSWORD_NOT_MATCH_ERROR,
                message: 'user.error.passwordNotMatch',
            });
        } else if (user.blocked) {
            throw new ForbiddenException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_BLOCKED_ERROR,
                message: 'user.error.blocked',
            });
        }

        const payload: UserPayloadSerialization = await this.userService.payloadSerialization(user);
        const tokenType: string = await this.authService.getTokenType();
        const expiresIn: number = await this.authService.getAccessTokenExpirationTime();
        const payloadAccessToken: Record<string, any> = await this.authService.createPayloadAccessToken(payload);
        const payloadRefreshToken: Record<string, any> = await this.authService.createPayloadRefreshToken(payload.id, {
            loginWith: ENUM_AUTH_LOGIN_WITH.LOCAL,
        });

        const payloadEncryption = await this.authService.getPayloadEncryption();
        let payloadHashedAccessToken: Record<string, any> | string = payloadAccessToken;
        let payloadHashedRefreshToken: Record<string, any> | string = payloadRefreshToken;

        if (payloadEncryption) {
            payloadHashedAccessToken = await this.authService.encryptAccessToken(payloadAccessToken);
            payloadHashedRefreshToken = await this.authService.encryptRefreshToken(payloadRefreshToken);
        }

        const accessToken: string = await this.authService.createAccessToken(payloadHashedAccessToken);

        const refreshToken: string = await this.authService.createRefreshToken(payloadHashedRefreshToken);

        const checkPasswordExpired: boolean = await this.authService.checkPasswordExpired(user.passwordExpired);

        if (checkPasswordExpired) {
            throw new ForbiddenException({
                statusCode: ENUM_USER_STATUS_CODE_SUCCESS.USER_PASSWORD_EXPIRED_ERROR,
                message: 'user.error.passwordExpired',
            });
        }
        // TODO fix this
        await this.userService.updateLastSeen(user.id);

        return {
            data: {
                tokenType,
                expiresIn,
                accessToken,
                refreshToken,
            },
        };
    }


    @Post('/sign-up')
    async signUp(
        @Body()
        { email, ...body }: UserSignUpDto
    ): Promise<any> {
        const password = await this.authService.createPassword(body.password);

        const created = await this.userService.create(
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
}
