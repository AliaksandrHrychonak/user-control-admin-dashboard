import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, MaxLength, IsEnum, MinLength } from 'class-validator';
import { ENUM_USER_SIGN_UP_FROM } from 'src/modules/user/constants/user.enum.constant';
import { IsPasswordWeak } from '../../../common/request/validations/request.is-password-weak.validation';

export class UserCreateDto {
    @ApiProperty({
        example: faker.internet.email(),
        required: true,
    })
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100)
    @Type(() => String)
    readonly email: string;

    @ApiProperty({
        example: faker.person.firstName(),
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(30)
    @Type(() => String)
    readonly firstName: string;

    @ApiProperty({
        example: faker.person.lastName(),
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(30)
    @Type(() => String)
    readonly lastName: string;

    @ApiProperty({
        description: 'string password',
        example: `${faker.string.alphanumeric(1).toLowerCase()}}@@!123`,
        required: true,
    })
    @IsNotEmpty()
    @IsPasswordWeak()
    @MaxLength(50)
    readonly password: string;

    @IsEnum(ENUM_USER_SIGN_UP_FROM)
    @IsString()
    @IsNotEmpty()
    readonly signUpFrom: ENUM_USER_SIGN_UP_FROM;
}
