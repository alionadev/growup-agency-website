// src/components/service-page/ServiceOffersStack.tsx
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import type { ServiceOffer } from './types';
import '../../styles/service-stack.css';

type Props = {
  offers: ServiceOffer[];
};

export const ServiceOffersStack = component$<Props>(({ offers }) => {
  const sectionRef = useSignal<HTMLElement>();

  useVisibleTask$(() => {
    const section = sectionRef.value;
    if (!section) return;

    const cards = Array.from(
      section.querySelectorAll<HTMLElement>('.service-offer-card')
    );
    if (!cards.length) return;

    const onScroll = () => {
      const viewportCenter = window.innerHeight / 2;

      // ищем карточку, которая ближе всего к центру
      let nearest = 0;
      let nearestDist = Infinity;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - viewportCenter);

        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = i;
        }
      });

      // для каждой карточки считаем "глубину" стека
      cards.forEach((card, i) => {
        let stack = 0;

        // всё, что выше активной — позади, причём чем раньше, тем глубже
        if (i < nearest) {
          stack = nearest - i; // 1, 2, 3...
        } else {
          stack = 0; // активная и будущие — на переднем плане
        }

        card.style.setProperty('--stack', stack.toString());
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  return (
    <section ref={sectionRef} class="service-offers">
      {offers.map((offer, index) => (
        <article
          key={offer.title}
          class="service-offer-card"
          style={{ '--i': String(index) }}
        >
          <div class="service-offer-card__text">
            <p class="service-section-label">{offer.label}</p>
            <h2 class="service-section-title">{offer.title}</h2>
            <p class="service-offer-card__subtitle">{offer.subtitle}</p>

            <ul>
              {offer.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          <div class="service-offer-card__media">
            <img src={offer.image} alt={offer.imageAlt} loading="lazy" />
          </div>
        </article>
      ))}
    </section>
  );
});