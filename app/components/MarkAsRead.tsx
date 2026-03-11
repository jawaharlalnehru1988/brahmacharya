'use client';

import React, { useState, useEffect } from 'react';

interface MarkAsReadProps {
    slug: string;
    title: string;
}

export default function MarkAsRead({ slug, title }: MarkAsReadProps) {
    const [isRead, setIsRead] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const readArticles = JSON.parse(localStorage.getItem('read_articles') || '[]');
        setIsRead(readArticles.includes(slug));
    }, [slug]);

    const toggleReadStatus = () => {
        const readArticles = JSON.parse(localStorage.getItem('read_articles') || '[]');
        let updated;

        if (isRead) {
            updated = readArticles.filter((s: string) => s !== slug);
        } else {
            updated = [...readArticles, slug];
        }

        localStorage.setItem('read_articles', JSON.stringify(updated));
        setIsRead(!isRead);

        // Notify other components if needed
        window.dispatchEvent(new Event('articleStatusChanged'));
    };

    if (!isMounted) return null;

    return (
        <div className="mt-16 p-8 lg:p-12 rounded-[2rem] bg-gradient-to-br from-white to-gold/5 border border-gold/20 shadow-xl shadow-gold/5 text-center relative overflow-hidden group">
            {/* Background Decorative Pattern */}
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                <span className="material-symbols-outlined text-8xl text-gold">verified</span>
            </div>

            <div className="relative z-10">
                <h3 className="text-xl font-serif-title text-spiritual-blue mb-4">
                    Finished absorbing this wisdom?
                </h3>
                <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto">
                    Marking this article as read helps you track your journey through the Brahmacharya roadmap.
                </p>

                <div className="flex flex-col items-center gap-4">
                    <label className="relative flex items-center cursor-pointer group/check">
                        <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={isRead}
                            onChange={toggleReadStatus}
                        />
                        <div className="w-10 h-10 rounded-full border-2 border-gold/30 flex items-center justify-center transition-all duration-300 peer-checked:bg-gold peer-checked:border-gold group-hover/check:border-gold group-hover/check:scale-110">
                            {isRead ? (
                                <span className="material-symbols-outlined text-white text-2xl font-bold animate-in zoom-in duration-300">done</span>
                            ) : (
                                <span className="material-symbols-outlined text-gold/30 text-xl group-hover/check:text-gold/60 transition-colors">check_circle</span>
                            )}
                        </div>
                        <span className={`ml-4 text-sm font-bold uppercase tracking-widest transition-colors ${isRead ? 'text-gold' : 'text-slate-400 group-hover/check:text-slate-600'}`}>
                            {isRead ? 'Topic Mastered' : 'Mark as Read'}
                        </span>
                    </label>

                    {isRead && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mt-2 flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">stars</span>
                            Wisdom preserved in your heart
                        </div>
                    )}
                </div>
            </div>

            {/* Progress indicator link (Optional visual hint) */}
            <div className={`absolute bottom-0 left-0 h-1 bg-gold transition-all duration-1000 ease-out ${isRead ? 'w-full' : 'w-0'}`}></div>
        </div>
    );
}
