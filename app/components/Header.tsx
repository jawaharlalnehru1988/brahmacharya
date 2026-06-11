'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { translations, Language, LANGUAGE_NAMES } from '../lib/translations';

// ─── User Avatar with Dropdown ────────────────────────────────────────────────

interface StoredUser {
    full_name: string;
    email: string;
    phoneNumber?: string;
    whatsappNumber?: string;
    registered_at?: string;
}

function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function UserAvatar({ lang }: { lang: Language }) {
    const [user, setUser] = useState<StoredUser | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const raw = localStorage.getItem('brahmacharya_user');
        if (raw) {
            try { setUser(JSON.parse(raw)); } catch {}
        }
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('brahmacharya_user');
        localStorage.removeItem('quiz_scores');
        setUser(null);
        setDropdownOpen(false);
        window.location.reload();
    };

    if (!user) {
        // Not logged in — show Prabhupada avatar placeholder
        return (
            <div
                className="h-10 w-10 rounded-full border-2 border-gold/30 bg-cover bg-center overflow-hidden flex-shrink-0"
                style={{ backgroundImage: "url('/srila_prabhupada.png')" }}
            />
        );
    }

    const initials = getInitials(user.full_name);

    return (
        <div className="relative flex-shrink-0" ref={dropdownRef}>
            {/* Avatar Button */}
            <button
                id="user-avatar-btn"
                onClick={() => setDropdownOpen(prev => !prev)}
                className="relative h-10 w-10 rounded-full border-2 border-gold flex items-center justify-center font-black text-sm text-white shadow-lg shadow-gold/20 hover:scale-105 transition-all focus:outline-none"
                style={{ background: 'linear-gradient(135deg, #FF9933, #D4AF37)' }}
                aria-label="User menu"
                aria-expanded={dropdownOpen}
            >
                {initials}
                {/* Online dot */}
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-white" />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
                <div
                    className="absolute right-0 top-[calc(100%+10px)] z-[200] w-64 rounded-[1.5rem] bg-white border border-gold/20 shadow-2xl shadow-spiritual-blue/20 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                >
                    {/* Header strip */}
                    <div className="h-1 w-full bg-gradient-to-r from-saffron to-gold" />

                    {/* User Info */}
                    <div className="px-5 py-4 flex items-center gap-3 border-b border-gold/10">
                        <div
                            className="h-11 w-11 rounded-full flex items-center justify-center font-black text-base text-white flex-shrink-0 shadow-md"
                            style={{ background: 'linear-gradient(135deg, #FF9933, #D4AF37)' }}
                        >
                            {initials}
                        </div>
                        <div className="min-w-0">
                            <p className="font-bold text-spiritual-blue text-sm truncate">{user.full_name}</p>
                            <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2 px-2">
                        <Link
                            href={`/tracker?lang=${lang}`}
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-saffron/8 hover:text-saffron transition-all"
                        >
                            <span className="material-symbols-outlined text-base text-saffron">emoji_events</span>
                            My Progress
                        </Link>
                        <Link
                            href={`/join-sangha?lang=${lang}`}
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-saffron/8 hover:text-saffron transition-all"
                        >
                            <span className="material-symbols-outlined text-base text-saffron">diversity_3</span>
                            Sangha Profile
                        </Link>
                    </div>

                    {/* Logout */}
                    <div className="px-2 pb-3 border-t border-red-50 pt-2 mt-1">
                        <button
                            id="logout-btn"
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
                        >
                            <span className="material-symbols-outlined text-base">logout</span>
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Mobile User Section ──────────────────────────────────────────────────────

function MobileUserSection({ lang, onClose }: { lang: Language; onClose: () => void }) {
    const [user, setUser] = useState<StoredUser | null>(null);

    useEffect(() => {
        const raw = localStorage.getItem('brahmacharya_user');
        if (raw) {
            try { setUser(JSON.parse(raw)); } catch {}
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('brahmacharya_user');
        localStorage.removeItem('quiz_scores');
        setUser(null);
        onClose();
        window.location.reload();
    };

    if (!user) return null;

    const initials = getInitials(user.full_name);

    return (
        <div className="mx-4 mb-3 rounded-2xl bg-gradient-to-br from-saffron/5 to-gold/5 border border-gold/15 p-4">
            <div className="flex items-center gap-3 mb-3">
                <div
                    className="h-10 w-10 rounded-full flex items-center justify-center font-black text-sm text-white flex-shrink-0 shadow-md"
                    style={{ background: 'linear-gradient(135deg, #FF9933, #D4AF37)' }}
                >
                    {initials}
                </div>
                <div className="min-w-0">
                    <p className="font-bold text-spiritual-blue text-sm truncate">{user.full_name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                </div>
            </div>
            <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold uppercase tracking-widest text-red-500 bg-red-50 hover:bg-red-100 transition-all"
            >
                <span className="material-symbols-outlined text-sm">logout</span>
                Logout
            </button>
        </div>
    );
}

// ─── Header ───────────────────────────────────────────────────────────────────

const HeaderContent = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentLang = (searchParams.get('lang') || 'en') as Language;
    const t = translations[currentLang] || translations.en;

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const setLanguage = (lang: string) => {
        if (pathname.startsWith('/articles/')) {
            router.push(`/?lang=${lang}`);
            return;
        }
        const params = new URLSearchParams(searchParams.toString());
        params.set('lang', lang);
        router.push(`${pathname}?${params.toString()}`);
    };

    const navLinks = [
        { href: `/?lang=${currentLang}`, label: t.nav_home },
        { href: `/satsang?lang=${currentLang}`, label: t.nav_satsang },
        { href: `/tracker?lang=${currentLang}`, label: t.nav_tracker },
    ];

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-gold/20 bg-deep-cream/90 backdrop-blur-md px-6 lg:px-20 py-4">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <Link href={`/?lang=${currentLang}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold/30 overflow-hidden shadow-md">
                            <img src="/lord_krishna.jpeg" alt="Krishna" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-spiritual-blue font-serif-title" style={{ color: '#1A365D' }}>{t.logo_title}</h1>
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold leading-none" style={{ color: '#FF9933' }}>{t.logo_subtitle}</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                className="text-sm font-semibold text-slate-700 hover:text-saffron transition-colors"
                                href={link.href}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Language Switcher Desktop */}
                        <div className="flex items-center gap-2 border-l border-gold/20 pl-6 ml-2">
                            <select
                                value={currentLang}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="bg-transparent text-xs font-bold text-slate-600 focus:outline-none focus:ring-0 cursor-pointer appearance-none px-2 py-1"
                                style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                            >
                                <option value="en">{LANGUAGE_NAMES['en']}</option>
                                <option value="ta">{LANGUAGE_NAMES['ta']}</option>
                                <option value="hi">{LANGUAGE_NAMES['hi']}</option>
                                {Object.entries(LANGUAGE_NAMES)
                                    .filter(([key]) => !['en', 'ta', 'hi'].includes(key))
                                    .map(([key, name]) => (
                                        <option key={key} value={key}>{name}</option>
                                    ))}
                            </select>
                            <span className="material-symbols-outlined text-sm text-slate-400 pointer-events-none -ml-1">expand_more</span>
                        </div>
                    </nav>

                    <div className="flex items-center gap-3">
                        {/* Join Sangha button — desktop only, hidden when user is logged in (avatar takes its place) */}
                        <Link
                            href={`/join-sangha?lang=${currentLang}`}
                            className="hidden sm:flex h-10 items-center justify-center rounded-full px-6 text-sm font-bold text-white shadow-lg shadow-blue-900/20 hover:bg-slate-800 transition-all no-underline"
                            style={{ backgroundColor: '#1A365D' }}
                        >
                            {t.btn_join_sangha}
                        </Link>

                        {/* User Avatar (shows initials if registered, Prabhupada avatar if not) */}
                        <UserAvatar lang={currentLang} />

                        {/* Mobile Language Switcher */}
                        <div className="flex md:hidden items-center gap-1 border border-gold/20 rounded-lg px-2 h-10 bg-white/50 relative">
                            <select
                                value={currentLang}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="bg-transparent text-xs font-bold text-spiritual-blue focus:outline-none focus:ring-0 cursor-pointer appearance-none pl-1 pr-4 w-full h-full"
                                style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                            >
                                <option value="en">{LANGUAGE_NAMES['en']}</option>
                                <option value="ta">{LANGUAGE_NAMES['ta']}</option>
                                <option value="hi">{LANGUAGE_NAMES['hi']}</option>
                                {Object.entries(LANGUAGE_NAMES)
                                    .filter(([key]) => !['en', 'ta', 'hi'].includes(key))
                                    .map(([key, name]) => (
                                        <option key={key} value={key}>{name}</option>
                                    ))}
                            </select>
                            <span className="material-symbols-outlined text-[16px] text-spiritual-blue pointer-events-none absolute right-1">expand_more</span>
                        </div>

                        {/* Mobile Hamburger Button */}
                        <button
                            onClick={toggleMenu}
                            className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-gold/20 text-spiritual-blue hover:bg-gold/10 transition-colors"
                            aria-label="Toggle Menu"
                        >
                            <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar Overlay */}
            <div
                className={`fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleMenu}
            />

            {/* Mobile Sidebar */}
            <aside
                className={`fixed top-0 right-0 z-[70] h-full w-72 bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col h-full bg-deep-cream/30">
                    <div className="flex items-center justify-between p-6 border-b border-gold/10 bg-white">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold text-spiritual-blue font-serif-title">{t.menu_title}</h2>
                        </div>
                        <button
                            onClick={toggleMenu}
                            className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
                        >
                            <span className="material-symbols-outlined text-slate-500">close</span>
                        </button>
                    </div>

                    <nav className="flex-1 flex flex-col p-6 gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-700 font-bold hover:bg-saffron/10 hover:text-saffron transition-all group"
                            >
                                <span className="text-sm uppercase tracking-widest">{link.label}</span>
                                <span className="material-symbols-outlined ml-auto text-sm opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile User Section */}
                    <MobileUserSection lang={currentLang} onClose={() => setIsMenuOpen(false)} />

                    <div className="p-6 border-t border-gold/10 bg-white">
                        <Link
                            href={`/join-sangha?lang=${currentLang}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex w-full h-12 items-center justify-center rounded-full text-sm font-bold text-white shadow-lg shadow-blue-900/20 hover:opacity-90 transition-all no-underline"
                            style={{ backgroundColor: '#1A365D' }}
                        >
                            {t.btn_join_sangha}
                        </Link>
                        <p className="mt-4 text-[10px] text-center text-slate-400 uppercase tracking-widest font-bold">
                            {t.brand_authority}
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
};

const Header = () => {
    return (
        <React.Suspense fallback={<div className="h-20 bg-deep-cream/90 animate-pulse" />}>
            <HeaderContent />
        </React.Suspense>
    );
};

export default Header;
