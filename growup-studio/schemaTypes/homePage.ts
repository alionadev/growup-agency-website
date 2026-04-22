export default {
  name: 'homePage',
  type: 'document',
  title: 'Home Page',
  fields: [
    {
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'object',
          fields: [
            {name: 'ru', type: 'string', title: 'RU'},
            {name: 'en', type: 'string', title: 'EN'},
            {name: 'ro', type: 'string', title: 'RO'},
          ],
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'object',
          fields: [
            {name: 'ru', type: 'string', title: 'RU'},
            {name: 'en', type: 'string', title: 'EN'},
            {name: 'ro', type: 'string', title: 'RO'},
          ],
        },
        {
          name: 'text',
          title: 'Text',
          type: 'object',
          fields: [
            {name: 'ru', type: 'text', title: 'RU'},
            {name: 'en', type: 'text', title: 'EN'},
            {name: 'ro', type: 'text', title: 'RO'},
          ],
        },
        {
          name: 'ctaPrimary',
          title: 'CTA Primary',
          type: 'object',
          fields: [
            {name: 'ru', type: 'string', title: 'RU'},
            {name: 'en', type: 'string', title: 'EN'},
            {name: 'ro', type: 'string', title: 'RO'},
          ],
        },
        {
          name: 'ctaSecondary',
          title: 'CTA Secondary',
          type: 'object',
          fields: [
            {name: 'ru', type: 'string', title: 'RU'},
            {name: 'en', type: 'string', title: 'EN'},
            {name: 'ro', type: 'string', title: 'RO'},
          ],
        },
      ],
    },
    {
      name: 'stats',
      title: 'Статистика',
      type: 'array',
      of: [{type: 'homeStatItem'}],
    },
    {
      name: 'servicesTitle',
      title: 'Заголовок блока услуг',
      type: 'object',
      fields: [
        {name: 'ru', type: 'string', title: 'RU'},
        {name: 'en', type: 'string', title: 'EN'},
        {name: 'ro', type: 'string', title: 'RO'},
      ],
    },
    {
      name: 'servicesSubtitle',
      title: 'Подзаголовок блока услуг',
      type: 'object',
      fields: [
        {name: 'ru', type: 'text', title: 'RU'},
        {name: 'en', type: 'text', title: 'EN'},
        {name: 'ro', type: 'text', title: 'RO'},
      ],
    },
    {
      name: 'services',
      title: 'Услуги',
      type: 'array',
      of: [{type: 'homeServiceItem'}],
    },
    {
      name: 'servicesCta',
      title: 'Текст кнопки в карточках услуг',
      type: 'localeString',
    },
    {
      name: 'clientsTitle',
      title: 'Заголовок блока “Нам доверяют”',
      type: 'localeString',
    },
    {
      name: 'clientsTop',
      title: 'Логотипы — верхняя строка',
      type: 'array',
      of: [{type: 'clientLogo'}],
    },
    {
      name: 'clientsBottom',
      title: 'Логотипы — нижняя строка',
      type: 'array',
      of: [{type: 'clientLogo'}],
    },
    {
      name: 'teamEyebrow',
      title: 'Надзаголовок (маленький текст сверху)',
      type: 'localeString',
    },
    {
      name: 'teamTitle',
      title: 'Заголовок блока Team',
      type: 'localeString',
    },
    {
      name: 'teamSubtitle',
      title: 'Подзаголовок блока Team',
      type: 'localeText', // если у тебя есть localeText, иначе localeString
    },
    {
      name: 'team',
      title: 'Команда',
      type: 'array',
      of: [{type: 'teamMember'}],
    },
    {
      name: 'processTitle',
      title: 'Заголовок блока Process',
      type: 'localeString',
    },
    {
      name: 'processSteps',
      title: 'Шаги Process',
      type: 'array',
      of: [{type: 'homeProcessStep'}],
    },
    {
      name: 'faqTitle',
      title: 'Заголовок FAQ',
      type: 'localeString',
    },
    {
      name: 'faqItems',
      title: 'Вопросы FAQ',
      type: 'array',
      of: [{type: 'homeFaqItem'}],
    },
    {
      name: 'ctaForm',
      title: 'CTA форма',
      type: 'homeCtaForm',
    },
  ],
}
