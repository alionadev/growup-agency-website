import { component$ } from '@builder.io/qwik';
import { HomeFAQ } from './HomeFAQ';
import { HomeCTA } from './HomeCTA';
import '~/styles/home-faq-cta.css';

export const HomeFaqCta = component$(() => {
  return (
    <section class="home-faq-cta">
      <div class="home-faq-cta__inner">
        <div class="home-faq-cta__grid">
          <div class="home-faq-cta__left">
            <HomeFAQ />
          </div>

          <aside class="home-faq-cta__right">
            <div class="cta-card">
              <div class="cta-card__bg" aria-hidden="true" />
              <div class="cta-card__content">
                <HomeCTA />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
});