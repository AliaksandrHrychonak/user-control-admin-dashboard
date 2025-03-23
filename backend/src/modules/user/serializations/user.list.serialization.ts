import { ApiHideProperty, OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UserProfileSerialization } from 'src/modules/user/serializations/user.profile.serialization';

export class UserListSerialization extends OmitType(UserProfileSerialization, [
  'signUpDate',
  'signUpFrom',
] as const) {
  @ApiHideProperty()
  @Exclude()
  readonly signUpDate: Date;
}
