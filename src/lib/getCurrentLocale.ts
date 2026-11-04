import { Languages } from '@/constants/enums';
import { i18n, LanguageType } from '@/i18n.config';
import { headers } from 'next/headers';

export const getCurrentLocale = async (): Promise<LanguageType> => {
    const headersList = await headers();
    const url = headersList.get('x-url') ?? headersList.get('referer');
    const pathname = url ? new URL(url).pathname : '';
    const locale = pathname.split('/')[1] as LanguageType;

    return i18n.locales.includes(locale) ? locale : Languages.ENGLISH;
};
