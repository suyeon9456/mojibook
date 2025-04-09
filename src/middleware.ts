import { NextRequest, NextResponse, userAgent } from 'next/server';

export function middleware(request: NextRequest) {
    const { device } = userAgent(request);
    const deviceType = device.type === 'mobile' ? 'mobile' : 'desktop';
    const response = NextResponse.next();

    response.cookies.set('device-type', deviceType, {
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
    });

    return response;
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.svg$).*)'],
};
