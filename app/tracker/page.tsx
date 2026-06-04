'use client';
import React, { useState, useEffect, useCallback, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getEnglishCategory, getLocalizedCategory, Language } from '../lib/translations';

// ─── Types ───────────────────────────────────────────────────────────────────

interface QuizOption {
    id: number; order: number; option_text: string; is_correct: boolean;
}
interface QuizQuestion {
    id: number; order: number; question_text: string; is_active: boolean; options: QuizOption[];
}
interface Article {
    id: number; title: string; slug: string; category: string; order: number;
    questions: QuizQuestion[];
}
interface SavedScore {
    score: number; total: number; savedAt: string; articleTitle: string;
}
interface QuizEntry {
    question: QuizQuestion; articleSlug: string; articleTitle: string;
}
interface SessionAnswer {
    articleSlug: string; articleTitle: string; isCorrect: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_MAP: Record<string, { icon: string; accent: string; type: 'trap' | 'wisdom' }> = {
    "DIGITAL VISUAL STIMULATION TRAPS":                      { icon: "devices",            accent: "#ef4444", type: 'trap'   },
    "PSYCHOLOGICAL & NEUROCHEMICAL TRAPS":                   { icon: "psychology",         accent: "#a855f7", type: 'trap'   },
    "CONSUMERISM & LIFESTYLE TRAPS":                         { icon: "shopping_bag",       accent: "#f59e0b", type: 'trap'   },
    "WORKPLACE & SOCIAL ENVIRONMENT TRAPS":                  { icon: "business_center",    accent: "#3b82f6", type: 'trap'   },
    "MEDIA & ENTERTAINMENT TRAPS":                           { icon: "theaters",           accent: "#6366f1", type: 'trap'   },
    "PRABHUPĀDA INSTRUCTIONAL QUOTE THEMES":                 { icon: "format_quote",       accent: "#FF9933", type: 'wisdom' },
    "VEDIC / GĪTĀ / UPANIṢADIC INSTRUCTIONS":               { icon: "menu_book",          accent: "#D4AF37", type: 'wisdom' },
    "PURĀṆIC & ITIHĀSA STORIES - CHARACTER CASE STUDIES":   { icon: "history_edu",        accent: "#1A365D", type: 'wisdom' },
    "MODERN REAL-LIFE CASE THEMES":                          { icon: "diversity_1",        accent: "#10b981", type: 'wisdom' },
    "FOUNDATIONAL RESOLUTION":                               { icon: "military_tech",      accent: "#FF9933", type: 'wisdom' },
    "DAILY REGULATION":                                      { icon: "wb_twilight",        accent: "#FF9933", type: 'wisdom' },
    "CHANTING INFRASTRUCTURE":                               { icon: "record_voice_over",  accent: "#FF9933", type: 'wisdom' },
    "MIND MANAGEMENT":                                       { icon: "psychology",         accent: "#6366f1", type: 'wisdom' },
    "SENSE REGULATION":                                      { icon: "restaurant",         accent: "#10b981", type: 'wisdom' },
    "ASSOCIATION ARCHITECTURE":                              { icon: "groups",             accent: "#D4AF37", type: 'wisdom' },
    "SCRIPTURAL ABSORPTION":                                 { icon: "menu_book",          accent: "#1A365D", type: 'wisdom' },
    "FALL-RECOVERY PROTOCOL":                                { icon: "healing",            accent: "#ef4444", type: 'wisdom' },
    "STABILITY & HIGHER TASTE":                              { icon: "stars",              accent: "#D4AF37", type: 'wisdom' },
    "NIṢṬHĀ MAINTENANCE":                                   { icon: "verified",           accent: "#6366f1", type: 'wisdom' },
};

const RANKS = [
    { min: 95, label: "Liberated Scholar",   icon: "emoji_events",    color: "#f59e0b" },
    { min: 80, label: "Niṣṭhā Keeper",       icon: "verified",         color: "#6366f1" },
    { min: 60, label: "Brahmacārī",          icon: "self_improvement", color: "#1A365D" },
    { min: 40, label: "Practicing Devotee",  icon: "spa",              color: "#10b981" },
    { min: 20, label: "Sincere Sādhaka",     icon: "hiking",           color: "#f59e0b" },
    { min: 0,  label: "Seeking Soul",        icon: "search",           color: "#94a3b8" },
];

function getRank(pct: number) {
    return RANKS.find(r => pct >= r.min) ?? RANKS[RANKS.length - 1];
}

const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

// ─── Score Ring ───────────────────────────────────────────────────────────────

function ScoreRing({ correct, total, size = 130 }: { correct: number; total: number; size?: number }) {
    const pct = total > 0 ? correct / total : 0;
    const r = size * 0.36;
    const circ = 2 * Math.PI * r;
    const stroke = size * 0.09;
    const color = pct >= 0.8 ? '#10b981' : pct >= 0.6 ? '#D4AF37' : pct >= 0.4 ? '#FF9933' : '#94a3b8';
    return (
        <div className="relative inline-flex items-center justify-center">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
                <circle
                    cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
                    strokeWidth={stroke} strokeLinecap="round"
                    strokeDasharray={`${pct * circ} ${circ}`}
                    style={{ transition: 'stroke-dasharray 1.1s ease-out' }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-black leading-none" style={{ fontSize: size * 0.19, color }}>
                    {total > 0 ? Math.round(pct * 100) : 0}%
                </span>
                <span className="text-slate-400 font-bold" style={{ fontSize: size * 0.1 }}>
                    {correct}/{total}
                </span>
            </div>
        </div>
    );
}

// ─── Save answers helper ──────────────────────────────────────────────────────

function saveAnswersToStorage(answers: SessionAnswer[]) {
    if (answers.length === 0) return;
    const existing: Record<string, SavedScore> = JSON.parse(localStorage.getItem('quiz_scores') || '{}');
    const byArticle: Record<string, { score: number; total: number; title: string }> = {};
    answers.forEach(a => {
        if (!byArticle[a.articleSlug]) byArticle[a.articleSlug] = { score: 0, total: 0, title: a.articleTitle };
        byArticle[a.articleSlug].total += 1;
        if (a.isCorrect) byArticle[a.articleSlug].score += 1;
    });
    Object.entries(byArticle).forEach(([slug, data]) => {
        existing[slug] = { score: data.score, total: data.total, savedAt: new Date().toISOString(), articleTitle: data.title };
    });
    localStorage.setItem('quiz_scores', JSON.stringify(existing));
}

// ─── Category Card ────────────────────────────────────────────────────────────

interface CatStats {
    totalArticles: number; totalQuestions: number;
    completedArticles: number; answeredQuestions: number; correctAnswers: number; pct: number;
}

function CategoryCard({ cat, stats, onChallenge }: {
    cat: string; stats: CatStats; onChallenge: (retake: boolean) => void;
}) {
    const meta = CATEGORY_MAP[cat] ?? { icon: 'quiz', accent: '#94a3b8', type: 'wisdom' };
    const { totalArticles, totalQuestions, completedArticles, answeredQuestions, correctAnswers, pct } = stats;
    const isComplete = completedArticles >= totalArticles && totalArticles > 0;
    const hasStarted = answeredQuestions > 0;
    const progressPct = totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;
    const noQuestions = totalQuestions === 0;

    return (
        <div className="group relative rounded-[2rem] bg-white border border-gold/10 p-7 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1">
            {/* Accent top stripe */}
            <div className="absolute top-0 left-6 right-6 h-0.5 rounded-b-full" style={{ backgroundColor: meta.accent }} />

            <div className="flex items-start gap-4 mb-5 pt-3">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: meta.accent + '18' }}>
                    <span className="material-symbols-outlined text-xl" style={{ color: meta.accent }}>{meta.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-spiritual-blue text-sm leading-tight font-serif-title line-clamp-2">
                        {getLocalizedCategory(cat, (new URLSearchParams(window.location.search)).get('lang') as Language || 'en').replace(' - CHARACTER CASE STUDIES', '').replace(' - பண்புநலன் வரலாற்று ஆய்வுகள்', '').replace(' - பாத்திர ஆய்வு', '')}
                    </h3>
                    {isComplete && (
                        <span className="inline-flex items-center gap-1 mt-1.5 text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <span className="material-symbols-outlined text-[10px]">check_circle</span> Complete
                        </span>
                    )}
                </div>
            </div>

            {/* 3-stat row */}
            <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                    { val: totalArticles, label: 'Articles' },
                    { val: totalQuestions, label: 'Questions' },
                    { val: noQuestions ? '—' : `${pct}%`, label: 'Score' },
                ].map(({ val, label }) => (
                    <div key={label} className="text-center p-2.5 rounded-xl" style={{ backgroundColor: meta.accent + '0E' }}>
                        <div className="text-base font-black" style={{ color: hasStarted || label === 'Articles' || label === 'Questions' ? meta.accent : '#94a3b8' }}>{val}</div>
                        <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{label}</div>
                    </div>
                ))}
            </div>

            {/* Progress */}
            {hasStarted && (
                <div className="mb-5">
                    <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                        <span>{answeredQuestions}/{totalQuestions} answered</span>
                        <span className="text-emerald-600">{correctAnswers} correct</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${progressPct}%`, backgroundColor: meta.accent }} />
                    </div>
                </div>
            )}

            {/* CTA */}
            <div className="mt-auto space-y-2">
                {noQuestions ? (
                    <div className="w-full py-3.5 rounded-2xl text-center text-[10px] font-bold uppercase tracking-widest text-slate-300 bg-slate-50">
                        No Questions Yet
                    </div>
                ) : isComplete ? (
                    <>
                        <div className="flex justify-between items-center px-4 py-3 rounded-2xl border"
                            style={{ backgroundColor: meta.accent + '10', borderColor: meta.accent + '30' }}>
                            <span className="text-xs font-bold" style={{ color: meta.accent }}>{correctAnswers}/{answeredQuestions} · {pct}%</span>
                            <span className="material-symbols-outlined text-base" style={{ color: meta.accent }}>emoji_events</span>
                        </div>
                        <button onClick={() => onChallenge(true)}
                            className="w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 border-slate-100 text-slate-400 hover:border-saffron hover:text-saffron transition-all">
                            ↺ Retake Challenge
                        </button>
                    </>
                ) : hasStarted ? (
                    <button onClick={() => onChallenge(false)}
                        className="w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-white shadow-lg transition-all hover:brightness-110 hover:-translate-y-0.5 active:scale-95"
                        style={{ backgroundColor: meta.accent, boxShadow: `0 8px 20px ${meta.accent}40` }}>
                        Continue · {totalArticles - completedArticles} Articles Left
                    </button>
                ) : (
                    <button onClick={() => onChallenge(false)}
                        className="w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-white shadow-lg transition-all hover:brightness-110 hover:-translate-y-0.5 active:scale-95"
                        style={{ backgroundColor: meta.accent, boxShadow: `0 8px 20px ${meta.accent}40` }}>
                        Start Challenge
                    </button>
                )}
            </div>
        </div>
    );
}

// ─── Challenge Modal ──────────────────────────────────────────────────────────

function ChallengeModal({ category, queue, onClose }: {
    category: string; queue: QuizEntry[]; onClose: () => void;
}) {
    const meta = CATEGORY_MAP[category] ?? { icon: 'quiz', accent: '#FF9933', type: 'wisdom' };
    const [index, setIndex] = useState(0);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [answerState, setAnswerState] = useState<'unanswered' | 'correct' | 'incorrect'>('unanswered');
    const [animating, setAnimating] = useState(false);
    const [answers, setAnswers] = useState<SessionAnswer[]>([]);
    const [phase, setPhase] = useState<'quiz' | 'result'>('quiz');

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    const sessionCorrect = answers.filter(a => a.isCorrect).length;
    const sessionTotal = answers.length;

    // Empty state
    if (queue.length === 0) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-spiritual-blue/80 backdrop-blur-md" onClick={onClose} />
                <div className="relative z-10 bg-white rounded-[2.5rem] p-12 text-center max-w-md shadow-2xl animate-in zoom-in-95 fade-in duration-400">
                    <span className="material-symbols-outlined text-6xl text-gold mb-4 block">emoji_events</span>
                    <h3 className="text-2xl font-bold font-serif-title text-spiritual-blue mb-3">All Caught Up!</h3>
                    <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                        You've completed all articles in this category. Use <strong>"Retake Challenge"</strong> on the card to test yourself again.
                    </p>
                    <button onClick={onClose}
                        className="px-8 py-4 rounded-2xl text-white font-bold text-xs uppercase tracking-widest shadow-lg"
                        style={{ backgroundColor: meta.accent }}>
                        Back to Tracker
                    </button>
                </div>
            </div>
        );
    }

    const current = queue[index];

    const handleSelect = (optionId: number) => {
        if (answerState !== 'unanswered' || animating) return;
        const opt = current.question.options.find(o => o.id === optionId)!;
        setSelectedId(optionId);
        setAnswerState(opt.is_correct ? 'correct' : 'incorrect');
    };

    const handleNext = () => {
        if (animating || answerState === 'unanswered') return;
        const opt = current.question.options.find(o => o.id === selectedId)!;
        const newAnswer: SessionAnswer = {
            articleSlug: current.articleSlug,
            articleTitle: current.articleTitle,
            isCorrect: opt.is_correct,
        };
        const newAnswers = [...answers, newAnswer];

        const isLast = index >= queue.length - 1;
        setAnimating(true);
        setTimeout(() => {
            setAnswers(newAnswers);
            if (isLast) {
                saveAnswersToStorage(newAnswers);
                setPhase('result');
            } else {
                setIndex(i => i + 1);
                setSelectedId(null);
                setAnswerState('unanswered');
            }
            setAnimating(false);
        }, 320);
    };

    const handleStopAndSave = () => {
        saveAnswersToStorage(answers);
        onClose();
    };

    const getOptionClass = (opt: QuizOption) => {
        const base = 'flex items-start gap-3 w-full text-left px-4 py-3.5 rounded-2xl border-2 transition-all duration-200 ';
        if (answerState === 'unanswered') {
            return base + (selectedId === opt.id
                ? 'border-saffron bg-saffron/5 shadow-sm cursor-pointer'
                : 'border-gold/15 bg-white hover:border-saffron/50 hover:bg-saffron/5 cursor-pointer');
        }
        if (opt.is_correct) return base + 'border-emerald-400 bg-emerald-50';
        if (opt.id === selectedId) return base + 'border-red-400 bg-red-50';
        return base + 'border-slate-100 bg-white opacity-50';
    };

    const getIndicatorClass = (opt: QuizOption, idx: number) => {
        const base = 'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all ';
        if (answerState === 'unanswered') {
            return base + (selectedId === opt.id ? 'border-saffron bg-saffron text-white' : 'border-gold/30 text-slate-400');
        }
        if (opt.is_correct) return base + 'border-emerald-400 bg-emerald-400 text-white';
        if (opt.id === selectedId) return base + 'border-red-400 bg-red-400 text-white';
        return base + 'border-slate-200 text-slate-300';
    };

    // ── Result phase ──
    if (phase === 'result') {
        const finalCorrect = answers.filter(a => a.isCorrect).length;
        const finalTotal = answers.length;
        const finalPct = finalTotal > 0 ? Math.round((finalCorrect / finalTotal) * 100) : 0;
        const xpEarned = finalCorrect * 10;
        const resultRank = getRank(finalPct);

        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
                <div className="absolute inset-0 bg-spiritual-blue/80 backdrop-blur-md" onClick={onClose} />
                <div className="relative z-10 w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden my-4 animate-in zoom-in-95 fade-in duration-400">
                    <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${meta.accent}, #D4AF37)` }} />
                    <div className="p-8 text-center">
                        <div className="mb-5">
                            <ScoreRing correct={finalCorrect} total={finalTotal} size={140} />
                        </div>
                        <h3 className="text-2xl font-bold font-serif-title text-spiritual-blue mb-1">Challenge Complete! 🎉</h3>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                            {getLocalizedCategory(category, (new URLSearchParams(window.location.search)).get('lang') as Language || 'en').replace(' - CHARACTER CASE STUDIES', '').replace(' - பண்புநலன் வரலாற்று ஆய்வுகள்', '').replace(' - பாத்திர ஆய்வு', '')}
                        </p>
                        <p className="text-lg font-black mb-6" style={{ color: meta.accent }}>
                            {finalCorrect} / {finalTotal} correct · {finalPct}%
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-5">
                            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                                <div className="text-2xl font-black text-emerald-600">{finalCorrect}</div>
                                <div className="text-[9px] font-bold uppercase tracking-widest text-emerald-400 mt-0.5">Correct</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-red-50 border border-red-100">
                                <div className="text-2xl font-black text-red-400">{finalTotal - finalCorrect}</div>
                                <div className="text-[9px] font-bold uppercase tracking-widest text-red-300 mt-0.5">Incorrect</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-yellow-50 border border-yellow-100 mb-5">
                            <span className="material-symbols-outlined text-yellow-500 text-2xl">bolt</span>
                            <div className="text-left">
                                <div className="font-black text-yellow-700">+{xpEarned.toLocaleString()} XP Earned!</div>
                                <div className="text-[10px] text-yellow-500 font-bold">Rank: {resultRank.label}</div>
                            </div>
                        </div>

                        <button onClick={onClose}
                            className="w-full py-4 rounded-2xl text-white font-bold text-sm uppercase tracking-widest shadow-lg transition-all hover:brightness-110"
                            style={{ backgroundColor: meta.accent, boxShadow: `0 8px 20px ${meta.accent}40` }}>
                            Back to Tracker
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── Quiz phase ──
    const sortedOptions = [...current.question.options].sort((a, b) => a.order - b.order);
    const pctThrough = ((index + (answerState !== 'unanswered' ? 1 : 0)) / queue.length) * 100;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
            <div className="absolute inset-0 bg-spiritual-blue/80 backdrop-blur-md" onClick={handleStopAndSave} />
            <div
                className="relative z-10 w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden my-4"
                style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(8px)' : 'translateY(0)', transition: 'opacity 0.28s ease, transform 0.28s ease' }}
            >
                {/* Category progress bar */}
                <div className="h-1.5 bg-slate-100">
                    <div className="h-full transition-all duration-500 ease-out"
                        style={{ width: `${pctThrough}%`, backgroundColor: meta.accent }} />
                </div>

                <div className="p-7 lg:p-9">
                    {/* Modal header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: meta.accent + '18' }}>
                                <span className="material-symbols-outlined text-base" style={{ color: meta.accent }}>{meta.icon}</span>
                            </div>
                            <div className="min-w-0">
                                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    Q {index + 1} / {queue.length}
                                </div>
                                <div className="text-[10px] font-bold text-slate-500 truncate max-w-[220px]">
                                    {current.articleTitle.replace(/^\d+\.\s*/, '')}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                            {sessionTotal > 0 && (
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full">
                                    <span className="text-emerald-600 font-black text-xs">{sessionCorrect}</span>
                                    <span className="text-slate-300 text-xs">/</span>
                                    <span className="text-slate-500 font-bold text-xs">{sessionTotal}</span>
                                </div>
                            )}
                            <button onClick={handleStopAndSave}
                                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-all"
                                title="Stop & Save Progress">
                                <span className="material-symbols-outlined text-lg">close</span>
                            </button>
                        </div>
                    </div>

                    {/* Dot progress indicators (max 20 shown) */}
                    {queue.length <= 30 && (
                        <div className="flex flex-wrap gap-1.5 mb-5">
                            {queue.map((_, i) => (
                                <div key={i} className="h-1.5 rounded-full transition-all duration-300"
                                    style={{
                                        width: i === index ? '24px' : '8px',
                                        backgroundColor: i < index ? '#10b981' : i === index ? meta.accent : '#e2e8f0'
                                    }} />
                            ))}
                        </div>
                    )}

                    {/* Question text */}
                    <p className="text-lg font-bold text-spiritual-blue font-serif-title leading-snug mb-6">
                        {current.question.question_text}
                    </p>

                    {/* Options */}
                    <div className="space-y-2.5 mb-6">
                        {sortedOptions.map((opt, idx) => (
                            <button key={opt.id} id={`tracker-opt-${opt.id}`}
                                onClick={() => handleSelect(opt.id)}
                                disabled={answerState !== 'unanswered'}
                                className={getOptionClass(opt)}
                            >
                                <span className={getIndicatorClass(opt, idx)}>
                                    {answerState !== 'unanswered'
                                        ? opt.is_correct ? '✓' : opt.id === selectedId ? '✗' : optionLetters[idx]
                                        : optionLetters[idx]}
                                </span>
                                <span className="text-sm font-medium text-slate-700 leading-relaxed text-left">
                                    {opt.option_text}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Feedback banner */}
                    {answerState !== 'unanswered' && (
                        <div className={`flex items-start gap-3 px-4 py-3.5 rounded-2xl mb-5 text-sm animate-in fade-in slide-in-from-bottom-2 duration-300
                            ${answerState === 'correct' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
                            <span className="material-symbols-outlined text-base flex-shrink-0 mt-0.5">
                                {answerState === 'correct' ? 'check_circle' : 'cancel'}
                            </span>
                            <div>
                                <span className="font-bold">
                                    {answerState === 'correct' ? '✓ Correct! +10 XP' : '✗ Incorrect.'}
                                </span>
                                {answerState === 'incorrect' && (
                                    <p className="text-xs mt-0.5 opacity-80">
                                        Correct answer: {current.question.options.find(o => o.is_correct)?.option_text}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Next / Finish button */}
                    <button id="tracker-next-btn" onClick={handleNext}
                        disabled={answerState === 'unanswered'}
                        className={`w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all
                            ${answerState === 'unanswered'
                                ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                                : 'text-white shadow-lg hover:brightness-110 hover:-translate-y-0.5 active:scale-95'}`}
                        style={answerState !== 'unanswered' ? { backgroundColor: meta.accent, boxShadow: `0 8px 20px ${meta.accent}40` } : {}}>
                        {index >= queue.length - 1
                            ? <><span className="material-symbols-outlined text-base">done_all</span> Finish Challenge</>
                            : <><span className="material-symbols-outlined text-base">arrow_forward</span> Next Question</>}
                    </button>

                    <p className="text-center text-[9px] font-bold uppercase tracking-widest text-slate-300 mt-4">
                        Close / ✕ to stop and save progress
                    </p>
                </div>
            </div>
        </div>
    );
}

// ─── Main TrackerContent ──────────────────────────────────────────────────────

function TrackerContent() {
    const searchParams = useSearchParams();
    const currentLang = (searchParams.get('lang') || 'en') as string;

    const [allArticles, setAllArticles] = useState<Article[]>([]);
    const [quizScores, setQuizScores] = useState<Record<string, SavedScore>>({});
    const [loading, setLoading] = useState(true);
    const [challengeCategory, setChallengeCategory] = useState<string | null>(null);
    const [retakeMode, setRetakeMode] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`https://api.askharekrishna.com/api/v1/brahmhacarya/?language=${currentLang}`);
                const data = await res.json();
                setAllArticles(Array.isArray(data) ? data : data.results ?? []);
            } catch (e) {
                console.error('Tracker fetch failed', e);
            } finally {
                setLoading(false);
            }
        })();
        const saved = JSON.parse(localStorage.getItem('quiz_scores') || '{}');
        setQuizScores(saved);
    }, [currentLang]);

    const refreshScores = useCallback(() => {
        const saved = JSON.parse(localStorage.getItem('quiz_scores') || '{}');
        setQuizScores(saved);
    }, []);

    const byCategory = useMemo(() =>
        allArticles.reduce((acc, a) => {
            const catEn = getEnglishCategory(a.category, currentLang as Language).toUpperCase();
            if (!acc[catEn]) acc[catEn] = [];
            acc[catEn].push(a);
            return acc;
        }, {} as Record<string, Article[]>),
        [allArticles, currentLang]
    );

    const getCategoryStats = useCallback((cat: string): CatStats => {
        const articles = byCategory[cat] ?? [];
        let totalQ = 0, answeredQ = 0, correctA = 0, completedArts = 0;
        articles.forEach(a => {
            const activeCount = a.questions.filter(q => q.is_active && q.options.length > 0).slice(0, 10).length;
            totalQ += activeCount;
            if (quizScores[a.slug]) {
                answeredQ += quizScores[a.slug].total;
                correctA += quizScores[a.slug].score;
                completedArts += 1;
            }
        });
        return {
            totalArticles: articles.length, totalQuestions: totalQ,
            completedArticles: completedArts, answeredQuestions: answeredQ,
            correctAnswers: correctA, pct: answeredQ > 0 ? Math.round((correctA / answeredQ) * 100) : 0,
        };
    }, [byCategory, quizScores]);

    const globalStats = useMemo(() => {
        let totalQ = 0, answeredQ = 0, correctA = 0;
        allArticles.forEach(a => { totalQ += a.questions.filter(q => q.is_active && q.options.length > 0).slice(0, 10).length; });
        Object.values(quizScores).forEach(s => { answeredQ += s.total; correctA += s.score; });
        const pct = answeredQ > 0 ? Math.round((correctA / answeredQ) * 100) : 0;
        return { totalQ, answeredQ, correctA, pct, xp: correctA * 10, articlesDone: Object.keys(quizScores).length };
    }, [allArticles, quizScores]);

    const buildQueue = useCallback((cat: string, retake: boolean): QuizEntry[] => {
        const articles = (byCategory[cat] ?? []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        const queue: QuizEntry[] = [];
        articles
            .filter(a => retake || !quizScores[a.slug])
            .forEach(a => {
                a.questions
                    .filter(q => q.is_active && q.options.length > 0)
                    .sort((x, y) => x.order - y.order)
                    .slice(0, 10)
                    .forEach(q => queue.push({ question: q, articleSlug: a.slug, articleTitle: a.title }));
            });
        return queue;
    }, [byCategory, quizScores]);

    const rank = getRank(globalStats.pct);
    const trapCats = useMemo(() => Object.keys(byCategory).filter(c => CATEGORY_MAP[c]?.type === 'trap'), [byCategory]);
    const wisdomCats = useMemo(() => Object.keys(byCategory).filter(c => CATEGORY_MAP[c]?.type === 'wisdom'), [byCategory]);
    const otherCats = useMemo(() => Object.keys(byCategory).filter(c => !CATEGORY_MAP[c]), [byCategory]);

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background-light gap-5">
            <div className="h-16 w-16 border-4 border-slate-100 border-t-saffron rounded-full animate-spin" />
            <p className="text-spiritual-blue font-bold uppercase tracking-widest text-xs animate-pulse">Loading Challenge Arena...</p>
        </div>
    );

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light">
            <Header />
            <main className="flex-1 px-6 py-16 lg:px-20 lg:py-24">
                <div className="max-w-7xl mx-auto">

                    {/* ── Page Header ── */}
                    <div className="mb-14 text-center">
                        <span className="inline-block text-[10px] font-black uppercase tracking-[0.4em] text-saffron mb-4">
                            Knowledge Challenge Arena
                        </span>
                        <h1 className="text-4xl lg:text-5xl font-bold font-serif-title text-spiritual-blue tracking-tight mb-4">
                            MCQ <span className="text-saffron italic">Mastery</span> Tracker
                        </h1>
                        <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
                            Answer real questions from every article. Earn XP, climb ranks, and prove your mastery of Brahmacharya wisdom.
                        </p>
                    </div>

                    {/* ── Global Score Banner ── */}
                    <div className="mb-16 rounded-[2.5rem] bg-gradient-to-br from-spiritual-blue via-slate-800 to-slate-900 text-white overflow-hidden relative shadow-2xl shadow-spiritual-blue/30">
                        {/* Decorative blobs */}
                        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-saffron/10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

                        <div className="relative z-10 p-8 lg:p-12">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">

                                {/* Score ring */}
                                <div className="flex flex-col items-center gap-3">
                                    <ScoreRing correct={globalStats.correctA} total={globalStats.answeredQ} size={150} />
                                    <div className="text-center">
                                        <div className="text-xs font-bold text-white/50 uppercase tracking-widest">Overall Accuracy</div>
                                        <div className="text-xs text-white/30">{globalStats.correctA} correct of {globalStats.answeredQ} answered</div>
                                    </div>
                                </div>

                                {/* Rank badge */}
                                <div className="flex flex-col items-center gap-3 text-center">
                                    <div className="w-18 h-18 w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                                        <span className="material-symbols-outlined text-4xl" style={{ color: rank.color }}>{rank.icon}</span>
                                    </div>
                                    <div className="text-xl font-black font-serif-title" style={{ color: rank.color }}>{rank.label}</div>
                                    <div className="text-xs text-white/40 uppercase tracking-widest">Current Rank</div>
                                    <div className="flex items-center gap-2 px-5 py-2 bg-white/10 rounded-full border border-white/10">
                                        <span className="material-symbols-outlined text-sm text-yellow-400">bolt</span>
                                        <span className="font-black text-yellow-300 text-sm">{globalStats.xp.toLocaleString()} XP</span>
                                    </div>
                                    <div className="text-xs text-white/30">{globalStats.articlesDone} articles completed</div>
                                </div>

                                {/* Stat grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { val: globalStats.answeredQ, label: 'Questions Answered', color: 'text-white' },
                                        { val: globalStats.totalQ, label: 'Total Available', color: 'text-white/60' },
                                        { val: globalStats.correctA, label: 'Correct Answers', color: 'text-emerald-400' },
                                        { val: globalStats.answeredQ - globalStats.correctA, label: 'Incorrect', color: 'text-red-400' },
                                    ].map(({ val, label, color }) => (
                                        <div key={label} className="bg-white/8 rounded-2xl p-4 text-center border border-white/10">
                                            <div className={`text-2xl font-black ${color}`}>{val.toLocaleString()}</div>
                                            <div className="text-[9px] font-bold uppercase tracking-widest text-white/40 mt-1">{label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Rank progress bar */}
                            <div className="mt-10 pt-8 border-t border-white/10">
                                <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-white/30 mb-2">
                                    <span>Seeking Soul (0%)</span>
                                    <span>Liberated Scholar (95%+)</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full transition-all duration-1000"
                                        style={{ width: `${globalStats.pct}%`, background: 'linear-gradient(90deg, #FF9933, #D4AF37, #10b981)' }} />
                                </div>
                                <div className="flex justify-between text-[9px] text-white/20 mt-1">
                                    {RANKS.slice().reverse().map(r => (
                                        <span key={r.label} className="hidden sm:block">{r.min}%</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Rank Legend ── */}
                    <div className="mb-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {RANKS.slice().reverse().map(r => (
                            <div key={r.label}
                                className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${globalStats.pct >= r.min ? 'border-gold/20 bg-white shadow-sm' : 'border-slate-100 bg-slate-50 opacity-40'}`}>
                                <span className="material-symbols-outlined text-xl" style={{ color: r.color }}>{r.icon}</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-center leading-tight" style={{ color: globalStats.pct >= r.min ? r.color : '#94a3b8' }}>
                                    {r.label}
                                </span>
                                <span className="text-[8px] font-bold text-slate-300">{r.min}%+</span>
                            </div>
                        ))}
                    </div>

                    {/* ── Distraction Zones ── */}
                    {trapCats.length > 0 && (
                        <section className="mb-20">
                            <div className="flex items-center gap-4 mb-10">
                                <span className="material-symbols-outlined text-red-500 text-2xl">security_update_warning</span>
                                <h2 className="text-xl font-bold font-serif-title text-red-600">Distraction Zone Challenges</h2>
                                <div className="h-px flex-1 bg-gradient-to-r from-red-200 to-transparent" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                                {trapCats.map(cat => (
                                    <CategoryCard key={cat} cat={cat} stats={getCategoryStats(cat)}
                                        onChallenge={(retake) => { setChallengeCategory(cat); setRetakeMode(retake); }} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ── Wisdom Zones ── */}
                    {wisdomCats.length > 0 && (
                        <section className="mb-20">
                            <div className="flex items-center gap-4 mb-10">
                                <span className="material-symbols-outlined text-indigo-500 text-2xl">auto_stories</span>
                                <h2 className="text-xl font-bold font-serif-title text-indigo-700">Wisdom Zone Challenges</h2>
                                <div className="h-px flex-1 bg-gradient-to-r from-indigo-200 to-transparent" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                                {wisdomCats.map(cat => (
                                    <CategoryCard key={cat} cat={cat} stats={getCategoryStats(cat)}
                                        onChallenge={(retake) => { setChallengeCategory(cat); setRetakeMode(retake); }} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ── Other categories ── */}
                    {otherCats.length > 0 && (
                        <section className="mb-20">
                            <div className="flex items-center gap-4 mb-10">
                                <span className="material-symbols-outlined text-slate-400 text-2xl">folder_open</span>
                                <h2 className="text-xl font-bold font-serif-title text-slate-500">Other Categories</h2>
                                <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                                {otherCats.map(cat => (
                                    <CategoryCard key={cat} cat={cat} stats={getCategoryStats(cat)}
                                        onChallenge={(retake) => { setChallengeCategory(cat); setRetakeMode(retake); }} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ── Reset ── */}
                    <div className="text-center pt-12 border-t border-gold/10">
                        <button
                            onClick={() => { if (confirm('Reset all MCQ scores? This cannot be undone.')) { localStorage.removeItem('quiz_scores'); setQuizScores({}); } }}
                            className="flex items-center gap-2 mx-auto text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-red-400 transition-colors py-2"
                        >
                            <span className="material-symbols-outlined text-sm">restart_alt</span>
                            Reset All Scores
                        </button>
                    </div>
                </div>
            </main>
            <Footer lang={currentLang as any} />

            {/* Challenge modal */}
            {challengeCategory && (
                <ChallengeModal
                    key={`${challengeCategory}-${retakeMode}`}
                    category={challengeCategory}
                    queue={buildQueue(challengeCategory, retakeMode)}
                    onClose={() => { setChallengeCategory(null); refreshScores(); }}
                />
            )}
        </div>
    );
}

export default function TrackerPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background-light">
                <div className="h-14 w-14 border-4 border-slate-100 border-t-saffron rounded-full animate-spin" />
            </div>
        }>
            <TrackerContent />
        </Suspense>
    );
}
