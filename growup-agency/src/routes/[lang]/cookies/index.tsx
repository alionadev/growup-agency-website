// src/routes/[lang]/cookies/index.tsx
import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { type DocumentHead } from '@builder.io/qwik-city';

type Lang = 'ru' | 'en' | 'ro';

const CONTENT: Record<Lang, {
  title: string;
  meta: string;
  intro: string;
  sections: { heading: string; body: string }[];
}> = {
  ru: {
    title: 'Политика использования Cookie',
    meta: 'Политика cookie — GrowUp Agency',
    intro: 'Настоящая политика объясняет, как GrowUp Agency использует файлы cookie и аналогичные технологии на сайте growupagency.org.',
    sections: [
      {
        heading: 'Что такое cookie?',
        body: 'Файлы cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении сайта. Они помогают сайту работать корректно, запоминать ваши предпочтения и собирать аналитические данные.',
      },
      {
        heading: 'Какие cookie мы используем?',
        body: 'Необходимые cookie обеспечивают базовую работу сайта и не могут быть отключены. Аналитические cookie (Meta Pixel) помогают нам понимать, как пользователи взаимодействуют с сайтом — мы используем эти данные для улучшения контента и рекламы.',
      },
      {
        heading: 'Как управлять cookie?',
        body: 'Вы можете отказаться от необязательных cookie, нажав «Отклонить» в баннере при первом посещении. Также вы можете удалить или заблокировать cookie в настройках вашего браузера. Обратите внимание, что отключение некоторых cookie может повлиять на работу сайта.',
      },
      {
        heading: 'Сторонние сервисы',
        body: 'Мы используем Meta Pixel для отслеживания конверсий и показа релевантной рекламы. Этот сервис устанавливает собственные cookie согласно политике конфиденциальности Meta.',
      },
      {
        heading: 'Контакты',
        body: 'Если у вас есть вопросы по использованию cookie, свяжитесь с нами: growupagency.org@gmail.com',
      },
    ],
  },
  en: {
    title: 'Cookie Policy',
    meta: 'Cookie Policy — GrowUp Agency',
    intro: 'This policy explains how GrowUp Agency uses cookies and similar technologies on growupagency.org.',
    sections: [
      {
        heading: 'What are cookies?',
        body: 'Cookies are small text files stored on your device when you visit a website. They help the site function properly, remember your preferences, and collect analytical data.',
      },
      {
        heading: 'What cookies do we use?',
        body: 'Essential cookies ensure the basic functionality of the site and cannot be disabled. Analytical cookies (Meta Pixel) help us understand how users interact with the site — we use this data to improve content and advertising.',
      },
      {
        heading: 'How to manage cookies?',
        body: 'You can decline optional cookies by clicking "Decline" in the banner on your first visit. You can also delete or block cookies in your browser settings. Please note that disabling some cookies may affect site functionality.',
      },
      {
        heading: 'Third-party services',
        body: 'We use Meta Pixel to track conversions and show relevant ads. This service sets its own cookies according to Meta\'s privacy policy.',
      },
      {
        heading: 'Contact',
        body: 'If you have questions about our use of cookies, contact us: growupagency.org@gmail.com',
      },
    ],
  },
  ro: {
    title: 'Politica de utilizare a Cookie-urilor',
    meta: 'Politica Cookie — GrowUp Agency',
    intro: 'Această politică explică modul în care GrowUp Agency utilizează cookie-uri și tehnologii similare pe growupagency.org.',
    sections: [
      {
        heading: 'Ce sunt cookie-urile?',
        body: 'Cookie-urile sunt fișiere text mici stocate pe dispozitivul dvs. atunci când vizitați un site web. Acestea ajută site-ul să funcționeze corect, să vă amintească preferințele și să colecteze date analitice.',
      },
      {
        heading: 'Ce cookie-uri folosim?',
        body: 'Cookie-urile esențiale asigură funcționalitatea de bază a site-ului și nu pot fi dezactivate. Cookie-urile analitice (Meta Pixel) ne ajută să înțelegem cum interacționează utilizatorii cu site-ul — folosim aceste date pentru a îmbunătăți conținutul și publicitatea.',
      },
      {
        heading: 'Cum să gestionați cookie-urile?',
        body: 'Puteți refuza cookie-urile opționale făcând clic pe "Refuză" în banner la prima vizită. De asemenea, puteți șterge sau bloca cookie-urile în setările browserului. Rețineți că dezactivarea unor cookie-uri poate afecta funcționalitatea site-ului.',
      },
      {
        heading: 'Servicii terțe',
        body: 'Folosim Meta Pixel pentru urmărirea conversiilor și afișarea de reclame relevante. Acest serviciu setează propriile cookie-uri conform politicii de confidențialitate Meta.',
      },
      {
        heading: 'Contact',
        body: 'Dacă aveți întrebări despre utilizarea cookie-urilor, contactați-ne: growupagency.org@gmail.com',
      },
    ],
  },
};

export default component$(() => {
  const loc = useLocation();
  const raw = loc.params.lang as string | undefined;
  const lang: Lang = raw === 'ru' || raw === 'en' || raw === 'ro' ? raw : 'ru';
  const c = CONTENT[lang];

  return (
    <>
      <style>{`
        .cookies-page {
          min-height: 60vh;
          padding: 100px 0 80px;
        }
        .cookies-page__inner {
          width: min(720px, 92vw);
          margin: 0 auto;
        }
        .cookies-page__title {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 600;
          margin: 0 0 20px;
          letter-spacing: -0.02em;
        }
        .cookies-page__intro {
          font-size: 16px;
          color: var(--color-text-muted, #666);
          line-height: 1.6;
          margin: 0 0 48px;
          padding-bottom: 32px;
          border-bottom: 1px solid var(--color-border, rgba(0,0,0,0.08));
        }
        .cookies-page__section {
          margin-bottom: 32px;
        }
        .cookies-page__heading {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 10px;
        }
        .cookies-page__body {
          font-size: 15px;
          color: var(--color-text-muted, #555);
          line-height: 1.7;
          margin: 0;
        }
      `}</style>

      <main class="cookies-page">
        <div class="cookies-page__inner">
          <h1 class="cookies-page__title">{c.title}</h1>
          <p class="cookies-page__intro">{c.intro}</p>
          {c.sections.map((s) => (
            <div key={s.heading} class="cookies-page__section">
              <h2 class="cookies-page__heading">{s.heading}</h2>
              <p class="cookies-page__body">{s.body}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
});

export const head: DocumentHead = ({ params }) => {
  const lang = (params.lang as Lang) || 'ru';
  return { title: CONTENT[lang]?.meta ?? 'Cookie Policy' };
};