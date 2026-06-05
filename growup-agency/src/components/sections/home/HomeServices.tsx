import { component$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import { useHomePage } from '~/routes/[lang]/layout';

export const HomeServices = component$(() => {
  const loc = useLocation();
  const lang = (loc.params.lang as 'ru' | 'en' | 'ro') || 'ru';

  const homePage = useHomePage();
  const { servicesTitle, servicesSubtitle, servicesCta } = homePage.value;
  const services = homePage.value.services;

  const withLang = (path: string) => {
    const p = path.startsWith('/') ? path : `/${path}`;
    return /^\/(ru|en|ro)(\/|$)/.test(p) ? p : `/${lang}${p}`;
  };

  return (
    <section class="services" id="services">
      <div class="services__head">
        <h2 class="section-title">{servicesTitle}</h2>
        <p class="section-subtitle">{servicesSubtitle}</p>
      </div>

      <div class="services__grid">
        {services.map((s) => (
          <Link class="services__card" href={withLang(s.link || '/')} key={s.link}>
            <div class="services__tag">{s.tag}</div>
            <h3 class="services__title">{s.title}</h3>

            <ul class="services__list">
              {(s.bullets ?? []).map((b, idx) => (
                <li class="services__item" key={`${s.link}-${idx}`}>
                  {b.text}
                </li>
              ))}
            </ul>

            <span class="services__link">
              {servicesCta}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
});
