'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { translations, Language } from '../lib/translations';
import RegistrationModal from './RegistrationModal';
import type { UserData } from './RegistrationModal';

// ─── Types ────────────────────────────────────────────────────────────────────

interface QuizOption {
    id: number;
    order: number;
    option_text: string;
    is_correct: boolean;
}

interface QuizQuestion {
    id: number;
    order: number;
    question_text: string;
    is_active: boolean;
    options: QuizOption[];
}

interface ArticleQuizProps {
    questions: QuizQuestion[];
    articleSlug: string;
    articleTitle: string;
    lang?: Language;
}

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

interface AnswerRecord {
    questionId: number;
    selectedOptionId: number;
    isCorrect: boolean;
}

// ─── Score Ring SVG ───────────────────────────────────────────────────────────

function ScoreRing({ score, total }: { score: number; total: number }) {
    const pct = total > 0 ? score / total : 0;
    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const dash = pct * circumference;
    const color = pct >= 0.8 ? '#16a34a' : pct >= 0.5 ? '#D4AF37' : '#ef4444';

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
                {/* Track */}
                <circle cx="70" cy="70" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="12" />
                {/* Progress */}
                <circle
                    cx="70" cy="70" r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${dash} ${circumference}`}
                    style={{ transition: 'stroke-dasharray 1s ease-out' }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black" style={{ color }}>{score}</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">of {total}</span>
            </div>
        </div>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function ArticleQuiz({ questions, articleSlug, articleTitle, lang = 'en' }: ArticleQuizProps) {
    const t = translations[lang] || translations.en;

    // Filter only active questions, sort by order, cap at 10
    const activeQuestions = questions
        .filter(q => q.is_active && q.options.length > 0)
        .sort((a, b) => a.order - b.order)
        .slice(0, 10);

    // ─── State ───────────────────────────────────────────────────────────────
    const [phase, setPhase] = useState<'quiz' | 'result'>('quiz');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
    const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
    const [answers, setAnswers] = useState<AnswerRecord[]>([]);
    const [animating, setAnimating] = useState(false);
    const [showRegModal, setShowRegModal] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [scoreSaved, setScoreSaved] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const user = localStorage.getItem('brahmacharya_user');
        setIsRegistered(!!user);
        // Check if already took this quiz
        const saved = JSON.parse(localStorage.getItem('quiz_scores') || '{}');
        if (saved[articleSlug]) setScoreSaved(true);
    }, [articleSlug]);

    const score = answers.filter(a => a.isCorrect).length;
    const total = activeQuestions.length;
    const currentQuestion = activeQuestions[currentIndex];

    // ─── Helpers ─────────────────────────────────────────────────────────────

    const saveScore = useCallback((finalScore: number, finalTotal: number) => {
        const saved = JSON.parse(localStorage.getItem('quiz_scores') || '{}');
        saved[articleSlug] = { score: finalScore, total: finalTotal, savedAt: new Date().toISOString(), articleTitle };
        localStorage.setItem('quiz_scores', JSON.stringify(saved));
        setScoreSaved(true);
    }, [articleSlug, articleTitle]);

    const handleOptionSelect = (optionId: number) => {
        if (answerState !== 'unanswered' || animating) return;
        const option = currentQuestion.options.find(o => o.id === optionId)!;
        setSelectedOptionId(optionId);
        setAnswerState(option.is_correct ? 'correct' : 'incorrect');
    };

    const handleNext = () => {
        if (animating || answerState === 'unanswered') return;

        // Record answer
        const option = currentQuestion.options.find(o => o.id === selectedOptionId)!;
        const newAnswers = [...answers, {
            questionId: currentQuestion.id,
            selectedOptionId: selectedOptionId!,
            isCorrect: option.is_correct,
        }];
        setAnswers(newAnswers);

        const isLast = currentIndex >= activeQuestions.length - 1;

        if (isLast) {
            // Move to result
            const finalScore = newAnswers.filter(a => a.isCorrect).length;
            setAnimating(true);
            setTimeout(() => {
                setPhase('result');
                setAnimating(false);

                // Auto-save if registered
                const user = localStorage.getItem('brahmacharya_user');
                if (user) {
                    saveScore(finalScore, total);
                }
            }, 350);
        } else {
            // Next question with transition
            setAnimating(true);
            setTimeout(() => {
                setCurrentIndex(prev => prev + 1);
                setSelectedOptionId(null);
                setAnswerState('unanswered');
                setAnimating(false);
            }, 350);
        }
    };

    const handleRetake = () => {
        setPhase('quiz');
        setCurrentIndex(0);
        setSelectedOptionId(null);
        setAnswerState('unanswered');
        setAnswers([]);
        setAnimating(false);
        setScoreSaved(false);
    };

    const handleRegistrationSuccess = (userData: UserData) => {
        setIsRegistered(true);
        setShowRegModal(false);
        saveScore(score, total);
    };

    // ─── Guard: No Questions ──────────────────────────────────────────────────

    if (!isMounted) return null;

    if (activeQuestions.length === 0) {
        return null; // Silently hide if no MCQs
    }

    // ─── Option Style Helper ──────────────────────────────────────────────────

    const getOptionClass = (option: QuizOption) => {
        const base = 'group relative flex items-start gap-4 w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer ';
        if (answerState === 'unanswered') {
            return base + (selectedOptionId === option.id
                ? 'border-saffron bg-saffron/5 shadow-md'
                : 'border-gold/15 bg-white hover:border-saffron/40 hover:bg-saffron/5 hover:shadow-sm');
        }
        if (option.is_correct) {
            return base + 'border-emerald-400 bg-emerald-50 shadow-md shadow-emerald-100';
        }
        if (option.id === selectedOptionId && !option.is_correct) {
            return base + 'border-red-400 bg-red-50 shadow-md shadow-red-100';
        }
        return base + 'border-gold/10 bg-white opacity-60';
    };

    const getOptionIndicatorClass = (option: QuizOption) => {
        const base = 'flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-200 ';
        if (answerState === 'unanswered') {
            return base + (selectedOptionId === option.id
                ? 'border-saffron bg-saffron text-white'
                : 'border-gold/30 text-slate-400 group-hover:border-saffron/50');
        }
        if (option.is_correct) return base + 'border-emerald-400 bg-emerald-400 text-white';
        if (option.id === selectedOptionId) return base + 'border-red-400 bg-red-400 text-white';
        return base + 'border-gold/20 text-slate-300';
    };

    const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

    // ─── Result Message ───────────────────────────────────────────────────────

    const getResultMessage = () => {
        const pct = total > 0 ? score / total : 0;
        if (pct >= 0.8) return t.quiz_result_excellent;
        if (pct >= 0.5) return t.quiz_result_good;
        return t.quiz_result_ok;
    };

    // ─── Render ───────────────────────────────────────────────────────────────

    return (
        <>
            <div className="mt-16 mb-8">
                {/* Section Header */}
                <div className="flex items-center gap-6 mb-10">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/20 to-gold/40" />
                    <div className="flex items-center gap-3 px-6 py-3 bg-saffron/8 rounded-full border border-saffron/20">
                        <span className="material-symbols-outlined text-saffron text-lg">quiz</span>
                        <span className="text-sm font-bold uppercase tracking-widest text-saffron">{t.quiz_title}</span>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/20 to-gold/40" />
                </div>

                {phase === 'quiz' ? (
                    /* ── QUIZ PHASE ─────────────────────────────────────────────── */
                    <div
                        className="rounded-[2.5rem] bg-white border border-gold/15 shadow-xl shadow-gold/5 overflow-hidden"
                        style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(8px)' : 'translateY(0)', transition: 'opacity 0.3s ease, transform 0.3s ease' }}
                    >
                        {/* Progress bar */}
                        <div className="h-1.5 bg-slate-100">
                            <div
                                className="h-full bg-gradient-to-r from-saffron to-gold transition-all duration-500 ease-out"
                                style={{ width: `${((currentIndex + (answerState !== 'unanswered' ? 1 : 0)) / activeQuestions.length) * 100}%` }}
                            />
                        </div>

                        <div className="p-8 lg:p-10">
                            {/* Question counter + subtitle */}
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                                    {t.quiz_question_label} {currentIndex + 1} / {activeQuestions.length}
                                </span>
                                <div className="flex gap-1.5">
                                    {activeQuestions.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                                i < currentIndex
                                                    ? 'w-4 bg-gold'
                                                    : i === currentIndex
                                                    ? 'w-6 bg-saffron'
                                                    : 'w-4 bg-slate-200'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Question */}
                            <p className="text-lg lg:text-xl font-bold text-spiritual-blue font-serif-title leading-snug mb-8">
                                {currentQuestion.question_text}
                            </p>

                            {/* Options */}
                            <div className="space-y-3 mb-8">
                                {[...currentQuestion.options]
                                    .sort((a, b) => a.order - b.order)
                                    .map((option, idx) => (
                                        <button
                                            key={option.id}
                                            id={`quiz-option-${option.id}`}
                                            onClick={() => handleOptionSelect(option.id)}
                                            className={getOptionClass(option)}
                                            disabled={answerState !== 'unanswered'}
                                        >
                                            <span className={getOptionIndicatorClass(option)}>
                                                {answerState !== 'unanswered' ? (
                                                    option.is_correct
                                                        ? <span className="material-symbols-outlined text-xs">check</span>
                                                        : option.id === selectedOptionId
                                                        ? <span className="material-symbols-outlined text-xs">close</span>
                                                        : optionLetters[idx]
                                                ) : optionLetters[idx]}
                                            </span>
                                            <span className="text-sm font-medium text-slate-700 leading-relaxed text-left">
                                                {option.option_text}
                                            </span>
                                        </button>
                                    ))}
                            </div>

                            {/* Feedback banner */}
                            {answerState !== 'unanswered' && (
                                <div className={`animate-in fade-in slide-in-from-bottom-2 duration-400 flex items-start gap-3 px-5 py-4 rounded-2xl mb-6 ${
                                    answerState === 'correct'
                                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                                        : 'bg-red-50 border border-red-200 text-red-700'
                                }`}>
                                    <span className="material-symbols-outlined text-lg flex-shrink-0 mt-0.5">
                                        {answerState === 'correct' ? 'check_circle' : 'cancel'}
                                    </span>
                                    <div>
                                        <span className="font-bold text-sm">
                                            {answerState === 'correct' ? t.quiz_correct_label : t.quiz_incorrect_label}
                                        </span>
                                        {answerState === 'incorrect' && (
                                            <p className="text-xs mt-1 opacity-80">
                                                {t.quiz_correct_answer} {currentQuestion.options.find(o => o.is_correct)?.option_text}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Next / Submit button */}
                            <button
                                id="quiz-next-btn"
                                onClick={handleNext}
                                disabled={answerState === 'unanswered'}
                                className={`w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                                    answerState === 'unanswered'
                                        ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-saffron to-gold text-white shadow-lg shadow-saffron/20 hover:shadow-xl hover:-translate-y-0.5'
                                }`}
                            >
                                {currentIndex >= activeQuestions.length - 1 ? (
                                    <><span className="material-symbols-outlined text-base">done_all</span> {t.quiz_submit}</>
                                ) : (
                                    <><span className="material-symbols-outlined text-base">arrow_forward</span> {t.quiz_next}</>
                                )}
                            </button>
                        </div>
                    </div>
                ) : (
                    /* ── RESULT PHASE ───────────────────────────────────────────── */
                    <div className="rounded-[2.5rem] bg-white border border-gold/15 shadow-xl shadow-gold/5 overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                        <div className="h-1.5 bg-gradient-to-r from-saffron via-gold to-saffron" />

                        <div className="p-8 lg:p-12 text-center">
                            {/* Score ring */}
                            <div className="mb-6">
                                <ScoreRing score={score} total={total} />
                            </div>

                            <h3 className="text-2xl font-bold font-serif-title text-spiritual-blue mb-3">
                                {t.quiz_result_title}
                            </h3>
                            <p className="text-slate-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                                {getResultMessage()}
                            </p>

                            {/* Answer summary */}
                            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
                                <div className="px-4 py-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                                    <div className="text-2xl font-black text-emerald-600">{score}</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Correct</div>
                                </div>
                                <div className="px-4 py-3 rounded-2xl bg-red-50 border border-red-100">
                                    <div className="text-2xl font-black text-red-400">{total - score}</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-red-300">Incorrect</div>
                                </div>
                            </div>

                            {/* CTA: save score */}
                            {scoreSaved ? (
                                <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-sm mb-6 animate-in fade-in duration-500">
                                    <span className="material-symbols-outlined text-base">cloud_done</span>
                                    {t.quiz_score_saved}
                                </div>
                            ) : !isRegistered ? (
                                <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-saffron/5 to-gold/5 border border-gold/20">
                                    <h4 className="text-base font-bold font-serif-title text-spiritual-blue mb-2">
                                        {t.quiz_reg_prompt_title}
                                    </h4>
                                    <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                                        {t.quiz_reg_prompt_desc}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                        <button
                                            id="quiz-register-btn"
                                            onClick={() => setShowRegModal(true)}
                                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-saffron to-gold text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-saffron/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                                        >
                                            <span className="material-symbols-outlined text-sm">how_to_reg</span>
                                            {t.quiz_reg_btn}
                                        </button>
                                        <button
                                            id="quiz-skip-reg-btn"
                                            onClick={() => setScoreSaved(true)}
                                            className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors py-3"
                                        >
                                            {t.quiz_skip_reg}
                                        </button>
                                    </div>
                                </div>
                            ) : null}

                            {/* Retake */}
                            <button
                                id="quiz-retake-btn"
                                onClick={handleRetake}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-gold/20 text-spiritual-blue font-bold text-xs uppercase tracking-widest hover:border-saffron hover:text-saffron transition-all"
                            >
                                <span className="material-symbols-outlined text-sm">replay</span>
                                {t.quiz_retake}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Registration Modal */}
            <RegistrationModal
                isOpen={showRegModal}
                onClose={() => setShowRegModal(false)}
                onSuccess={handleRegistrationSuccess}
                lang={lang}
                scoreContext={{ score, total, articleTitle }}
            />
        </>
    );
}
