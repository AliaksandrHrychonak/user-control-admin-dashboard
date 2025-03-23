import {
    Module,
} from '@nestjs/common';
import { IsPasswordWeakConstraint } from './validations/request.is-password-weak.validation';


@Module({
    controllers: [],
    providers: [
        IsPasswordWeakConstraint,
    ],

})
export class RequestModule {}
