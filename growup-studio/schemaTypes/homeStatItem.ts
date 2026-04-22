// ./schemas/objects/homeStatItem.ts
export default {
  name: 'homeStatItem',
  title: 'Пункт статистики',
  type: 'object',
  fields: [
    { name: 'value', title: 'Значение', type: 'string' },
    { name: 'label', title: 'Подпись', type: 'localeString' },
  ],
};