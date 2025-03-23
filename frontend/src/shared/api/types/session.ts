export interface ISession {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
}

export enum CredentialsNames {
    accessToken = 'accessToken',
    tokenType = 'tokenType',
    refreshToken = 'refreshToken',
    expiresIn = 'expiresIn',
}

export interface ISessionViewerInfo {
    id: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email: string;
    role: string;
    username: string;
    type: string;
    permissions: unknown[];
}

export interface IRequestSignIn {
    email: string;
    password: string;
}

export interface IRequestSignUp {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
