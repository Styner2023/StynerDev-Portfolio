import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Footer_02 from '@/components/footer/Footer_02';
import Header_02 from '@/components/header/Header_02';

export const metadata = {
  title: 'Data Processing Agreement | BenefitsSafe',
  description:
    'GDPR Article 28 Data Processing Agreement for BenefitsSafe nonprofit customers. SCCs, sub-processors, breach notification, audit rights.',
  openGraph: {
    title: 'Data Processing Agreement | BenefitsSafe',
    description:
      'GDPR Article 28 Data Processing Agreement for BenefitsSafe nonprofit customers.',
    url: 'https://benefitssafe.com/dpa',
    type: 'article',
  },
  alternates: { canonical: 'https://benefitssafe.com/dpa' },
};

function readLegalDoc(filename) {
  const filePath = path.join(process.cwd(), 'content', 'legal', filename);
  return fs.readFileSync(filePath, 'utf8');
}

export default function DpaPage() {
  const content = readLegalDoc('dpa.md');
  return (
    <>
      <Header_02 />
      <main className="main-wrapper relative overflow-hidden bg-white">
        <section className="py-14 lg:py-20">
          <div className="global-container">
            <div className="mx-auto max-w-4xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-wider text-colorViolet">
                Last updated: April 21, 2026
              </p>
              <article className="prose prose-lg max-w-none prose-headings:font-clashDisplay prose-headings:font-medium prose-a:text-colorViolet prose-table:text-sm">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer_02 />
    </>
  );
}
