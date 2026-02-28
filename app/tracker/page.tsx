'use client';
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

type Category = 'Chanting' | 'Mind Control' | 'Diet' | 'Association' | 'Regulation';

interface Question {
    id: string;
    category: Category;
    text: string;
}

const questions: Question[] = [
    { id: 'q1', category: 'Chanting', text: 'Did you complete your fixed daily rounds of Japa with attention?' },
    { id: 'q2', category: 'Chanting', text: 'How aware were you of the sound vibration while chanting?' },
    { id: 'q11', category: 'Chanting', text: 'Did you avoid "Nama-aparadha" (offenses) and maintain a prayerful mood during Japa?' },
    { id: 'q12', category: 'Chanting', text: 'Did you participate in or listen to congregational Kirtan today?' },
    { id: 'q3', category: 'Mind Control', text: 'How quickly did you redirect the mind when a provocative thought surfaced?' },
    { id: 'q4', category: 'Mind Control', text: 'Did you successfully avoid "Digital Traps" like mindless scrolling?' },
    { id: 'q13', category: 'Mind Control', text: 'Did you practice "Drishti Shuddhi" (holy vision) when encountering external triggers?' },
    { id: 'q14', category: 'Mind Control', text: 'How much time did you spend in meaningful "Seva" (service) to displace idle thoughts?' },
    { id: 'q5', category: 'Diet', text: 'Did you honor only sanctified Prasadam today?' },
    { id: 'q6', category: 'Diet', text: 'Did you maintain regulation in quantity and timing of meals?' },
    { id: 'q15', category: 'Diet', text: 'Did you avoid overly stimulating (Rajasic) foods like excess caffeine or spice?' },
    { id: 'q16', category: 'Diet', text: 'Did you offer your food with gratitude and devotion before consuming?' },
    { id: 'q7', category: 'Association', text: 'Did you actively seek the company of devotees or spiritual content?' },
    { id: 'q8', category: 'Association', text: 'Did you avoid "Prajalpa" (useless or vulgar talk)?' },
    { id: 'q17', category: 'Association', text: 'Did you engage in "Shravanam" (hearing) scriptural discourses from advanced mentors?' },
    { id: 'q18', category: 'Association', text: 'Did you speak "Krishna-katha" or share spiritual realizations with others?' },
    { id: 'q9', category: 'Regulation', text: 'Did you rise during the Brahma Muhurta (early morning) hours?' },
    { id: 'q10', category: 'Regulation', text: 'Was your sleep early and disciplined to facilitate early rising?' },
    { id: 'q19', category: 'Regulation', text: 'Did you maintain your "Sankalpa" (vow) consistently throughout the day without compromise?' },
    { id: 'q20', category: 'Regulation', text: 'Did you dedicate time to "Shastra Adhyayan" (systematic scriptural study)?' },
];

export default function TrackerPage() {
    const [step, setStep] = useState<'intro' | 'survey' | 'dashboard'>('intro');
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [currentQ, setCurrentQ] = useState(0);

    const handleAnswer = (val: number) => {
        const qId = questions[currentQ].id;
        setAnswers({ ...answers, [qId]: val });
        if (currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1);
        } else {
            setStep('dashboard');
        }
    };

    const getCategoryScore = (cat: Category) => {
        const catQs = questions.filter(q => q.category === cat);
        const sum = catQs.reduce((acc, q) => acc + (answers[q.id] || 0), 0);
        return (sum / (catQs.length * 10)) * 100;
    };

    const scores: Record<Category, number> = {
        Chanting: getCategoryScore('Chanting'),
        'Mind Control': getCategoryScore('Mind Control'),
        Diet: getCategoryScore('Diet'),
        Association: getCategoryScore('Association'),
        Regulation: getCategoryScore('Regulation'),
    };

    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0) / 5;

    const getFeedback = () => {
        if (totalScore >= 100) return { status: 'Siddha-Svarupa', msg: 'Perfected stage. You are constantly absorbed in transcendental bliss.', color: 'text-emerald-700 font-black' };
        if (totalScore > 80) return { status: 'Ruci-Svarupa', msg: 'You have developed a genuine taste. Material desires have lost their pull.', color: 'text-emerald-600' };
        if (totalScore > 60) return { status: 'Nisthita', msg: 'Fixed and steady. Your practice is now independent of external emotional shifts.', color: 'text-indigo-600' };
        if (totalScore > 50) return { status: 'Anartha-Nivritti', msg: 'The heart is being cleansed. Stay focused as deep-rooted habits are surfacing to be cleared.', color: 'text-blue-600' };
        if (totalScore > 40) return { status: 'Sadhaka', msg: 'Systematic practice has begun. Discipline is your greatest strength right now.', color: 'text-saffron' };
        if (totalScore > 20) return { status: 'Aruruksu', msg: 'One who desires to climb. Your initial sincerity is your ticket to higher stages.', color: 'text-orange-500' };
        return { status: 'Kanistha-Adhikari', msg: 'Beginner stage. Focus purely on hearing and association to build the foundation.', color: 'text-red-500' };
    };

    const feedback = getFeedback();

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-deep-cream/30">
            <Header />
            <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-20">

                {step === 'intro' && (
                    <div className="max-w-2xl text-center space-y-10 animate-fade-in">
                        <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-saffron text-white shadow-xl shadow-saffron/20 mb-4">
                            <span className="material-symbols-outlined text-4xl">analytics</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold font-serif-title text-spiritual-blue tracking-tight">
                            Auro-Tracker: <br /><span className="text-saffron">Know Your Soul Progress</span>
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Self-honesty is the first step to spiritual stability. Evaluate your daily consciousness to activate your personal growth dashboard.
                        </p>
                        <button
                            onClick={() => setStep('survey')}
                            className="px-10 py-5 bg-spiritual-blue text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-slate-800 transition-all hover:scale-105 shadow-xl shadow-blue-900/20"
                        >
                            Start Self-Rating
                        </button>
                    </div>
                )}

                {step === 'survey' && (
                    <div className="w-full max-w-3xl bg-white rounded-[3rem] p-10 lg:p-16 shadow-2xl border border-gold/10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-1 bg-saffron transition-all duration-500" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}></div>

                        <div className="flex justify-between items-center mb-12">
                            <div className="px-4 py-1.5 bg-saffron/10 text-saffron text-[10px] font-bold uppercase tracking-widest rounded-full">
                                {questions[currentQ].category}
                            </div>
                            <span className="text-xs font-bold text-slate-400">Step {currentQ + 1} of {questions.length}</span>
                        </div>

                        <h2 className="text-2xl lg:text-3xl font-bold text-spiritual-blue font-serif-title mb-12 leading-tight">
                            {questions[currentQ].text}
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
                                <button
                                    key={val}
                                    onClick={() => handleAnswer(val)}
                                    className="group flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-slate-50 bg-slate-50/50 hover:border-saffron hover:bg-white transition-all"
                                >
                                    <span className="text-2xl font-black text-slate-300 group-hover:text-saffron">{val}</span>
                                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 text-saffron">Rate</span>
                                </button>
                            ))}
                        </div>

                        <div className="mt-16 text-center italic text-slate-400 text-xs">
                            &quot;One must judge their progress by the decrease in material desires.&quot;
                        </div>
                    </div>
                )}

                {step === 'dashboard' && (
                    <div className="w-full max-w-5xl space-y-10 animate-fade-in">
                        <div className="flex flex-col lg:flex-row gap-10">
                            {/* Profile/Status Card */}
                            <div className="lg:w-1/3 bg-white rounded-[2.5rem] p-10 shadow-xl border border-gold/10 flex flex-col items-center text-center">
                                <div className="relative mb-8">
                                    <div className="h-32 w-32 rounded-full border-8 border-slate-50 flex items-center justify-center spiritual-gradient text-white shadow-2xl">
                                        <span className="material-symbols-outlined text-5xl">person</span>
                                    </div>
                                    <div className="absolute -bottom-2 right-0 bg-gold text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                                        {Math.round(totalScore)}% Pure
                                    </div>
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gold mb-2">Current Status</h3>
                                <h2 className={`text-3xl font-bold font-serif-title mb-4 ${feedback.color}`}>{feedback.status}</h2>
                                <div className="h-px w-20 bg-slate-100 mb-6 mx-auto"></div>
                                <p className="text-slate-600 italic leading-relaxed text-sm">&quot;{feedback.msg}&quot;</p>
                            </div>

                            {/* Data Visualization */}
                            <div className="lg:w-2/3 bg-white rounded-[2.5rem] p-10 lg:p-14 shadow-xl border border-gold/10">
                                <h3 className="text-xl font-bold text-spiritual-blue font-serif-title mb-10 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-saffron">analytics</span>
                                    Progress Matrix
                                </h3>

                                <div className="space-y-10">
                                    {Object.entries(scores).map(([cat, score]) => (
                                        <div key={cat} className="space-y-3">
                                            <div className="flex justify-between items-end">
                                                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{cat}</span>
                                                <span className="text-sm font-bold text-spiritual-blue">{Math.round(score)}%</span>
                                            </div>
                                            <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                                <div
                                                    className="h-full bg-gradient-to-r from-spiritual-blue to-saffron transition-all duration-1000"
                                                    style={{ width: `${score}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recommendations Section */}
                        <div className="bg-indigo-950 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
                            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                                <div className="space-y-4">
                                    <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-gold">
                                        <span className="material-symbols-outlined">auto_stories</span>
                                    </div>
                                    <h5 className="font-bold uppercase tracking-widest text-xs">Recommended Study</h5>
                                    <p className="text-sm text-indigo-100 opacity-80">Reread BG 2.62-63 to understand the mechanics of fall-down cycles.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-saffron">
                                        <span className="material-symbols-outlined">groups</span>
                                    </div>
                                    <h5 className="font-bold uppercase tracking-widest text-xs">Satsang Boost</h5>
                                    <p className="text-sm text-indigo-100 opacity-80">Your Association score suggests you need more group Kirtan engagement.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
                                        <span className="material-symbols-outlined">bolt</span>
                                    </div>
                                    <h5 className="font-bold uppercase tracking-widest text-xs">Shield Activation</h5>
                                    <p className="text-sm text-indigo-100 opacity-80">Implement a 9 PM digital curfew to protect your Brahma Muhurta victory.</p>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                                <span className="material-symbols-outlined text-[200px]">monitoring</span>
                            </div>
                        </div>

                        <div className="flex justify-center pt-10">
                            <button
                                onClick={() => { setStep('intro'); setCurrentQ(0); setAnswers({}); }}
                                className="flex items-center gap-3 text-slate-400 hover:text-saffron font-bold text-xs uppercase tracking-[0.2em] transition-all"
                            >
                                <span className="material-symbols-outlined text-sm">restart_alt</span>
                                Reset Evaluation
                            </button>
                        </div>
                    </div>
                )}

            </main>
            <Footer />
        </div>
    );
}
