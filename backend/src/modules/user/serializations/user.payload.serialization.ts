import { faker } from '@faker-js/faker';
import { ApiHideProperty, ApiProperty, OmitType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { ENUM_USER_SIGN_UP_FROM } from 'src/modules/user/constants/user.enum.constant';
import { UserProfileSerialization } from 'src/modules/user/serializations/user.profile.serialization';

export class UserPayloadSerialization extends OmitType(UserProfileSerialization, [
    'signUpDate',
    'createdAt',
    'updatedAt',
] as const) {
    @ApiHideProperty()
    @Exclude()
    readonly signUpDate: Date;

    @ApiHideProperty()
    @Exclude()
    readonly signUpFrom: ENUM_USER_SIGN_UP_FROM;

    @ApiProperty({
        required: true,
        nullable: false,
        example: faker.date.recent(),
    })
    @Expose()
    readonly loginDate: Date;

    @ApiHideProperty()
    @Exclude()
    readonly createdAt: number;

    @ApiHideProperty()
    @Exclude()
    readonly updatedAt: number;
}
