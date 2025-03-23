import type { IAuthPassword } from 'src/common/auth/interfaces/auth.interface';
import type { UserCreateDto } from 'src/modules/user/dtos/user.create.dto';
import type { IUserDoc, IUserEntity } from 'src/modules/user/interfaces/user.interface';
import type { UserDoc } from 'src/modules/user/repository/entities/user.entity';
import type { UserPayloadSerialization } from 'src/modules/user/serializations/user.payload.serialization';

export interface IUserService {
    findAll(find?: Record<string, any>, options?: unknown): Promise<IUserEntity[]>;
    findOneById<T>(_id: string, options?: unknown): Promise<T>;
    findOne<T>(find: Record<string, any>, options?: unknown): Promise<T>;
    findOneByUsername<T>(username: string, options?: unknown): Promise<T>;
    findOneByEmail<T>(email: string, options?: unknown): Promise<T>;
    findOneByMobileNumber<T>(mobileNumber: string, options?: unknown): Promise<T>;
    getTotal(find?: Record<string, any>, options?: unknown): Promise<number>;
    create(
        { email }: UserCreateDto,
        { passwordExpired, passwordHash, salt, passwordCreated }: IAuthPassword,
        options?: unknown
    ): Promise<UserDoc>;
    existByEmail(email: string, options?: unknown): Promise<boolean>;
    delete(repository: UserDoc, options?: unknown): Promise<UserDoc>;
    blocked(repository: UserDoc, options?: unknown): Promise<UserDoc>;
    unblocked(repository: UserDoc, options?: unknown): Promise<UserDoc>;
    maxPasswordAttempt(repository: UserDoc, options?: unknown): Promise<UserDoc>;
    increasePasswordAttempt(repository: UserDoc, options?: unknown): Promise<UserDoc>;
    resetPasswordAttempt(repository: UserDoc, options?: unknown): Promise<UserDoc>;
    updatePasswordExpired(repository: UserDoc, passwordExpired: Date, options?: unknown): Promise<UserDoc>;
    payloadSerialization(data: IUserDoc): Promise<UserPayloadSerialization>;
    deleteMany(find: Record<string, any>, options?: unknown): Promise<boolean>;
    updateLastSeen(id: string): Promise<void>;
}
