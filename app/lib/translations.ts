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

export const CATEGORY_TRANSLATIONS: Record<string, Record<string, string>> = {
    en: {},
    ta: {
        "DIGITAL VISUAL STIMULATION TRAPS": "டிஜிட்டல் காட்சி தூண்டுதல் பொறிகள்",
        "DAILY REGULATION": "தினசரி கட்டுப்பாடு",
        "SENSE REGULATION": "புலன் கட்டுப்பாடு",
        "SCRIPTURAL ABSORPTION": "சாஸ்திர ஈடுபாடு",
        "FALL-RECOVERY PROTOCOL": "வீழ்ச்சி-மீட்பு நெறிமுறை",
        "STABILITY & HIGHER TASTE": "ஸ்திரத்தன்மை மற்றும் உயர்ந்த சுவை",
        "NIṢṬHĀ MAINTENANCE": "நிஷ்டை பராமரிப்பு",
        "PSYCHOLOGICAL & NEUROCHEMICAL TRAPS": "உளவியல் மற்றும் நரம்பியல் பொறிகள்",
        "CONSUMERISM & LIFESTYLE TRAPS": "நுகர்வோர் மற்றும் வாழ்க்கை முறை பொறிகள்",
        "WORKPLACE & SOCIAL ENVIRONMENT TRAPS": "பணியிடம் மற்றும் சமூக சூழல் பொறிகள்",
        "MEDIA & ENTERTAINMENT TRAPS": "ஊடகம் மற்றும் பொழுதுபோக்கு பொறிகள்",
        "ASSOCIATION ARCHITECTURE": "சங்கத்தின் கட்டமைப்பு",
        "CHANTING INFRASTRUCTURE": "ஜபக் கட்டமைப்பு",
        "MIND MANAGEMENT": "மன மேலாண்மை",
        "FOUNDATIONAL RESOLUTION": "அடிப்படைத் தீர்மானம்",
        "PRABHUPĀDA INSTRUCTIONAL QUOTE THEMES": "பிரபுபாதரின் அறிவுரை மேற்கோள்கள்",
        "VEDIC / GĪTĀ / UPANIṢADIC INSTRUCTIONS": "வேத / கீதை / உபநிஷத் அறிவுரைகள்",
        "PURĀṆIC & ITIHĀSA STORIES - CHARACTER CASE STUDIES": "புராண மற்றும் இதிகாசக் கதைகள் - பாத்திர ஆய்வு",
        "MODERN REAL-LIFE CASE THEMES": "நவீன நிஜ வாழ்க்கை நிகழ்வுகள்"
    }
};

export const getEnglishCategory = (translatedCategory: string, lang: Language): string => {
    if (lang === 'en' || !CATEGORY_TRANSLATIONS[lang]) return translatedCategory;
    const mapping = CATEGORY_TRANSLATIONS[lang];
    for (const [en, localized] of Object.entries(mapping)) {
        if (localized.toUpperCase() === translatedCategory.toUpperCase()) return en;
    }
    return translatedCategory;
};

export const getLocalizedCategory = (englishCategory: string, lang: Language): string => {
    if (lang === 'en' || !CATEGORY_TRANSLATIONS[lang]) return englishCategory;
    return CATEGORY_TRANSLATIONS[lang][englishCategory] || englishCategory;
};
