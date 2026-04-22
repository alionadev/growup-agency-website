// src/routes/[lang]/pricing/index.tsx
import { component$, useSignal, QRL } from '@builder.io/qwik';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import { PricingFormat } from '~/components/sections/pricing/PricingFormat';
import { HomeFaqCta } from '~/components/sections/home/HomeFaqCta';
import { usePricingPage, type PricingPageVM, type CategoryId } from './layout';
import '~/styles/pricing.css';

export default component$(() => {
  const data = usePricingPage().value;
  const loc = useLocation();
  const nav = useNavigate();

  const categories = data.categories ?? [];

  // Read initial tab from URL ?tab=branding, fallback to first category
  const initialTab = () => {
    const param = loc.url.searchParams.get('tab') as CategoryId | null;
    if (param && categories.find((c) => c.id === param)) return param;
    return (categories[0]?.id ?? 'ads') as CategoryId;
  };

  const activeCategory = useSignal<CategoryId>(initialTab());
  const showTypeModal = useSignal(false);

  // Sync URL when tab changes — inlined in onClick$ below

  const currentCategory = () =>
    categories.find((c) => c.id === activeCategory.value) ?? categories[0];

  if (!categories.length) {
    return (
      <main class="page page--pricing">
        <PricingFormat />
        <section class="pricing">
          <div class="pricing__inner">
            <h1 class="section-title section-title--center">Pricing</h1>
            <p class="section-subtitle section-subtitle--center">
              No pricing categories yet.
            </p>
          </div>
        </section>
      </main>
    );
  }

  const cat = currentCategory();

  return (
    <main class="page page--pricing">
      <section class="pricing">
        <div class="pricing__inner">
          <div class="pricing-tabs">
            {categories.map((c) => (
              <button
                key={c.id}
                class={{
                  'pricing-tabs__btn': true,
                  'pricing-tabs__btn--active': activeCategory.value === c.id,
                }}
                onClick$={() => {
                  activeCategory.value = c.id as CategoryId;
                  const url = new URL(loc.url.href);
                  url.searchParams.set('tab', c.id);
                  nav(url.pathname + url.search, { replaceState: true });
                }}
                type="button"
              >
                {c.heading}
              </button>
            ))}
          </div>

          <div class="pricing-header">
            <h1 class="section-title section-title--center">{cat.title}</h1>
            <p class="section-subtitle section-subtitle--center">{cat.subtitle}</p>
          </div>

          <div class="pricing-grid">
            {cat.tiers.map((tier) => (
              <article
                key={tier.id}
                class={{
                  'plan-card': true,
                  'plan-card--highlighted': tier.highlighted,
                }}
              >
                <div class="plan-card__head">
                  <div class="plan-card__name">{tier.name}</div>
                  <div class="plan-card__price-wrap">
                    <div class="plan-card__price">{tier.price}</div>
                    {tier.oldPrice && <div class="plan-card__old-price">{tier.oldPrice}</div>}
                  </div>
                </div>

                <ul class="plan-card__features">
                  {tier.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>

                <div class="plan-card__actions">
                  <button
                    class="btn btn--primary plan-card__btn-main"
                    type="button"
                    onClick$={() => (showTypeModal.value = true)}
                  >
                    {data.discussBtn}
                  </button>

                  <button
                    class="plan-card__btn-gift"
                    type="button"
                    aria-label={data.giftAria}
                    onClick$={() => {
                      if (typeof window !== 'undefined') {
                        window.dispatchEvent(
                          new CustomEvent('growup-open-discount', {
                            detail: { source: 'popup_gift' },
                          }),
                        );
                        window.localStorage.removeItem('growup_discount_closed');
                      }
                    }}
                  >
                    🎁
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <PricingFormat />
      <HomeFaqCta />

      {showTypeModal.value && (
        <TypeModal page={data} onClose$={() => (showTypeModal.value = false)} />
      )}
    </main>
  );
});

/* -------- MODAL ---------- */

type ModalProps = {
  onClose$: QRL<() => void>;
  page: PricingPageVM;
};

export const TypeModal = component$<ModalProps>(({ onClose$, page }) => {
  return (
    <div class="modal">
      <div class="modal__backdrop" onClick$={onClose$} />
      <div class="modal__card">
        <button class="modal__close" type="button" onClick$={onClose$}>✕</button>

        <h2 class="modal__title">{page.modalTitle}</h2>

        <form class="modal-form" preventdefault:submit>
          <label class="modal-form__field">
            <span class="modal-form__label">{page.modalTypeLabel}</span>
            <select class="modal-form__select" name="type">
              <option>Paid Ads</option>
              <option>Social Media Marketing</option>
              <option>Branding</option>
              <option>Web</option>
            </select>
          </label>

          <label class="modal-form__field">
            <span class="modal-form__label">{page.modalNameLabel}</span>
            <input
              class="modal-form__input"
              type="text"
              name="name"
              placeholder={page.modalNamePlaceholder}
              required
            />
          </label>

          <label class="modal-form__field">
            <span class="modal-form__label">{page.modalPhoneLabel}</span>
            <input
              class="modal-form__input"
              type="tel"
              name="phone"
              placeholder={page.modalPhonePlaceholder}
            />
          </label>

          <button class="btn btn--primary modal-form__submit" type="submit">
            {page.modalSubmit}
          </button>
        </form>
      </div>
    </div>
  );
});