import {
  component$,
  useSignal,
  useVisibleTask$,
  useComputed$,
  $,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

const WEBHOOK_URL =
  'https://hook.eu1.make.com/2e67noqsch8igp0kb6jsna02fnlpxf97';

/**
 * Маски телефонов по коду страны
 */
const PHONE_MASKS: Record<string, string> = {
  '+373': '+373 (XX) XXX-XXX', // Молдова
  '+40': '+40 (XXX) XXX-XXX', // Румыния
  '+380': '+380 (XX) XXX-XX-XX', // Украина
};

/**
 * Накладываем маску на цифры (без кода страны)
 */
function applyMaskToLocalDigits(localDigits: string, mask: string): string {
  let i = 0;
  let res = '';

  for (const ch of mask) {
    if (ch === 'X') {
      res += localDigits[i] ?? '';
      i++;
    } else {
      res += ch;
    }
  }

  return res;
}

/**
 * Подготовка телефона:
 * - чистим ввод
 * - определяем код страны
 * - накладываем нужную маску
 * Возвращаем:
 *   view — то, что показываем в инпуте
 *   raw  — только цифры (для отправки)
 */
function formatPhone(value: string): { view: string; raw: string } {
  // оставляем только цифры и плюс
  let v = value.replace(/[^\d+]/g, '');

  // если начали без "+", добавим
  if (v && v[0] !== '+') v = '+' + v;

  // только цифры (без плюса)
  const digitsOnly = v.replace(/\D/g, '');

  // определяем код страны
  let code = '';
  if (digitsOnly.startsWith('373')) code = '+373';
  else if (digitsOnly.startsWith('40')) code = '+40';
  else if (digitsOnly.startsWith('380')) code = '+380';

  let view = v;

  if (code) {
    const mask = PHONE_MASKS[code];
    const codeDigitsLen = code.replace('+', '').length;
    const localDigits = digitsOnly.slice(codeDigitsLen); // цифры после кода
    view = applyMaskToLocalDigits(localDigits, mask);
  }

  return { view, raw: digitsOnly };
}

type Lang = 'ru' | 'ro' | 'en';

function getLangFromPath(pathname: string): Lang {
  const seg = pathname.split('/').filter(Boolean)[0];
  if (seg === 'ru' || seg === 'ro' || seg === 'en') return seg;
  return 'ru';
}

const I18N = {
  ru: {
    discount: '10%',
    subtitle: 'Для твоего первого заказа!',
    serviceLabel: 'Услуга',
    nameLabel: 'Ваше имя',
    namePh: 'Введите имя',
    phoneLabel: 'Телефон',
    phonePh: '+373 (__) ___-___',
    submitIdle: 'Забрать скидку',
    submitSending: 'Отправляем…',
    decline: 'мне не нужна скидка',
    comment: 'Скидка 10% на первый заказ',
    services: {
      paidAds: 'Платная реклама',
      smm: 'Social Media Marketing',
      branding: 'Branding',
      web: 'WEB-разработка',
    },
  },
  ro: {
    discount: '10%',
    subtitle: 'Pentru prima ta comandă!',
    serviceLabel: 'Serviciu',
    nameLabel: 'Numele tău',
    namePh: 'Introduceți numele',
    phoneLabel: 'Telefon',
    phonePh: '+40 (___) ___-___',
    submitIdle: 'Ia reducerea',
    submitSending: 'Se trimite…',
    decline: 'nu am nevoie de reducere',
    comment: 'Reducere 10% la prima comandă',
    services: {
      paidAds: 'Publicitate plătită',
      smm: 'SMM',
      branding: 'Branding',
      web: 'Dezvoltare web',
    },
  },
  en: {
    discount: '10%',
    subtitle: 'For your first order!',
    serviceLabel: 'Service',
    nameLabel: 'Your name',
    namePh: 'Enter your name',
    phoneLabel: 'Phone',
    phonePh: '+373 (__) ___-___',
    submitIdle: 'Get discount',
    submitSending: 'Sending…',
    decline: "I don't need a discount",
    comment: '10% discount for first order',
    services: {
      paidAds: 'Paid Ads',
      smm: 'SMM',
      branding: 'Branding',
      web: 'Web development',
    },
  },
} as const satisfies Record<Lang, any>;

export const GlobalDiscount = component$(() => {
  const loc = useLocation();

  const lang = useComputed$<Lang>(() => getLangFromPath(loc.url.pathname));
  const t = useComputed$(() => I18N[lang.value]);

  const show = useSignal(false);
  const sending = useSignal(false);
  const sent = useSignal(false);
  const phoneRaw = useSignal(''); // только цифры
  const phoneView = useSignal(''); // отформатированная строка

  const storageKey = useComputed$(
    () => `growup_discount_closed:${lang.value}`,
  );

  // ОТКРЫТЬ попап
  const open$ = $(() => {
    show.value = true;
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(storageKey.value);
    }
  });

  // ЗАКРЫТЬ попап
  const close$ = $(() => {
    show.value = false;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(storageKey.value, '1');
    }
  });

  // Таймер + реакция на "подарочек"
  // ВАЖНО: перезапускаем при смене pathname (смена языка через slug)
  useVisibleTask$(({ track, cleanup }) => {
    if (typeof window === 'undefined') return;

    track(() => loc.url.pathname);

    const closed = window.localStorage.getItem(storageKey.value);

    let timerId: number | undefined;
    if (!closed) {
      timerId = window.setTimeout(() => {
        open$();
      }, 5000); // можно временно ставить 2000 для теста
    }

    const handler = () => open$();
    window.addEventListener('growup-open-discount', handler);

    cleanup(() => {
      if (timerId) window.clearTimeout(timerId);
      window.removeEventListener('growup-open-discount', handler);
    });
  });

  // Отправка формы в Make → Notion
  const handleSubmit$ = $(async (_event: SubmitEvent, form: HTMLFormElement) => {
    if (sending.value) return;
    sending.value = true;
    sent.value = false;

    const formData = new FormData(form);
    const name = String(formData.get('name') ?? '').trim();
    const service = String(formData.get('service') ?? '').trim();

    // Берём именно "сырые" цифры, а не маску
    const phone = phoneRaw.value.trim();

    if (!name || !phone) {
      sending.value = false;
      return;
    }

    const page =
      typeof window !== 'undefined' ? window.location.pathname : '';

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          service,
          source: 'discount_popup',
          discount: '10%',
          page,
          lang: lang.value,
          comment: t.value.comment,
        }),
      });

      sent.value = true;
      form.reset();
      phoneView.value = '';
      phoneRaw.value = '';
      close$();
    } catch (e) {
      console.error('Discount form send error', e);
    } finally {
      sending.value = false;
    }
  });

  // Обработчик ввода телефона
  const handlePhoneInput$ = $((event: Event) => {
    const input = event.target as HTMLInputElement;
    const { view, raw } = formatPhone(input.value);

    input.value = view;
    phoneView.value = view;
    phoneRaw.value = raw;
  });

  return (
    <>
      {show.value && (
        <div class="modal">
          <div class="modal__backdrop" onClick$={close$} />
          <div class="modal__card modal__card--narrow">
            <button class="modal__close" type="button" onClick$={close$}>
              ✕
            </button>

            <div class="discount-headline">{t.value.discount}</div>
            <p class="discount-subtitle">{t.value.subtitle}</p>

            <form
              class="modal-form"
              preventdefault:submit
              onSubmit$={handleSubmit$}
            >
              <label class="modal-form__field">
                <span class="modal-form__label">{t.value.serviceLabel}</span>
                <select class="modal-form__select" name="service">
                  <option value="Paid Ads">{t.value.services.paidAds}</option>
                  <option value="SMM">{t.value.services.smm}</option>
                  <option value="Branding">{t.value.services.branding}</option>
                  <option value="WEB">{t.value.services.web}</option>
                </select>
              </label>

              <label class="modal-form__field">
                <span class="modal-form__label">{t.value.nameLabel}</span>
                <input
                  class="modal-form__input"
                  type="text"
                  name="name"
                  placeholder={t.value.namePh}
                  required
                />
              </label>

              <label class="modal-form__field">
                <span class="modal-form__label">{t.value.phoneLabel}</span>
                <input
                  class="modal-form__input"
                  type="tel"
                  name="phone"
                  placeholder={t.value.phonePh}
                  value={phoneView.value}
                  onInput$={handlePhoneInput$}
                />
              </label>

              <button
                class="btn btn--primary modal-form__submit"
                type="submit"
                disabled={sending.value}
              >
                {sending.value ? t.value.submitSending : t.value.submitIdle}
              </button>
            </form>

            <button type="button" class="discount-link" onClick$={close$}>
              {t.value.decline}
            </button>
          </div>
        </div>
      )}
    </>
  );
});