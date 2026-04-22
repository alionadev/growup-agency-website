import { component$, useStore, $ } from '@builder.io/qwik';
import { useHomePage } from '~/routes/[lang]/layout';

export const HomeFAQ = component$(() => {
  const { faqTitle, faqItems } = useHomePage().value;

  const state = useStore<{ openIndex: number | null }>({ openIndex: 0 });

  const toggle = $((index: number) => {
    state.openIndex = state.openIndex === index ? null : index;
  });

  const items = faqItems ?? [];

  return (
    <section class="faq">
      <div class="faq__inner">
        <h2 class="section-title">{faqTitle}</h2>

        <div class="faq__list">
          {items.map((item, index) => {
            const isOpen = state.openIndex === index;

            return (
              <div
                class={['faq__item', isOpen ? 'faq__item--open' : ''].join(' ')}
                key={`${item.question}-${index}`}
              >
                <button type="button" class="faq__question" onClick$={() => toggle(index)}>
                  <span>{item.question}</span>
                  <span class={['faq__icon', isOpen ? 'faq__icon--open' : ''].join(' ')}>
                    +
                  </span>
                </button>

                {isOpen && (
                  <div class="faq__answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});