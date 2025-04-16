import { NextRequest, NextResponse, userAgent } from 'next/server';

export function middleware(request: NextRequest) {
    const { device } = userAgent(request);
    const deviceType = device.type === 'mobile' || device.type === 'tablet' ? 'mobile' : 'desktop';
    const isIOS = device.vendor === 'Apple';
    const response = NextResponse.next();

    response.cookies.set('device-type', deviceType, {
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
    });
    response.cookies.set('is-ios', isIOS.toString(), {
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
    });

    return response;
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.svg$).*)'],
};
