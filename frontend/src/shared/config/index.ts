export * from './theme';

export const Config = {
    APP_TITLE: process.env.NEXT_PUBLIC_APP_TITLE,
    APP_LANGUAGE: process.env.NEXT_PUBLIC_APP_LANGUAGE,
    APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
    SHOW_VERSION: process.env.NEXT_PUBLIC_SHOW_VERSION,
    API_MAIN_URL: process.env.NEXT_PUBLIC_API_MAIN_URL,
    API_MAIN_URL_PREFIX: process.env.NEXT_PUBLIC_API_MAIN_URL_PREFIX,
    API_MAIN_URL_VERSION: process.env.NEXT_PUBLIC_API_MAIN_URL_VERSION,
    API_MAIN_AUTH_REFRESH: process.env.NEXT_PUBLIC_API_MAIN_AUTH_REFRESH,
};
