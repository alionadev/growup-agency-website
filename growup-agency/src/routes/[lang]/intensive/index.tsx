import { $, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { type DocumentHead, useLocation, useNavigate } from '@builder.io/qwik-city';
import '~/styles/intensive.css';

type Lang = 'ru' | 'en' | 'ro';

const LOCALES: Lang[] = ['ru', 'en', 'ro'];

const getLang = (raw?: string): Lang =>
  raw && LOCALES.includes(raw as Lang) ? (raw as Lang) : 'ru';

const program = [
  {
    number: 'День 1',
    title: 'Как сделать бренд узнаваемым в Румынии и увеличить продажи',
    bullets: [
      'Разбор рабочих инструментов маркетинга в Румынии',
      'Техники продаж и привлечения клиентов в 2026 году',
      'Как быть конкурентноспособным даже с небольшим бюджетом',
      'С чего начать при выходе на новый рынок',
    ],
    result:
      'Определитесь со стратегией продвижения для своего бизнеса. Выстроите позиционирование своего бренда.',
  },
  {
    number: 'День 2',
    title: 'Упаковка бренда в онлайне',
    bullets: [
      'Оформление страниц в Instagram, Facebook, TikTok и Google Business',
      'Создание воронки продаж в каждой социальной сети',
      'Презентация своих услуг на холодную и теплую аудиторию',
      'Форматы продающего контента',
    ],
    result:
      'Упакуете страницы в соц сетях по продающей структуре и увеличите лояльность ваших покупателей.',
  },
  {
    number: 'День 3',
    title: 'Разработка оферов для рекламных кампаний',
    bullets: [
      'Техники написания оферов',
      'Как создавать предложения на основе целей продаж',
      'Как донести свои сильные стороны на простом языке для клиентов',
      'Учимся создавать рекламные креативы',
    ],
    result:
      'Составите рекламные оферы (предложения) для своей рекламной кампании. Научитесь создавать рекламные креативы.',
  },
  {
    number: 'День 4',
    title: 'Реклама для своего бизнеса',
    bullets: [
      'Запуск рекламы через телефон',
      'Запуск рекламы через Ads Manager в Инстаграм и Фейсбук',
      'Выбор аудитории',
      'Как контролировать бюджет и получать заявки',
      'Учимся анализировать показатели в маркетинге',
    ],
    result:
      'Запустите свою первую платную рекламную кампанию. Раз и на всегда разберетесь с бюджетом на маркетинг и выстроите систему привлечения клиентов.',
  },
];

const audience = [
  {
    className: 'audience-card--dark',
    title: 'Владелец малого бизнеса',
    text: 'который хочет больше клиентов',
    index: '01',
    icon: '💼',
  },
  {
    className: 'audience-card--light',
    title: 'Бьюти-мастер',
    text: 'или владелец небольшого салона',
    index: '02',
    icon: '💅',
  },
  {
    className: 'audience-card--red',
    title: 'Фитнес-тренер',
    text: 'или спортивный специалист',
    index: '03',
    icon: '🏋️',
  },
  {
    className: 'audience-card--blue',
    title: 'Кондитер',
    text: 'или мастер тортов на заказ',
    index: '04',
    icon: '🍰',
  },
  {
    className: 'audience-card--light',
    title: 'Массажист',
    text: 'который хочет загрузить расписание',
    index: '05',
    icon: '💆',
  },
  {
    className: 'audience-card--yellow',
    title: 'Lash-мастер',
    text: 'или специалист по наращиванию',
    index: '06',
    icon: '✨',
  },
  {
    className: 'audience-card--dark audience-card--wide',
    title: 'Владелец',
    text: 'интернет-магазина',
    index: '07',
    icon: '🛍️',
  },
  {
    className: 'audience-card--light',
    title: 'Психолог',
    text: 'или эксперт по личному развитию',
    index: '08',
    icon: '🌿',
  },
  {
    className: 'audience-card--red',
    title: 'Коуч',
    text: 'или наставник',
    index: '09',
    icon: '💬',
    italic: true,
  },
];

const results = [
  'Создавать рекламные креативы для своего бизнеса — видео и баннеры',
  'Самостоятельно запускать рекламу в Facebook и Instagram',
  'Понимать, какие маркетинговые инструменты работают именно в Румынии',
  'Упаковать бизнес так, чтобы он вызывал доверие и продавал',
  'Создать сильное предложение для своих клиентов',
  'Получить готовый план продвижения на ближайшие 30 дней',
];

const includes = [
  ['🎓', '4 лекции в живом формате'],
  ['💻', 'Практика прямо на уроках'],
  ['🎥', 'Уроки в записи'],
  ['📝', 'Практические домашние задания'],
  ['📈', 'Помощь в создании маркетинг стратегии'],
  ['💬', 'Обратная связь в течение 3х недель после обучения'],
];

const faq = [
  {
    question: 'Сколько длится интенсив?',
    answer:
      '4 дня обучения офлайн в Бухаресте, плюс доступ к записям всех занятий и 3 недели поддержки после окончания.',
  },
  {
    question: 'Подойдёт ли мне, если у меня ещё нет бизнеса или клиентов?',
    answer:
      'Да. Интенсив поможет понять, как упаковать идею, выбрать аудиторию и подготовить первые шаги для продвижения.',
  },
  {
    question: 'Будут ли записи занятий?',
    answer: 'Да, записи всех занятий входят в участие.',
  },
  {
    question: 'Что если у меня останутся вопросы после интенсива?',
    answer: 'После обучения предусмотрены 3 недели поддержки и ответы на вопросы.',
  },
  {
    question: 'Какая цена интенсива?',
    answer: 'Стоимость интенсива 1900 RON, но сейчас его можно приобрести за 1200 RON',
  },
];

export const head: DocumentHead = ({ params, url }) => {
  const lang = getLang(params.lang as string | undefined);
  const title = 'Интенсив по маркетингу в Бухаресте | GrowUp Agency';
  const description =
    '4-дневный офлайн интенсив: как увеличить продажи и поднять узнаваемость в Румынии.';
  const image = `${url.origin}/preview.png?v=20260720`;

  return {
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:site_name', content: 'GrowUp Agency' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url.href },
      { property: 'og:image', content: image },
      { property: 'og:image:secure_url', content: image },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: title },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: title },
      { name: 'robots', content: lang ? 'index, follow' : 'index, follow' },
    ],
  };
};

export default component$(() => {
  const loc = useLocation();
  const nav = useNavigate();
  const lang = getLang(loc.params.lang as string | undefined);
  const isLeadModalOpen = useSignal(false);
  const leadSending = useSignal(false);
  const leadError = useSignal<string | null>(null);

  const openLeadModal$ = $(() => {
    leadError.value = null;
    isLeadModalOpen.value = true;
  });

  const closeLeadModal$ = $(() => {
    if (leadSending.value) return;
    isLeadModalOpen.value = false;
    leadError.value = null;
  });

  const handleLeadSubmit$ = $(async (_event: SubmitEvent, form: HTMLFormElement) => {
    if (leadSending.value) return;

    leadSending.value = true;
    leadError.value = null;

    const formData = new FormData(form);
    const name = String(formData.get('name') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const telegram = String(formData.get('telegram') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'marketing_intensive',
          course: 'Интенсив по маркетингу в Румынии',
          page: loc.url.pathname,
          lang,
          name,
          phone,
          telegram,
          email,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Send failed');
      }

      form.reset();
      isLeadModalOpen.value = false;
      nav(`/${lang}/intensive/thanks/`);
    } catch (e) {
      console.error(e);
      leadError.value =
        e instanceof Error && e.message
          ? e.message
          : 'Не получилось отправить заявку. Попробуйте ещё раз.';
    } finally {
      leadSending.value = false;
    }
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const page = document.querySelector('.intensive-page');
    const shortWordPattern = /(^|[\s([{«„“"'])([А-Яа-яЁёA-Za-z]{1,2})\s+/g;

    if (page) {
      const walker = document.createTreeWalker(page, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];
      let currentNode = walker.nextNode();

      while (currentNode) {
        textNodes.push(currentNode as Text);
        currentNode = walker.nextNode();
      }

      textNodes.forEach((node) => {
        node.nodeValue = node.nodeValue?.replace(shortWordPattern, '$1$2\u00A0') ?? '';
      });
    }

    const items = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      items.forEach((item) => item.classList.add('reveal--visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  });

  return (
    <main class="intensive-page">
      <div class="intensive-shell">
        <section class="intensive-hero reveal reveal--soft">
          <div class="hero-copy">
            <div class="hero-badges">
              <span class="pill pill--accent">Интенсив 4 дня</span>
              <span class="pill">Бухарест · офлайн</span>
            </div>

            <h1 class="hero-title">
              <span class="hero-title-line hero-title-line--dark">Как увеличить продажи</span>
              <span class="hero-title-line hero-title-line--accent">и поднять узнаваемость</span>
              <span class="hero-title-line hero-title-line--accent">в Румынии</span>
            </h1>

            <div class="hero-tags">
              <span>Офлайн</span>
              <span>Записи уроков</span>
              <span>3 недели поддержка</span>
            </div>

            <p class="hero-subtitle">
              <span>Практический интенсив для</span>
              <strong>предпринимателей, экспертов и специалистов</strong>
            </p>

            <button class="cta cta--hero" type="button" onClick$={openLeadModal$}>
              Оставить заявку <span>→</span>
            </button>
          </div>

          <div class="hero-visual">
            <div class="hero-photo-card">
              <img src="/1block.png" alt="Интенсив по маркетингу в Бухаресте" width="782" height="820" />
              <div class="price-ticket">
                <strong>1200 RON</strong>
                <span>1900 RON</span>
              </div>
            </div>
          </div>
        </section>

        <section class="program-card reveal reveal--lift">
          <h2>За 4 дня — от упаковки бренда до запуска рекламы</h2>
          <div class="program-list">
            {program.map((item) => (
              <article class="program-item" key={item.number}>
                <div class="program-item__head">
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                </div>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div class="program-item__result">
                  <strong>Результат</strong>
                  <p>{item.result}</p>
                </div>
              </article>
            ))}
          </div>
          <button class="cta cta--red" type="button" onClick$={openLeadModal$}>
            Оставить заявку <span>→</span>
          </button>
        </section>

        <section class="bonus-card reveal reveal--scale">
          <img class="bonus-card__bg" src="/bonus.png" alt="" width="370" height="378" aria-hidden="true" />
          <h2>
            Готовый план продвижения
            <span>на 30 дней</span>
          </h2>
          <p>
            После интенсива вы получаете не просто знания, <strong>а конкретный план действий:</strong> что публиковать,
            какую рекламу запускать и в какой последовательности.
          </p>
          <button class="cta cta--dark" type="button" onClick$={openLeadModal$}>
            Забрать бонус с интенсивом <span>→</span>
          </button>
        </section>

        <section class="audience-section">
          <h2 class="reveal reveal--lift">
            Этот интенсив для тебя,
            <span>если ты:</span>
          </h2>
          <div class="audience-grid">
            {audience.map((card) => (
              <article class={`audience-card reveal reveal--card ${card.className}`} key={card.index}>
                <h3>{card.title}</h3>
                <p class={card.italic ? 'audience-text--italic' : ''}>{card.text}</p>
                <span class="audience-index">
                  {card.index} <small>{card.icon}</small>
                </span>
              </article>
            ))}
          </div>
          <div class="audience-cta reveal reveal--soft">
            <h3>Хочешь привлекать клиентов через интернет и не зависеть только от рекомендаций</h3>
            <button class="cta cta--red" type="button" onClick$={openLeadModal$}>
              Это про меня — записаться <span>→</span>
            </button>
          </div>
        </section>

        <section class="results-section">
          <h2 class="reveal reveal--slide-right">
            После интенсива
            <span>вы сможете</span>
          </h2>
          <div class="result-list">
            {results.map((item) => (
              <div class="result-item reveal reveal--result" key={item}>
                <span>✓</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
          <button class="cta cta--dark reveal reveal--soft" type="button" onClick$={openLeadModal$}>
            Хочу такой результат <span>→</span>
          </button>
        </section>

        <section class="includes-section">
          <h2 class="reveal reveal--slide-left">
            Что входит <span>в обучение</span>
          </h2>
          <div class="include-list">
            {includes.map(([icon, text]) => (
              <div class="include-item reveal reveal--include" key={text}>
                <span>{icon}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section class="expert-card reveal reveal--soft">
          <div class="expert-role">Основатель GrowUp Agency</div>
          <h2>Алёна Русу</h2>
          <div class="expert-stats">
            <p>
              <strong>8+</strong>
              <span>лет опыта<br />в маркетинге</span>
            </p>
            <p>
              <strong>100+</strong>
              <span>реализованных<br />проектов</span>
            </p>
            <p>
              <strong>200+</strong>
              <span>обученных<br />специалистов</span>
            </p>
            <p>
              <strong>$1.2M+</strong>
              <span>рекламного бюджета<br />под управлением</span>
            </p>
          </div>
          <img class="expert-photo expert-photo--mobile" src="/ob-Alione.png" alt="Алёна Русу" width="726" height="1240" />
          <img class="expert-photo expert-photo--desktop" src="/aliona-png.png" alt="Алёна Русу" width="755" height="881" />
          <div class="expert-text">
            <span class="expert-text__flame">🔥</span>
            <p>
              Более 8 лет в маркетинге.
              <br />
              100+ реализованных проектов, 200+ обученных специалистов и более{' '}
              <strong>$1.2M рекламного бюджета</strong> под управлением.
            </p>
            <p>
              Клиенты остаются со мной надолго: большинство сотрудничает не менее 6 месяцев,
              а многие работают со мной годами.
            </p>
            <p>
              Сегодня я помогаю предпринимателям выстраивать системный маркетинг, который стабильно
              привлекает клиентов и способствует росту бизнеса.
            </p>
          </div>
          <button class="cta cta--red" type="button" onClick$={openLeadModal$}>
            Учиться у Алёны <span>→</span>
          </button>
        </section>

        <section class="expert-quote-card reveal reveal--soft">
          <div class="expert-quote-card__mark">”</div>
          <div class="expert-quote-card__content">
            <p>
              Не просто запускать рекламу — а <span class="accent-blue">мыслить как маркетолог</span>.
              Большинство предпринимателей уже умеют пользоваться ChatGPT и знают, где нажать кнопку
              в рекламном кабинете. Но этого <span class="accent-red">недостаточно для роста бизнеса.</span>
            </p>
            <p>
              Я хочу научить вас понимать, <span class="accent-yellow">почему одни инструменты работают</span>,
              а другие только расходуют бюджет — анализировать результаты, принимать решения на основе цифр
              и использовать ИИ как помощника, а не замену мышлению.
            </p>
            <p>
              Моя цель — чтобы после интенсива вы могли
              <span class="accent-blue"> самостоятельно принимать маркетинговые решения</span> и строить
              <span class="accent-red"> сильный и устойчивый маркетинг.</span>
            </p>
          </div>
          <div class="expert-quote-card__author">
            <span>
              <img src="/logo-grow.png" alt="GrowUp Agency" width="3370" height="3371" />
            </span>
            <p>
              <strong>Алёна Русу</strong>
              Основатель GrowUp Agency · 8+ лет в маркетинге
            </p>
          </div>
        </section>

        <section class="price-section reveal reveal--scale">
          <h2>Количество мест ограничено</h2>
          <div class="price-values">
            <strong>1200 RON</strong>
            <del>1900 RON</del>
          </div>
          <p>Специальная цена действует ограниченное время</p>
          <button class="cta cta--dark" type="button" onClick$={openLeadModal$}>
            Забронировать место <span>→</span>
          </button>
        </section>

        <section class="faq-section reveal reveal--lift">
          <h2>FAQ</h2>
          <div class="faq-list">
            {faq.map((item, index) => (
              <details class="faq-item" key={item.question} open={index === 0}>
                <summary>
                  <span>{item.question}</span>
                  <i>{index === 0 ? '−' : '+'}</i>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section class="final-cta reveal reveal--soft">
          <span>Запись открыта</span>
          <h2>
            Узнайте программу
            <br />
            и даты обучения
            <br />
            уже сегодня
          </h2>
          <p class="final-cta__text">
            <span>Получите программу, даты проведения</span>
            <span>и условия участия. Начните привлекать</span>
            <span>клиентов системно, а не случайно. 🚀</span>
          </p>
          <button class="cta cta--red" type="button" onClick$={openLeadModal$}>
            Оставить заявку <span>→</span>
          </button>
        </section>
      </div>

      {isLeadModalOpen.value && (
        <div class="lead-modal" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title">
          <button
            class="lead-modal__backdrop"
            type="button"
            aria-label="Закрыть форму"
            onClick$={closeLeadModal$}
          />
          <div class="lead-modal__panel">
            <button class="lead-modal__close" type="button" aria-label="Закрыть" onClick$={closeLeadModal$}>
              ×
            </button>
            <span class="lead-modal__eyebrow">Запись на интенсив</span>
            <h2 id="lead-modal-title">Оставьте заявку</h2>
            <p>Мы отправим детали программы, даты и условия участия в Telegram.</p>

            <form class="lead-form" preventdefault:submit onSubmit$={handleLeadSubmit$}>
              <label>
                <span>Имя</span>
                <input name="name" type="text" placeholder="Как к вам обращаться" autoComplete="name" />
              </label>

              <label>
                <span>Номер телефона</span>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+40 700 000 000"
                  autoComplete="tel"
                  inputMode="tel"
                />
              </label>

              <label>
                <span>Ник Telegram</span>
                <input
                  name="telegram"
                  type="text"
                  placeholder="@username"
                  inputMode="text"
                />
              </label>

              <label>
                <span>Email</span>
                <input name="email" type="text" placeholder="name@email.com" autoComplete="email" />
              </label>

              {leadError.value && <p class="lead-form__error">{leadError.value}</p>}

              <button class="cta cta--red lead-form__submit" type="submit" disabled={leadSending.value}>
                {leadSending.value ? 'Отправляем...' : 'Отправить заявку'} <span>→</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
});
