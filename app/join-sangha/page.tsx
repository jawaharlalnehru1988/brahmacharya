'use client';
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function JoinSanghaPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        whatsapp: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1500);
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light">
            <Header />
            <main className="flex-1 py-16 lg:py-24 px-6 lg:px-20">
                <div className="mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <span className="text-sm font-bold uppercase tracking-[0.4em] text-saffron mb-4">Community & Association</span>
                        <h1 className="text-4xl lg:text-6xl font-bold font-serif-title text-spiritual-blue tracking-tight mb-8">
                            Join the <span className="text-saffron italic">Sādhu-Sanga</span>
                        </h1>
                        <div className="h-1.5 w-24 bg-gold mx-auto rounded-full mb-10"></div>
                        <p className="max-w-2xl mx-auto text-xl font-medium leading-relaxed text-slate-600">
                            Register now to receive daily spiritual instructions, updates on local satsangs, and connect with a supportive community dedicated to Krishna Consciousness.
                        </p>
                    </div>

                    {!isSuccess ? (
                        <div className="bg-white rounded-[3rem] p-8 lg:p-16 shadow-2xl border border-gold/10 relative overflow-hidden">
                            {/* Decorative Corner */}
                            <div className="absolute top-0 right-0 h-40 w-40 spiritual-gradient opacity-5 rounded-bl-full"></div>

                            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full rounded-2xl border-slate-100 bg-slate-50 px-6 py-4 text-sm focus:border-saffron focus:ring-saffron transition-all"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full rounded-2xl border-slate-100 bg-slate-50 px-6 py-4 text-sm focus:border-saffron focus:ring-saffron transition-all"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Phone Number</label>
                                        <input
                                            required
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full rounded-2xl border-slate-100 bg-slate-50 px-6 py-4 text-sm focus:border-saffron focus:ring-saffron transition-all"
                                            placeholder="+91 00000 00000"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">WhatsApp Number</label>
                                        <input
                                            required
                                            type="tel"
                                            value={formData.whatsapp}
                                            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                            className="w-full rounded-2xl border-slate-100 bg-slate-50 px-6 py-4 text-sm focus:border-saffron focus:ring-saffron transition-all"
                                            placeholder="For daily instructions"
                                        />
                                    </div>
                                </div>

                                <div className="bg-indigo-50/50 rounded-3xl p-6 border border-indigo-100">
                                    <p className="text-xs text-indigo-800 font-medium leading-relaxed">
                                        <span className="font-bold">Privacy Note:</span> Your data will only be used for spiritual communication and community updates. We strictly follow the principles of Vaishnava etiquette and respect your privacy.
                                    </p>
                                </div>

                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className={`w-full rounded-[2rem] py-5 font-bold uppercase tracking-[0.2em] shadow-lg transition-all ${isSubmitting ? 'bg-slate-300' : 'bg-spiritual-blue text-white hover:bg-slate-800 hover:scale-[1.01]'}`}
                                >
                                    {isSubmitting ? 'Processing...' : 'Register as a Member'}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="bg-white rounded-[3rem] p-16 shadow-2xl border border-gold/10 text-center animate-fade-in">
                            <div className="h-20 w-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                                <span className="material-symbols-outlined text-5xl">check_circle</span>
                            </div>
                            <h2 className="text-3xl font-bold text-spiritual-blue font-serif-title mb-4">Hari Bol, {formData.name.split(' ')[0]}!</h2>
                            <p className="text-slate-600 mb-10 max-w-sm mx-auto">
                                You have successfully registered for the Brahmacharya Sangha. You will receive a confirmation message on WhatsApp shortly.
                            </p>
                            <a href="/" className="inline-block bg-saffron text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-orange-600 transition-all shadow-lg">
                                Return Home
                            </a>
                        </div>
                    )}
                </div>
            </main>

            {/* Personal Guidance Section */}
            <section className="pb-24 px-6 lg:px-20 animate-fade-in-up">
                <div className="mx-auto max-w-4xl">
                    <div className="bg-spiritual-blue rounded-[3rem] p-10 lg:p-16 text-white shadow-2xl relative overflow-hidden border-4 border-gold/10">
                        <div className="absolute top-0 right-0 h-full w-1/3 spiritual-gradient opacity-10 blur-3xl transform rotate-12"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="text-center md:text-left">
                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold mb-3 block">Personal Guidance</span>
                                <h3 className="text-3xl lg:text-4xl font-bold font-serif-title mb-4">Narasimha dasa</h3>
                                <p className="text-indigo-200 font-medium mb-8 max-w-sm leading-relaxed">
                                    Feel free to message me for any spiritual queries or community support. I am here to assist you on your journey.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-center md:justify-start gap-4 backdrop-blur-sm bg-white/5 py-3 px-6 rounded-2xl border border-white/10 w-fit mx-auto md:mx-0">
                                        <span className="material-symbols-outlined text-gold">call</span>
                                        <span className="font-bold text-lg">+91 63820 43976</span>
                                    </div>
                                    <div className="flex items-center justify-center md:justify-start gap-3 px-6">
                                        <span className="material-symbols-outlined text-gold text-sm">language</span>
                                        <a href="https://askharekrishna.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:text-gold transition-colors underline underline-offset-8 decoration-gold/30">askharekrishna.com</a>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-6">
                                <a
                                    href="https://wa.me/916382043976"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-2xl transition-all hover:scale-110 hover:shadow-emerald-500/20 overflow-hidden"
                                >
                                    <img
                                        src="/whatsapp icon.jpg"
                                        alt="WhatsApp Narasimha"
                                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                    />
                                    <div className="absolute -inset-2 rounded-full border-2 border-emerald-500/20 animate-ping"></div>
                                </a>
                                <div className="text-center">
                                    <p className="text-[10px] uppercase font-black text-gold tracking-[0.2em] mb-1">Click to Chat</p>
                                    <p className="text-[10px] uppercase font-bold text-indigo-300 tracking-[0.1em]">on WhatsApp</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
