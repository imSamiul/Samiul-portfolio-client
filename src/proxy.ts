import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  if (!request.cookies.get('token')) {
    const login = new URL('/login', request.url);
    // Carry the requested page so login can hand it back, instead of dropping
    // the admin on the homepage with no idea why they bounced.
    login.searchParams.set('next', request.nextUrl.pathname);

    return NextResponse.redirect(login);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*'],
};
