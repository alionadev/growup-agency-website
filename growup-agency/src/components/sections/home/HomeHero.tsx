// src/components/sections/home/HomeHero.tsx
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { useHomePage } from '~/routes/[lang]/layout';
import '../../../styles/home.css';

export const HomeHero = component$(() => {
  const ready = useSignal(false);
  const { hero } = useHomePage().value;
  const loc = useLocation();
  const lang = (loc.params.lang as string) || 'ru';

  useVisibleTask$(() => {
    if (!customElements.get('spline-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src =
        'https://unpkg.com/@splinetool/viewer@1.12.28/build/spline-viewer.js';
      document.head.appendChild(script);
    }
  });

  return (
    <section class={`hero ${ready.value ? 'is-ready' : ''}`}>
      <div class="hero__bg" aria-hidden="true">
        <spline-viewer
          url="https://prod.spline.design/9O71k9-PdFCjz4QQ/scene.splinecode"
          render-fps="30"
        ></spline-viewer>
      </div>

      <div class="hero__overlay" aria-hidden="true"></div>

      <div class="hero__inner">
        <div class="hero__content">



          <div class="hero__text-content">
            <div>
              <p class="hero__subtitle">{hero.subtitle}</p>
              <p class="hero__text">{hero.text}</p>
            </div>

            <div class="hero__actions">
              <a href={`/${lang}/contact`} class="btn btn--primary">
              {hero.ctaPrimary}
            </a>
            <a href={`/${lang}/projects`} class="btn btn--ghost">
              {hero.ctaSecondary}
            </a>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
});