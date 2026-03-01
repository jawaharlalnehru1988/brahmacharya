import React from 'react';
import Link from 'next/link';

const Header = () => (
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
            <nav className="hidden md:flex items-center gap-8">
                <Link className="text-sm font-semibold text-slate-700 hover:text-saffron transition-colors" href="/">Home</Link>
                <Link className="text-sm font-semibold text-slate-700 hover:text-saffron transition-colors" href="/satsang">Satsang</Link>
                <Link className="text-sm font-semibold text-slate-700 hover:text-saffron transition-colors" href="/tracker">Progress Tracker</Link>
                <Link className="text-sm font-semibold text-slate-700 hover:text-saffron transition-colors" href="/articles">Available Articles</Link>
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
            </div>
        </div>
    </header>
);

export default Header;
