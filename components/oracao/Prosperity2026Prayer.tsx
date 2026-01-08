import React from 'react';
import { useTranslations } from 'next-intl';

const Prosperity2026Prayer: React.FC = () => {
  const t = useTranslations('Prosperity2026Prayer');
  const tags = t.raw('tags') as string[];
  const paragraphs = t.raw('paragraphs') as string[];

  return (
    <div className="max-w-3xl mx-auto p-6 text-white/90 leading-relaxed">
      <h1 className="text-3xl font-bold text-center text-yellow-700 mb-2">
        {t('title')}
      </h1>

      <h3 className="text-center text-lg text-white/50 mb-8">
        {t('subtitle')}
      </h3>

      <div className="flex flex-wrap justify-center gap-4 text-sm mb-8">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-white/10 text-yellow-700 px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {paragraphs.map((paragraph, index) => (
        <p key={`paragraph-${index}`} className={index === 0 ? undefined : 'mt-3'}>
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default Prosperity2026Prayer;
