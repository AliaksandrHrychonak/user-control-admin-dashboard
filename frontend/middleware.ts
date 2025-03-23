export { middleware as default } from '@/app/middleware';

export const config = {
    matcher: [
        // Match all paths except public assets and api routes
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
};
