export const dynamic = 'force-dynamic';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MarkAsRead from '../../components/MarkAsRead';

interface Article {
    title: string;
    slug: string;
    order: number;
}

async function getArticles() {
    try {
        const response = await axios.get('https://api.askharekrishna.com/api/v1/brahmhacarya/');
        return Array.isArray(response.data) ? response.data : response.data.results || [];
    } catch (error) {
        console.error("Error fetching articles list:", error);
        return [];
    }
}

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
    const [article, allArticles] = await Promise.all([
        getArticle(slug),
        getArticles()
    ]);

    if (!article) {
        notFound();
    }

    // Sort all articles by order to find neighbors
    const sortedArticles: Article[] = [...allArticles].sort((a, b) => (a.order || 0) - (b.order || 0));
    const currentIndex = sortedArticles.findIndex(a => a.slug === slug);

    const prevArticle = currentIndex > 0 ? sortedArticles[currentIndex - 1] : null;
    const nextArticle = currentIndex < sortedArticles.length - 1 ? sortedArticles[currentIndex + 1] : null;

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
                            <span className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">calendar_month</span>
                                {article.published_at ? article.published_at.substring(0, 10) : (article.created_at ? article.created_at.substring(0, 10) : 'Date TBD')}
                            </span>
                            <span className="flex items-center gap-2 text-gold"><span className="material-symbols-outlined text-sm">stars</span> Priority: {article.order}</span>
                        </div>
                    </div>

                    {/* Featured Image Support */}
                    {article.featured_image && (
                        <div className="mb-16 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                            <img src={article.featured_image} alt={article.title} className="w-full object-cover" />
                        </div>
                    )}

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

                    {/* Mark as Read Component */}
                    <MarkAsRead slug={slug} title={article.title} />

                    {/* Navigation Suggestions */}
                    <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gold/10 pt-16">
                        {prevArticle ? (
                            <Link href={`/articles/${prevArticle.slug}`} className="group flex flex-col p-8 rounded-[2rem] border border-gold/5 bg-white shadow-xl hover:shadow-2xl transition-all text-left relative overflow-hidden">
                                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 mb-3 flex items-center gap-2 group-hover:text-saffron transition-colors">
                                    <span className="material-symbols-outlined text-sm">west</span> Previous Wisdom
                                </span>
                                <span className="text-xl font-bold font-serif-title text-spiritual-blue group-hover:text-saffron transition-colors line-clamp-2 leading-tight">
                                    {prevArticle.title}
                                </span>
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-gold/10 group-hover:bg-saffron transition-colors"></div>
                            </Link>
                        ) : (
                            <div className="hidden md:block"></div>
                        )}

                        {nextArticle && (
                            <Link href={`/articles/${nextArticle.slug}`} className="group flex flex-col p-8 rounded-[2rem] border border-gold/5 bg-white shadow-xl hover:shadow-2xl transition-all text-right relative overflow-hidden">
                                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 mb-3 flex items-center justify-end gap-2 group-hover:text-saffron transition-colors">
                                    Next Wisdom <span className="material-symbols-outlined text-sm">east</span>
                                </span>
                                <span className="text-xl font-bold font-serif-title text-spiritual-blue group-hover:text-saffron transition-colors line-clamp-2 leading-tight text-right">
                                    {nextArticle.title}
                                </span>
                                <div className="absolute top-0 right-0 w-1.5 h-full bg-gold/10 group-hover:bg-saffron transition-colors"></div>
                            </Link>
                        )}
                    </div>

                    <div className="mt-16 pt-12 border-t border-gold/5 flex flex-col items-center gap-8">
                        <Link href="/" className="inline-flex items-center gap-3 px-10 py-4 bg-spiritual-blue text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all hover:bg-slate-800 shadow-xl shadow-blue-900/10 hover:-translate-y-1">
                            <span className="material-symbols-outlined text-base">apps</span> Go back to Article Gallery
                        </Link>

                        <Link href="/" className="flex items-center gap-3 text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] transition-all hover:text-saffron">
                            <span className="material-symbols-outlined text-sm">home</span> Return to Home Dashboard
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
