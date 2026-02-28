import React from 'react';

interface SupportCategory {
    title: string;
    subtitle: string;
    icon: string;
    items: string[];
    accentColor: string;
}

const supportData: SupportCategory[] = [
    {
        title: "PRABHUPĀDA INSTRUCTIONAL QUOTE THEMES",
        subtitle: "Standalone Articles for Conviction",
        icon: "format_quote",
        accentColor: "text-saffron bg-saffron/10 border-saffron/20",
        items: [
            "Lust is the Perverted Reflection of Love of God",
            "Brahmacharya as Foundation of Spiritual Life",
            "Tapasya Begins with Celibacy",
            "Illicit Sex as the Pillar of Material Bondage",
            "Regulated Life = Real Freedom",
            "Control of Tongue Leads to Control of Genitals",
            "Rise Early — Defeat Māyā",
            "Idleness Invites Sense Agitation",
            "Engage Mind in Kṛṣṇa or Fall Down",
            "No Illicit Sex = Real Civilization",
            "Marriage vs Brahmacharya Responsibility",
            "Spiritual Strength through Austerity",
            "Overeating Increases Lust",
            "Chanting as Protection from Māyā",
            "Association Determines Consciousness",
            "Fall-Down Begins in the Mind",
            "Modern Education Encourages Sense Gratification",
            "Simple Living, High Thinking",
            "Tapasya Purifies Existence",
            "Sense Control Required for Bhakti"
        ]
    },
    {
        title: "VEDIC / GĪTĀ / UPANIṢADIC INSTRUCTIONS",
        subtitle: "The Philosophical Foundation",
        icon: "menu_book",
        accentColor: "text-gold bg-gold/10 border-gold/20",
        items: [
            "Bhagavad-gītā 2.62–63 — Contemplation → Attachment → Fall Down",
            "Bhagavad-gītā 3.39 — Lust Covers Knowledge",
            "Bhagavad-gītā 3.41 — Control Senses at Beginning",
            "Bhagavad-gītā 5.23 — Tolerate Urges",
            "Bhagavad-gītā 6.26 — Bring Mind Back",
            "Bhagavad-gītā 6.14 — Brahmacharya in Yoga",
            "Bhagavad-gītā 16.21 — Lust as Gate to Hell",
            "Śrīmad-Bhāgavatam 7.9 — Prahlāda on Sense Control",
            "Śrīmad-Bhāgavatam 11.14 — Regulated Life",
            "Kaṭha Upaniṣad — Chariot Analogy (Mind & Senses)",
            "Muṇḍaka Upaniṣad — Higher vs Lower Pleasure",
            "Taittirīya Upaniṣad — Bliss Hierarchy",
            "Śvetāśvatara Upaniṣad — Self-Control for Realization",
            "Chāndogya Upaniṣad — Brahmacharya & Knowledge",
            "Bṛhadāraṇyaka Upaniṣad — Sense Restraint"
        ]
    },
    {
        title: "PURĀṆIC & ITIHĀSA STORIES",
        subtitle: "Character Case Studies",
        icon: "history_edu",
        accentColor: "text-spiritual-blue bg-spiritual-blue/10 border-spiritual-blue/20",
        items: [
            "Bhīṣma — Lifelong Vow of Celibacy",
            "Hanumān — Perfect Brahmachari",
            "Prahlāda — Sense Control in Youth",
            "Dhruva — Austerity at Young Age",
            "Śukadeva Gosvāmī — Renounced from Birth",
            "Nārada Muni — Association Transformation",
            "Ambarīṣa Mahārāja — Engaging All Senses",
            "Ṛṣabhadeva — Tapasya Teaching",
            "Jaḍa Bharata — Mind Distraction Warning",
            "Ajāmila — Fall Due to Association",
            "Viśvāmitra — Fall of a Great Sage",
            "Śiva vs Kāmadeva — Desire Defeat",
            "King Yayāti — Insatiable Lust",
            "Saubhari Muni — Fall from Meditation",
            "Citraketu — Regulation after Loss"
        ]
    },
    {
        title: "MODERN REAL-LIFE CASE THEMES",
        subtitle: "Devotee Biographies & Success Stories",
        icon: "diversity_1",
        accentColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
        items: [
            "From Addiction to 16 Rounds Discipline",
            "IT Professional Leaving Illicit Habits via Japa",
            "College Student Digital Detox through Temple Living",
            "Married Gṛhastha Practicing Regulated Brahmacharya",
            "Brahmachari Recovering from Social Media Exposure",
            "Night Shift Worker Stabilising Morning Sādhana",
            "Gym Enthusiast Redirecting Passion into Sevā",
            "Startup Founder Adopting Brahma Muhūrta Routine",
            "Youth Leader Escaping Dating Culture",
            "Corporate Employee Following Ekādaśī Strictly",
            "Devotee Overcoming Netflix Addiction",
            "Software Engineer Practicing Phone Fasting",
            "Recovering from Repeated Fall-Down Cycles",
            "Kīrtana Engagement Replacing Entertainment",
            "Temple Association vs Isolation",
            "Guided Mentorship Recovery",
            "Saṅkalpa Tracking Success Story",
            "Emergency Chanting Intervention",
            "Japa Retreat Transformation",
            "Service-Based Mind Stabilization"
        ]
    }
];

const SupportCard = ({ category }: { category: SupportCategory }) => (
    <div className={`rounded-[2.5rem] border-2 p-10 transition-all hover:shadow-2xl bg-white ${category.accentColor}`}>
        <div className="flex items-center gap-6 mb-8">
            <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-inner ${category.accentColor}`}>
                <span className="material-symbols-outlined text-4xl">{category.icon}</span>
            </div>
            <div>
                <h4 className="text-xl font-bold font-serif-title tracking-tight leading-tight mb-1">{category.title}</h4>
                <p className="text-sm font-medium opacity-80 italic">{category.subtitle}</p>
            </div>
        </div>

        <div className="h-px w-full bg-current opacity-10 mb-8"></div>

        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
            {category.items.map((item, index) => (
                <li key={index} className="flex items-center gap-4 text-xl font-semibold text-slate-800 hover:text-black transition-colors lg:py-1 group cursor-pointer">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-current opacity-40 group-hover:scale-125 transition-transform"></span>
                    <span className="leading-snug">{item}</span>
                </li>
            ))}
        </ul>

        <div className="mt-10 pt-6 border-t border-current border-opacity-5">
            <button className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest transition-all hover:gap-3">
                Explore Series <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
        </div>
    </div>
);

const ScripturalSupport = () => {
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
                    {supportData.map((category, index) => (
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
