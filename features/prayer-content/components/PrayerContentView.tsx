import type { PrayerContentCopy } from '@/features/prayer-content/types';

interface PrayerContentViewProps {
  content: PrayerContentCopy;
}

export function PrayerContentView({ content }: PrayerContentViewProps) {
  return (
    <div className="mx-auto max-w-3xl p-6 leading-relaxed text-white/90">
      <h1 className="mb-2 text-center text-3xl font-bold text-yellow-700">{content.title}</h1>
      <h3 className="mb-8 text-center text-lg text-white/50">{content.subtitle}</h3>

      <div className="mb-8 flex flex-wrap justify-center gap-4 text-sm">
        {content.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-yellow-700">
            {tag}
          </span>
        ))}
      </div>

      {content.sections.map((section) => (
        <div key={section.title || section.paragraphs[0]}>
          {section.title ? (
            <h2 className="mb-4 mt-10 text-2xl font-semibold text-yellow-700">{section.title}</h2>
          ) : null}

          {section.paragraphs.map((paragraph, index) => (
            <p key={paragraph} className={index > 0 ? 'mt-3' : undefined}>
              {paragraph}
            </p>
          ))}
        </div>
      ))}

      {content.closing ? <p className="mt-4 font-semibold">{content.closing}</p> : null}
      <p className={content.closing ? 'font-semibold' : 'mt-4 font-semibold'}>{content.amen}</p>
    </div>
  );
}
