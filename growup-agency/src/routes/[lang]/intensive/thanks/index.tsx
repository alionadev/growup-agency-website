import { component$ } from '@builder.io/qwik';
import { type DocumentHead, useLocation } from '@builder.io/qwik-city';
import '~/styles/intensive.css';

type Lang = 'ru' | 'en' | 'ro';

const LOCALES: Lang[] = ['ru', 'en', 'ro'];

const getLang = (raw?: string): Lang =>
  raw && LOCALES.includes(raw as Lang) ? (raw as Lang) : 'ru';

export const head: DocumentHead = ({ params }) => {
  const lang = getLang(params.lang as string | undefined);

  return {
    title: 'Спасибо, ваша заявка отправлена | GrowUp Agency',
    meta: [
      {
        name: 'description',
        content: 'Спасибо, ваша заявка на интенсив GrowUp Agency отправлена.',
      },
      { name: 'robots', content: lang ? 'noindex, follow' : 'noindex, follow' },
    ],
  };
};

export default component$(() => {
  const loc = useLocation();
  const lang = getLang(loc.params.lang as string | undefined);

  return (
    <main class="intensive-page intensive-thanks-page">
      <section class="thanks-card">
        <span>Заявка отправлена</span>
        <h1>Спасибо, ваша заявка отправлена</h1>
        <p>Мы свяжемся с вами в Telegram и отправим детали программы, даты и условия участия.</p>
        <a class="cta cta--red" href={`/${lang}/intensive/`}>
          Вернуться на страницу <span>→</span>
        </a>
      </section>
    </main>
  );
});
