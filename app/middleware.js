import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');

  if (token) {
    return NextResponse.redirect(new URL('/', request.url));
  } else {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|sign_up).*)',
  ],
};
