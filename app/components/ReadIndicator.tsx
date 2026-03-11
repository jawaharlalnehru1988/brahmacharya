'use client';

import React, { useState, useEffect } from 'react';

export default function ReadIndicator({ slug }: { slug: string }) {
    const [isRead, setIsRead] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const checkStatus = () => {
            const readArticles = JSON.parse(localStorage.getItem('read_articles') || '[]');
            setIsRead(readArticles.includes(slug));
        };

        checkStatus();
        window.addEventListener('articleStatusChanged', checkStatus);
        return () => window.removeEventListener('articleStatusChanged', checkStatus);
    }, [slug]);

    if (!isMounted) {
        return <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-current opacity-40"></span>;
    }

    return (
        <div className="flex shrink-0 items-center justify-center">
            {isRead ? (
                <div className="h-6 w-6 rounded-md bg-emerald-500 flex items-center justify-center text-white scale-110 shadow-sm shadow-emerald-500/20 animate-in zoom-in duration-300">
                    <span className="material-symbols-outlined text-sm font-black">done</span>
                </div>
            ) : (
                <div className="h-6 w-6 rounded-md border-2 border-slate-200 flex items-center justify-center bg-white group-hover:border-current transition-colors">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-200 group-hover:bg-current opacity-40 transition-all"></span>
                </div>
            )}
        </div>
    );
}
