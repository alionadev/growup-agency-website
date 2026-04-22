import { component$, useSignal, $ } from '@builder.io/qwik';
import { Link, useLocation, useNavigate } from '@builder.io/qwik-city';
import '~/styles/header.css';

type Locale = 'ru' | 'en' | 'ro';
const LOCALES: Locale[] = ['ru', 'en', 'ro'];

const I18N: Record<Locale, {
  services: string; pricing: string; consult: string;
  portfolio: string; contacts: string; getProposal: string;
  paidAds: string; smm: string; design: string; web: string;
}> = {
  ru: {
    services: 'Услуги', pricing: 'Цены', consult: 'Консультация',
    portfolio: 'Портфолио', contacts: 'Контакты', getProposal: 'Получить предложение',
    paidAds: 'Платная реклама', smm: 'SMM / соцсети', design: 'Дизайн и креатив', web: 'Web-разработка',
  },
  en: {
    services: 'Services', pricing: 'Pricing', consult: 'Consultation',
    portfolio: 'Portfolio', contacts: 'Contacts', getProposal: 'Get a proposal',
    paidAds: 'Paid advertising', smm: 'SMM / Social media', design: 'Design & Creative', web: 'Web development',
  },
  ro: {
    services: 'Servicii', pricing: 'Prețuri', consult: 'Consultație',
    portfolio: 'Portofoliu', contacts: 'Contacte', getProposal: 'Cere o ofertă',
    paidAds: 'Publicitate plătită', smm: 'SMM / Social media', design: 'Design & creație', web: 'Dezvoltare web',
  },
};

export const Header = component$(() => {
  const loc = useLocation();
  const nav = useNavigate();

  const isLangOpenDesktop = useSignal(false);
  const isLangOpenMobile  = useSignal(false);
  const isMenuOpen        = useSignal(false);
  const isServicesOpen    = useSignal(false);

  const raw  = loc.params.lang as string | undefined;
  const lang: Locale = raw && LOCALES.includes(raw as Locale) ? (raw as Locale) : 'ru';
  const t = I18N[lang];

  // путь без языкового префикса, БЕЗ хэша (хэш не нужен для SSR-перехода)
  const pathWithoutLang =
    loc.url.pathname.replace(/^\/(ru|en|ro)(?=\/|$)/, '') || '/';
  const search = loc.url.search || '';

  // переключение языка — navigate() гарантирует перезапуск routeLoader$
  const switchLang$ = $((next: Locale) => {
    isLangOpenDesktop.value = false;
    isLangOpenMobile.value  = false;
    isMenuOpen.value        = false;
    nav(`/${next}${pathWithoutLang}${search}`);
  });

  const href = (path: string) => `/${lang}${path.startsWith('/') ? '' : '/'}${path}`;
  const home = `/${lang}`;
  const homeAnchor = (id: string) => `${home}#${id}`;

  return (
    <header class="header">
      <div class="header__inner">
        {/* LOGO */}
        <Link href={home} class="header__logo">Grow Up</Link>

        {/* DESKTOP NAV */}
        <nav class="header__nav header__nav--desktop">
          <div class="header__nav-item header__nav-item--services">
            <Link href={homeAnchor('services')} class="header__link">{t.services}</Link>
            <div class="header__dropdown">
              <Link href={href('/services/performance-ads')}         class="header__dropdown-link">{t.paidAds}</Link>
              <Link href={href('/services/social-media-marketing')}  class="header__dropdown-link">{t.smm}</Link>
              <Link href={href('/services/design')}                  class="header__dropdown-link">{t.design}</Link>
              <Link href={href('/services/web')}                     class="header__dropdown-link">{t.web}</Link>
            </div>
          </div>

          <Link href={href('/pricing')}        class="header__link">{t.pricing}</Link>
          <Link href={homeAnchor('consult')}   class="header__link">{t.consult}</Link>
          <Link href={href('/projects')}       class="header__link">{t.portfolio}</Link>
          <Link href={href('/contact')}        class="header__link">{t.contacts}</Link>
          <Link href={href('/contact')}        class="hero-btn">{t.getProposal}</Link>

          {/* LANG DESKTOP */}
          <div class="lang">
            <button class="lang__button" type="button"
              onClick$={() => (isLangOpenDesktop.value = !isLangOpenDesktop.value)}>
              {lang.toUpperCase()} ▾
            </button>
            {isLangOpenDesktop.value && (
              <div class="lang__dropdown">
                {LOCALES.map((l) => (
                  <button key={l} class="lang__item" type="button"
                    onClick$={() => switchLang$(l)}>
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* BURGER */}
        <button class="header__burger" type="button" aria-label="Menu"
          onClick$={() => (isMenuOpen.value = !isMenuOpen.value)}>
          <span/><span/><span/>
        </button>
      </div>

      {/* MOBILE MENU */}
      <nav class={`header__nav-mobile ${isMenuOpen.value ? 'header__nav-mobile--open' : ''}`}>
        <button class="header__nav-mobile-close" type="button" aria-label="Close"
          onClick$={() => (isMenuOpen.value = false)}>✕</button>

        <div class="header__nav-item">
          <button class="header__link header__link--toggle" type="button"
            onClick$={() => (isServicesOpen.value = !isServicesOpen.value)}>
            {t.services}
            <span class="header__link-arrow">{isServicesOpen.value ? '▴' : '▾'}</span>
          </button>
          {isServicesOpen.value && (
            <div class="header__dropdown--mobile">
              <Link href={href('/services/performance-ads')}        class="header__dropdown-link" onClick$={() => (isMenuOpen.value = false)}>{t.paidAds}</Link>
              <Link href={href('/services/social-media-marketing')} class="header__dropdown-link" onClick$={() => (isMenuOpen.value = false)}>{t.smm}</Link>
              <Link href={href('/services/design')}                 class="header__dropdown-link" onClick$={() => (isMenuOpen.value = false)}>{t.design}</Link>
              <Link href={href('/services/web')}                    class="header__dropdown-link" onClick$={() => (isMenuOpen.value = false)}>{t.web}</Link>
            </div>
          )}
        </div>

        <Link href={href('/pricing')}       class="header__link" onClick$={() => (isMenuOpen.value = false)}>{t.pricing}</Link>
        <Link href={homeAnchor('consult')}  class="header__link" onClick$={() => (isMenuOpen.value = false)}>{t.consult}</Link>
        <Link href={href('/projects')}      class="header__link" onClick$={() => (isMenuOpen.value = false)}>{t.portfolio}</Link>
        <Link href={href('/contact')}       class="header__link" onClick$={() => (isMenuOpen.value = false)}>{t.contacts}</Link>
        <Link href={href('/contact')}       class="hero-btn"     onClick$={() => (isMenuOpen.value = false)}>{t.getProposal}</Link>

        {/* LANG MOBILE */}
        <div class="header__mobile-langs">
          <div class="lang">
            <button class="lang__button" type="button"
              onClick$={() => (isLangOpenMobile.value = !isLangOpenMobile.value)}>
              {lang.toUpperCase()} ▾
            </button>
            {isLangOpenMobile.value && (
              <div class="lang__dropdown lang__dropdown--mobile">
                {LOCALES.map((l) => (
                  <button key={l} class="lang__item" type="button"
                    onClick$={() => switchLang$(l)}>
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
});