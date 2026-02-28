import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SatsangPage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col bg-deep-cream/30">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="px-6 py-20 lg:px-20 lg:py-32 bg-spiritual-blue text-white relative overflow-hidden">
                    <div className="mx-auto max-w-7xl relative z-10">
                        <div className="max-w-3xl">
                            <h3 className="text-saffron font-bold uppercase tracking-[0.3em] mb-4">Divine Association</h3>
                            <h1 className="text-5xl font-bold font-serif-title mb-8 tracking-tight sm:text-7xl leading-tight">
                                Join our Global <br /><span className="text-gold">Satsang Community</span>
                            </h1>
                            <p className="text-xl text-indigo-100 leading-relaxed mb-10 max-w-2xl">
                                &quot;Sangat Sanjivani&quot; — Association is the life-breath of spiritual progress. Connect with like-minded practitioners and advanced mentors to stabilize your Brahmacharya.
                            </p>
                        </div>
                    </div>
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 opacity-10 -mr-20 -mt-20">
                        <span className="material-symbols-outlined text-[400px]">groups</span>
                    </div>
                </section>

                {/* Contact & Info Section */}
                <section className="px-6 py-20 lg:px-20 lg:py-32">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                            {/* Information side */}
                            <div className="space-y-12">
                                <div>
                                    <h2 className="text-4xl font-bold text-spiritual-blue font-serif-title mb-6">Why Join a Satsang?</h2>
                                    <div className="h-1.5 w-24 bg-gold rounded-full mb-8"></div>
                                    <p className="text-lg text-slate-600 leading-relaxed italic border-l-4 border-saffron pl-6">
                                        &quot;Without the association of devotees, it is impossible to overcome the waves of the material ocean.&quot; — Srila Prabhupada
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    <div className="flex gap-6">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-saffron/10 text-saffron">
                                            <span className="material-symbols-outlined text-3xl">forum</span>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-spiritual-blue mb-2">Honest Confession Culture</h4>
                                            <p className="text-slate-600">A safe, non-judgmental space to share struggles and receive practical, scriptural guidance for recovery.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                                            <span className="material-symbols-outlined text-3xl">record_voice_over</span>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-spiritual-blue mb-2">Group Japa & Kirtan</h4>
                                            <p className="text-slate-600">The collective power of the Holy Name provides a shield that individual practice alone cannot achieve.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-spiritual-blue/10 text-spiritual-blue">
                                            <span className="material-symbols-outlined text-3xl">psychology</span>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-spiritual-blue mb-2">Mentorship Programs</h4>
                                            <p className="text-slate-600">One-on-one sessions with stable practitioners to track your roadmap and strengthen your saṅkalpa.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form side */}
                            <div className="bg-white rounded-[3rem] p-10 lg:p-14 shadow-2xl border border-gold/10 relative">
                                <div className="absolute top-0 right-0 p-8 transform rotate-12 opacity-5">
                                    <span className="material-symbols-outlined text-8xl text-saffron">edit_note</span>
                                </div>

                                <h3 className="text-2xl font-bold text-spiritual-blue font-serif-title mb-2">Satsang Inquiry</h3>
                                <p className="text-slate-500 mb-10 text-sm">Tell us about your spiritual journey and we will connect you to the nearest local or online group.</p>

                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                                            <input
                                                type="text"
                                                placeholder="Your Name"
                                                className="w-full rounded-2xl border-slate-100 bg-slate-50 px-6 py-4 text-sm focus:border-saffron focus:ring-saffron transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                                            <input
                                                type="email"
                                                placeholder="your@email.com"
                                                className="w-full rounded-2xl border-slate-100 bg-slate-50 px-6 py-4 text-sm focus:border-saffron focus:ring-saffron transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Location (City/Country)</label>
                                        <input
                                            type="text"
                                            placeholder="Mumbai, India"
                                            className="w-full rounded-2xl border-slate-100 bg-slate-50 px-6 py-4 text-sm focus:border-saffron focus:ring-saffron transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Current Level of Practice</label>
                                        <select className="w-full rounded-2xl border-slate-100 bg-slate-50 px-6 py-4 text-sm focus:border-saffron focus:ring-saffron appearance-none">
                                            <option>Beginner (Curious about Brahmacharya)</option>
                                            <option>Intermediate (Chanting daily, seeking stability)</option>
                                            <option>Advanced (Following 4 Regulative Principles)</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Message / Spiritual Goal</label>
                                        <textarea
                                            rows={4}
                                            placeholder="Share your goals or challenges..."
                                            className="w-full rounded-2xl border-slate-100 bg-slate-50 px-6 py-4 text-sm focus:border-saffron focus:ring-saffron transition-all resize-none"
                                        ></textarea>
                                    </div>

                                    <button className="w-full rounded-[2rem] bg-saffron py-5 text-white font-bold uppercase tracking-[0.2em] shadow-lg shadow-saffron/30 hover:bg-orange-600 transition-all hover:scale-[1.02]">
                                        Submit Inquiry
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
