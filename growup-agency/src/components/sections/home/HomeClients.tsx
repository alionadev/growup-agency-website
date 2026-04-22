import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { useHomePage } from '~/routes/[lang]/layout';
import '../../../styles/clients.css';

type Locale = 'ru' | 'en' | 'ro';

const withLang = (href: string | undefined, lang: Locale) => {
  if (!href) return undefined;
  if (/^https?:\/\//i.test(href)) return href;
  const path = href.startsWith('/') ? href : `/${href}`;
  if (/^\/(ru|en|ro)(\/|$)/.test(path)) return path;
  return `/${lang}${path}`;
};

export const HomeClients = component$(() => {
  const { params } = useLocation();
  const lang = (params.lang as Locale) || 'ru';
  const { clientsTitle, clientsTop, clientsBottom } = useHomePage().value;

  useVisibleTask$(() => {
    const cursor = document.getElementById('cursor-cta');
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top  = `${e.clientY}px`;
    };
    const onEnter = () => cursor.classList.add('is-visible');
    const onLeave = () => cursor.classList.remove('is-visible');

    document.addEventListener('mousemove', move);

    const links = document.querySelectorAll<HTMLElement>('.clients__item[href]');
    links.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', move);
      links.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  });

  // Дублируем только 2 раза — анимация едет ровно на -50%,
  // вторая копия = первая, поэтому переход бесшовный
  const topItems    = [...clientsTop,    ...clientsTop];
  const bottomItems = [...clientsBottom, ...clientsBottom];

  return (
    <section class="clients">
      <div class="clients__inner">
        <h2 class="section-title section-title--center">{clientsTitle}</h2>

        <div class="clients__marquee clients__marquee--top">
          <div class="clients__track">
            {topItems.map((c, i) => {
              const href = withLang(c.href, lang);
              const Tag: any = href ? 'a' : 'div';
              return (
                <Tag class="clients__item" key={c.src + i} href={href} aria-label={c.alt}>
                  <img src={c.src} alt={c.alt} loading="lazy" decoding="async" />
                </Tag>
              );
            })}
          </div>
        </div>

        <div class="clients__marquee clients__marquee--bottom">
          <div class="clients__track">
            {bottomItems.map((c, i) => {
              const href = withLang(c.href, lang);
              const Tag: any = href ? 'a' : 'div';
              return (
                <Tag class="clients__item" key={c.src + i} href={href} aria-label={c.alt}>
                  <img src={c.src} alt={c.alt} loading="lazy" decoding="async" />
                </Tag>
              );
            })}
          </div>
        </div>
      </div>

      <div id="cursor-cta" aria-hidden="true">↗</div>
    </section>
  );
});