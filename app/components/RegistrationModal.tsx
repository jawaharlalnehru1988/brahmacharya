'use client';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { translations, Language } from '../lib/translations';

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (userData: UserData) => void;
    lang?: Language;
    scoreContext?: { score: number; total: number; articleTitle: string };
}

export interface UserData {
    full_name: string;
    email: string;
    phoneNumber: string;
    whatsappNumber: string;
}

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function RegistrationModal({
    isOpen,
    onClose,
    onSuccess,
    lang = 'en',
    scoreContext,
}: RegistrationModalProps) {
    const t = translations[lang] || translations.en;
    const modalRef = useRef<HTMLDivElement>(null);

    const [formState, setFormState] = useState<FormState>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [form, setForm] = useState<UserData>({
        full_name: '',
        email: '',
        phoneNumber: '',
        whatsappNumber: '',
    });

    // Trap focus inside modal + close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setErrorMsg('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.full_name.trim() || !form.email.trim()) {
            setErrorMsg('Name and email are required.');
            return;
        }
        setFormState('submitting');
        try {
            await axios.post(
                'https://api.askharekrishna.com/api/v1/brahmhacarya/registration/',
                form
            );
            // Store user in localStorage so we don't ask again
            localStorage.setItem('brahmacharya_user', JSON.stringify({ ...form, registered_at: new Date().toISOString() }));

            // Also save the quiz score to the backend if scoreContext is provided
            if (scoreContext && form.full_name && form.phoneNumber) {
                try {
                    await axios.post(
                        'https://api.askharekrishna.com/api/v1/brahmhacarya/score/',
                        {
                            userName: form.full_name,
                            phoneNumber: form.phoneNumber,
                            articleTitle: scoreContext.articleTitle,
                            score: scoreContext.score,
                            totalQuestions: scoreContext.total,
                        }
                    );
                } catch (scoreErr) {
                    // Non-fatal: score save failure should not block registration success
                    console.warn('Score save failed (non-fatal):', scoreErr);
                }
            }

            setFormState('success');
            setTimeout(() => {
                onSuccess(form);
            }, 2200);
        } catch (err: any) {
            console.error('Registration error:', err);
            setErrorMsg(t.reg_error);
            setFormState('error');
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reg-modal-title"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-spiritual-blue/80 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div
                ref={modalRef}
                className="relative z-10 w-full max-w-lg rounded-[2.5rem] bg-white/95 shadow-2xl shadow-spiritual-blue/30 border border-gold/20 overflow-hidden animate-in zoom-in-95 fade-in duration-300"
            >
                {/* Gold top bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-saffron via-gold to-saffron" />

                <div className="p-8 lg:p-10">
                    {formState === 'success' ? (
                        /* ── SUCCESS STATE ── */
                        <div className="text-center py-6 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-400 flex items-center justify-center mx-auto mb-6 animate-bounce">
                                <span className="material-symbols-outlined text-4xl text-emerald-500">verified</span>
                            </div>
                            <h2 className="text-2xl font-bold font-serif-title text-spiritual-blue mb-3">
                                {t.reg_success_title}
                            </h2>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                {t.reg_success_desc}
                            </p>
                            {scoreContext && (
                                <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gold/10 rounded-2xl text-gold font-bold text-sm">
                                    <span className="material-symbols-outlined text-base">stars</span>
                                    Score saved: {scoreContext.score} / {scoreContext.total}
                                </div>
                            )}
                        </div>
                    ) : (
                        /* ── FORM STATE ── */
                        <>
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-saffron/10 flex items-center justify-center mx-auto mb-4">
                                    <span className="material-symbols-outlined text-3xl text-saffron">diversity_3</span>
                                </div>
                                <h2 id="reg-modal-title" className="text-2xl font-bold font-serif-title text-spiritual-blue mb-2">
                                    {t.reg_title}
                                </h2>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {t.reg_subtitle}
                                </p>
                                {scoreContext && (
                                    <div className="mt-4 inline-flex items-center gap-2 px-5 py-2 bg-gold/10 rounded-full text-gold font-bold text-xs uppercase tracking-widest">
                                        <span className="material-symbols-outlined text-sm">emoji_events</span>
                                        You scored {scoreContext.score} / {scoreContext.total} on this article
                                    </div>
                                )}
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                                {/* Full Name */}
                                <div className="space-y-1.5">
                                    <label htmlFor="reg-full-name" className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                        {t.reg_full_name} <span className="text-saffron">*</span>
                                    </label>
                                    <input
                                        id="reg-full-name"
                                        type="text"
                                        name="full_name"
                                        required
                                        placeholder={t.reg_full_name_placeholder}
                                        value={form.full_name}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3.5 rounded-2xl border-2 border-gold/20 bg-deep-cream/50 text-spiritual-blue placeholder-slate-300 text-sm font-medium focus:outline-none focus:border-saffron focus:bg-white transition-all"
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-1.5">
                                    <label htmlFor="reg-email" className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                        {t.reg_email} <span className="text-saffron">*</span>
                                    </label>
                                    <input
                                        id="reg-email"
                                        type="email"
                                        name="email"
                                        required
                                        placeholder={t.reg_email_placeholder}
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3.5 rounded-2xl border-2 border-gold/20 bg-deep-cream/50 text-spiritual-blue placeholder-slate-300 text-sm font-medium focus:outline-none focus:border-saffron focus:bg-white transition-all"
                                    />
                                </div>

                                {/* Phone + WhatsApp (side by side on md+) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label htmlFor="reg-phone" className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                            {t.reg_phone}
                                        </label>
                                        <input
                                            id="reg-phone"
                                            type="tel"
                                            name="phoneNumber"
                                            placeholder={t.reg_phone_placeholder}
                                            value={form.phoneNumber}
                                            onChange={handleChange}
                                            className="w-full px-5 py-3.5 rounded-2xl border-2 border-gold/20 bg-deep-cream/50 text-spiritual-blue placeholder-slate-300 text-sm font-medium focus:outline-none focus:border-saffron focus:bg-white transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label htmlFor="reg-whatsapp" className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                            {t.reg_whatsapp}
                                        </label>
                                        <input
                                            id="reg-whatsapp"
                                            type="tel"
                                            name="whatsappNumber"
                                            placeholder={t.reg_whatsapp_placeholder}
                                            value={form.whatsappNumber}
                                            onChange={handleChange}
                                            className="w-full px-5 py-3.5 rounded-2xl border-2 border-gold/20 bg-deep-cream/50 text-spiritual-blue placeholder-slate-300 text-sm font-medium focus:outline-none focus:border-saffron focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Error */}
                                {(formState === 'error' || errorMsg) && (
                                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm animate-in fade-in duration-300">
                                        <span className="material-symbols-outlined text-base">error</span>
                                        {errorMsg || t.reg_error}
                                    </div>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    id="reg-submit-btn"
                                    disabled={formState === 'submitting'}
                                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-saffron to-gold text-white font-bold text-sm uppercase tracking-widest shadow-lg shadow-saffron/20 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                >
                                    {formState === 'submitting' ? (
                                        <>
                                            <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                            {t.reg_submitting}
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-base">how_to_reg</span>
                                            {t.reg_submit}
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Close link */}
                            <button
                                id="reg-close-btn"
                                onClick={onClose}
                                className="w-full mt-4 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors py-2"
                            >
                                {t.reg_close}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
