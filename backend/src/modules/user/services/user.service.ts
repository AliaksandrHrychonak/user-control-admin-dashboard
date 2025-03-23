import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from '../repository/entities/user.entity';
import { HelperDateService } from '../../../common/helper/services/helper.date.service';
import { UserCreateDto } from '../dtos/user.create.dto';
import { IAuthPassword } from '../../../common/auth/interfaces/auth.interface';
import { UserPayloadSerialization } from '../serializations/user.payload.serialization';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import {
    USER_DEFAULT_AVAILABLE_ORDER_BY,
    USER_DEFAULT_AVAILABLE_SEARCH, USER_DEFAULT_ORDER_BY,
    USER_DEFAULT_ORDER_DIRECTION,
} from '../constants/user.list.constant';

@Injectable()
export class UserService {
    private readonly authMaxPasswordAttempt: number;

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly helperDateService: HelperDateService,
        private readonly configService: ConfigService
    ) {
        this.authMaxPasswordAttempt = this.configService.get<number>('auth.password.maxAttempt');
    }

    async findAll(query: PaginateQuery): Promise<Paginated<UserEntity>> {
        return paginate(query, this.userRepository, {
            sortableColumns: USER_DEFAULT_AVAILABLE_ORDER_BY,
            nullSort: 'last',
            defaultSortBy: [[USER_DEFAULT_ORDER_BY, USER_DEFAULT_ORDER_DIRECTION]],
            searchableColumns: USER_DEFAULT_AVAILABLE_SEARCH,
            select: ['id', 'email', 'firstName', 'lastName', 'lastSeenAt'],
        });
    }

    async findOneById(id: string): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: { id: id },
            select: ['id', 'blocked'],
        });
    }

    async findOne(find: Record<string, any>): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: find,
            select: ['id', 'blocked'],
        });
    }

    async findOneByEmail(email: string): Promise<UserEntity> {
        return this.userRepository.findOne({
            where: { email },
            select: ['password', 'id', "blocked", "passwordAttempt"],
        });
    }

    async getTotal(find?: Record<string, any>): Promise<number> {
        return this.userRepository.count({ where: find });
    }

    async create(
        { email, signUpFrom, firstName, lastName }: UserCreateDto,
        { passwordExpired, passwordHash, salt, passwordCreated }: IAuthPassword
    ): Promise<UserEntity> {
        const user = this.userRepository.create({
            email,
            firstName,
            lastName,
            password: passwordHash,
            blocked: false,
            salt,
            passwordExpired,
            passwordCreated,
            signUpDate: this.helperDateService.create(),
            lastSeenAt: this.helperDateService.create(),
            passwordAttempt: 0,
            signUpFrom,
        });

        return this.userRepository.save(user);
    }

    async increasePasswordAttempt(repository: UserEntity, options?: unknown): Promise<UserEntity> {
        repository.passwordAttempt = ++repository.passwordAttempt;

        return this.userRepository.save(repository, options);
    }

    async unblockedBulk(ids: string[]) {
        return this.userRepository.update({ id: In(ids) }, { blocked: false, blockedDate: null });
    }

    async blockedBulk(ids: string[]) {
        return this.userRepository.update(
            { id: In(ids) },
            { blocked: true, blockedDate: this.helperDateService.create() }
        );
    }

    async deleteBulk(ids: string[]) {
        return this.userRepository.delete({ id: In(ids) });
    }

    async payloadSerialization(data: UserEntity): Promise<UserPayloadSerialization> {
        return plainToInstance(UserPayloadSerialization, data);
    }

    async updateLastSeen(id: string): Promise<void> {
        const now = this.helperDateService.create();

        await this.userRepository.update(
            { id: id },
            {
                lastSeenAt: now,
            }
        );
    }

    async clear(
    ): Promise<void> {
        return this.userRepository.clear();
    }
}
