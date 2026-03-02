'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/satsang", label: "Satsang" },
        { href: "/tracker", label: "Progress Tracker" },
        { href: "/articles", label: "Available Articles" },
    ];

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-gold/20 bg-deep-cream/90 backdrop-blur-md px-6 lg:px-20 py-4">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold/30 overflow-hidden shadow-md">
                            <img src="/lord_krishna.jpeg" alt="Krishna" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-spiritual-blue font-serif-title" style={{ color: '#1A365D' }}>Krishna Conscious</h1>
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold leading-none" style={{ color: '#FF9933' }}>Brahmacharya</p>
                        </div>
                    </div>

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
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/join-sangha"
                            className="hidden sm:flex h-10 items-center justify-center rounded-full px-6 text-sm font-bold text-white shadow-lg shadow-blue-900/20 hover:bg-slate-800 transition-all no-underline"
                            style={{ backgroundColor: '#1A365D' }}
                        >
                            Join Sangha
                        </Link>
                        <div
                            className="h-10 w-10 rounded-full border-2 border-gold/30 bg-cover bg-center overflow-hidden"
                            style={{ backgroundImage: "url('/srila_prabhupada.png')" }}
                        ></div>

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
            ></div>

            {/* Mobile Sidebar */}
            <aside
                className={`fixed top-0 right-0 z-[70] h-full w-72 bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col h-full bg-deep-cream/30">
                    <div className="flex items-center justify-between p-6 border-b border-gold/10 bg-white">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold text-spiritual-blue font-serif-title">Menu</h2>
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

                    <div className="p-6 border-t border-gold/10 bg-white">
                        <Link
                            href="/join-sangha"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex w-full h-12 items-center justify-center rounded-full text-sm font-bold text-white shadow-lg shadow-blue-900/10 hover:opacity-90 transition-all no-underline"
                            style={{ backgroundColor: '#1A365D' }}
                        >
                            Join Sangha
                        </Link>
                        <p className="mt-4 text-[10px] text-center text-slate-400 uppercase tracking-widest font-bold">
                            Powered by Spiritual Guidance
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Header;
