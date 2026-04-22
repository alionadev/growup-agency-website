export default {
  name: 'pricingFormat',
  title: 'Pricing — Format block',
  type: 'object',
  fields: [
    { name: 'label', title: 'Метка (над заголовком)', type: 'localeString' },
    { name: 'title', title: 'Заголовок', type: 'localeString' },
    { name: 'subtitle', title: 'Подзаголовок', type: 'localeText' },

    {
      name: 'steps',
      title: 'Шаги',
      type: 'array',
      of: [
        {
          name: 'pricingFormatStep',
          title: 'Шаг',
          type: 'object',
          fields: [
            {
              name: 'badge',
              title: 'Номер (01, 02...)',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            { name: 'title', title: 'Заголовок шага', type: 'localeString' },
            { name: 'text', title: 'Описание шага', type: 'localeText' },
            {
              name: 'bullets',
              title: 'Пункты списка',
              type: 'array',
              of: [{ type: 'localeString' }],
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.min(1),
    },
  ],
};