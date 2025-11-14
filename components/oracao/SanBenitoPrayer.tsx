import React from "react";
import { useTranslations } from 'next-intl';

export const SanBenitoPrayer: React.FC = () => {
  const t = useTranslations('SaintBenedictPrayer');
  
  return (
    <div className="max-w-3xl mx-auto p-6 text-white/90 leading-relaxed">
      <h1 className="text-3xl font-bold text-center text-yellow-700 mb-2">
        {t('title')}
      </h1>

      <h3 className="text-center text-lg text-white/50 mb-8">
        {t('subtitle')}
      </h3>

      <div className="flex justify-center gap-4 text-sm mb-8">
        <span className="bg-white/10 text-yellow-700 px-3 py-1 rounded-full">{t('tags.prosperity')}</span>
        <span className="bg-white/10 text-yellow-700 px-3 py-1 rounded-full">{t('tags.health')}</span>
        <span className="bg-white/10 text-yellow-700  px-3 py-1 rounded-full">{t('tags.love')}</span>
        <span className="bg-white/10 text-yellow-700 px-3 py-1 rounded-full">{t('tags.protection')}</span>
      </div>

      <p>{t('intro1')}</p>
      <p className="mt-3">{t('intro2')}</p>
      <p className="mt-3">{t('intro3')}</p>

      {/* Invocación */}
      <h2 className="text-2xl font-semibold text-yellow-700 mt-10 mb-4">
        {t('invocationTitle')}
      </h2>

      <p>{t('invocation1')}</p>
      <p className="mt-3">{t('invocation2')}</p>
      <p className="mt-3">{t('invocation3')}</p>

      {/* Primera Petición */}
      <h2 className="text-2xl font-semibold text-yellow-700 mt-10 mb-4">
        {t('firstPetitionTitle')}
      </h2>

      <h3 className="text-xl font-semibold text-yellow-600 mt-4">{t('workBlessingTitle')}</h3>
      <p>{t('workBlessing')}</p>

      <h3 className="text-xl font-semibold text-yellow-600 mt-4">{t('breakChainsTitle')}</h3>
      <p>{t('breakChains')}</p>

      <h3 className="text-xl font-semibold text-yellow-600 mt-4">{t('multiplicationTitle')}</h3>
      <p>{t('multiplication')}</p>

      <p className="mt-3">{t('prosperity1')}</p>
      <p className="italic mt-3">"{t('prosperity2')}"</p>
      <p className="mt-3">{t('prosperity3')}</p>

      {/* Segunda Petición */}
      <h2 className="text-2xl font-semibold text-yellow-700 mt-10 mb-4">
        {t('secondPetitionTitle')}
      </h2>

      <p>{t('health1')}</p>

      <ul className="list-disc pl-6 mt-3 space-y-2">
        <li><strong>{t('healthEyes')}</strong></li>
        <li><strong>{t('healthEars')}</strong></li>
        <li><strong>{t('healthHeart')}</strong></li>
        <li><strong>{t('healthMind')}</strong></li>
      </ul>

      <p className="mt-3">{t('health2')}</p>
      <p className="mt-3">{t('health3')}</p>
      <p className="mt-3">{t('health4')}</p>

      {/* Tercera Petición */}
      <h2 className="text-2xl font-semibold text-yellow-700 mt-10 mb-4">
        {t('thirdPetitionTitle')}
      </h2>

      <p>{t('love1')}</p>

      <h3 className="text-xl font-semibold text-yellow-600 mt-4">{t('soulCleansingTitle')}</h3>
      <p>{t('soulCleansing')}</p>

      <h3 className="text-xl font-semibold text-yellow-600 mt-4">{t('heartHealingTitle')}</h3>
      <p>{t('heartHealing')}</p>

      <h3 className="text-xl font-semibold text-yellow-600 mt-4">{t('divineMeetingTitle')}</h3>
      <p>{t('divineMeeting')}</p>

      <h3 className="text-xl font-semibold text-yellow-600 mt-4">{t('bondsBlessingTitle')}</h3>
      <p>{t('bondsBlessing')}</p>

      <p className="italic mt-3">"{t('love2')}"</p>

      {/* Cuarta Petición */}
      <h2 className="text-2xl font-semibold text-yellow-700 mt-10 mb-4">
        {t('fourthPetitionTitle')}
      </h2>

      <p>{t('protection1')}</p>

      <h3 className="text-xl font-semibold text-yellow-600 mt-4">{t('breakSpellsTitle')}</h3>
      <p>{t('breakSpells')}</p>

      <h3 className="text-xl font-semibold text-yellow-600 mt-4">{t('cancelWorksTitle')}</h3>
      <p>{t('cancelWorks')}</p>

      <h3 className="text-xl font-semibold text-yellow-600 mt-4">{t('transformDarknessTitle')}</h3>
      <p>{t('transformDarkness')}</p>

      <p className="mt-3">{t('protection2')}</p>
      <p className="mt-3">{t('protection3')}</p>
      <p className="mt-3">{t('protection4')}</p>

      {/* Agradecimiento */}
      <h2 className="text-2xl font-semibold text-yellow-700 mt-10 mb-4">
        {t('thanksgivingTitle')}
      </h2>

      <p>{t('thanks1')}</p>
      <p className="mt-3">{t('thanks2')}</p>
      <p className="mt-3">{t('thanks3')}</p>

      <div className="mt-6 space-y-2">
        <p><strong>{t('faithPercentage')}</strong></p>
        <p><strong>{t('protectionPercentage')}</strong></p>
        <p><strong>{t('blessingPercentage')}</strong></p>
      </div>

      <h3 className="text-xl font-bold text-yellow-600 mt-6">{t('declarationTitle')}</h3>

      <ul className="list-disc pl-6 mt-3 space-y-2">
        <li>{t('declaration1')}</li>
        <li>{t('declaration2')}</li>
        <li>{t('declaration3')}</li>
        <li>{t('declaration4')}</li>
      </ul>

      <p className="mt-4">{t('closing1')}</p>
      <p className="font-semibold mt-4">{t('amen')}</p>
      <p className="mt-3">{t('closing2')}</p>
    </div>
  );
};

export default SanBenitoPrayer;
