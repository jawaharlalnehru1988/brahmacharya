import React from 'react';
import Link from 'next/link';
import { translations, Language } from '../lib/translations';

interface Article {
    id: number;
    category: string;
    title: string;
    slug: string;
    created_at: string;
}

const UniversalBrahmacharya = async ({ lang = 'en' }: { lang?: string }) => {
    const t = translations[lang as Language] || translations.en;
    let stats = {
        totalArticles: 0,
        totalCategories: 0,
        totalReadingTime: 0,
        latestSeries: "",
        categories: [] as { name: string; count: number; icon: string; color: string }[]
    };

    const CATEGORY_ICONS: Record<string, string> = {
        "DIGITAL VISUAL STIMULATION TRAPS": "devices",
        "PSYCHOLOGICAL & NEUROCHEMICAL TRAPS": "psychology",
        "CONSUMERISM & LIFESTYLE TRAPS": "shopping_bag",
        "WORKPLACE & SOCIAL ENVIRONMENT TRAPS": "business_center",
        "MEDIA & ENTERTAINMENT TRAPS": "theaters",
        "PRABHUPĀDA INSTRUCTIONAL QUOTE THEMES": "format_quote",
        "VEDIC / GĪTĀ / UPANIṢADIC INSTRUCTIONS": "menu_book",
        "PURĀṆIC & ITIHĀSA STORIES - CHARACTER CASE STUDIES": "history_edu",
        "MODERN REAL-LIFE CASE THEMES": "diversity_1"
    };

    const CATEGORY_COLORS: Record<string, string> = {
        "DIGITAL VISUAL STIMULATION TRAPS": "text-red-500",
        "PSYCHOLOGICAL & NEUROCHEMICAL TRAPS": "text-purple-500",
        "CONSUMERISM & LIFESTYLE TRAPS": "text-amber-500",
        "WORKPLACE & SOCIAL ENVIRONMENT TRAPS": "text-blue-500",
        "MEDIA & ENTERTAINMENT TRAPS": "text-indigo-500",
        "PRABHUPĀDA INSTRUCTIONAL QUOTE THEMES": "text-saffron",
        "VEDIC / GĪTĀ / UPANIṢADIC INSTRUCTIONS": "text-gold",
        "PURĀṆIC & ITIHĀSA STORIES - CHARACTER CASE STUDIES": "text-spiritual-blue",
        "MODERN REAL-LIFE CASE THEMES": "text-emerald-500"
    };

    try {
        const url = `https://api.askharekrishna.com/api/v1/brahmhacarya/?language=${lang}`;
        const response = await fetch(url, {
            next: { revalidate: 3600 }
        });
        const articles: Article[] = await response.json();

        stats.totalArticles = articles.length;
        stats.totalReadingTime = articles.length * 5; // Approx 5 mins per article

        const catMap: Record<string, number> = {};
        articles.forEach(a => {
            catMap[a.category] = (catMap[a.category] || 0) + 1;
        });

        stats.totalCategories = Object.keys(catMap).length;
        stats.categories = Object.entries(catMap).map(([name, count]) => ({
            name,
            count,
            icon: CATEGORY_ICONS[name.toUpperCase()] || "auto_stories",
            color: CATEGORY_COLORS[name.toUpperCase()] || "text-slate-500"
        })).sort((a, b) => b.count - a.count);

        stats.latestSeries = articles[articles.length - 1]?.category || "Modern Cases";

    } catch (e) {
        console.error("Dashboard Fetch Error:", e);
    }

    return (
        <section className="relative overflow-hidden bg-white py-24 lg:py-32">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-saffron/5 blur-[120px] -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-spiritual-blue/5 blur-[120px] -ml-48 -mb-48"></div>

            <div className="container relative mx-auto px-6 lg:px-20">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 mb-24">
                    <div className="max-w-2xl text-center lg:text-left">
                        <span className="text-sm font-bold uppercase tracking-[0.4em] text-saffron mb-6 inline-block">{t.dashboard_badge}</span>
                        <h2 className="text-4xl font-bold tracking-tight text-spiritual-blue sm:text-6xl font-serif-title mb-8 leading-tight">
                            {t.dashboard_title_prefix}<span className="text-saffron italic underline decoration-gold/30">{t.dashboard_title_highlight}</span>{t.dashboard_title_suffix}
                        </h2>
                        <p className="text-xl font-medium leading-relaxed text-slate-600 mb-10">
                            {t.dashboard_desc}
                        </p>

                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-6 w-full lg:w-auto">
                        <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform">
                            <span className="text-5xl font-black text-spiritual-blue mb-2 font-serif-title">{stats.totalArticles}</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{t.stat_total_articles}</span>
                            <div className="mt-4 h-1.5 w-12 bg-saffron rounded-full overflow-hidden">
                                <div className="h-full w-2/3 bg-gold animate-pulse"></div>
                            </div>
                        </div>
                        <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform">
                            <span className="text-5xl font-black text-gold mb-2 font-serif-title">{stats.totalCategories}</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{t.stat_categories}</span>
                            <div className="mt-4 h-1.5 w-12 bg-gold rounded-full"></div>
                        </div>
                        <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform col-span-2 lg:col-span-1">
                            <span className="text-4xl font-black text-emerald-500 mb-2 font-serif-title">{Math.round(stats.totalReadingTime / 60)}h+</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{t.stat_study_hours}</span>
                        </div>
                        <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform col-span-2 lg:col-span-1">
                            <span className="text-xl font-black text-indigo-500 mb-2 uppercase leading-tight line-clamp-1 truncate max-w-[150px]">{stats.latestSeries.replace(' - CHARACTER CASE STUDIES', '')}</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{t.stat_latest_series}</span>
                        </div>
                    </div>
                </div>



                {/* Engagement Banner */}
                <div className="relative mt-20 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-spiritual-blue to-indigo-900 rounded-[3.5rem] transform group-hover:scale-[1.01] transition-transform duration-500"></div>
                    <div className="relative p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 text-white">
                        <div className="max-w-3xl text-center lg:text-left">
                            <h3 className="text-3xl lg:text-5xl font-bold font-serif-title mb-6 leading-tight">
                                {t.engagement_title}
                            </h3>
                            <p className="text-indigo-100 text-lg lg:text-xl font-medium opacity-90 mb-10 leading-relaxed italic">
                                {t.engagement_desc}
                            </p>
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8">
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold text-gold">{stats.totalArticles}</span>
                                    <span className="text-xs font-bold uppercase tracking-widest opacity-60">{t.engagement_stat_solutions}</span>
                                </div>
                                <div className="h-10 w-px bg-white/20 hidden sm:block"></div>
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold text-saffron">{stats.totalCategories}</span>
                                    <span className="text-xs font-bold uppercase tracking-widest opacity-60">{t.engagement_stat_vectors}</span>
                                </div>
                                <div className="h-10 w-px bg-white/20 hidden sm:block"></div>
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold text-emerald-400">Daily</span>
                                    <span className="text-xs font-bold uppercase tracking-widest opacity-60">{t.engagement_stat_insights}</span>
                                </div>
                            </div>
                        </div>
                        <div className="shrink-0">
                            <Link
                                href={`/join-sangha?lang=${lang}`}
                                className="inline-flex bg-gold text-white font-black px-12 py-6 rounded-full text-lg shadow-2xl shadow-gold/20 hover:bg-saffron hover:-translate-y-2 transition-all uppercase tracking-widest no-underline"
                            >
                                {t.btn_start_path}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UniversalBrahmacharya;
