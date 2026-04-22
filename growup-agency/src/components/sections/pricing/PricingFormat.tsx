import { component$ } from '@builder.io/qwik';
import { usePricingPage } from '~/routes/[lang]/pricing/layout';

export const PricingFormat = component$(() => {
  const { formatBlock } = usePricingPage().value;

  // если в Sanity ещё не заполнено — не ломаем страницу
  if (!formatBlock?.title || !formatBlock?.steps?.length) {
    return null;
  }

  return (
    <section class="pricing-format" id="format">
      <div class="pricing-format__inner">
        <header class="pricing-format__header">
          {formatBlock.label && <p class="section-label">{formatBlock.label}</p>}

          <h2 class="section-title">{formatBlock.title}</h2>

          {formatBlock.subtitle && (
            <p class="section-subtitle">{formatBlock.subtitle}</p>
          )}
        </header>

        <div class="pricing-format__grid">
          {formatBlock.steps.map((step, idx) => (
            <article class="format-card" key={`${step.title}-${idx}`}>
              <div class="format-card__badge">
                {step.badge || String(idx + 1).padStart(2, '0')}
              </div>

              <h3 class="format-card__title">{step.title}</h3>

              {step.text && <p class="format-card__text">{step.text}</p>}

              {!!step.bullets?.length && (
                <ul class="format-card__list">
                  {step.bullets.map((b, i) => (
                    <li key={`${b}-${i}`}>{b}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});