import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { type DocumentHead, useLocation } from '@builder.io/qwik-city';
import '~/styles/intensive.css';

type Lang = 'ru' | 'en' | 'ro';

const LOCALES: Lang[] = ['ru', 'en', 'ro'];

const getLang = (raw?: string): Lang =>
  raw && LOCALES.includes(raw as Lang) ? (raw as Lang) : 'ru';

const applyHref = (lang: Lang) => `/${lang}/contact?source=intensive`;

const program = [
  {
    number: '/1',
    title: 'Узнаваемость бренда и продажи в Румынии',
    bullets: [
      'Какие инструменты маркетинга реально работают в Румынии',
      'Где искать клиентов в 2026 году',
      'Как конкурировать даже с небольшим бюджетом',
      'Какие площадки дают лучший результат для малого бизнеса',
    ],
  },
  {
    number: '/2',
    title: 'Упаковка бренда в онлайне',
    bullets: [
      'Как оформить Instagram, Facebook и Google Business',
      'Что должно быть в профиле, чтобы люди покупали',
      'Как правильно презентовать свои услуги',
      'Как выстроить доверие к бренду',
    ],
  },
  {
    number: '/3',
    title: 'Разработка офферов и спецпредложений',
    bullets: [
      'Почему люди не покупают даже хороший продукт',
      'Как создавать предложения, которые привлекают клиентов',
      'Как выделиться среди конкурентов',
      'Как увеличить средний чек и количество обращений',
    ],
  },
  {
    number: '/4',
    title: 'Реклама для своего бизнеса',
    bullets: [
      'Как работает реклама в Facebook и Instagram',
      'Как самостоятельно настроить рекламную кампанию',
      'Как выбрать аудиторию',
      'Как контролировать бюджет и получать заявки',
    ],
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
  ['🎓', '4 офлайн-лекции'],
  ['🎥', 'Записи всех занятий'],
  ['📝', 'Практические домашние задания'],
  ['🤝', 'Проверка заданий и рекомендации'],
  ['💬', 'Поддержка 3 недели после обучения'],
  ['📋', 'Готовые шаблоны и чек-листы'],
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
    answer: 'Специальная цена участия — 1200 RON вместо 1600 RON.',
  },
];

export const head: DocumentHead = ({ params, url }) => {
  const lang = getLang(params.lang as string | undefined);
  const title = 'Интенсив по маркетингу в Бухаресте | GrowUp Agency';
  const description =
    '4-дневный офлайн интенсив: как привлекать клиентов в Румынии и увеличить продажи за 4 дня.';
  const image = `${url.origin}/1block.png`;

  return {
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url.href },
      { property: 'og:image', content: image },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'robots', content: lang ? 'index, follow' : 'index, follow' },
    ],
  };
};

export default component$(() => {
  const loc = useLocation();
  const lang = getLang(loc.params.lang as string | undefined);
  const ctaHref = applyHref(lang);

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
              Как привлекать клиентов в Румынии
              <span>и увеличить продажи за 4 дня</span>
            </h1>

            <p class="hero-subtitle">
              Практический интенсив
              <strong>для предпринимателей, экспертов и специалистов</strong>
            </p>

            <div class="hero-tags">
              <span>Офлайн</span>
              <span>Записи уроков</span>
              <span>3 недели поддержка</span>
            </div>

            <a class="cta cta--hero" href={ctaHref}>
              Оставить заявку <span>→</span>
            </a>
          </div>

          <div class="hero-visual">
            <div class="hero-photo-card">
              <img src="/1block.png" alt="Интенсив по маркетингу в Бухаресте" width="782" height="820" />
              <div class="price-ticket">
                <strong>1200 RON</strong>
                <span>1600 RON</span>
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
              </article>
            ))}
          </div>
          <a class="cta cta--red" href={ctaHref}>
            Оставить заявку <span>→</span>
          </a>
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
          <a class="cta cta--dark" href={ctaHref}>
            Забрать бонус с интенсивом <span>→</span>
          </a>
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
                <p>{card.text}</p>
                <span class="audience-index">
                  {card.index} <small>{card.icon}</small>
                </span>
              </article>
            ))}
          </div>
          <div class="audience-cta reveal reveal--soft">
            <h3>Хочешь привлекать клиентов через интернет и не зависеть только от рекомендаций</h3>
            <a class="cta cta--red" href={ctaHref}>
              Это про меня — записаться <span>→</span>
            </a>
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
          <a class="cta cta--dark reveal reveal--soft" href={ctaHref}>
            Хочу такой результат <span>→</span>
          </a>
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
          <h2>Алёна Русу</h2>
          <div class="expert-role">Основатель GrowUp Agency</div>
          <div class="expert-stats">
            <p>
              <strong>8+</strong>
              <span>лет<br />в маркетинге<br />и таргет-рекламе</span>
            </p>
            <p>
              <strong>150+</strong>
              <span>реализованных<br />проектов</span>
            </p>
          </div>
          <img src="/aliona-png.png" alt="Алёна Русу" width="755" height="881" />
          <div class="expert-text">
            <span aria-hidden="true">🔥</span>
            <p>
              Работала с бизнесами из Молдовы, Румынии и Европы. Помогает малому бизнесу привлекать
              клиентов через социальные сети и рекламу.
            </p>
          </div>
          <a class="cta cta--red" href={ctaHref}>
            Учиться у Алёны <span>→</span>
          </a>
        </section>

        <section class="price-section reveal reveal--scale">
          <h2>Количество мест ограничено</h2>
          <div class="price-values">
            <strong>1200 RON</strong>
            <del>1600 RON</del>
          </div>
          <p>*Специальная цена действует ограниченное время</p>
          <a class="cta cta--dark" href={ctaHref}>
            Забронировать место <span>→</span>
          </a>
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
          <h2>Узнайте программу и даты обучения уже сегодня</h2>
          <p>
            Получите программу, даты проведения и условия участия. Начните привлекать клиентов системно, а не случайно.
          </p>
          <a class="cta cta--red" href={ctaHref}>
            Оставить заявку <span>→</span>
          </a>
        </section>
      </div>
    </main>
  );
});
