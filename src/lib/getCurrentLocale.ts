import { Languages } from '@/constants/enums';
import { LanguageType } from '@/i18n.config';
import { headers } from 'next/headers';

export const getCurrentLocale = async (): Promise<LanguageType> => {
    const url = (await headers()).get('x-url');
    const pathname = url ? new URL(url).pathname : '';
    const locale = pathname.split('/')[1] as LanguageType;

    return locale === Languages.ARABIC || locale === Languages.ENGLISH
        ? locale
        : Languages.ENGLISH;
};
