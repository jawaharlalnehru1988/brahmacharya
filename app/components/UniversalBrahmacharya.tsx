import React from 'react';

const UniversalBrahmacharya = () => {
    return (
        <section className="relative overflow-hidden bg-background-light py-24 lg:py-32">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron/5 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-spiritual-blue/5 blur-3xl"></div>

            <div className="container relative mx-auto px-6 lg:px-20">
                <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
                    <span className="text-sm font-bold uppercase tracking-[0.4em] text-saffron mb-4">The Universal Dharma</span>
                    <h2 className="text-4xl font-bold tracking-tight text-spiritual-blue sm:text-6xl font-serif-title mb-8 max-w-4xl">
                        Brahmacharya is <span className="text-saffron italic">Consciousness</span>, Not Just Biology
                    </h2>
                    <div className="h-1.5 w-24 bg-gold rounded-full mb-10"></div>
                    <p className="max-w-3xl text-xl font-medium leading-relaxed text-slate-600">
                        A common misconception limits Brahmacharya to young students. In reality, it is the foundational behavior for every human being seeking to connect with the Divine.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Age Card */}
                    <div className="group relative rounded-[2.5rem] bg-white p-10 shadow-xl border border-gold/10 transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-gold/30">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                            <span className="material-symbols-outlined text-4xl">history_toggle_off</span>
                        </div>
                        <h4 className="text-2xl font-bold text-spiritual-blue font-serif-title mb-4">Beyond Age</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            From the curious child to the wise elder. Purity of thought and action is the catalyst for intelligence at any stage of life.
                        </p>
                    </div>

                    {/* Gender Card */}
                    <div className="group relative rounded-[2.5rem] bg-white p-10 shadow-xl border border-gold/10 transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-gold/30">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                            <span className="material-symbols-outlined text-4xl">diversity_3</span>
                        </div>
                        <h4 className="text-2xl font-bold text-spiritual-blue font-serif-title mb-4">Inclusive of All</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            The soul has no gender. Brahmacharya is the internal dignity (Śaucam) that empowers both men and women on their spiritual journey.
                        </p>
                    </div>

                    {/* Status Card */}
                    <div className="group relative rounded-[2.5rem] bg-white p-10 shadow-xl border border-gold/10 transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-gold/30">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                            <span className="material-symbols-outlined text-4xl">work</span>
                        </div>
                        <h4 className="text-2xl font-bold text-spiritual-blue font-serif-title mb-4">Beyond Labels</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Caste, community, or professional designation—none are barriers. It is a universal human quality that demands respect and practice by all.
                        </p>
                    </div>

                    {/* Consciousness Card */}
                    <div className="group relative rounded-[2.5rem] bg-white p-10 shadow-xl border border-gold/10 transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-gold/30">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                            <span className="material-symbols-outlined text-4xl">psychology_alt</span>
                        </div>
                        <h4 className="text-2xl font-bold text-spiritual-blue font-serif-title mb-4">The Real Vow</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            It is not just "celibacy," but "conducting the mind in Brahman." It is the art of seeing everyone as a soul, not an object.
                        </p>
                    </div>
                </div>

                {/* Inspirational Banner */}
                <div className="mt-20 overflow-hidden rounded-[3rem] bg-spiritual-blue text-white shadow-2xl relative">
                    <div className="absolute top-0 right-0 h-full w-1/2 spiritual-gradient opacity-10 blur-3xl transform rotate-12"></div>
                    <div className="relative p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="max-w-2xl">
                            <h3 className="text-3xl lg:text-4xl font-bold font-serif-title mb-6 leading-tight">
                                "Purity is the strength of a devotee, regardless of their position in the world."
                            </h3>
                            <p className="text-indigo-200 text-lg leading-relaxed">
                                Whether you are a householder, a student, or a professional, Brahmacharya is the foundation that keeps your consciousness steady amidst the chaos of the material world.
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-4 text-center lg:items-end lg:text-right">
                            <div className="flex -space-x-4 mb-4">
                                <div className="h-14 w-14 rounded-full border-4 border-spiritual-blue bg-slate-300 flex items-center justify-center text-spiritual-blue font-bold text-xs">A</div>
                                <div className="h-14 w-14 rounded-full border-4 border-spiritual-blue bg-gold/80 flex items-center justify-center text-spiritual-blue font-bold text-xs">M</div>
                                <div className="h-14 w-14 rounded-full border-4 border-spiritual-blue bg-saffron/80 flex items-center justify-center text-spiritual-blue font-bold text-xs">W</div>
                                <div className="h-14 w-14 rounded-full border-4 border-spiritual-blue bg-emerald-500/80 flex items-center justify-center text-white font-bold text-xs">∞</div>
                            </div>
                            <p className="text-xs font-bold uppercase tracking-widest text-gold">A Movement for Every Soul</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UniversalBrahmacharya;
