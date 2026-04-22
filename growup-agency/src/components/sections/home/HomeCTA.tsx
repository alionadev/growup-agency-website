import { component$, useStore, $, useComputed$ } from '@builder.io/qwik';
import { useHomePage } from '~/routes/[lang]/layout';

export const HomeCTA = component$(() => {
  const { ctaForm } = useHomePage().value;

  const t = useComputed$(() => ctaForm);

  const form = useStore({
    name: '',
    phone: '',
    email: '',
    sent: false,
    error: '',
  });

  const handleSubmit = $(async (event: Event) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);

    const name = String(formData.get('name') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();

    if (!name || (!phone && !email)) {
      form.error = t.value.errorRequired;
      form.sent = false;
      return;
    }

    let page = '';
    if (typeof window !== 'undefined') page = window.location.pathname;

    try {
      form.error = '';
      form.sent = false;

      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, page }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        form.error = data?.error || t.value.errorSend;
        form.sent = false;
        return;
      }

      form.sent = true;
      form.name = '';
      form.phone = '';
      form.email = '';
      target.reset();
    } catch {
      form.error = t.value.errorServer;
      form.sent = false;
    }
  });

  return (
    <section class="cta" id="consult">
      <div class="cta__inner">
        <h2 class="section-title section-title--center">{t.value.title}</h2>

        <p class="section-subtitle section-subtitle--center">{t.value.subtitle}</p>

        <form class="cta__form" preventdefault:submit onSubmit$={handleSubmit}>
          <div class="cta__fields">
            <input
              class="cta__input"
              type="text"
              name="name"
              placeholder={t.value.placeholderName}
              value={form.name}
              onInput$={(e) => (form.name = (e.target as HTMLInputElement).value)}
              required
            />

            <input
              class="cta__input"
              type="text"
              name="phone"
              placeholder={t.value.placeholderPhone}
              value={form.phone}
              onInput$={(e) => (form.phone = (e.target as HTMLInputElement).value)}
            />

            <input
              class="cta__input"
              type="email"
              name="email"
              placeholder={t.value.placeholderEmail}
              value={form.email}
              onInput$={(e) => (form.email = (e.target as HTMLInputElement).value)}
            />
          </div>

          <button class="btn btn--primary" type="submit">
            {t.value.buttonText}
          </button>
        </form>

        <p class="cta__note">{t.value.note}</p>

        {form.error && <p class="cta__message cta__message--error">{form.error}</p>}

        {form.sent && !form.error && (
          <p class="cta__message cta__message--success">{t.value.success}</p>
        )}
      </div>
    </section>
  );
});