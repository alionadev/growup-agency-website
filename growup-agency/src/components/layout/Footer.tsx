// src/components/layout/Footer.tsx
// Изменения: добавлена ссылка на /[lang]/cookies в footer__bottom + перевод на 3 языка
import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import '~/styles/footer.css';

type Lang = 'ru' | 'en' | 'ro';

const TEXT: Record<Lang, any> = {
  ru: {
    desc: 'Маркетинг, сайты и визуал для тех, кто хочет расти быстрее конкурентов — без лишней воды и сложностей.',
    nav: 'Навигация',
    home: 'Главная',
    services: 'Услуги',
    projects: 'Кейсы',
    contact: 'Контакты',
    contactUs: 'Свяжитесь с нами',
    email: 'Email',
    socials: 'Мы в соцсетях',
    rights: 'Все права защищены.',
    cookiePolicy: 'Политика cookie',
  },
  en: {
    desc: 'Marketing, websites and visuals for businesses that want to grow faster than competitors — without unnecessary complexity.',
    nav: 'Navigation',
    home: 'Home',
    services: 'Services',
    projects: 'Projects',
    contact: 'Contact',
    contactUs: 'Contact us',
    email: 'Email',
    socials: 'We are on social media',
    rights: 'All rights reserved.',
    cookiePolicy: 'Cookie Policy',
  },
  ro: {
    desc: 'Marketing, site-uri și vizual pentru afaceri care vor să crească mai rapid decât concurența — fără complicații inutile.',
    nav: 'Navigație',
    home: 'Acasă',
    services: 'Servicii',
    projects: 'Proiecte',
    contact: 'Contacte',
    contactUs: 'Contactează-ne',
    email: 'Email',
    socials: 'Suntem pe rețelele sociale',
    rights: 'Toate drepturile rezervate.',
    cookiePolicy: 'Politica Cookie',
  },
};

export const Footer = component$(() => {
  const loc = useLocation();
  const year = new Date().getFullYear();

  const raw = loc.params.lang as string | undefined;
  const lang: Lang = raw === 'ru' || raw === 'en' || raw === 'ro' ? (raw as Lang) : 'ru';
  const t = TEXT[lang];

  const homePath = `/${lang}`;
  const homeAnchor = (id: string) => `${homePath}#${id}`;

  return (
    <footer class="footer">
      <div class="footer__inner">
        {/* Бренд */}
        <div class="footer__col footer__col--brand">
          <h3 class="footer__logo">GrowUp Agency</h3>
          <p class="footer__text">{t.desc}</p>
        </div>

        {/* Навигация */}
        <div class="footer__col">
          <h4 class="footer__heading">{t.nav}</h4>
          <ul class="footer__links">
            <li><a href={`/${lang}`}>{t.home}</a></li>
            <li><a href={homeAnchor('services')}>{t.services}</a></li>
            <li><a href={`/${lang}/projects`}>{t.projects}</a></li>
            <li><a href={`/${lang}/contact`}>{t.contact}</a></li>
          </ul>
        </div>

        {/* Контакты */}
        <div class="footer__col footer__col--contact">
          <h4 class="footer__heading">{t.contactUs}</h4>

          <div class="footer__contact-row">
            <span class="footer__contact-label">{t.email}</span>
            <a href="mailto:growupagency.org@gmail.com" class="footer__contact-value">
              growupagency.org@gmail.com
            </a>
          </div>

          <div class="footer__social-wrap">
            <span class="footer__social-label">{t.socials}</span>
            <div class="footer__social-list">
              <a href="https://www.instagram.com/growupagency/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="footer__social-btn">
                <svg viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm6.5-.8a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" /></svg>
              </a>
              <a href="https://www.facebook.com/growupagencyorg" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="footer__social-btn">
                <svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.6 9.9v-7H8v-2.9h2.4V9.7c0-2.4 1.4-3.7 3.6-3.7 1 0 2 .1 2 .1v2.3h-1.1c-1.1 0-1.4.7-1.4 1.4v1.7H16l-.4 2.9h-2.1v7A10 10 0 0022 12z" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/aliona-rusu-370072173/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="footer__social-btn">
                <svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM3 8.98h4v12H3v-12zm6.5 0h3.8v1.64h.05c.53-.98 1.82-2.02 3.75-2.02 4 0 4.75 2.63 4.75 6.05v6.33h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.88 0-2.17 1.46-2.17 2.96v5.7h-4v-12z" /></svg>
              </a>
              <a href="https://t.me/alionars" target="_blank" rel="noopener noreferrer" aria-label="Telegram" class="footer__social-btn">
                <svg viewBox="0 0 24 24"><path d="M21.9 4.1l-3.3 15.6c-.2 1.1-.9 1.4-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.3-5.2 9.4-8.5c.4-.3-.1-.5-.6-.2L6 12.9l-5-1.6c-1.1-.3-1.1-1.1.2-1.6l19.6-7.6c.9-.3 1.7.2 1.5 1z" /></svg>
              </a>
              <a href="https://www.pinterest.com/growupagencyorg/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" class="footer__social-btn">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.28 2 11.62c0 3.93 2.53 7.29 6.11 8.51-.08-.72-.15-1.82.03-2.6.17-.73 1.11-4.67 1.11-4.67s-.28-.57-.28-1.41c0-1.32.77-2.31 1.72-2.31.81 0 1.21.61 1.21 1.34 0 .82-.52 2.06-.79 3.2-.22.95.46 1.72 1.37 1.72 1.64 0 2.9-1.73 2.9-4.22 0-2.21-1.59-3.75-3.85-3.75-2.62 0-4.16 1.97-4.16 4 0 .79.3 1.64.68 2.1a.27.27 0 01.06.26c-.06.29-.2.95-.23 1.08-.04.17-.14.21-.32.13-1.19-.55-1.93-2.27-1.93-3.65 0-2.97 2.16-5.7 6.23-5.7 3.27 0 5.82 2.33 5.82 5.45 0 3.25-2.05 5.87-4.9 5.87-.96 0-1.86-.5-2.17-1.09l-.59 2.24c-.21.82-.78 1.85-1.16 2.48.87.27 1.79.42 2.74.42 5.52 0 10-4.28 10-9.62C22 6.28 17.52 2 12 2z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div class="footer__bottom">
        <p>© {year} GrowUp Agency. {t.rights}</p>
        {/* ← новая ссылка на политику cookie */}
        <a href={`/${lang}/cookies`} class="footer__cookie-link">
          {t.cookiePolicy}
        </a>
      </div>
    </footer>
  );
});