import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/login';
  
  // Check if user is authenticated by looking for auth cookie
  const authCookie = request.cookies.get('auth')?.value;
  
  // Redirect logic
  if (!isPublicPath && !authCookie) {
    // User is not authenticated and trying to access a protected route
    // Redirect to login page
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (isPublicPath && authCookie) {
    // User is authenticated but trying to access login/signup page
    // Redirect to home page
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Continue with the request for all other cases
  return NextResponse.next();
}

// Configure the middleware to run on all routes except public assets
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. /favicon.ico, /sitemap.xml, /robots.txt (static files)
     */
    '/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}; 