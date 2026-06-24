import { component$, Slot } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { GlobalDiscount } from '~/components/discount/GlobalDiscount';
import { Header } from '~/components/layout/Header';
import { Footer } from '~/components/layout/Footer';
import '../styles/global.css';

export default component$(() => {
  const loc = useLocation();
  const hideHeader = /^\/(?:ru|en|ro)\/intensive\/?$/.test(loc.url.pathname) || /^\/intensive\/?$/.test(loc.url.pathname);

  return (
    <div class="page">
      {!hideHeader && <Header />}
      <main class="page__content">
        <Slot />
      </main>
      <Footer />
      <GlobalDiscount /> {/* наша глобальная модалка */}
    </div>
  );
});
