import {getTranslations} from 'next-intl/server';
import BackgroundGradient from '../BackgroundGradient';
import {BackgroundGrid} from '../BackgroundGrid';

export default async function Hero() {
  const t = await getTranslations('HomePage');
  return (
    <section style={{padding: '64px 16px', textAlign: 'center', position: 'relative', overflow: 'hidden'}}>
      {/* Hiệu ứng nền */}
      <BackgroundGrid
        gridLineStyles={[
          {
            background:
              'linear-gradient(to bottom, transparent 80px, var(--theme-border-color) 240px)',
          },
          {
            background:
              'linear-gradient(to bottom, transparent 160px, var(--theme-border-color) 240px)',
          },
          {
            background:
              'linear-gradient(to bottom, transparent 200px, var(--theme-border-color) 240px)',
          },
          {
            background:
              'linear-gradient(to bottom, transparent 160px, var(--theme-border-color) 240px)',
          },
          {
            background:
              'linear-gradient(to bottom, transparent 80px, var(--theme-border-color) 240px)',
          },
        ]}
        zIndex={-2}
      />
      <BackgroundGradient className="background-gradient" />

      {/* Nội dung chính */}
      <h1 style={{fontSize: '2.25rem', marginBottom: 12}}>{t('title')}</h1>
      {t.has?.('subtitle') && (
        <p style={{color: '#555', marginBottom: 20}}>{t('subtitle')}</p>
      )}
      <div style={{display: 'inline-flex', gap: 12}}>
        {t.has?.('ctaPrimary') && (
          <a href="#contact" style={{padding: '10px 16px', background: 'black', color: 'white', borderRadius: 6}}>
            {t('ctaPrimary')}
          </a>
        )}
        {t.has?.('ctaSecondary') && (
          <a href="#learn-more" style={{padding: '10px 16px', border: '1px solid #ddd', borderRadius: 6}}>
            {t('ctaSecondary')}
          </a>
        )}
      </div>
    </section>
  );
}
