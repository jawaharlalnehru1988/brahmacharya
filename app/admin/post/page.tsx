'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AdminPostPage() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('ROADMAP');
    const [order, setOrder] = useState(0);
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);
    const [audioFile, setAudioFile] = useState<File | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handlePost = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setResponse(null);

        // Using FormData for File Uploads
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        formData.append('order', order.toString());
        formData.append('excerpt', excerpt);

        if (featuredImage) formData.append('featured_image', featuredImage);
        if (audioFile) formData.append('audioUrl', audioFile);

        try {
            const res = await axios.post('https://api.askharekrishna.com/api/v1/brahmhacarya/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            setResponse({
                status: res.status,
                message: "Article successfully synchronized with the Holy Database.",
                data: res.data
            });
            // Reset form on success
            setTitle('');
            setContent('');
            setExcerpt('');
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                setError(JSON.stringify(err.response?.data || err.message, null, 2));
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-deep-cream/30">
            <Header />
            <main className="flex-1 py-16 px-6 lg:px-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold font-serif-title text-spiritual-blue tracking-tight">Post New Article <span className="text-gold">(Digital Scribe)</span></h1>
                        <p className="mt-4 text-slate-500 font-medium">Push transcendental content directly to: <code className="text-saffron">api.askharekrishna.com</code></p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* INPUT SIDE */}
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gold/10">
                            <form className="space-y-6" onSubmit={handlePost}>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Article Title (Mandatory)</label>
                                    <input required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-2xl border-slate-100 bg-slate-50 px-6 py-4 text-sm focus:border-saffron focus:ring-saffron" placeholder="e.g., Meaning of Brahmacharya" />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Category</label>
                                        <input value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-2xl border-slate-100 bg-slate-50 px-6 py-4 text-sm focus:border-saffron focus:ring-saffron" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Order</label>
                                        <input
                                            type="number"
                                            value={isNaN(order) ? '' : order}
                                            onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                                            className="w-full rounded-2xl border-slate-100 bg-slate-50 px-6 py-4 text-sm focus:border-saffron focus:ring-saffron"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Excerpt / Teaser</label>
                                    <input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="w-full rounded-2xl border-slate-100 bg-slate-50 px-6 py-4 text-sm focus:border-saffron focus:ring-saffron" placeholder="Short teaser for the roadmap cards..." />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Featured Image</label>
                                        <input type="file" onChange={(e) => setFeaturedImage(e.target.files?.[0] || null)} className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-gold/10 file:text-gold hover:file:bg-gold/20" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Audio Lecture</label>
                                        <input type="file" onChange={(e) => setAudioFile(e.target.files?.[0] || null)} className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-saffron/10 file:text-saffron hover:file:bg-saffron/20" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Content (Markdown - Mandatory)</label>
                                    <textarea required rows={8} value={content} onChange={(e) => setContent(e.target.value)} className="w-full rounded-2xl border-slate-100 bg-slate-50 px-6 py-4 text-sm font-mono leading-relaxed focus:border-saffron focus:ring-saffron" placeholder="# Start writing..." />
                                </div>

                                <button type="submit" disabled={isLoading} className={`w-full rounded-[2rem] py-5 font-bold uppercase tracking-[0.2em] shadow-lg transition-all ${isLoading ? 'bg-slate-300' : 'bg-spiritual-blue text-white hover:bg-slate-800 hover:scale-[1.02]'}`}>
                                    {isLoading ? 'Sending to Krishna Conscious API...' : 'Post Article to Live Backend'}
                                </button>
                            </form>
                        </div>

                        {/* RESPONSE SIDE */}
                        <div className="space-y-10">
                            <div className="bg-indigo-950 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden h-fit">
                                <h3 className="text-xl font-bold font-serif-title mb-6 flex items-center gap-3"><span className="material-symbols-outlined text-gold">sync_alt</span> Server Response</h3>

                                {response && (
                                    <div className="animate-fade-in">
                                        <div className="flex items-center gap-3 text-emerald-400 font-bold mb-4">
                                            <span className="material-symbols-outlined">check_circle</span> Success Code: {response.status}
                                        </div>
                                        <pre className="text-xs font-mono bg-indigo-900/50 p-6 rounded-2xl text-emerald-300 border border-emerald-500/20 overflow-auto max-h-[400px]">
                                            {JSON.stringify(response.data, null, 2)}
                                        </pre>
                                    </div>
                                )}

                                {error && (
                                    <div className="animate-fade-in">
                                        <div className="flex items-center gap-3 text-red-400 font-bold mb-4">
                                            <span className="material-symbols-outlined">error</span> Error Details:
                                        </div>
                                        <pre className="text-xs font-mono bg-red-900/20 p-6 rounded-2xl text-red-300 border border-red-500/20 overflow-auto">
                                            {error}
                                        </pre>
                                    </div>
                                )}

                                {!response && !error && (
                                    <div className="p-12 text-center text-indigo-300 italic opacity-40 border-2 border-dashed border-indigo-700/50 rounded-2xl">
                                        Waiting for your first live post...
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
