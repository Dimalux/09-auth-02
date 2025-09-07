
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/sign-in', '/sign-up', '/', '/api'];
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  // If trying to access private route without token
  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // If trying to access auth routes while authenticated
  if ((pathname === '/sign-in' || pathname === '/sign-up') && token) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};