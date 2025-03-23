import { ApiHideProperty, OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UserGetSerialization } from './user.get.serialization';

export class UserProfileSerialization extends OmitType(UserGetSerialization, [
    'blocked',
    'passwordExpired',
    'passwordCreated',
    'passwordAttempt',
    'blockedDate',
] as const) {
    @ApiHideProperty()
    @Exclude()
    readonly blocked: boolean;

    @ApiHideProperty()
    @Exclude()
    readonly passwordExpired: Date;

    @ApiHideProperty()
    @Exclude()
    readonly passwordCreated: Date;

    @ApiHideProperty()
    @Exclude()
    readonly passwordAttempt: number;

    @ApiHideProperty()
    @Exclude()
    readonly blockedDate?: Date;
}
