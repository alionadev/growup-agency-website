import { component$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import '../../../styles/blog.css';

type BlogPostFull = {
  slug: string;
  title: string;
  category: 'ads' | 'smm' | 'branding' | 'web';
  readTime: string;
  cover: string;
  sections: {
    heading?: string;
    text: string;
    image?: string;
  }[];
};

const BLOG_POSTS_FULL: BlogPostFull[] = [
  {
    slug: 'how-performance-marketing-works',
    title: 'Как работает performance-маркетинг для малого бизнеса',
    category: 'ads',
    readTime: '7 мин',
    cover: '/media/blog/ads-1.jpg',
    sections: [
      {
        text: 'Performance-маркетинг — это не “давайте запустим рекламу и посмотрим, что будет”, а система, где мы считаем деньги на каждом шаге: от показа до прибыли.',
      },
      {
        heading: 'Из чего состоит перформанс-подход',
        text: '1) Чёткая цель: лиды, продажи, заявки. 2) Прозрачные метрики: CPL, CPA, ROMI. 3) Постоянная оптимизация: креативы, аудитории, посадочные.',
        image: '/media/blog/ads-detail-1.jpg',
      },
      {
        heading: 'Что вы получаете как клиент',
        text: 'Понимание, сколько стоит привлечь клиента и какие каналы окупаются. Это снимает большинство вопросов “работает реклама или нет”.',
      },
    ],
  },
  {
    slug: 'when-you-need-new-website',
    title: 'Когда бизнесу действительно нужен новый сайт, а когда — нет',
    category: 'web',
    readTime: '10 мин',
    cover: '/media/blog/web-1.jpg',
    sections: [
      {
        text: 'Новый сайт — это инвестиция, а не просто “хочу красивее”. Важно понять, какие задачи он должен решать: конверсия из рекламы, доверие, удобство для постоянных клиентов.',
      },
      {
        heading: 'Признаки, что сайт пора менять',
        text: '1) Сложно оставить заявку или что-то непонятно. 2) Дизайн выглядит устаревшим относительно конкурентов. 3) С мобильного пользоваться невозможно. 4) Аналитика не показывает, что происходит.',
        image: '/media/blog/web-detail-1.jpg',
      },
      {
        heading: 'Когда текущий сайт можно доработать',
        text: 'Иногда хватает доработать структуру, добавить блоки с офферами и кейсами, подключить аналитику. В статье показываем, как мы подходим к аудиту.',
      },
    ],
  },
  // по аналогии добавишь остальные посты
];

export default component$(() => {
  const loc = useLocation();
  const slug = loc.params.slug;

  const post = BLOG_POSTS_FULL.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main class="page page--blog">
        <section class="blog">
          <div class="blog__inner">
            <p>Пост не найден.</p>
            <Link href="/blog">← Вернуться в блог</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main class="page page--blog">
      <article class="blog-post">
        <div class="blog__inner blog-post__inner">
          <Link href="/blog" class="blog-post__back">
            ← Все статьи
          </Link>

          <header class="blog-post__header">
            <p class="blog-post__meta">
              <span>Тема: {post.category.toUpperCase()}</span>
              <span>·</span>
              <span>{post.readTime} чтения</span>
            </p>
            <h1 class="blog-post__title">{post.title}</h1>
          </header>

          <div class="blog-post__cover-wrap">
            <img
              src={post.cover}
              alt={post.title}
              class="blog-post__cover"
            />
          </div>

          <div class="blog-post__content">
            {post.sections.map((section, index) => (
              <section key={index} class="blog-post__section">
                {section.heading && (
                  <h2 class="blog-post__section-title">
                    {section.heading}
                  </h2>
                )}
                <p class="blog-post__text">{section.text}</p>
                {section.image && (
                  <div class="blog-post__image-wrap">
                    <img
                      src={section.image}
                      alt={section.heading || ''}
                      class="blog-post__image"
                      loading="lazy"
                    />
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* CTA под статьёй */}
          <section class="blog-post-cta">
            <h2>Хотите разбор именно вашей ситуации?</h2>
            <p>
              Оставьте контакты — предложим формат работы и ответим на
              вопросы по рекламе, SMM, брендингу или сайту.
            </p>

            <form class="blog-post-cta__form" preventdefault:submit>
              <input
                class="blog-post-cta__input"
                type="text"
                name="name"
                placeholder="Ваше имя"
              />
              <input
                class="blog-post-cta__input"
                type="tel"
                name="phone"
                placeholder="+373 (__) ___-____"
              />
              <button class="btn btn--primary" type="submit">
                Обсудить задачу
              </button>
            </form>
          </section>
        </div>
      </article>
    </main>
  );
});