import enData from '../locales/en.json';
import taData from '../locales/ta.json';
import hiData from '../locales/hi.json';

export const LANGUAGE_NAMES: Record<string, string> = {
    "en": "English",
    "ta": "Tamil",
    "hi": "Hindi",
    "te": "Telugu",
    "kn": "Kannada",
    "ml": "Malayalam",
    "mr": "Marathi",
    "bn": "Bengali",
    "gu": "Gujarati",
    "pa": "Punjabi",
    "or": "Odia",
    "sa": "Sanskrit",
};

export const translations: Record<string, any> = {
    en: enData,
    ta: taData,
    hi: hiData,
};

export type Language = keyof typeof LANGUAGE_NAMES;
export type TranslationKey = keyof typeof enData;
