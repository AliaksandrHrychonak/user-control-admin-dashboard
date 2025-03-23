import type { UserEntity } from '../repository/entities/user.entity';

export const USER_DEFAULT_PER_PAGE = 10;
export const USER_DEFAULT_ORDER_BY = 'lastSeenAt';
export const USER_DEFAULT_ORDER_DIRECTION = 'DESC';
export const USER_DEFAULT_AVAILABLE_ORDER_BY: (keyof UserEntity)[] = ['id', 'email', 'firstName', 'lastName', 'lastSeenAt'];
export const USER_DEFAULT_AVAILABLE_SEARCH: (keyof UserEntity)[]  = ['email', 'firstName', 'lastName'];