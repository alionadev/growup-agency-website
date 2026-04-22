export default {
  name: 'homeServiceItem',
  title: 'Услуга',
  type: 'object',
  fields: [
    {
      name: 'tag',
      title: 'Tag',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Название',
      type: 'object',
      fields: [
        {name: 'ru', type: 'string', title: 'RU'},
        {name: 'en', type: 'string', title: 'EN'},
        {name: 'ro', type: 'string', title: 'RO'},
      ],
    },
    {
      name: 'link',
      title: 'Ссылка',
      type: 'string',
    },
    {
      name: 'servicesCta',
      title: 'Текст кнопки',
      type: 'localeString',
    },
    {
      name: 'bullets',
      title: 'Пункты',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Текст',
              type: 'object',
              fields: [
                {name: 'ru', type: 'string', title: 'RU'},
                {name: 'en', type: 'string', title: 'EN'},
                {name: 'ro', type: 'string', title: 'RO'},
              ],
            },
          ],
        },
      ],
    },
  ],
}
