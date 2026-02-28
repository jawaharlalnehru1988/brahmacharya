import React from 'react';

interface TrapCategory {
    title: string;
    icon: string;
    items: string[];
    colorScheme: string;
}

const trapCategories: TrapCategory[] = [
    {
        title: "DIGITAL VISUAL STIMULATION TRAPS",
        icon: "devices",
        colorScheme: "border-red-100 bg-red-50/30 text-red-600",
        items: [
            "Instagram Reels Sensual Content Loop",
            "YouTube Shorts Algorithmic Suggestion Trap",
            "OTT Platform Thumbnails",
            "Netflix Romantic Scene Normalization",
            "Movie Poster Hyper-Sexualisation",
            "Meme Pages with Hidden Sensuality",
            "Clickbait Thumbnail Psychology",
            "Anime Fan Service Exposure",
            "Fashion Influencer Culture",
            "Dating App Profile Browsing",
            "“Soft-Core” Social Media Pages",
            "Auto-Playing Advertisements",
            "Gym Transformation Videos",
            "Beauty Product Ads",
            "Music Video Objectification",
            "Dance Reel Culture",
            "Streaming Platform Recommendation Engine",
            "AI Generated Influencer Models",
            "VR-Based Adult Immersion",
            "Gaming Character Sexualisation"
        ]
    },
    {
        title: "PSYCHOLOGICAL & NEUROCHEMICAL TRAPS",
        icon: "psychology",
        colorScheme: "border-purple-100 bg-purple-50/30 text-purple-600",
        items: [
            "Dopamine Reward Loops",
            "Infinite Scroll Design",
            "Variable Reward Notifications",
            "Loneliness Amplification via Social Media",
            "FOMO (Fear of Missing Out)",
            "Validation Seeking via Likes",
            "Comparison Mindset",
            "Escapism through Entertainment",
            "Binge Watching",
            "Emotional Numbing via Content",
            "Instant Gratification Conditioning",
            "Habitual Phone Checking",
            "Blue Light Sleep Disruption",
            "Sexual Curiosity Marketing",
            "Attention Fragmentation",
            "Emotional Trigger Ads",
            "Night-Time Phone Usage",
            "Idle Time Content Consumption",
            "Stress-Induced Browsing",
            "Algorithmic Behaviour Shaping"
        ]
    },
    {
        title: "CONSUMERISM & LIFESTYLE TRAPS",
        icon: "shopping_bag",
        colorScheme: "border-amber-100 bg-amber-50/30 text-amber-600",
        items: [
            "Fashion Industry Body Image Marketing",
            "Perfume Ads Sensual Messaging",
            "Gym Vanity Culture",
            "Cosmetic Industry Seduction Branding",
            "Dating Culture Commercialization",
            "Party & Nightlife Promotion",
            "Alcohol as Social Lubricant",
            "Fast Food Overstimulation",
            "Luxury Lifestyle Aspiration",
            "Relationship Goal Fantasies",
            "Influencer Couple Culture",
            "Hookup Normalisation",
            "Valentine's Day Commercial Messaging",
            "Wedding Glamour Marketing",
            "Pornified Advertising",
            "Beauty Pageant Ideology",
            "Sexual Liberation Narratives",
            "Pop Culture Romance Tropes",
            "“You Deserve Pleasure” Marketing",
            "Romantic Song Addiction"
        ]
    },
    {
        title: "WORKPLACE & SOCIAL ENVIRONMENT TRAPS",
        icon: "business_center",
        colorScheme: "border-blue-100 bg-blue-50/30 text-blue-600",
        items: [
            "Corporate Mixed Socialization",
            "Casual Flirting Culture",
            "Office Parties",
            "Team Outings",
            "Informal Dress Norms",
            "Gossip Networks",
            "Dating Among Colleagues",
            "Social Drinking Pressure",
            "Workplace Stress Escapism",
            "Late Night Work Isolation",
            "Travel-Based Temptations",
            "Business Conferences",
            "Hotel Room Privacy",
            "Fitness Club Interaction",
            "Co-Working Spaces",
            "Commute-Based Exposure",
            "Advertising Billboards",
            "Public Transport Displays",
            "Mall Walk-Through Triggers",
            "College Campus Culture"
        ]
    },
    {
        title: "MEDIA & ENTERTAINMENT TRAPS",
        icon: "theaters",
        colorScheme: "border-indigo-100 bg-indigo-50/30 text-indigo-600",
        items: [
            "Romantic Web Series",
            "Stand-Up Comedy Vulgarity",
            "Reality Shows",
            "Celebrity Gossip",
            "Dating Shows",
            "Love Story Narratives",
            "Bollywood Sensual Songs",
            "Western Pop Lyrics",
            "Erotic Literature",
            "Fan Fiction Communities",
            "Podcast Discussions on Casual Relationships",
            "Online Forums",
            "Reddit NSFW Spillovers",
            "Twitch Streaming Culture",
            "Music Streaming Recommendations",
            "Short Film Platforms",
            "Online Chat Rooms",
            "Fan Edits",
            "Influencer Vlogs",
            "Lifestyle YouTube Channels"
        ]
    }
];

const TrapCard = ({ category }: { category: TrapCategory }) => (
    <div className={`flex flex-col rounded-3xl border-2 p-8 transition-all hover:shadow-xl ${category.colorScheme}`}>
        <div className="flex items-center gap-4 mb-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-current opacity-80">
                <span className="material-symbols-outlined text-2xl">{category.icon}</span>
            </div>
            <h4 className="text-lg font-bold tracking-tight font-serif-title uppercase leading-tight">
                {category.title}
            </h4>
        </div>

        <div className="h-px w-full bg-current opacity-10 mb-6"></div>

        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
            {category.items.map((item, index) => (
                <li key={index} className="flex items-center gap-4 text-xl font-semibold text-slate-800 hover:text-black transition-colors lg:py-1">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-current opacity-60"></span>
                    <span className="leading-snug">{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

const PathOfBhakti = () => {
    return (
        <section id="threat-model" className="px-6 py-16 lg:px-20 lg:py-24 bg-slate-50 overflow-hidden min-h-screen">
            <div className="mx-auto max-w-7xl">
                <div className="mb-20 text-center max-w-4xl mx-auto">
                    <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-red-600 mb-4 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-base">warning</span>
                        Modern-Day Māyā Trap Landscape
                    </h3>
                    <h2 className="text-4xl font-bold tracking-tight text-spiritual-blue sm:text-5xl font-serif-title mb-6">Threat Model for Sādhaka Life</h2>
                    <div className="h-1.5 w-40 bg-red-600/20 mx-auto rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-red-600 animate-[pulse_2s_infinite]"></div>
                    </div>
                    <p className="mt-8 text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
                        Recognize the exact attack vectors through which sense agitation, distraction, and relapse cycles are being engineered in contemporary society. Knowing the enemy is 50% of the victory.
                    </p>
                </div>

                <div className="flex flex-col gap-10">
                    {trapCategories.map((category, index) => (
                        <TrapCard key={index} category={category} />
                    ))}
                </div>

                <div className="mt-20 rounded-[2.5rem] bg-indigo-950 p-12 text-center border-4 border-indigo-900/50 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h4 className="text-2xl font-bold text-white font-serif-title mb-4 uppercase tracking-widest">Agnostic Awareness</h4>
                        <p className="text-indigo-200 italic max-w-2xl mx-auto mb-10 leading-relaxed">
                            These traps are designed to capture your attention and drain your spiritual vitality. Identify them in your daily life to deactivate their power over your consciousness.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 text-indigo-300 text-xs font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-2 px-4 py-2 bg-indigo-900/50 rounded-full"><span className="material-symbols-outlined text-sm">visibility</span> Detect</span>
                            <span className="flex items-center gap-2 px-4 py-2 bg-indigo-900/50 rounded-full"><span className="material-symbols-outlined text-sm">do_not_disturb_on</span> Detach</span>
                            <span className="flex items-center gap-2 px-4 py-2 bg-indigo-900/50 rounded-full"><span className="material-symbols-outlined text-sm">bolt</span> Deactivate</span>
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                        <div className="absolute top-10 left-10"><span className="material-symbols-outlined text-9xl text-white">security_update_warning</span></div>
                        <div className="absolute bottom-10 right-10"><span className="material-symbols-outlined text-9xl text-white">shield</span></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PathOfBhakti;
