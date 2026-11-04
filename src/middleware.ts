import { NextResponse, type NextRequest } from "next/server";
import { i18n } from "./i18n.config";

export default async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Do not redirect static assets, public files, or API routes
    if (
        pathname.startsWith("/api") ||
        pathname.startsWith("/assets") ||
        pathname.startsWith("/_next") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

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

    return NextResponse.next();
}

function getLocale(request: NextRequest): string | undefined {
    const acceptLanguage = request.headers.get("accept-language") ?? "";
    const preferredLocales = acceptLanguage
        .split(",")
        .map((language) => language.split(";")[0].trim().split("-")[0]);

    return preferredLocales.find((locale) => i18n.locales.includes(locale as typeof i18n.locales[number])) ?? i18n.defaultLocale;
}

export const config = {
    // Matcher ignoring `/_next/`, `/api/`, `/assets/`, and all static files with extensions
    matcher: [
        "/((?!api|_next/static|_next/image|assets|.*\\..*|favicon.ico|robots.txt|sitemap.xml).*)",
    ],
};
