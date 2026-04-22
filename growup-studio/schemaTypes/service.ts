// sanity/schemas/service.ts

const localeString = {
  name: 'localeString',
  title: 'Localized string',
  type: 'object',
  fields: [
    { name: 'ru', type: 'string', title: 'RU' },
    { name: 'en', type: 'string', title: 'EN' },
    { name: 'ro', type: 'string', title: 'RO' },
  ],
};

const localeText = {
  name: 'localeText',
  title: 'Localized text',
  type: 'object',
  fields: [
    { name: 'ru', type: 'text', title: 'RU' },
    { name: 'en', type: 'text', title: 'EN' },
    { name: 'ro', type: 'text', title: 'RO' },
  ],
};

const localeStringArray = {
  name: 'localeStringArray',
  title: 'Localized string array',
  type: 'object',
  fields: [
    { name: 'ru', type: 'array', title: 'RU', of: [{ type: 'string' }] },
    { name: 'en', type: 'array', title: 'EN', of: [{ type: 'string' }] },
    { name: 'ro', type: 'array', title: 'RO', of: [{ type: 'string' }] },
  ],
};

export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  groups: [
    { name: 'homeCard', title: 'Home Card' },
    { name: 'page', title: 'Service Page' },
  ],
  fields: [
    { name: 'title', title: 'Internal title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },

    // чтобы фильтровать проекты (branding/web/etc)
    { name: 'category', title: 'Category key', type: 'string' },

    // =========================
    // ✅ HOME CARD (как homeServiceItem)
    // =========================
    {
      name: 'homeTag',
      title: 'Tag (Home card)',
      type: 'string',
      group: 'homeCard',
    },
    {
      name: 'homeTitle',
      title: 'Название (Home card)',
      type: 'localeString',
      group: 'homeCard',
    },
    {
      name: 'homeLink',
      title: 'Ссылка (Home card)',
      type: 'string',
      group: 'homeCard',
      description: 'Например: /services/branding',
    },
    {
      name: 'homeServicesCta',
      title: 'Текст кнопки (Home card)',
      type: 'localeString',
      group: 'homeCard',
    },
    {
      name: 'homeBullets',
      title: 'Пункты (Home card)',
      type: 'array',
      group: 'homeCard',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Текст', type: 'localeString' },
          ],
          preview: {
            select: { title: 'text.ru' },
          },
        },
      ],
    },

    // =========================
    // ✅ SERVICE PAGE (твоя типовая страница)
    // =========================

    // HERO
    { name: 'badge', type: 'localeString', title: 'Badge', group: 'page' },
    { name: 'titleLine1', type: 'localeString', title: 'Title line 1', group: 'page' },
    { name: 'titleLine2', type: 'localeString', title: 'Title line 2', group: 'page' },
    { name: 'subtitle', type: 'localeText', title: 'Subtitle', group: 'page' },
    { name: 'description', type: 'localeText', title: 'Description', group: 'page' },

    { name: 'heroImage', title: 'Hero image', type: 'image', options: { hotspot: true }, group: 'page' },
    { name: 'heroImageAlt', type: 'localeString', title: 'Hero image alt', group: 'page' },

    // CTA
    { name: 'ctaPrimary', type: 'localeString', title: 'CTA primary', group: 'page' },
    { name: 'ctaSecondary', type: 'localeString', title: 'CTA secondary', group: 'page' },
    { name: 'ctaSecondaryLink', type: 'string', title: 'CTA secondary link', group: 'page' },

    // Projects header texts
    { name: 'projectsLabel', type: 'localeString', title: 'Projects label', group: 'page' },
    { name: 'projectsTitle', type: 'localeString', title: 'Projects title', group: 'page' },
    { name: 'projectsAllLink', type: 'string', title: 'Projects all link', group: 'page' },

    // Process
    { name: 'processLabel', type: 'localeString', title: 'Process label', group: 'page' },
    { name: 'processTitleLine1', type: 'localeString', title: 'Process title line 1', group: 'page' },
    { name: 'processTitleLine2', type: 'localeString', title: 'Process title line 2', group: 'page' },

    {
      name: 'processSteps',
      title: 'Process steps',
      type: 'array',
      group: 'page',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'localeString', title: 'Title' },
            { name: 'text', type: 'localeText', title: 'Text' },
          ],
        },
      ],
    },

    // Offers
    {
      name: 'offers',
      title: 'Offers',
      type: 'array',
      group: 'page',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'localeString', title: 'Label' },
            { name: 'title', type: 'localeString', title: 'Title' },
            { name: 'subtitle', type: 'localeText', title: 'Subtitle' },
            { name: 'points', type: 'localeStringArray', title: 'Points' },
            { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
            { name: 'imageAlt', type: 'localeString', title: 'Image alt' },
          ],
        },
      ],
    },

    // FAQ
    { name: 'faqTitleLine1', type: 'localeString', title: 'FAQ title line 1', group: 'page' },
    { name: 'faqTitleLine2', type: 'localeString', title: 'FAQ title line 2', group: 'page' },
    {
      name: 'faqItems',
      title: 'FAQ items',
      type: 'array',
      group: 'page',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'localeString', title: 'Question' },
            { name: 'answer', type: 'localeText', title: 'Answer' },
          ],
        },
      ],
    },

    // Brief CTA
    { name: 'briefTitle', type: 'localeString', title: 'Brief title', group: 'page' },
    { name: 'briefText', type: 'localeText', title: 'Brief text', group: 'page' },
    { name: 'briefLink', type: 'string', title: 'Brief link', group: 'page' },
    { name: 'briefButton', type: 'localeString', title: 'Brief button', group: 'page' },
  ],
};