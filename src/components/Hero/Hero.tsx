import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import BackgroundGradient from '../BackgroundGradient';
import { BackgroundGrid } from '../BackgroundGrid';
import { BackgroundScanline } from '../BackgroundScanline/index';
import styles from './Hero.module.scss';

export default async function Hero() {
  const t = await getTranslations('Hero');
  return (
    <section className={styles.heroSection}>
      {/* Hiệu ứng nền */}
      <BackgroundScanline className="absolute inset-0 z-0" />
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

      {/* Cột trái: Nội dung chính */}
      <div style={{ zIndex: 1, textAlign: 'left' }}>
        <h1 style={{ color: '#ffffffff',fontSize: '2.25rem', marginBottom: 12 }}>{t('title')}</h1>
        {t.has?.('subtitle') && (
          <p style={{ color: '#ffffffff', marginBottom: 20 }}>{t('subtitle')}</p>
        )}
        <div style={{ display: 'flex', gap: 12 }}>
          {t.has?.('ctaPrimary') && (
            <a href="#contact" style={{ padding: '10px 16px', background: 'black', color: 'white', borderRadius: 6 }}>
              {t('ctaPrimary')}
            </a>
          )}
          {t.has?.('ctaSecondary') && (
            <a href="#learn-more" style={{ padding: '10px 16px', border: '1px solid #ddd', borderRadius: 6 }}>
              {t('ctaSecondary')}
            </a>
          )}
        </div>
      </div>

      {/* Cột phải: Stack 2 ảnh như sample MediaStack */}
      <div className={styles.heroImageStack}>
        {/* Ảnh 1: Top right */}
        <Image
          src="/images/Picture1.png"
          alt={t('heroImage1Alt')}
          width={600}
          height={600}
          priority
          className={styles.heroImageOne}
        />
        {/* Ảnh 2: Bottom left */}
        <Image
          src="/images/Picture2.png"
          alt={t('heroImage2Alt')}
          width={400}
          height={400}
          priority
          className={styles.heroImageTwo}
        />
      </div>
    </section>
  );
}
