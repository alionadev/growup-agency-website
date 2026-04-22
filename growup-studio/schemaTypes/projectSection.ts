// sanity/schemas/projectSection.ts

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

export default {
  name: 'projectSection',
  type: 'object',
  title: 'Project Section',

  fields: [
    {
      name: 'kind',
      type: 'string',
      title: 'Тип секции',
      options: {
        list: [
          { title: 'Цели и KPI', value: 'goals' },
          { title: 'Реализация кампании', value: 'solution' },
          { title: 'Результаты', value: 'results' },
        ],
        layout: 'radio',
      },
      validation: (rule: any) => rule.required(),
    },

    // ✅ теперь переводимый заголовок секции
    {
      name: 'title',
      type: 'localeString',
      title: 'Заголовок секции',
    },

    // ✅ теперь переводимый текст секции
    {
      name: 'text',
      type: 'localeText',
      title: 'Текст секции',
    },

    // ✅ alt тоже лучше перевести
    {
      name: 'gallery',
      type: 'array',
      title: 'Галерея изображений',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'localeString',
              title: 'Alt текст',
            },
          ],
        },
      ],
    },
  ],
};