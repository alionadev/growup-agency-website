import { component$, useSignal } from '@builder.io/qwik';
import { Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import '~/styles/projects.css';
import { sanityClient } from '~/sanity/client';

import { HomeClients } from '../../../components/sections/home/HomeClients';
import { HomeCTA } from '../../../components/sections/home/HomeCTA';
import { type DocumentHead } from '@builder.io/qwik-city';

export const head: DocumentHead = ({ params }) => {
  const lang = (params.lang as Lang) || 'ru';
  const titles: Record<Lang, string> = {
    ru: 'Проекты — GrowUp Agency',
    en: 'Projects — GrowUp Agency',
    ro: 'Proiecte — GrowUp Agency',
  };
  return { title: titles[lang] ?? 'GrowUp Agency' };
};

export type CategoryId = 'ads' | 'smm' | 'branding' | 'web';
type Lang = 'ru' | 'en' | 'ro';

export type Project = {
  slug: string;
  categories: CategoryId[];
  title: string;
  subtitle: string;
  cover: string;
  client: string;
};

const LOCALES: Lang[] = ['ru', 'en', 'ro'];

const I18N: Record<
  Lang,
  {
    categories: Record<CategoryId | 'all', string>;
    title: string;
    subtitle: string;
    viewCase: string;
    allLabel: string;
  }
> = {
  ru: {
    categories: {
      all: 'Все проекты',
      ads: 'Paid Ads',
      smm: 'SMM',
      branding: 'Branding',
      web: 'WEB',
    },
    title: 'Реализованные проекты',
    subtitle: 'Маркетинг, который работает в реальном бизнесе.',
    viewCase: 'Смотреть кейс →',
    allLabel: 'Все проекты',
  },
  en: {
    categories: {
      all: 'All projects',
      ads: 'Paid Ads',
      smm: 'SMM',
      branding: 'Branding',
      web: 'WEB',
    },
    title: 'Delivered projects',
    subtitle: 'Marketing that works in real business.',
    viewCase: 'View case →',
    allLabel: 'All projects',
  },
  ro: {
    categories: {
      all: 'Toate proiectele',
      ads: 'Paid Ads',
      smm: 'SMM',
      branding: 'Branding',
      web: 'WEB',
    },
    title: 'Proiecte realizate',
    subtitle: 'Marketing care funcționează în business real.',
    viewCase: 'Vezi studiul de caz →',
    allLabel: 'Toate proiectele',
  },
};

export const useProjects = routeLoader$<Project[]>(async () => {
  const projects = await sanityClient.fetch<Project[]>(
    `*[_type == "project"] | order(_createdAt desc){
      "slug": slug.current,
      "categories": coalesce(categories, []),
      title,
      "subtitle": heroSubtitle,
      client,
      "cover": cover.asset->url
    }`
  );

  return projects || [];
});

export default component$(() => {
  const loc = useLocation();

  const raw = loc.params.lang as string | undefined;
  const lang: Lang = raw && LOCALES.includes(raw as Lang) ? (raw as Lang) : 'ru';
  const t = I18N[lang];

  const activeCategory = useSignal<CategoryId | 'all'>('all');
  const projects = useProjects().value;

  const categories: { id: CategoryId | 'all'; label: string }[] = [
    { id: 'all', label: t.categories.all },
    { id: 'ads', label: t.categories.ads },
    { id: 'smm', label: t.categories.smm },
    { id: 'branding', label: t.categories.branding },
    { id: 'web', label: t.categories.web },
  ];

  const filteredProjects = () =>
    activeCategory.value === 'all'
      ? projects
      : projects.filter((p) => p.categories?.includes(activeCategory.value as CategoryId));

  return (
    <main class="page page--projects">
      <section class="projects">
        <div class="projects__inner">
          {/* Табы */}
          <div class="projects-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                class={{
                  'projects-tabs__btn': true,
                  'projects-tabs__btn--active': activeCategory.value === cat.id,
                }}
                onClick$={() => (activeCategory.value = cat.id)}
                type="button"
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Заголовок */}
          <header class="projects-header">
            <h1 class="section-title section-title--center">{t.title}</h1>
            <p class="section-subtitle section-subtitle--center">{t.subtitle}</p>
          </header>

          {/* Сетка проектов */}
          <div class="projects-grid">
            {filteredProjects().map((project) => (
              <article key={project.slug} class="project-card">
                <Link
                  href={`/${lang}/projects/${project.slug}`}
                  class="project-card__link"
                >
                  <div class="project-card__image-wrap">
                    {project.cover ? (
                      <img
                        src={project.cover}
                        alt={project.title}
                        class="project-card__image"
                        loading="lazy"
                      />
                    ) : (
                      <div class="project-card__image-placeholder" />
                    )}
                  </div>

                  <div class="project-card__body">
                    {project.client && (
                      <div class="project-card__client">{project.client}</div>
                    )}
                    <h2 class="project-card__title">{project.title}</h2>
                    {project.subtitle && (
                      <p class="project-card__subtitle">{project.subtitle}</p>
                    )}
                    <span class="project-card__more">{t.viewCase}</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <HomeClients />
      <HomeCTA />
    </main>
  );
});