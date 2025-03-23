import { faker } from '@faker-js/faker';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { ENUM_USER_SIGN_UP_FROM } from 'src/modules/user/constants/user.enum.constant';

export class UserGetSerialization {
    id: string;

    @ApiProperty({
        required: true,
        nullable: false,
        example: faker.internet.email(),
    })
    readonly email: string;

    @ApiProperty({
        required: true,
        nullable: false,
        example: faker.person.firstName(),
    })
    readonly firstName: string;

    @ApiProperty({
        required: true,
        nullable: false,
        example: faker.person.lastName(),
    })
    readonly lastName: string;

    @ApiProperty({
        required: true,
        nullable: false,
        example: false,
    })
    readonly blocked: boolean;

    @ApiProperty({
        nullable: true,
        required: false,
        example: faker.date.recent(),
    })
    readonly blockedDate?: Date;

    @ApiHideProperty()
    @Exclude()
    readonly password: string;

    @ApiProperty({
        required: true,
        nullable: false,
        example: faker.date.future(),
    })
    readonly passwordExpired: Date;

    @ApiProperty({
        required: true,
        nullable: false,
        example: faker.date.past(),
    })
    readonly passwordCreated: Date;

    @ApiProperty({
        required: true,
        nullable: false,
        example: [1, 0],
    })
    readonly passwordAttempt: number;

    @ApiProperty({
        required: true,
        nullable: false,
        example: faker.date.recent(),
    })
    readonly signUpDate: Date;

    @ApiProperty({
        required: true,
        nullable: false,
        example: ENUM_USER_SIGN_UP_FROM.LOCAL,
    })
    readonly signUpFrom: ENUM_USER_SIGN_UP_FROM;

    @ApiHideProperty()
    @Exclude()
    readonly salt: string;

    @ApiProperty({
        description: 'Date created at',
        example: faker.date.recent(),
        required: true,
        nullable: false,
    })
    readonly createdAt: Date;

    @ApiProperty({
        description: 'Date updated at',
        example: faker.date.recent(),
        required: true,
        nullable: false,
    })
    readonly updatedAt: Date;

    @ApiHideProperty()
    @Exclude()
    readonly deletedAt?: Date;
}
