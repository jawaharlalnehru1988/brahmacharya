'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Article {
    category: string;
    title: string;
    slug: string;
}

const CATEGORY_MAP: Record<string, { icon: string; color: string; type: 'trap' | 'wisdom' }> = {
    "DIGITAL VISUAL STIMULATION TRAPS": { icon: "devices", color: "text-red-500", type: 'trap' },
    "PSYCHOLOGICAL & NEUROCHEMICAL TRAPS": { icon: "psychology", color: "text-purple-500", type: 'trap' },
    "CONSUMERISM & LIFESTYLE TRAPS": { icon: "shopping_bag", color: "text-amber-500", type: 'trap' },
    "WORKPLACE & SOCIAL ENVIRONMENT TRAPS": { icon: "business_center", color: "text-blue-500", type: 'trap' },
    "MEDIA & ENTERTAINMENT TRAPS": { icon: "theaters", color: "text-indigo-500", type: 'trap' },
    "PRABHUPĀDA INSTRUCTIONAL QUOTE THEMES": { icon: "format_quote", color: "text-saffron", type: 'wisdom' },
    "VEDIC / GĪTĀ / UPANIṢADIC INSTRUCTIONS": { icon: "menu_book", color: "text-gold", type: 'wisdom' },
    "PURĀṆIC & ITIHĀSA STORIES - CHARACTER CASE STUDIES": { icon: "history_edu", color: "text-spiritual-blue", type: 'wisdom' },
    "MODERN REAL-LIFE CASE THEMES": { icon: "diversity_1", color: "text-emerald-500", type: 'wisdom' },
    "FOUNDATIONAL RESOLUTION": { icon: "military_tech", color: "text-saffron", type: 'wisdom' },
    "DAILY REGULATION": { icon: "wb_twilight", color: "text-saffron", type: 'wisdom' },
    "CHANTING INFRASTRUCTURE": { icon: "record_voice_over", color: "text-saffron", type: 'wisdom' },
    "MIND MANAGEMENT": { icon: "psychology", color: "text-saffron", type: 'wisdom' },
    "SENSE REGULATION": { icon: "restaurant", color: "text-saffron", type: 'wisdom' },
    "ASSOCIATION ARCHITECTURE": { icon: "groups", color: "text-saffron", type: 'wisdom' },
    "SCRIPTURAL ABSORPTION": { icon: "menu_book", color: "text-saffron", type: 'wisdom' },
    "FALL-RECOVERY PROTOCOL": { icon: "healing", color: "text-saffron", type: 'wisdom' },
    "STABILITY & HIGHER TASTE": { icon: "stars", color: "text-saffron", type: 'wisdom' },
    "NIṢṬHĀ MAINTENANCE": { icon: "verified", color: "text-saffron", type: 'wisdom' }
};

function TrackerContent() {
    const searchParams = useSearchParams();
    const urlCategory = searchParams.get('category');

    const [allArticles, setAllArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [activeZone, setActiveZone] = useState<string | null>(null);
    const [auditStep, setAuditStep] = useState(0);
    const [tempAnswers, setTempAnswers] = useState<number[]>([]);
    const [savedScores, setSavedScores] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://api.askharekrishna.com/api/v1/brahmhacarya/');
                const articles: Article[] = await res.json();
                setAllArticles(articles);

                const uniqueCats = Array.from(new Set(articles.map(a => a.category)));
                setCategories(uniqueCats);

                const saved = localStorage.getItem('auro_zone_scores');
                if (saved) setSavedScores(JSON.parse(saved));

                // If URL has category, start audit immediately
                if (urlCategory && uniqueCats.includes(urlCategory)) {
                    setActiveZone(urlCategory);
                }
            } catch (e) {
                console.error("Fetch failed", e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [urlCategory]);

    const activeArticles = allArticles.filter(a => a.category === activeZone);

    const handleAuditOption = (weight: number) => {
        const newAnswers = [...tempAnswers, weight];
        if (auditStep < activeArticles.length - 1) {
            setTempAnswers(newAnswers);
            setAuditStep(auditStep + 1);
        } else {
            const avg = Math.round(newAnswers.reduce((a, b) => a + b, 0) / activeArticles.length);
            const updated = { ...savedScores, [activeZone!]: avg };
            setSavedScores(updated);
            localStorage.setItem('auro_zone_scores', JSON.stringify(updated));

            setTimeout(() => {
                setActiveZone(null);
                setAuditStep(0);
                setTempAnswers([]);
            }, 300);
        }
    };

    const getZoneStatus = (cat: string, score: number) => {
        const isTrap = CATEGORY_MAP[cat]?.type === 'trap';
        if (isTrap) {
            if (score >= 80) return { label: 'Deactivated', color: 'text-emerald-500', bg: 'bg-emerald-50' };
            if (score >= 50) return { label: 'Compromised', color: 'text-amber-500', bg: 'bg-amber-50' };
            return { label: 'Vulnerable', color: 'text-red-500', bg: 'bg-red-50' };
        } else {
            if (score >= 80) return { label: 'Absorbed', color: 'text-indigo-600', bg: 'bg-indigo-50' };
            if (score >= 50) return { label: 'Learning', color: 'text-spiritual-blue', bg: 'bg-blue-50' };
            return { label: 'Unstable', color: 'text-slate-400', bg: 'bg-slate-50' };
        }
    };

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white space-y-6">
            <div className="h-16 w-16 border-4 border-slate-100 border-t-saffron rounded-full animate-spin"></div>
            <div className="text-spiritual-blue font-bold uppercase tracking-widest text-xs animate-pulse">Synchronizing with Global Library...</div>
        </div>
    );

    const trapZones = categories.filter(c => CATEGORY_MAP[c]?.type === 'trap');
    const wisdomZones = categories.filter(c => CATEGORY_MAP[c]?.type === 'wisdom');

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-white">
            <Header />
            <main className="flex-1 px-6 py-16 lg:px-20 lg:py-24 max-w-7xl mx-auto w-full">

                <div className="mb-24 space-y-4 text-center lg:text-left">
                    <span className="text-sm font-bold uppercase tracking-[0.4em] text-saffron">Dynamic Vector Tracker</span>
                    <h1 className="text-4xl lg:text-6xl font-bold font-serif-title text-spiritual-blue tracking-tight leading-tight">
                        Zone <span className="text-saffron italic underline decoration-gold/30">Mastery</span> Metrics
                    </h1>
                    <p className="text-lg text-slate-600 max-w-3xl font-medium leading-relaxed">
                        Assess your understanding and implementation of specific spiritual topics. Each question is derived directly from the articles in the selected category.
                    </p>
                </div>

                {trapZones.length > 0 && (
                    <div className="mb-28">
                        <h4 className="text-2xl font-bold text-red-600 font-serif-title mb-12 flex items-center gap-4">
                            <span className="material-symbols-outlined text-3xl">security_update_warning</span>
                            Distraction Zones (Deactivation Status)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {trapZones.map(cat => (
                                <ZoneCard
                                    key={cat}
                                    cat={cat}
                                    score={savedScores[cat]}
                                    onAudit={() => { setActiveZone(cat); setAuditStep(0); setTempAnswers([]); }}
                                    status={getZoneStatus(cat, savedScores[cat] || 0)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {wisdomZones.length > 0 && (
                    <div className="mb-28">
                        <h4 className="text-2xl font-bold text-indigo-600 font-serif-title mb-12 flex items-center gap-4">
                            <span className="material-symbols-outlined text-3xl">auto_stories</span>
                            Adaptation Zones (Wisdom Absorption)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {wisdomZones.map(cat => (
                                <ZoneCard
                                    key={cat}
                                    cat={cat}
                                    score={savedScores[cat]}
                                    onAudit={() => { setActiveZone(cat); setAuditStep(0); setTempAnswers([]); }}
                                    status={getZoneStatus(cat, savedScores[cat] || 0)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className="text-center pt-20 border-t border-slate-100 italic flex flex-col items-center">
                    <button
                        onClick={() => { if (confirm("Erase all mastery tracking data?")) { localStorage.removeItem('auro_zone_scores'); window.location.reload(); } }}
                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-red-500 transition-colors"
                    >
                        <span className="material-symbols-outlined text-sm">restart_alt</span>
                        Reset All Mastery States
                    </button>
                </div>

                {activeZone && activeArticles.length > 0 && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
                        <div
                            className="absolute inset-0 bg-indigo-950/40 backdrop-blur-md animate-fade-in"
                            onClick={() => setActiveZone(null)}
                        ></div>

                        <div className="w-full max-w-2xl bg-white rounded-[3rem] p-10 lg:p-16 shadow-2xl relative z-10 animate-scale-up">
                            <button
                                onClick={() => setActiveZone(null)}
                                className="absolute top-8 right-8 h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-all"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>

                            <div className="flex items-center gap-4 mb-10">
                                <div className={`h-12 w-12 rounded-xl flex items-center justify-center shadow-inner ${CATEGORY_MAP[activeZone]?.color || 'text-saffron'} bg-white opacity-80`}>
                                    <span className="material-symbols-outlined">{CATEGORY_MAP[activeZone]?.icon || 'analytics'}</span>
                                </div>
                                <div className="min-w-0">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block mb-1">Topic Mastery Audit</span>
                                    <h4 className="text-xs font-bold text-spiritual-blue uppercase tracking-widest truncate max-w-[250px]">{activeZone.replace(' - CHARACTER CASE STUDIES', '')}</h4>
                                </div>
                            </div>

                            <div className="animate-fade-in">
                                <h2 className="text-2xl lg:text-3xl font-bold text-spiritual-blue font-serif-title leading-snug mb-12">
                                    What is your rating in understanding and planning for implementation in <span className="text-saffron italic">&quot;{activeArticles[auditStep].title.replace(/^\d+\.\s*/, '')}&quot;</span>?
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
                                        <button
                                            key={val}
                                            onClick={() => handleAuditOption(val * 10)}
                                            className="group flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-slate-50 bg-slate-50/50 hover:border-saffron hover:bg-white transition-all scale-100 active:scale-95"
                                        >
                                            <span className="text-2xl font-black text-slate-300 group-hover:text-saffron">{val}</span>
                                            <span className="text-[10px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 text-saffron">Rate</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-12 flex justify-between items-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                                <span>Question {auditStep + 1} of {activeArticles.length}</span>
                                <div className="flex gap-1">
                                    <div className="h-1.5 bg-slate-100 rounded-full w-32 relative overflow-hidden">
                                        <div
                                            className="absolute top-0 left-0 h-full bg-saffron transition-all duration-500"
                                            style={{ width: `${((auditStep + 1) / activeArticles.length) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
            <style jsx global>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes scale-up { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
                .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
                .animate-scale-up { animation: scale-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            `}</style>
        </div>
    );
}

const ZoneCard = ({ cat, score, onAudit, status }: any) => {
    const meta = CATEGORY_MAP[cat] || { icon: 'star', color: 'text-slate-400' };
    const bgColor = meta.color.replace('text', 'bg');

    return (
        <div className={`group relative rounded-[2.5rem] border-2 bg-white p-10 transition-all hover:shadow-2xl ${score !== undefined ? 'border-indigo-100 shadow-xl shadow-slate-200/50' : 'border-slate-100'} flex flex-col h-full`}>
            <div className="flex items-center gap-6 mb-8">
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl shadow-inner ${meta.color} bg-white group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-4xl">{meta.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-spiritual-blue font-serif-title leading-tight text-lg line-clamp-2">{cat.replace(' - CHARACTER CASE STUDIES', '')}</h5>
                    {score !== undefined && (
                        <span className={`inline-block mt-2 text-[10px] font-black uppercase tracking-widest ${status.color} ${status.bg} px-3 py-1 rounded-full`}>
                            {status.label}
                        </span>
                    )}
                </div>
            </div>

            <p className="text-slate-500 text-sm italic font-medium mb-10 opacity-70">
                {CATEGORY_MAP[cat]?.type === 'trap'
                    ? "Monitor and deactivate sensory vulnerabilities in this zone."
                    : "Absorb and internalize spiritual principles from this zone."
                }
            </p>

            <div className="mt-auto">
                {score !== undefined ? (
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Mastery Level</span>
                            <span className={`text-2xl font-black ${status.color}`}>{score}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-[1200ms] ${bgColor}`}
                                style={{ width: `${score}%` }}
                            ></div>
                        </div>
                        <button onClick={onAudit} className="w-full py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 border-2 border-slate-50 hover:bg-slate-50 rounded-2xl transition-all">Re-Audit Zone</button>
                    </div>
                ) : (
                    <button onClick={onAudit} className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest transition-all text-white shadow-xl shadow-slate-200/50 ${bgColor} hover:brightness-90 active:scale-95`}>
                        Audit Zone Now
                    </button>
                )}
            </div>
        </div>
    );
};

export default function TrackerPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TrackerContent />
        </Suspense>
    );
}
