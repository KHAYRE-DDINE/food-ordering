import { NextResponse, type NextRequest } from "next/server";
import { i18n, LanguageType } from "./i18n.config";
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";

export default async function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-url", request.url);

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    const pathname = request.nextUrl.pathname;

    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}`)
    );
    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        return NextResponse.redirect(
            new URL(`/${locale}${pathname}`, request.url)
        );
    }

    return response;
}

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    const locales: LanguageType[] = i18n.locales;
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
    let locale = "";

    try {
        locale = matchLocale(languages, locales, i18n.defaultLocale);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error: any) {
        locale = i18n.defaultLocale;
    }
    return locale;
}
export const config = {
    // Matcher ignoring `/_next/`, `/api/`, ..etc
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
    ],
};