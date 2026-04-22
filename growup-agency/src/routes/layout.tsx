import { component$, Slot } from '@builder.io/qwik';
import { GlobalDiscount } from '~/components/discount/GlobalDiscount';
import { Header } from '~/components/layout/Header';
import { Footer } from '~/components/layout/Footer';
import '../styles/global.css';

export default component$(() => {
  return (
    <div class="page">
      <Header />
      <main class="page__content">
        <Slot />
      </main>
      <Footer />
      <GlobalDiscount /> {/* наша глобальная модалка */}
    </div>
  );
});