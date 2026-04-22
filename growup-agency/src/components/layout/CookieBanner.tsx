// src/components/layout/CookieBanner.tsx
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

const COOKIE_NAME = 'cookie_consent'; 

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

type Lang = 'ru' | 'en' | 'ro';

const TEXT: Record<Lang, { text: string; more: string; accept: string; decline: string }> = {
  ru: {
    text: 'Мы используем файлы cookie для улучшения работы сайта и аналитики.',
    more: 'Подробнее →',
    accept: 'Принять',
    decline: 'Отклонить',
  },
  en: {
    text: 'We use cookies to improve site performance and analytics.',
    more: 'Learn more →',
    accept: 'Accept',
    decline: 'Decline',
  },
  ro: {
    text: 'Folosim cookie-uri pentru a îmbunătăți performanța site-ului și analiza.',
    more: 'Află mai mult →',
    accept: 'Acceptă',
    decline: 'Refuză',
  },
};

export const CookieBanner = component$(() => {
  const visible = useSignal(false);
  const loc = useLocation();

  const raw = loc.params.lang as string | undefined;
  const lang: Lang = raw === 'ru' || raw === 'en' || raw === 'ro' ? raw : 'ru';
  const t = TEXT[lang];

  useVisibleTask$(() => {
    if (!getCookie(COOKIE_NAME)) {
      setTimeout(() => { visible.value = true; }, 1200);
    }
  });

  return (
    <>
      <style>{`
        .cb {
          position: fixed;
          bottom: 28px;
          left: 28px;
          z-index: 9999;
          width: 320px;
          animation: cbIn 500ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes cbIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        .cb__card {
          background: #ffffff;
          border-radius: 20px;
          padding: 20px 20px 16px;
          box-shadow:
            0 0 0 1px rgba(0,0,0,0.06),
            0 8px 24px rgba(0,0,0,0.08),
            0 24px 56px rgba(0,0,0,0.10);
          position: relative;
          overflow: hidden;
        }
        .cb__top {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          margin-bottom: 14px;
        }
        .cb__ico {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #eef1ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .cb__body { flex: 1; }
        .cb__title {
          font-size: 13px;
          font-weight: 600;
          color: #111;
          margin: 0 0 5px;
          letter-spacing: -0.01em;
        }
        .cb__text {
          font-size: 12.5px;
          color: #666;
          line-height: 1.55;
          margin: 0;
        }
        .cb__link {
          color: #2845f5;
          text-decoration: none;
          font-weight: 500;
          font-size: 12px;
          display: inline-block;
          margin-top: 7px;
          letter-spacing: 0.01em;
          transition: opacity 0.15s;
        }
        .cb__link:hover { opacity: 0.65; }
        .cb__btns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .cb__btn {
          padding: 10px 0;
          border-radius: 11px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          border: none;
          font-family: inherit;
          letter-spacing: -0.01em;
          transition: transform 0.15s, opacity 0.15s;
        }
        .cb__btn:hover { transform: translateY(-1px); opacity: 0.86; }
        .cb__btn:active { transform: scale(0.98); }
        .cb__btn--decline { background: #f2f2f2; color: #555; }
        .cb__btn--accept  { background: #131313; color: #fff; }
        @media (max-width: 480px) {
          .cb { bottom: 16px; left: 16px; right: 16px; width: auto; }
        }
      `}</style>

      {visible.value && (
        <div class="cb" role="region" aria-label="Cookie consent">
          <div class="cb__card">
            <div class="cb__top">
              <div class="cb__ico" aria-hidden="true">🍪</div>
              <div class="cb__body">
                <p class="cb__title">Cookie</p>
                <p class="cb__text">{t.text}</p>
                <a href={`/${lang}/cookies`} class="cb__link">{t.more}</a>
              </div>
            </div>
            <div class="cb__btns">
              <button
                class="cb__btn cb__btn--decline"
                onClick$={() => {
                  setCookie(COOKIE_NAME, 'declined', 365);
                  visible.value = false;
                }}
              >
                {t.decline}
              </button>
              <button
                class="cb__btn cb__btn--accept"
                onClick$={() => {
                  setCookie(COOKIE_NAME, 'accepted', 365);
                  visible.value = false;
                }}
              >
                {t.accept}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});