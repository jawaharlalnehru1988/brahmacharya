import React from 'react';
import Link from 'next/link';

const Header = () => (
    <header className="sticky top-0 z-50 w-full border-b border-gold/20 bg-deep-cream/90 backdrop-blur-md px-6 lg:px-20 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full spiritual-gradient text-white shadow-md">
                    <span className="material-symbols-outlined text-2xl">auto_awesome</span>
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
                <Link className="text-sm font-semibold text-slate-700 hover:text-saffron transition-colors" href="/admin/post">Admin</Link>
                <Link className="text-sm font-semibold text-slate-700 hover:text-saffron transition-colors" href="/articles">Available Articles</Link>

            </nav>
            <div className="flex items-center gap-4">
                <button className="hidden sm:flex h-10 items-center justify-center rounded-full px-6 text-sm font-bold text-white shadow-lg shadow-blue-900/20 hover:bg-slate-800 transition-all" style={{ backgroundColor: '#1A365D' }}>
                    Join Sangha
                </button>
                <div
                    className="h-10 w-10 rounded-full border-2 border-gold/30 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDYtvy6iUgF1YbPOxuS5jcflXc-aZxjlRv7MRFCRkv8p7IaSHbyika-U9oJ9i--fAb8mhv7QFslNJTlqbUksjzrgh_vwJv5EjMeKJEYd2EANtePsRZnm-T6fRfTb42u27d-2RdWXDzTUampYUXCiOf7FXb4T6Uy1JU-wxprMqUAmlbgDYnBEAgt2hZniL6-8tq-9iLTwQbIhUAT31emUtMM4P6-qmEoRO68-fc6xNk1MwW0JUNzZxxnJHLTw2kHkUcpOzAFQFYrBzc')" }}
                ></div>
            </div>
        </div>
    </header>
);

export default Header;
