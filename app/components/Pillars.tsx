import React from 'react';

interface RoadmapPhase {
    title: string;
    subtitle: string;
    topics: string[];
    icon: string;
}

const phases: RoadmapPhase[] = [
    {
        title: "PHASE 1 — FOUNDATIONAL RESOLUTION",
        subtitle: "Saṅkalpa Layer",
        icon: "military_tech",
        topics: [
            "Meaning of Brahmacharya in Krishna Consciousness",
            "Why Brahmacharya is Non-Negotiable for Spiritual Advancement",
            "Saṅkalpa: Making an Internal Contract with Guru & Krishna",
            "Understanding Fallen Condition (Patanāvasthā)",
            "The Real Enemy: Lust vs Love",
            "Karma Loop of Sense Enjoyment",
            "How Māyā Attacks Through the Mind",
            "Dopamine vs Devotional Bliss — Lower Taste vs Higher Taste",
            "Fear of Missing Enjoyment — Psychological Root Cause",
            "Identity Shift: “Enjoyer” → “Servitor”"
        ]
    },
    {
        title: "PHASE 2 — DAILY REGULATION",
        subtitle: "Dinacharya Engineering",
        icon: "wb_twilight",
        topics: [
            "Importance of Brahma Muhūrta Waking",
            "Sleep Discipline for Brahmacharis",
            "Morning Victory = Day Victory Principle",
            "First Thought of the Day Protocol",
            "Mangal Arati Consciousness",
            "Bathing as Internal & External Purification",
            "Tilaka Application — Psychological Anchoring",
            "Cleanliness (Śauca) as Brahmacharya Tool",
            "Dress Code & Modesty",
            "Association in Early Morning Hours"
        ]
    },
    {
        title: "PHASE 3 — CHANTING INFRASTRUCTURE",
        subtitle: "Nāma-Sādhana",
        icon: "record_voice_over",
        topics: [
            "Why Japa is the Core Defence System",
            "Fixed Rounds Vow (Niyamita Japa)",
            "How to Avoid Mechanical Chanting",
            "Offensive vs Attentive Chanting",
            "Posture & Environment for Japa",
            "Tongue Control through Nāma",
            "Sound Vibration & Mind Rewiring",
            "Emergency Chanting during Urges",
            "Walking Japa vs Sitting Japa",
            "Tracking Japa Quality Daily"
        ]
    },
    {
        title: "PHASE 4 — MIND MANAGEMENT",
        subtitle: "Internal Discipline",
        icon: "psychology",
        topics: [
            "Nature of the Flickering Mind",
            "Urge Surfing in Bhakti Context",
            "Replacement Principle (Sevā over Suppression)",
            "Visual Memory Cleansing",
            "Dealing with Flashbacks",
            "Handling Mobile Temptations",
            "Thought–Interruption Techniques",
            "Pratipakṣa Bhāvana in Bhakti",
            "Internal Dialogue Re-Training",
            "Role of Intelligence (Buddhi)"
        ]
    },
    {
        title: "PHASE 5 — SENSE REGULATION",
        subtitle: "External Control",
        icon: "restaurant",
        topics: [
            "Diet & Brahmacharya",
            "Onion, Garlic & Agitation",
            "Fasting & Ekādaśī Discipline",
            "Tongue → Genitals Connection",
            "Regulated Eating Timings",
            "Overeating & Lust",
            "Ahāra Śuddhi",
            "Exercise without Body-Consciousness",
            "Digital Fasting",
            "Music & Media Intake"
        ]
    },
    {
        title: "PHASE 6 — ASSOCIATION ARCHITECTURE",
        subtitle: "Accountability Loop",
        icon: "groups",
        topics: [
            "Sādhu Saṅga Importance",
            "Accountability Partner System",
            "Mentor–Guided Brahmacharya",
            "Avoiding Loose Association",
            "Temple Programs as Stabilizers",
            "Group Japa",
            "Kīrtana as Lust Detox",
            "Service Engagement",
            "Living in Devotee Community",
            "Honest Confession Culture"
        ]
    },
    {
        title: "PHASE 7 — SCRIPTURAL ABSORPTION",
        subtitle: "Jnana Foundation",
        icon: "menu_book",
        topics: [
            "Daily Śāstra Reading Routine",
            "Hearing vs Reading",
            "Key Verses on Brahmacharya",
            "Lust in Bhagavad-gītā",
            "Lessons from Ajāmila",
            "Fall-Down Narratives",
            "Life of Great Brahmacharis",
            "Hearing as Mind Purification",
            "Evening Reflection Journaling",
            "Memorization Practice"
        ]
    },
    {
        title: "PHASE 8 — FALL-RECOVERY PROTOCOL",
        subtitle: "Resilience System",
        icon: "healing",
        topics: [
            "What to Do Immediately After a Fall",
            "Guilt vs Responsibility",
            "Resetting Saṅkalpa",
            "Emergency Austerities",
            "Avoiding Despair",
            "Gradual Rebuilding",
            "Tracking Triggers",
            "Learning from Failure",
            "Preventing Binge Cycle",
            "Guru-Centric Recovery"
        ]
    },
    {
        title: "PHASE 9 — STABILITY & HIGHER TASTE",
        subtitle: "Ruci Development",
        icon: "stars",
        topics: [
            "Developing Ruci",
            "Seva-Absorption",
            "Taste for Kīrtana",
            "Holy Name Dependence",
            "Internal Satisfaction",
            "Seeing Opposite Gender Properly",
            "Vision Training",
            "Long-Term Celibacy",
            "Transforming Sexual Energy",
            "Joy of Renunciation"
        ]
    },
    {
        title: "PHASE 10 — NIṢṬHĀ MAINTENANCE",
        subtitle: "Consistency System",
        icon: "verified",
        topics: [
            "Consistency over Intensity",
            "Guarding Against Pride",
            "Lifelong Brahmacharya",
            "Service-Driven Life",
            "Avoiding Complacency",
            "Continual Hearing",
            "Pilgrimage",
            "Balanced Austerity",
            "Preparing for Preaching",
            "Brahmacharya as Foundation for Bhakti"
        ]
    }
];

import Link from 'next/link';

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
            {phase.topics.map((topic, tIndex) => {
                const slug = topic.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
                return (
                    <li key={tIndex}>
                        <Link
                            href={`/articles/${slug}`}
                            className="flex gap-4 text-xl font-semibold text-slate-800 group cursor-pointer hover:text-saffron transition-colors"
                        >
                            <span className="text-saffron font-bold opacity-30 shrink-0 text-lg">{String(tIndex + 1).padStart(2, '0')}.</span>
                            <span className="leading-snug underline-offset-4 decoration-saffron/30 hover:underline">{topic}</span>
                        </Link>
                    </li>
                );
            })}
        </ul>

        <div className="mt-auto pt-4">
            <button className="w-full rounded-xl border border-saffron/20 bg-saffron/5 py-3 text-xs font-bold uppercase tracking-widest text-saffron transition-all hover:bg-saffron hover:text-white">
                View Phase Articles
            </button>
        </div>
    </div>
);

const Pillars = () => (
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

export default Pillars;
