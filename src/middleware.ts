import { getToken } from 'next-auth/jwt';
import withAuth from 'next-auth/middleware';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default withAuth(async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const isAuth = await getToken({ req: request });
    const protectedPaths = ['/dashboard', '/profile'];
    const isPublicPath = pathname.startsWith('/auth/signin');
    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

    if(!isAuth && isProtectedPath) {
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
    if (isAuth && isPublicPath) {
        return NextResponse.redirect(new URL('/profile', request.url));
    }
}, 
{
    callbacks: {
        authorized: () => true
    },
})
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/auth/signin', '/profile/:path*', '/dashboard/:path*', // match when URL starts with /dashboard or /profile
  ],
} 




