import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';
import { Controller, ForbiddenException, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../../../common/auth/services/auth.service';
import { GetUser, UserAuthProtected, UserProtected } from '../decorators/user.decorator';
import { AuthJwtRefreshProtected, AuthJwtToken } from '../../../common/auth/decorators/auth.jwt.decorator';
import { UserDoc } from '../repository/entities/user.entity';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';
import { UserPayloadSerialization } from '../serializations/user.payload.serialization';

@ApiTags('modules.auth.user')
@Controller({
    version: '1',
    path: 'auth/user',
})
export class UserAuthController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

    @UserAuthProtected()
    @UserProtected()
    @AuthJwtRefreshProtected()
    @HttpCode(HttpStatus.OK)
    @Post('/refresh')
    async refresh(@AuthJwtToken() refreshToken: string, @GetUser() user: UserDoc): Promise<any> {
        const checkPasswordExpired: boolean = await this.authService.checkPasswordExpired(user.passwordExpired);

        if (checkPasswordExpired) {
            throw new ForbiddenException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_PASSWORD_EXPIRED_ERROR,
                message: 'user.error.passwordExpired',
            });
        }

        const payload: UserPayloadSerialization = await this.userService.payloadSerialization(user);
        const tokenType: string = await this.authService.getTokenType();
        const expiresIn: number = await this.authService.getAccessTokenExpirationTime();
        const payloadAccessToken: Record<string, any> = await this.authService.createPayloadAccessToken(payload);

        const payloadEncryption = await this.authService.getPayloadEncryption();
        let payloadHashedAccessToken: Record<string, any> | string = payloadAccessToken;

        if (payloadEncryption) {
            payloadHashedAccessToken = await this.authService.encryptAccessToken(payloadAccessToken);
        }

        const accessToken: string = await this.authService.createAccessToken(payloadHashedAccessToken);

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
}
