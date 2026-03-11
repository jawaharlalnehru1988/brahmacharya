import React from 'react';
import Link from 'next/link';
import ReadIndicator from './ReadIndicator';

interface Article {
    id: number;
    title: string;
    slug: string;
    category: string;
}

interface RoadmapTopic {
    title: string;
    slug: string;
}

interface RoadmapPhase {
    title: string;
    subtitle: string;
    topics: RoadmapTopic[];
    icon: string;
    categoryKey: string; // Added field
}

const PHASE_METADATA: Record<string, { subtitle: string; icon: string; order: number }> = {
    "FOUNDATIONAL RESOLUTION": { subtitle: "Saṅkalpa Layer", icon: "military_tech", order: 1 },
    "DAILY REGULATION": { subtitle: "Dinacharya Engineering", icon: "wb_twilight", order: 2 },
    "CHANTING INFRASTRUCTURE": { subtitle: "Nāma-Sādhana", icon: "record_voice_over", order: 3 },
    "MIND MANAGEMENT": { subtitle: "Internal Discipline", icon: "psychology", order: 4 },
    "SENSE REGULATION": { subtitle: "External Control", icon: "restaurant", order: 5 },
    "ASSOCIATION ARCHITECTURE": { subtitle: "Accountability Loop", icon: "groups", order: 6 },
    "SCRIPTURAL ABSORPTION": { subtitle: "Jnana Foundation", icon: "menu_book", order: 7 },
    "FALL-RECOVERY PROTOCOL": { subtitle: "Resilience System", icon: "healing", order: 8 },
    "STABILITY & HIGHER TASTE": { subtitle: "Ruci Development", icon: "stars", order: 9 },
    "NIṢṬHĀ MAINTENANCE": { subtitle: "Consistency System", icon: "verified", order: 10 }
};

const PhaseCard = ({ phase, index }: { phase: RoadmapPhase, index: number }) => (
    <div className="relative flex flex-col gap-6 rounded-3xl border-2 border-gold/10 bg-white p-8 transition-all hover:shadow-2xl hover:border-gold/30">
        <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-saffron/10 text-saffron shadow-inner">
                <span className="material-symbols-outlined text-3xl">{phase.icon}</span>
            </div>
            <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-saffron opacity-70">Stage {index + 1}</span>
                <h4 className="text-xl font-bold text-spiritual-blue font-serif-title leading-tight">{phase.title}</h4>
                <p className="text-sm font-medium text-gold italic">{phase.subtitle}</p>
            </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>

        <ul className="space-y-5">
            {phase.topics.map((topic, tIndex) => (
                <li key={tIndex}>
                    <div className="flex items-center gap-4">
                        <ReadIndicator slug={topic.slug} />
                        <Link
                            href={`/articles/${topic.slug}`}
                            className="flex-1 text-xl font-semibold text-slate-800 group cursor-pointer hover:text-saffron transition-colors"
                        >
                            <span className="leading-snug underline-offset-4 decoration-saffron/30 hover:underline">{topic.title}</span>
                        </Link>
                    </div>
                </li>
            ))}
        </ul>

        <div className="mt-auto pt-6 border-t border-gold/10">
            <Link
                href={`/tracker?category=${encodeURIComponent(phase.categoryKey)}`}
                className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-spiritual-blue text-white hover:bg-black transition-all font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-900/10"
            >
                <span className="material-symbols-outlined text-base">analytics</span>
                Audit Phase Strategy
            </Link>
        </div>
    </div>
);

const Pillars = async () => {
    let phases: RoadmapPhase[] = [];

    try {
        const response = await fetch('https://api.askharekrishna.com/api/v1/brahmhacarya/', {
            next: { revalidate: 3600 }
        });
        const articles: Article[] = await response.json();

        // Group into phases
        const groups: Record<string, RoadmapTopic[]> = {};

        articles.forEach(article => {
            const category = article.category.toUpperCase();
            if (PHASE_METADATA[category]) {
                if (!groups[category]) {
                    groups[category] = [];
                }
                groups[category].push({
                    title: article.title,
                    slug: article.slug
                });
            }
        });

        // Map to RoadmapPhase structure
        phases = (Object.keys(groups).map(categoryKey => {
            const meta = PHASE_METADATA[categoryKey];
            return {
                title: `PHASE ${meta.order} — ${categoryKey}`,
                subtitle: meta.subtitle,
                icon: meta.icon,
                topics: groups[categoryKey],
                categoryKey: categoryKey, // Set key
                order: meta.order
            };
        }) as (RoadmapPhase & { order: number })[]);

        // Sort by phase order
        (phases as (RoadmapPhase & { order: number })[]).sort((a, b) => a.order - b.order);

    } catch (error) {
        console.error("Failed to fetch roadmap phases:", error);
    }

    return (
        <section id="roadmap" className="px-6 py-16 lg:px-20 lg:py-24 bg-deep-cream/50 min-h-screen">
            <div className="mx-auto max-w-7xl">
                <div className="mb-20 text-center max-w-3xl mx-auto">
                    <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-saffron mb-4">Complete Training Series</h3>
                    <h2 className="text-4xl font-bold tracking-tight text-spiritual-blue sm:text-5xl font-serif-title mb-6">Master Roadmap Articles</h2>
                    <div className="h-1.5 w-32 bg-gold mx-auto rounded-full"></div>
                    <p className="mt-8 text-lg text-slate-600 leading-relaxed">
                        A systematic curriculum for behavioral-devotional rehabilitation, guiding you through the transition from conditioning to spiritual stability.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                    {phases.map((phase, index) => (
                        <PhaseCard key={index} phase={phase} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pillars;
