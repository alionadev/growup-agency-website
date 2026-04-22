export default {
  name: 'homeCtaForm',
  title: 'CTA форма (правая карточка)',
  type: 'object',
  fields: [
    { name: 'title', title: 'Заголовок', type: 'localeString' },
    { name: 'subtitle', title: 'Подзаголовок', type: 'localeText' },

    { name: 'placeholderName', title: 'Placeholder: Имя', type: 'localeString' },
    { name: 'placeholderPhone', title: 'Placeholder: Телефон', type: 'localeString' },
    { name: 'placeholderEmail', title: 'Placeholder: Email', type: 'localeString' },

    { name: 'buttonText', title: 'Текст кнопки', type: 'localeString' },
    { name: 'note', title: 'Нижняя приписка', type: 'localeText' },

    // сообщения
    { name: 'errorRequired', title: 'Ошибка: имя + контакт', type: 'localeString' },
    { name: 'errorServer', title: 'Ошибка: сервер недоступен', type: 'localeString' },
    { name: 'errorSend', title: 'Ошибка: не отправилось', type: 'localeString' },
    { name: 'success', title: 'Успех', type: 'localeString' },
  ],
};