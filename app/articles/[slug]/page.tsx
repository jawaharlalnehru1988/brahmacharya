export const dynamic = 'force-dynamic';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

async function getArticle(slug: string) {
    const url = `https://api.askharekrishna.com/api/v1/brahmhacarya/${slug}/`;
    console.log(`[SSR] Fetching Article Detail: ${url}`);

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            console.error(`[SSR] API Error (${error.response?.status}):`, error.response?.data || error.message);
            if (error.response?.status === 404) {
                console.warn("⚠️ Recommendation: Check if Django ViewSet has 'lookup_field = slug'");
                return null;
            }
        } else {
            console.error("[SSR] Unexpected Error:", error);
        }
        return null;
    }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) {
        notFound();
    }

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light">
            <Header />
            <main className="flex-1 py-16 lg:py-24 px-6">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-12 text-center border-b border-gold/10 pb-12">
                        <div className="inline-flex px-4 py-1.5 bg-saffron/10 text-saffron text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
                            {article.category || 'Roadmap'}
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold font-serif-title text-spiritual-blue tracking-tight mb-6">
                            {article.title}
                        </h1>
                        <div className="flex justify-center items-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-400">
                            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">calendar_month</span> {new Date(article.published_at || article.created_at).toLocaleDateString()}</span>
                            <span className="flex items-center gap-2 text-gold"><span className="material-symbols-outlined text-sm">stars</span> Priority: {article.order}</span>
                        </div>
                    </div>

                    {/* Featured Image Support */}
                    {article.featured_image && (
                        <div className="mb-16 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                            <img src={article.featured_image} alt={article.title} className="w-full object-cover" />
                        </div>
                    )}

                    {/* Content Section */}
                    <div className="prose prose-stone lg:prose-xl max-w-none 
                        prose-headings:font-serif-title prose-headings:text-spiritual-blue 
                        prose-p:text-slate-700 prose-p:leading-relaxed 
                        prose-strong:text-spiritual-blue prose-strong:font-bold
                        prose-blockquote:border-l-4 prose-blockquote:border-saffron prose-blockquote:bg-saffron/5 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-xl prose-blockquote:italic
                        prose-li:text-slate-700
                        prose-hr:border-gold/20">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
                    </div>

                    {/* Audio Support */}
                    {article.audioUrl && (
                        <div className="mt-16 p-8 rounded-3xl bg-saffron/5 border-2 border-dashed border-saffron/20 text-center">
                            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-saffron mb-6">Accompanying Audio Lecture</h4>
                            <audio controls className="w-full max-w-xl mx-auto">
                                <source src={article.audioUrl} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    )}

                    <div className="mt-20 pt-12 border-t border-gold/10 flex justify-center">
                        <a href="/" className="flex items-center gap-3 text-saffron font-bold text-xs uppercase tracking-[0.2em] transition-all hover:gap-4">
                            <span className="material-symbols-outlined text-sm">west</span> Back to Roadmap
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
