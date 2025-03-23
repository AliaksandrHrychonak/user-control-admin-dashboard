import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('modules.user.user')
@Controller({
  version: '1',
  path: '/user',
})
export class UserUserController {}
