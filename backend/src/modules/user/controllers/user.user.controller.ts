import {Controller, UseGuards} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {ThrottlerGuard} from "@nestjs/throttler";

@ApiTags('modules.user.user')
@UseGuards(ThrottlerGuard)
@Controller({
  version: '1',
  path: '/user',
})
export class UserUserController {}
