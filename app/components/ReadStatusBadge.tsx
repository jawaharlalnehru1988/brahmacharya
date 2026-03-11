'use client';

import React, { useState, useEffect } from 'react';

export default function ReadStatusBadge({ slug }: { slug: string }) {
    const [isRead, setIsRead] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const checkStatus = () => {
            const readArticles = JSON.parse(localStorage.getItem('read_articles') || '[]');
            setIsRead(readArticles.includes(slug));
        };

        checkStatus();

        // Listen for changes from other components (like MarkAsRead button)
        window.addEventListener('articleStatusChanged', checkStatus);
        return () => window.removeEventListener('articleStatusChanged', checkStatus);
    }, [slug]);

    if (!isMounted || !isRead) return null;

    return (
        <div className="absolute top-6 right-6 z-20 animate-in fade-in zoom-in duration-500">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-white rounded-full shadow-lg shadow-emerald-500/20 ring-4 ring-white">
                <span className="material-symbols-outlined text-sm font-bold">done_all</span>
                <span className="text-[9px] font-black uppercase tracking-tighter">Read</span>
            </div>
        </div>
    );
}
