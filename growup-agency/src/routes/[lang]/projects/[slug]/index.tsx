import { component$ } from '@builder.io/qwik';
import { Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import '~/styles/projects.css';
import { sanityClient } from '~/sanity/client';
import { HomeCTA } from '~/components/sections/home/HomeCTA';

type Lang = 'ru' | 'en' | 'ro';

type SectionKind = 'goals' | 'solution' | 'results';

type SectionImage = {
  url: string;
  alt?: string;
};

type ProjectSection = {
  kind: SectionKind;
  title?: string;
  text?: string;
  gallery?: SectionImage[];
};

type ProjectPageData = {
  slug: string;
  heroTitle: string;
  heroSubtitle?: string;
  task?: string;

  client?: string;
  categories?: string[]; // ✅ ключи категорий
  period?: string;

  cover?: string;
  sections: ProjectSection[];
};

const UI = {
  ru: {
    back: '← Все проекты',
    taskLabel: 'задача',
    metaClient: 'Клиент',
    metaCategory: 'Категория',
    metaPeriod: 'Период',

    goalsFallback: 'Маркетинговая задача и цели',
    solutionFallback: 'Стратегия и реализация кампании',
    resultsFallback: 'Результаты и выводы',
  },
  en: {
    back: '← All projects',
    taskLabel: 'task',
    metaClient: 'Client',
    metaCategory: 'Category',
    metaPeriod: 'Period',

    goalsFallback: 'Marketing goals & KPIs',
    solutionFallback: 'Strategy & execution',
    resultsFallback: 'Results & insights',
  },
  ro: {
    back: '← Toate proiectele',
    taskLabel: 'sarcină',
    metaClient: 'Client',
    metaCategory: 'Categorie',
    metaPeriod: 'Perioadă',

    goalsFallback: 'Obiective și KPI-uri',
    solutionFallback: 'Strategie și implementare',
    resultsFallback: 'Rezultate și concluzii',
  },
} as const;

const CAT_LABEL = {
  ru: { ads: 'Платная реклама', smm: 'SMM', branding: 'Брендинг', web: 'Web-разработка' },
  en: { ads: 'Paid ads', smm: 'SMM', branding: 'Branding', web: 'Web development' },
  ro: { ads: 'Publicitate plătită', smm: 'SMM', branding: 'Branding', web: 'Dezvoltare web' },
} as const;

export const useProject = routeLoader$<ProjectPageData | null>(async ({ params }) => {
  const lang = (params.lang as Lang) || 'ru';
  const slug = params.slug;

  // ВАЖНО:
  // это работает только если в Sanity ты поменяла схемы на localeString/localeText
  // (title, heroSubtitle, task, period, sections.title/text, gallery.alt)
  const project = await sanityClient.fetch<ProjectPageData | null>(
    `*[_type == "project" && slug.current == $slug][0]{
      "slug": slug.current,

      "heroTitle": coalesce(title[$lang], title.ru, ""),
      "heroSubtitle": coalesce(heroSubtitle[$lang], heroSubtitle.ru, ""),
      "task": coalesce(task[$lang], task.ru, ""),

      client,
      "categories": coalesce(categories, []),

      "period": coalesce(period[$lang], period.ru, ""),

      "cover": cover.asset->url,

      "sections": sections[]{
        kind,
        "title": coalesce(title[$lang], title.ru, ""),
        "text": coalesce(text[$lang], text.ru, ""),
        "gallery": gallery[]{
          "url": asset->url,
          "alt": coalesce(alt[$lang], alt.ru, alt)
        }
      }
    }`,
    { slug, lang }
  );

  return project;
});

export default component$(() => {
  const loc = useLocation();
  const lang = (loc.params.lang as Lang) || 'ru';
  const t = UI[lang];

  const projectResource = useProject();
  const data = projectResource.value;

  // если проект ещё не найден/не заполнен — показываем минимально, без падения
  if (!data) {
    return (
      <main class="page page--project">
        <section class="project">
          <div class="project__inner">
            <Link href={`/${lang}/projects`} class="project__back-link">
              {t.back}
            </Link>
            <div class="project-layout">
              <p>Project not found</p>
            </div>
          </div>
        </section>
        <HomeCTA />
      </main>
    );
  }

  const sections: ProjectSection[] = data.sections ?? [];
  const categoriesText =
    (data.categories ?? [])
      .map((c) => (CAT_LABEL[lang] as any)[c] || c)
      .join(', ') || '';

  return (
    <main class="page page--project">
      <section class="project">
        <div class="project__inner">
          {/* ✅ ссылка назад зависит от языка */}
          <Link href={`/${lang}/projects`} class="project__back-link">
            {t.back}
          </Link>

          {/* HERO */}
          <header class="project-hero">
            <div class="project-hero__text">
              <h1 class="project-hero__title">{data.heroTitle}</h1>

              {data.heroSubtitle && (
                <p class="project-hero__subtitle">{data.heroSubtitle}</p>
              )}

              {data.task && (
                <div class="project-hero__task">
                  <span class="project-hero__task-label">{t.taskLabel}</span>
                  <p class="project-hero__task-text">{data.task}</p>
                </div>
              )}

              {/* ✅ meta-лейблы переводятся */}
              <dl class="project-hero__meta">
                <div>
                  <dt>{t.metaClient}</dt>
                  <dd>{data.client || ''}</dd>
                </div>
                <div>
                  <dt>{t.metaCategory}</dt>
                  <dd>{categoriesText}</dd>
                </div>
                <div>
                  <dt>{t.metaPeriod}</dt>
                  <dd>{data.period || ''}</dd>
                </div>
              </dl>
            </div>

            <div class="project-hero__image-wrap">
              <div class="project-hero__image-placeholder">
                {data.cover && (
                  <img
                    src={data.cover}
                    alt={data.heroTitle}
                    class="project-hero__image"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </header>

          {/* СЕКЦИИ */}
          <div class="project-layout">
            {sections.map((section: ProjectSection, index: number) => {
              const gallery = section.gallery ?? [];
              const sideImage = gallery[0];
              const extraImages = gallery.slice(1);

              if (section.kind === 'goals') {
                return (
                  <section
                    key={`goals-${index}`}
                    class="project-section project-section--goals"
                  >
                    <div class="project-section__text project-section__text--full">
                      <h2 class="project-section__title">
                        {section.title || t.goalsFallback}
                      </h2>
                      <p class="project-section__body">{section.text}</p>
                    </div>
                  </section>
                );
              }

              if (section.kind === 'solution') {
                return (
                  <section
                    key={`solution-${index}`}
                    class="project-section project-section--solution"
                  >
                    <div class="project-section__content">
                      <div class="project-section__media project-section__media--left">
                        {sideImage && (
                          <img
                            src={sideImage.url}
                            alt={sideImage.alt || section.title || ''}
                            class="project-section__image"
                            loading="lazy"
                          />
                        )}
                      </div>

                      <div class="project-section__text">
                        <h2 class="project-section__title">
                          {section.title || t.solutionFallback}
                        </h2>
                        <p class="project-section__body">{section.text}</p>
                      </div>
                    </div>

                    {extraImages.length > 0 && (
                      <div class="project-section__gallery project-section__gallery--below">
                        {extraImages.map((img: SectionImage, imgIndex: number) => (
                          <div
                            key={`solution-extra-${index}-${imgIndex}`}
                            class="project-section__gallery-item"
                          >
                            <img
                              src={img.url}
                              alt={img.alt || ''}
                              class="project-section__gallery-image"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                );
              }

              if (section.kind === 'results') {
                return (
                  <section
                    key={`results-${index}`}
                    class="project-section project-section--results"
                  >
                    <div class="project-section__content">
                      <div class="project-section__text">
                        <h2 class="project-section__title">
                          {section.title || t.resultsFallback}
                        </h2>
                        <p class="project-section__body">{section.text}</p>
                      </div>

                      <div class="project-section__media project-section__media--right">
                        {sideImage && (
                          <img
                            src={sideImage.url}
                            alt={sideImage.alt || section.title || ''}
                            class="project-section__image"
                            loading="lazy"
                          />
                        )}
                      </div>
                    </div>

                    {extraImages.length > 0 && (
                      <div class="project-section__gallery project-section__gallery--below">
                        {extraImages.map((img: SectionImage, imgIndex: number) => (
                          <div
                            key={`results-extra-${index}-${imgIndex}`}
                            class="project-section__gallery-item"
                          >
                            <img
                              src={img.url}
                              alt={img.alt || ''}
                              class="project-section__gallery-image"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                );
              }

              return null;
            })}
          </div>
        </div>
      </section>

      <HomeCTA />
    </main>
  );
});