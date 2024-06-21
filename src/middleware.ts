import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const nextIntlMiddleware = createMiddleware({
  locales: ['en', 'ru', 'uk'],
  defaultLocale: 'en',
});

export default (req: NextRequest):NextResponse => nextIntlMiddleware(req);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
