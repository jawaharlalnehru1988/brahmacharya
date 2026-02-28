import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Article {
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    featured_image: string | null;
    published_at: string;
    created_at: string;
    order: number;
}

async function getArticles() {
    try {
        const response = await axios.get('https://api.askharekrishna.com/api/v1/brahmhacarya/', {
            timeout: 10000
        });
        // Assuming the API returns an array or a results object
        return Array.isArray(response.data) ? response.data : response.data.results || [];
    } catch (error) {
        console.error("Error fetching articles:", error);
        return [];
    }
}

export default async function ArticlesListPage() {
    const articles: Article[] = await getArticles();

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light">
            <Header />
            <main className="flex-1 py-16 lg:py-24 px-6 lg:px-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-20 text-center max-w-3xl mx-auto">
                        <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-saffron mb-4">The Digital Library</h3>
                        <h2 className="text-4xl font-bold tracking-tight text-spiritual-blue sm:text-5xl font-serif-title mb-6">Available Articles</h2>
                        <div className="h-1.5 w-32 bg-gold mx-auto rounded-full"></div>
                        <p className="mt-8 text-lg text-slate-600 leading-relaxed">
                            A curated repository of transcendental knowledge to help you stabilize in Brahmacharya and progress in Krishna Consciousness.
                        </p>
                    </div>

                    {articles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {articles.map((article) => (
                                <Link
                                    key={article.slug}
                                    href={`/articles/${article.slug}`}
                                    className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-gold/10 transition-all hover:shadow-2xl hover:scale-[1.02]"
                                >
                                    {/* Card Image */}
                                    <div className="relative h-64 overflow-hidden">
                                        {article.featured_image ? (
                                            <img
                                                src={article.featured_image}
                                                alt={article.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full spiritual-gradient flex items-center justify-center">
                                                <span className="material-symbols-outlined text-6xl text-white/30">auto_stories</span>
                                            </div>
                                        )}
                                        <div className="absolute top-6 left-6">
                                            <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-saffron shadow-sm">
                                                {article.category || 'Roadmap'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-8 flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold text-spiritual-blue font-serif-title mb-4 group-hover:text-saffron transition-colors leading-tight">
                                            {article.title}
                                        </h3>
                                        <p className="text-sm text-slate-600 line-clamp-3 mb-6 flex-1">
                                            {article.excerpt || "Dive into this article to deepen your understanding of spiritual discipline and sense control."}
                                        </p>

                                        <div className="flex items-center justify-between pt-6 border-t border-gold/5">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                                {new Date(article.published_at || article.created_at).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1 text-saffron font-bold text-xs uppercase tracking-widest">
                                                Read Article <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="py-32 text-center rounded-[3rem] border-4 border-dashed border-gold/10 bg-white shadow-inner">
                            <span className="material-symbols-outlined text-8xl text-gold/20 mb-6">inventory_2</span>
                            <h3 className="text-2xl font-bold text-spiritual-blue font-serif-title mb-4">No articles found yet</h3>
                            <p className="text-slate-500 max-w-sm mx-auto mb-10">The repository is currently being updated by the Digital Scribes. Check back soon!</p>
                            <Link href="/admin/post" className="bg-spiritual-blue text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all">
                                Post First Article
                            </Link>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
