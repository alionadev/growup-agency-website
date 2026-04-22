export default {
  name: 'clientLogo',
  title: 'Логотип клиента',
  type: 'object',
  fields: [
    {
      name: 'logo',
      title: 'Логотип',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'alt',
      title: 'ALT',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'href',
      title: 'Ссылка (необязательно)',
      type: 'string',
      description: 'Напр: /projects/moft (если пусто — без клика)',
    },
  ],
};