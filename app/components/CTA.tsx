import React from 'react';

const CTA = () => (
    <section className="px-6 py-20 lg:px-20 lg:py-24 bg-spiritual-blue text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold via-transparent to-transparent"></div>
        <div className="mx-auto max-w-4xl relative z-10">
            <h2 className="text-4xl font-bold font-serif-title mb-8">Ready to Transform Your Life?</h2>
            <p className="text-xl text-slate-300 mb-12">Join 15,000+ souls who are rediscovering their original purity through the practice of Krishna Consciousness.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-saffron hover:bg-orange-500 text-white font-black px-12 py-5 rounded-xl shadow-2xl transition-all uppercase tracking-widest text-lg">
                    Begin Your Journey
                </button>
                <button className="bg-white/10 hover:bg-white/20 border-2 border-white/20 text-white font-bold px-12 py-5 rounded-xl backdrop-blur-sm transition-all uppercase tracking-widest text-lg">
                    Daily Inspiration
                </button>
            </div>
        </div>
    </section>
);

export default CTA;
