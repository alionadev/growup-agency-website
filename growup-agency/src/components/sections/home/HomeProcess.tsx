import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { useHomePage } from '~/routes/[lang]/layout';
import '../../../styles/home.css';

export const HomeProcess = component$(() => {
  const { processTitle, processSteps } = useHomePage().value;

  const activeIndex = useSignal(0);

  useVisibleTask$(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('.process__item'));
    if (!items.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (!visible) return;

        const idx = Number((visible.target as HTMLElement).dataset.index ?? 0);
        if (!Number.isNaN(idx)) activeIndex.value = idx;
      },
      {
        root: null,
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0.2, 0.35, 0.5, 0.65, 0.8],
      }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });

  return (
    <section class="process" id="process">
      <div class="process__inner">
        <h2 class="section-title">{processTitle}</h2>

        <div class="process__list">
          {processSteps.map((step, index) => (
            <div
              class={`process__item ${activeIndex.value === index ? 'is-active' : ''}`}
              key={`${step.title}-${index}`}
              data-index={index}
            >
              <div class="process__number">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </div>

              <div class="process__content">
                <h3 class="process__title">{step.title}</h3>
                <p class="process__text">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});