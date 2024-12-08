import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (request.nextUrl.pathname === '/api/upload-file') {
    res.headers.set('x-middleware-cache', 'no-cache');
  }

  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (session && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*', '/api/upload-file']
};
