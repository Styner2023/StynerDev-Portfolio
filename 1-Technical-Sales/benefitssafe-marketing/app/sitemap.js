const BASE = 'https://benefitssafe.com';

export default function sitemap() {
  const now = new Date();
  const pages = [
    { path: '/', priority: 1.0, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/services', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/team', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/blog', priority: 0.6, changeFrequency: 'weekly' },
    { path: '/blog/ssi-asset-limits-2025', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/blog/virtual-cards-ssi', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/blog/paper-check-costs', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/privacy', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/dpa', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/subprocessors', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/security', priority: 0.6, changeFrequency: 'monthly' },
  ];
  return pages.map((p) => ({
    url: `${BASE}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
