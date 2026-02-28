import React from 'react';

const Hero = () => (
    <section className="relative px-6 py-12 lg:px-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[2.5rem] px-8 py-20 lg:px-16 lg:py-32 shadow-2xl border-4 border-gold/20" style={{ backgroundColor: '#1A365D' }}>
                <div
                    className="absolute inset-0 opacity-30 mix-blend-luminosity bg-cover bg-center"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA31d2mV7PDeGNN-axbXw3dRSFH9Dox8_f9WC699AkYLTjt666pRm3QRIuEqqN-gWDE4lyRKJWxLtPdjHsuk7XUpjnba6-db3Qg42F8_A26FHcoWdHKBPsd3v3BEOoHo295oqLvtIgMCU6rkGuahHxynPCpkcKEyMmnvxqvvr4_1OqPHw-Rj1xirW7mJ7JPY8JfW1W25jD_iX_flRimDtqgYWP4mNMVakZ6N3-wq7oB0OQJ-DcSJ8TnJWnGB95LoqLpW33ikANpRd_T')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-spiritual-blue via-spiritual-blue/80 to-transparent"></div>
                <div className="relative z-10 max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-saffron/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-8" style={{ backgroundColor: 'rgba(255, 153, 51, 0.2)', color: '#FF9933' }}>
                        <span className="material-symbols-outlined text-sm">temple_hindu</span>
                        Eternal Wisdom of Bhakti
                    </div>
                    <h2 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl mb-6 font-serif-title">
                        Experience the <span style={{ color: '#D4AF37' }}>Higher Taste</span>
                    </h2>
                    <p className="text-xl font-medium leading-relaxed text-slate-200 mb-10 max-w-2xl italic">
                        &quot;By experiencing a higher spiritual taste, one can easily give up the lower tastes of the material world.&quot;
                        <span className="block mt-4 not-italic font-bold" style={{ color: '#FF9933' }}>— Discover the power of &apos;Hare Krishna&apos; and Bhakti Yoga.</span>
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button className="flex h-14 items-center justify-center rounded-xl px-10 text-base font-black text-white shadow-xl shadow-saffron/30 hover:scale-[1.02] transition-transform uppercase tracking-wider" style={{ backgroundColor: '#FF9933' }}>
                            Start Nama Japa
                        </button>
                        <button className="flex h-14 items-center justify-center rounded-xl border-2 border-gold/50 bg-white/10 px-10 text-base font-bold text-white backdrop-blur-sm hover:bg-white/20 transition-colors uppercase tracking-wider">
                            Learn the Science
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default Hero;
