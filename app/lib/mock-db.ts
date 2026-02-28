// Simulated Database for SSR Articles
export interface Article {
    title: string;
    slug: string;
    category: string;
    content: string;
    excerpt: string;
    published_at: string;
    author: string;
}

export const mockArticles: Record<string, Article> = {
    'meaning-of-brahmacharya-in-krishna-consciousness': {
        title: 'Meaning of Brahmacharya in Krishna Consciousness',
        slug: 'meaning-of-brahmacharya-in-krishna-consciousness',
        category: 'PHASE_1',
        excerpt: 'Understanding the foundational definition of purity and its role in spiritual advancement.',
        published_at: '2024-02-28',
        author: 'A.C. Bhaktivedanta Swami Prabhupada (Compiled)',
        content: `
# Meaning of Brahmacharya in Krishna Consciousness

In the context of **Krishna Consciousness**, *Brahmacharya* is not merely the physical restraint of the senses, but the **redirection of the soul's energy** towards the Supreme.

## The Foundational Definition

Traditionally, *Brahma* refers to the Supreme Spirit, and *charya* refers to 'one who behaves' or 'conducts'. Thus, a **Brahmachari** is one who conducts their life according to the principles of God-consciousness.

### Why Purity is Non-Negotiable
Without the preservation of *Ojas* (vital energy), the intelligence (*Buddhi*) remains weak. A weak intelligence cannot grasp the subtle truths of the **Srimad Bhagavatam** or the **Bhagavad-gita**.

> "By the practice of Brahmacharya, one's memory, intelligence, and life-span are increased." — *Spiritual Science*

## The Three Pillars of Purity
1. **Shravanam (Hearing):** Purifying the consciousness by listening to transcendental sound vibrations.
2. **Kirtanam (Chanting):** Redirecting the faculty of speech to the Maha-Mantra.
3. **Prasadam (Sanctified Diet):** Controlling the tongue is the first step to controlling the genitals.

---

### Path to Stabilization
For a struggling practitioner, the first step is to recognize that **Lust is the perverted reflection of Love**. By experiencing a *Param Drstva* (Higher Taste), the lower taste naturally falls away.

### Practice Focus
- **Morning Routine:** Rise during *Brahma Muhurta*.
- **Association:** Avoid those who increase material agitation.
- **Service:** Keep the mind fully occupied in selfless activity.
    `
    }
};
