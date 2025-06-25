import { Languages } from '@/constants/enums';
import { LanguageType } from '@/i18n.config';

// import { headers } from 'next/headers'

export const getCurrentLocale = async (): Promise<LanguageType> => {
    // const url = (await headers()).get('x-url');
    // const locale = url?.split('/')[3] as LanguageType;
    
    // For now, return English as default
    return Languages.ENGLISH;
};