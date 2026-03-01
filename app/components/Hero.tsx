import React from 'react';

const Hero = () => (
    <section className="relative px-6 py-12 lg:px-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[2.5rem] px-8 py-20 lg:px-16 lg:py-24 shadow-2xl border-4 border-gold/20" style={{ backgroundColor: '#1A365D' }}>
                {/* Authority Background Layer */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20 group">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-saffron/20 to-transparent"></div>
                </div>

                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Content Left */}
                    <div className="flex-1 text-left lg:pr-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-saffron/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-8" style={{ backgroundColor: 'rgba(255, 153, 51, 0.2)', color: '#FF9933' }}>
                            <span className="material-symbols-outlined text-sm">temple_hindu</span>
                            Eternal Wisdom of Bhakti
                        </div>
                        <h2 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl mb-6 font-serif-title">
                            Experience the <span style={{ color: '#D4AF37' }}>Higher Taste</span>
                        </h2>
                        <p className="text-xl font-medium leading-relaxed text-slate-200 mb-10 max-w-2xl italic">
                            &quot;By experiencing a higher spiritual taste, one can easily give up the lower tastes of the material world.&quot;
                            <span className="block mt-4 not-italic font-bold" style={{ color: '#FF9933' }}>
                                Inspired By His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada. <br />
                                <span className="text-sm opacity-80 uppercase tracking-widest">— Dedicated to all sincere followers of him.</span>
                            </span>
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

                    {/* Authority Images Right */}
                    <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
                        <div className="relative aspect-[4/5] lg:aspect-square flex items-center justify-center">
                            {/* Decorative Glows */}
                            <div className="absolute inset-0 bg-gold/10 blur-[100px] rounded-full animate-pulse"></div>
                            <div className="absolute top-1/4 right-1/4 h-32 w-32 bg-saffron/20 blur-3xl rounded-full"></div>

                            {/* Lord Krishna Image - Larger, positioned behind/center */}
                            <div className="relative z-20 w-4/5 h-4/5 transform rotate-3 hover:rotate-0 transition-transform duration-700">
                                <div className="absolute inset-0 rounded-[3rem] border-4 border-gold/30 rotate-2 -z-10 bg-spiritual-blue/20 backdrop-blur-sm"></div>
                                <img
                                    src="/lord_krishna.jpeg"
                                    alt="Lord Krishna"
                                    className="w-full h-full object-cover rounded-[3rem] shadow-2xl border-4 border-white grayscale-[20%] hover:grayscale-0 transition-all"
                                />
                                <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-spiritual-blue font-bold text-[10px] uppercase tracking-widest shadow-lg border border-gold/20">
                                    The Supreme Authority
                                </div>
                            </div>

                            {/* Srila Prabhupada Image - Smaller, positioned in front/bottom left */}
                            <div className="absolute -bottom-10 -left-6 z-30 w-1/2 lg:w-[45%] aspect-square transform -rotate-6 hover:rotate-0 transition-all duration-700 group-hover:scale-105">
                                <div className="absolute inset-0 rounded-full border-4 border-saffron/30 -rotate-2 -z-10 bg-white/10 backdrop-blur-sm"></div>
                                <img
                                    src="/srila_prabhupada.png"
                                    alt="Srila Prabhupada"
                                    className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white pointer-events-none"
                                />
                                <div className="absolute -bottom-2 right-0 bg-saffron text-white px-4 py-1.5 rounded-full font-bold text-[9px] uppercase tracking-widest shadow-lg">
                                    World Teacher
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default Hero;
