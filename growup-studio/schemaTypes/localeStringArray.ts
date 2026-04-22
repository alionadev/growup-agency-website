export default {
  name: 'localeStringArray',
  title: 'Localized string array',
  type: 'object',
  fields: [
    { name: 'ru', type: 'array', title: 'RU', of: [{ type: 'string' }] },
    { name: 'en', type: 'array', title: 'EN', of: [{ type: 'string' }] },
    { name: 'ro', type: 'array', title: 'RO', of: [{ type: 'string' }] },
  ],
};