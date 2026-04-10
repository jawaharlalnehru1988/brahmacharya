import React from 'react';
import Link from 'next/link';
import ReadIndicator from './ReadIndicator';
import { translations, Language } from '../lib/translations';

interface Article {
    id: number;
    title: string;
    slug: string;
    category: string;
}

interface TrapItem {
    title: string;
    slug: string;
}

interface TrapCategory {
    title: string;
    icon: string;
    items: TrapItem[];
    colorScheme: string;
}

const CATEGORY_METADATA: Record<string, { icon: string; colorScheme: string }> = {
    "DIGITAL VISUAL STIMULATION TRAPS": {
        icon: "devices",
        colorScheme: "border-red-100 bg-red-50/30 text-red-600"
    },
    "PSYCHOLOGICAL & NEUROCHEMICAL TRAPS": {
        icon: "psychology",
        colorScheme: "border-purple-100 bg-purple-50/30 text-purple-600"
    },
    "CONSUMERISM & LIFESTYLE TRAPS": {
        icon: "shopping_bag",
        colorScheme: "border-amber-100 bg-amber-50/30 text-amber-600"
    },
    "WORKPLACE & SOCIAL ENVIRONMENT TRAPS": {
        icon: "business_center",
        colorScheme: "border-blue-100 bg-blue-50/30 text-blue-600"
    },
    "MEDIA & ENTERTAINMENT TRAPS": {
        icon: "theaters",
        colorScheme: "border-indigo-100 bg-indigo-50/30 text-indigo-600"
    }
};

const TrapCard = ({ category, lang, btnLabel }: { category: TrapCategory, lang: string, btnLabel: string }) => (
    <div className={`flex flex-col rounded-3xl border-2 p-8 transition-all hover:shadow-xl select-text ${category.colorScheme}`}>
        <div className="flex items-center gap-4 mb-6 select-text">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-current opacity-80">
                <span className="material-symbols-outlined text-2xl">{category.icon}</span>
            </div>
            <h4 className="text-lg font-bold tracking-tight font-serif-title uppercase leading-tight select-text">
                {category.title}
            </h4>
        </div>

        <div className="h-px w-full bg-current opacity-10 mb-6"></div>

        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 select-text">
            {category.items.map((item, index) => (
                <li key={index} className="flex items-center gap-4 text-xl font-semibold text-slate-800 hover:text-black transition-colors lg:py-1 select-text">
                    <ReadIndicator slug={item.slug} />
                    <Link
                        href={`/articles/${item.slug}?lang=${lang}`}
                        className="leading-snug select-text cursor-pointer hover:underline decoration-2 underline-offset-4 decoration-current/30"
                    >
                        {item.title}
                    </Link>
                </li>
            ))}
        </ul>

        <div className="mt-10 pt-8 border-t border-current border-opacity-5">
            <Link
                href={`/tracker?category=${encodeURIComponent(category.title)}&lang=${lang}`}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-current bg-white/50 hover:bg-white transition-all font-bold text-xs uppercase tracking-widest opacity-80"
            >
                <span className="material-symbols-outlined text-base">analytics</span>
                {btnLabel}
            </Link>
        </div>
    </div>
);

const PathOfBhakti = async ({ lang = 'en' }: { lang?: string }) => {
    const t = translations[lang as Language] || translations.en;
    let trapCategories: TrapCategory[] = [];

    try {
        const url = `https://api.askharekrishna.com/api/v1/brahmhacarya/?language=${lang}`;
        const response = await fetch(url, {
            next: { revalidate: 3600 } // Revalidate every hour
        });
        const articles: Article[] = await response.json();

        // Group articles by category
        const groups: Record<string, TrapItem[]> = {};

        articles.forEach(article => {
            const category = article.category.toUpperCase();
            if (!groups[category]) {
                groups[category] = [];
            }

            // Clean up the title (remove leading numbers like "01. ")
            const cleanTitle = article.title.replace(/^\d+\.\s*/, '');
            groups[category].push({
                title: cleanTitle,
                slug: article.slug
            });
        });

        // Map to TrapCategory structure
        trapCategories = Object.keys(groups).map(title => {
            const metadata = CATEGORY_METADATA[title] || {
                icon: "monitoring",
                colorScheme: "border-slate-100 bg-slate-50/30 text-slate-600"
            };

            return {
                title,
                icon: metadata.icon,
                colorScheme: metadata.colorScheme,
                items: groups[title]
            };
        });

        // Sort according to original order if possible
        const order = Object.keys(CATEGORY_METADATA);
        trapCategories.sort((a, b) => {
            const indexA = order.indexOf(a.title);
            const indexB = order.indexOf(b.title);
            if (indexA === -1 && indexB === -1) return 0;
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
        });

    } catch (error) {
        console.error("Failed to fetch trap categories:", error);
    }

    return (
        <section id="threat-model" className="px-6 py-16 lg:px-20 lg:py-24 bg-slate-50 overflow-hidden min-h-screen">
            <div className="mx-auto max-w-7xl">
                <div className="mb-20 text-center max-w-4xl mx-auto">
                    <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-red-600 mb-4 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-base">warning</span>
                        {t.path_badge}
                    </h3>
                    <h2 className="text-4xl font-bold tracking-tight text-spiritual-blue sm:text-5xl font-serif-title mb-6">{t.path_title}</h2>
                    <div className="h-1.5 w-40 bg-red-600/20 mx-auto rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-red-600 animate-[pulse_2s_infinite]"></div>
                    </div>
                    <p className="mt-8 text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
                        {t.path_desc}
                    </p>
                </div>

                <div className="flex flex-col gap-10">
                    {trapCategories.map((category, index) => (
                        <TrapCard key={index} category={category} lang={lang} btnLabel={t.btn_scan_vulnerabilities} />
                    ))}
                </div>

                <div className="mt-20 rounded-[2.5rem] bg-indigo-950 p-12 text-center border-4 border-indigo-900/50 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h4 className="text-2xl font-bold text-white font-serif-title mb-4 uppercase tracking-widest">{t.agnostic_title}</h4>
                        <p className="text-indigo-200 italic max-w-2xl mx-auto mb-10 leading-relaxed">
                            {t.agnostic_desc}
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 text-indigo-300 text-xs font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-2 px-4 py-2 bg-indigo-900/50 rounded-full"><span className="material-symbols-outlined text-sm">visibility</span> {t.label_detect}</span>
                            <span className="flex items-center gap-2 px-4 py-2 bg-indigo-900/50 rounded-full"><span className="material-symbols-outlined text-sm">do_not_disturb_on</span> {t.label_detach}</span>
                            <span className="flex items-center gap-2 px-4 py-2 bg-indigo-900/50 rounded-full"><span className="material-symbols-outlined text-sm">bolt</span> {t.label_deactivate}</span>
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                        <div className="absolute top-10 left-10"><span className="material-symbols-outlined text-9xl text-white">security_update_warning</span></div>
                        <div className="absolute bottom-10 right-10"><span className="material-symbols-outlined text-9xl text-white">shield</span></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PathOfBhakti;
