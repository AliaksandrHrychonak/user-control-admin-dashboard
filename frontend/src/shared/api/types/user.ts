export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    signUpDate: string;
    signUpFrom: string;
    createdAt: string;
    updatedAt: string;
    lastSeenAt: string;
    blockedAt: string;
    blocked: boolean;
}

export interface IUserCreateRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    signUpFrom: 'LOCAL';
}

export interface IUserDeleteRequest {
    users: string[];
}

export interface IUserBlockRequest {
    users: string[];
}

export interface IUserUnblockRequest {
    users: string[];
}
