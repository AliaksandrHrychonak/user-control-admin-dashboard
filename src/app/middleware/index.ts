import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

// TODO This is a temporary solution that violates FSD, need fix after review
export function middleware(request: NextRequest) {
    const isAuthenticated = request.cookies.get('refreshToken');

    if (
        !isAuthenticated &&
        !request.nextUrl.pathname.startsWith('/sign-in') &&
        !request.nextUrl.pathname.startsWith('/sign-up')
    ) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
}
