import Link from 'next/link';

interface Article {
    id: number;
    title: string;
    slug: string;
    category: string;
}

interface SupportItem {
    title: string;
    slug: string;
}

interface SupportCategory {
    title: string;
    subtitle: string;
    icon: string;
    items: SupportItem[];
    accentColor: string;
}

const CATEGORY_METADATA: Record<string, { subtitle: string; icon: string; accentColor: string }> = {
    "PRABHUPĀDA INSTRUCTIONAL QUOTE THEMES": {
        subtitle: "Standalone Articles for Conviction",
        icon: "format_quote",
        accentColor: "text-saffron bg-saffron/10 border-saffron/20"
    },
    "VEDIC / GĪTĀ / UPANIṢADIC INSTRUCTIONS": {
        subtitle: "The Philosophical Foundation",
        icon: "menu_book",
        accentColor: "text-gold bg-gold/10 border-gold/20"
    },
    "PURĀṆIC & ITIHĀSA STORIES - CHARACTER CASE STUDIES": {
        subtitle: "Character Case Studies",
        icon: "history_edu",
        accentColor: "text-spiritual-blue bg-spiritual-blue/10 border-spiritual-blue/20"
    },
    "MODERN REAL-LIFE CASE THEMES": {
        subtitle: "Devotee Biographies & Success Stories",
        icon: "diversity_1",
        accentColor: "text-emerald-600 bg-emerald-50 border-emerald-200"
    }
};

const SupportCard = ({ category }: { category: SupportCategory }) => (
    <div className={`rounded-[2.5rem] border-2 p-10 transition-all hover:shadow-2xl bg-white ${category.accentColor}`}>
        <div className="flex items-center gap-6 mb-8">
            <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-inner ${category.accentColor}`}>
                <span className="material-symbols-outlined text-4xl">{category.icon}</span>
            </div>
            <div>
                <h4 className="text-xl font-bold font-serif-title tracking-tight leading-tight mb-1">{category.title.replace(' - CHARACTER CASE STUDIES', '')}</h4>
                <p className="text-sm font-medium opacity-80 italic">{category.subtitle}</p>
            </div>
        </div>

        <div className="h-px w-full bg-current opacity-10 mb-8"></div>

        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
            {category.items.map((item, index) => (
                <li key={index} className="flex items-center gap-4 text-xl font-semibold text-slate-800 hover:text-black transition-colors lg:py-1 group">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-current opacity-40 group-hover:scale-125 transition-transform"></span>
                    <Link
                        href={`/articles/${item.slug}`}
                        className="leading-snug cursor-pointer hover:underline decoration-2 underline-offset-4 decoration-current/30"
                    >
                        {item.title}
                    </Link>
                </li>
            ))}
        </ul>

        <div className="mt-10 pt-8 border-t border-current border-opacity-5">
            <Link
                href={`/tracker?category=${encodeURIComponent(category.title)}`}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-slate-100 hover:border-saffron hover:text-saffron transition-all font-bold text-xs uppercase tracking-widest text-slate-500 bg-slate-50/50"
            >
                <span className="material-symbols-outlined text-base">analytics</span>
                Audit Strategy & Track Progress
            </Link>
        </div>
    </div>
);

const ScripturalSupport = async () => {
    let supportCategories: SupportCategory[] = [];

    try {
        const response = await fetch('https://api.askharekrishna.com/api/v1/brahmhacarya/', {
            next: { revalidate: 3600 }
        });
        const articles: Article[] = await response.json();

        // Group articles by category
        const groups: Record<string, SupportItem[]> = {};

        articles.forEach(article => {
            const category = article.category.toUpperCase();
            if (CATEGORY_METADATA[category]) {
                if (!groups[category]) {
                    groups[category] = [];
                }
                const cleanTitle = article.title.replace(/^\d+\.\s*/, '');
                groups[category].push({
                    title: cleanTitle,
                    slug: article.slug
                });
            }
        });

        // Map groups to categories array
        supportCategories = Object.keys(CATEGORY_METADATA).map(catKey => ({
            title: catKey,
            subtitle: CATEGORY_METADATA[catKey].subtitle,
            icon: CATEGORY_METADATA[catKey].icon,
            accentColor: CATEGORY_METADATA[catKey].accentColor,
            items: groups[catKey] || []
        }));
    } catch (e) {
        console.error('Failed to fetch scriptural support data:', e);
    }

    return (
        <section id="support-layer" className="px-6 py-16 lg:px-20 lg:py-24 bg-white overflow-hidden min-h-screen">
            <div className="mx-auto max-w-7xl">
                <div className="mb-20 text-center max-w-4xl mx-auto">
                    <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-saffron mb-4">Foundation of Niścaya-Buddhi</h3>
                    <h2 className="text-4xl font-bold tracking-tight text-spiritual-blue sm:text-5xl font-serif-title mb-6">Scriptural & Historical Support</h2>
                    <div className="h-1.5 w-40 bg-gold/20 mx-auto rounded-full overflow-hidden">
                        <div className="h-full w-1/2 bg-gold"></div>
                    </div>
                    <p className="mt-8 text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
                        Strengthen your conviction and stabilize your practice through the wisdom of Shastra and the living examples of great souls.
                    </p>
                </div>

                <div className="flex flex-col gap-12">
                    {supportCategories.map((category, index) => (
                        <SupportCard key={index} category={category} />
                    ))}
                </div>

                <div className="mt-20 p-12 rounded-[3rem] bg-gradient-to-br from-spiritual-blue to-indigo-900 text-white text-center relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                        <h4 className="text-3xl font-bold font-serif-title mb-4">Vow of Stability</h4>
                        <p className="max-w-2xl mx-auto text-indigo-100 italic mb-8">
                            &quot;Fixed determination (niścayātmikā buddhi) is the key to conquering the mind and senses. Without scriptural grounding, practice remains sentimental.&quot;
                        </p>
                        <button className="bg-gold text-white font-bold px-10 py-4 rounded-2xl hover:bg-saffron transition-colors shadow-lg uppercase tracking-widest text-sm">
                            Access Full Library
                        </button>
                    </div>
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 opacity-10 -mr-20 -mt-20">
                        <span className="material-symbols-outlined text-[300px]">auto_stories</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ScripturalSupport;
