import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class UserBulkRequestDto {
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(1000)
    @IsUUID('4', { each: true })
    @Type(() => String)
    readonly users: string[];
}
