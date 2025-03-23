import Cookies from 'js-cookie';

import { CredentialsNames } from '../types';

import type { ISession } from '../types';

// TODO need fix before review
const MILLISECONDS_IN_SECOND = 1000;

export const sessionGet = (name: CredentialsNames) => Cookies.get(name);

const cookieSet = (name: string, value: string, expiration?: number, options?: Cookies.CookieAttributes) => {
    const expirationDate = expiration
        ? new Date(new Date().getTime() + expiration * MILLISECONDS_IN_SECOND)
        : undefined;
    return Cookies.set(name, value, { expires: expirationDate, ...options });
};

export const sessionSet = ({ accessToken, refreshToken, tokenType, expiresIn }: ISession) => {
    cookieSet(CredentialsNames.accessToken, accessToken, expiresIn);
    cookieSet(CredentialsNames.refreshToken, refreshToken, 259200);
    cookieSet(CredentialsNames.tokenType, tokenType, 259200);
};

export const sessionDelete = () => {
    Cookies.remove(CredentialsNames.accessToken);
    Cookies.remove(CredentialsNames.refreshToken);
    Cookies.remove(CredentialsNames.tokenType);
};
