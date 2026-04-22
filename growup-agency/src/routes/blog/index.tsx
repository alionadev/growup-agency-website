import { component$, useSignal } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import '../../styles/blog.css';

type BlogCategory = 'all' | 'ads' | 'smm' | 'branding' | 'web';

type BlogPost = {
  slug: string;
  category: Exclude<BlogCategory, 'all'>;
  title: string;
  excerpt: string;
  cover: string;
  readTime: string;
};

const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-performance-marketing-works',
    category: 'ads',
    title: 'Как работает performance-маркетинг для малого бизнеса',
    excerpt:
      'Разбираем, из чего состоит перформанс-подход, чем он отличается от “просто запустить рекламу” и что вы получите на выходе.',
    cover: '/media/blog/ads-1.jpg',
    readTime: '7 мин',
  },
  {
    slug: 'ads-budget-calculation',
    category: 'ads',
    title: 'Как считать бюджет на рекламу, чтобы не слить деньги впустую',
    excerpt:
      'Формулы и примеры: от какого чека и маржи имеет смысл запускать рекламу, и какие цифры реальны для Молдовы и ЕС.',
    cover: '/media/blog/ads-2.jpg',
    readTime: '9 мин',
  },
  {
    slug: 'smm-strategy-vs-content',
    category: 'smm',
    title: 'SMM-стратегия vs просто посты: в чём разница и что нужно вам',
    excerpt:
      'Почему контент-план без стратегии редко даёт результат, и как выглядит нормальная схема работы по SMM.',
    cover: '/media/blog/smm-1.jpg',
    readTime: '8 мин',
  },
  {
    slug: 'branding-before-ads',
    category: 'branding',
    title: 'Нужно ли делать брендинг до запуска рекламы?',
    excerpt:
      'Когда достаточно логотипа, а когда без продуманного бренда реклама будет работать намного хуже.',
    cover: '/media/blog/branding-1.jpg',
    readTime: '6 мин',
  },
  {
    slug: 'when-you-need-new-website',
    category: 'web',
    title: 'Когда бизнесу действительно нужен новый сайт, а когда — нет',
    excerpt:
      'Чек-лист для владельца: по каким признакам понять, что текущий сайт тормозит продажи и пора обновляться.',
    cover: '/media/blog/web-1.jpg',
    readTime: '10 мин',
  },
  {
    slug: 'site-structure-for-ads',
    category: 'web',
    title: 'Структура сайта, который готов к трафику',
    excerpt:
      'Что должно быть на лендинге, чтобы реклама окупалась: блоки, триггеры, UX-мелочи.',
    cover: '/media/blog/web-2.jpg',
    readTime: '9 мин',
  },
];

const BLOG_CATEGORIES: { id: BlogCategory; label: string }[] = [
  { id: 'all', label: 'Все темы' },
  { id: 'ads', label: 'Paid Ads' },
  { id: 'smm', label: 'SMM' },
  { id: 'branding', label: 'Branding' },
  { id: 'web', label: 'Web dev' },
];

export default component$(() => {
  const activeCategory = useSignal<BlogCategory>('all');

  const filteredPosts = () =>
    activeCategory.value === 'all'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === activeCategory.value);

  return (
    <main class="page page--blog">
      <section class="blog">
        <div class="blog__inner">
          {/* Вкладки по темам */}
          <div class="blog-tabs-wrapper">
            <div class="blog-tabs">
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  class={{
                    'blog-tabs__btn': true,
                    'blog-tabs__btn--active':
                      activeCategory.value === cat.id,
                  }}
                  onClick$={() => (activeCategory.value = cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Заголовок */}
          <header class="blog-header">
            <h1 class="section-title section-title--center">
              Блог GrowUp
            </h1>
            <p class="section-subtitle section-subtitle--center">
              Простые объяснения по рекламе, SMM, брендингу и веб-разработке —
              чтобы вы понимали, за что платите.
            </p>
          </header>

          {/* Сетка постов */}
          <div class="blog-grid">
            {filteredPosts().map((post) => (
              <article key={post.slug} class="blog-card">
                <Link href={`/blog/${post.slug}`} class="blog-card__link">
                  <div class="blog-card__image-wrap">
                    <img
                      src={post.cover}
                      alt={post.title}
                      class="blog-card__image"
                      loading="lazy"
                    />
                  </div>
                  <div class="blog-card__body">
                    <div class="blog-card__meta">
                      <span class="blog-card__category">
                        {
                          BLOG_CATEGORIES.find(
                            (c) => c.id === post.category
                          )?.label
                        }
                      </span>
                      <span class="blog-card__time">{post.readTime}</span>
                    </div>
                    <h2 class="blog-card__title">{post.title}</h2>
                    <p class="blog-card__excerpt">{post.excerpt}</p>
                    <span class="blog-card__readmore">
                      Читать → 
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
});