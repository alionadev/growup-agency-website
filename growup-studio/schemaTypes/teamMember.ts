export default {
  name: 'teamMember',
  title: 'Участник команды',
  type: 'object',
  fields: [
    {
      name: 'photo',
      title: 'Фото',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'name',
      title: 'Имя',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Роль / должность',
      type: 'localeString',
    },
    {
      name: 'link',
      title: 'Ссылка (необязательно)',
      type: 'string', // храни без языка: /team/aliona или /about и т.д.
      description: 'Пиши без /ru /en /ro. Язык добавим автоматически.',
    },
  ],
};