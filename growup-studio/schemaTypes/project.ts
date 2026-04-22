// sanity/schemas/project.ts
import type { Rule } from 'sanity';

export default {
  name: 'project',
  type: 'document',
  title: 'Project',

  fields: [
    // HERO
    {
      name: 'title',
      type: 'localeString',              // ✅ было string
      title: 'Название проекта (Hero Title)',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title.ru', maxLength: 200 }, // ✅ важно: source -> title.ru
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'heroSubtitle',
      type: 'localeText',                // ✅ было string
      title: 'Hero Subtitle',
    },
    {
      name: 'task',
      type: 'localeText',                // ✅ было text
      title: 'Задача проекта',
      description: 'Краткое описание задачи, которая стояла перед командой',
    },

    // META
    {
      name: 'client',
      type: 'string', // 👈 оставь string (бренд обычно не переводится)
      title: 'Клиент',
    },

    {
      name: 'categories',
      title: 'Категории',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Ads', value: 'ads' },
              { title: 'SMM', value: 'smm' },
              { title: 'Branding', value: 'branding' },
              { title: 'Web', value: 'web' },
            ],
          },
        },
      ],
      options: { layout: 'grid' },
      validation: (rule: Rule) => rule.min(1).unique(),
    },

    {
      name: 'period',
      type: 'localeString',              // ✅ было string
      title: 'Период работы',
    },

    // HERO IMAGE
    {
      name: 'cover',
      type: 'image',
      title: 'Обложка / Hero Image',
      options: { hotspot: true },
    },

    // СЕКЦИИ (ты уже переводишь projectSection отдельно)
    {
      name: 'sections',
      type: 'array',
      title: 'Секции проекта',
      of: [{ type: 'projectSection' }],
    },
  ],
};