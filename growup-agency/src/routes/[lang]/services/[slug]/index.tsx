import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { sanityClient } from '~/sanity/client';
import { ServicePage } from '~/components/service-page/service-page';
import type { ServicePageData } from '~/components/service-page/types';

type Lang = 'ru' | 'en' | 'ro';

type SanityProject = {
  slug: string;
  title: string;
  tagline?: string;
  client?: string;
  image?: string;
};

type SanityService = {
  slug: string;
  category?: string; // <-- ВАЖНО: тут должен быть ключ: ads/smm/branding/web
  data: ServicePageData;
};

export const useServicePage = routeLoader$<SanityService>(async ({ params }) => {
  const lang = (params.lang as Lang) || 'ru';
  const slug = params.slug;

  const service = await sanityClient.fetch<any>(
    `*[_type=="service" && slug.current==$slug][0]{
      "slug": slug.current,
      category,

      "data": {
        "badge": coalesce(badge[$lang], badge.ru, ""),
        "titleLine1": coalesce(titleLine1[$lang], titleLine1.ru, ""),
        "titleLine2": coalesce(titleLine2[$lang], titleLine2.ru, ""),
        "subtitle": coalesce(subtitle[$lang], subtitle.ru, ""),
        "description": coalesce(description[$lang], description.ru, ""),

        "heroImage": heroImage.asset->url,
        "heroImageAlt": coalesce(heroImageAlt[$lang], heroImageAlt.ru, ""),

        "ctaPrimary": coalesce(ctaPrimary[$lang], ctaPrimary.ru, ""),
        "ctaSecondary": coalesce(ctaSecondary[$lang], ctaSecondary.ru, ""),
        "ctaSecondaryLink": coalesce(ctaSecondaryLink, ""),

        "projects": {
          "label": coalesce(projectsLabel[$lang], projectsLabel.ru, ""),
          "title": coalesce(projectsTitle[$lang], projectsTitle.ru, ""),
          "allLink": coalesce(projectsAllLink, ""),
          "items": []
        },

        "process": {
          "label": coalesce(processLabel[$lang], processLabel.ru, ""),
          "titleLine1": coalesce(processTitleLine1[$lang], processTitleLine1.ru, ""),
          "titleLine2": coalesce(processTitleLine2[$lang], processTitleLine2.ru, ""),
          "steps": coalesce(processSteps, [])[]{
            "title": coalesce(title[$lang], title.ru, ""),
            "text":  coalesce(text[$lang], text.ru, "")
          }
        },

        "offers": coalesce(offers, [])[]{
          "label": coalesce(label[$lang], label.ru, ""),
          "title": coalesce(title[$lang], title.ru, ""),
          "subtitle": coalesce(subtitle[$lang], subtitle.ru, ""),
          "points": coalesce(points[$lang], points.ru, []),
          "image": image.asset->url,
          "imageAlt": coalesce(imageAlt[$lang], imageAlt.ru, "")
        },

        "faq": {
          "titleLine1": coalesce(faqTitleLine1[$lang], faqTitleLine1.ru, ""),
          "titleLine2": coalesce(faqTitleLine2[$lang], faqTitleLine2.ru, ""),
          "items": coalesce(faqItems, [])[]{
            "question": coalesce(question[$lang], question.ru, ""),
            "answer":   coalesce(answer[$lang], answer.ru, "")
          }
        },

        "brief": {
          "title":  coalesce(briefTitle[$lang], briefTitle.ru, ""),
          "text":   coalesce(briefText[$lang], briefText.ru, ""),
          "link": coalesce(briefLink, ""),
          "button": coalesce(briefButton[$lang], briefButton.ru, "")
        }
      }
    }`,
    { slug, lang }
  );

  if (!service) throw new Error('Service not found');

  return service as SanityService;
});

export const useServiceProjects = routeLoader$<SanityProject[]>(async ({ params }) => {
  const slug = params.slug;

  // 1) Берём category key из service (ads/smm/branding/web)
  const serviceMeta = await sanityClient.fetch<{ category?: string }>(
    `*[_type=="service" && slug.current==$slug][0]{ category }`,
    { slug }
  );

  // 2) fallback: если category не заполнен — пробуем slug
  const categoryKey = (serviceMeta?.category || slug || '').trim();

  // если categoryKey типа "WEB DEVELOPMENT & SEO" — это ошибка данных, проектов не будет.
  if (!categoryKey) return [];

  const projects = await sanityClient.fetch<SanityProject[]>(
    `*[
      _type=="project" &&
      defined(slug.current) &&
      $categoryKey in coalesce(categories, [])
    ]
    | order(_createdAt desc)[0...10]{
      "slug": slug.current,
      title,
      "tagline": heroSubtitle,
      client,
      "image": cover.asset->url
    }`,
    { categoryKey }
  );

  return projects || [];
});

export default component$(() => {
  const service = useServicePage().value;
  const projects = useServiceProjects().value;

  return <ServicePage data={service.data} projectsFromSanity={projects} />;
});