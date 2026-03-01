import React from 'react';

const Footer = () => (
    <footer className="border-t border-gold/10 bg-deep-cream px-6 py-16 lg:px-20">
        <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                <div className="col-span-1 lg:col-span-1">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 overflow-hidden shadow-sm">
                            <img src="/lord_krishna.jpeg" alt="Krishna" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xl font-bold text-spiritual-blue font-serif-title uppercase tracking-wider">Brahmacharya</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed italic">
                        &quot;The soul is by nature full of knowledge and bliss. Our goal is to simply remove the covers.&quot;
                    </p>
                    <div className="mt-8 flex gap-4">
                        <a className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all" href="#">
                            <span className="material-symbols-outlined">share</span>
                        </a>
                        <a className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all" href="#">
                            <span className="material-symbols-outlined">play_circle</span>
                        </a>
                        <a className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-all" href="#">
                            <span className="material-symbols-outlined">public</span>
                        </a>
                    </div>
                </div>
                <div>
                    <h6 className="font-bold text-spiritual-blue mb-8 uppercase tracking-widest text-xs">Pathways</h6>
                    <ul className="space-y-4 text-sm text-slate-600 font-medium">
                        <li><a className="hover:text-saffron transition-colors" href="#">Maha-Mantra Japa</a></li>
                        <li><a className="hover:text-saffron transition-colors" href="#">Prasadam Recipes</a></li>
                        <li><a className="hover:text-saffron transition-colors" href="#">Srimad Bhagavatam</a></li>
                        <li><a className="hover:text-saffron transition-colors" href="#">Daily Sadhana</a></li>
                    </ul>
                </div>
                <div>
                    <h6 className="font-bold text-spiritual-blue mb-8 uppercase tracking-widest text-xs">Community</h6>
                    <ul className="space-y-4 text-sm text-slate-600 font-medium">
                        <li><a className="hover:text-saffron transition-colors" href="#">Find a Temple</a></li>
                        <li><a className="hover:text-saffron transition-colors" href="#">Online Satsang</a></li>
                        <li><a className="hover:text-saffron transition-colors" href="#">Bhakti Vriksha</a></li>
                        <li><a className="hover:text-saffron transition-colors" href="#">Youth Groups</a></li>
                    </ul>
                </div>
                <div>
                    <h6 className="font-bold text-spiritual-blue mb-8 uppercase tracking-widest text-xs">Wisdom Newsletter</h6>
                    <p className="text-sm text-slate-600 mb-6">Receive a daily drop of transcendental nectar in your inbox.</p>
                    <form className="flex flex-col gap-3">
                        <input
                            className="w-full rounded-xl border-gold/20 bg-white px-5 py-3 text-sm focus:border-saffron focus:ring-saffron placeholder-slate-400"
                            placeholder="Your email address"
                            type="email"
                        />
                        <button className="rounded-xl bg-spiritual-blue px-6 py-3 text-white font-bold hover:bg-slate-800 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2" type="submit">
                            Subscribe <span className="material-symbols-outlined text-sm">mail</span>
                        </button>
                    </form>
                </div>
            </div>
            <div className="mt-16 pt-8 border-t border-gold/10 flex flex-col sm:flex-row justify-between items-center gap-6">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">© 2024 Krishna Conscious Brahmacharya. All Glories to Srila Prabhupada and Lord Krishna.</p>
                <div className="flex gap-8">
                    <a className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-saffron" href="#">Privacy Policy</a>
                    <a className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-saffron" href="#">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
