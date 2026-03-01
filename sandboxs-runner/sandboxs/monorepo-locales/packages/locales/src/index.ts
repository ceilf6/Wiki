import zhCN from './zh-CN';
import enUS from './en-US';

export const locales = {
    'zh-CN': zhCN,
    'en-US': enUS
};

export type LocaleType = keyof typeof locales;
export type LocaleSchema = typeof zhCN;
