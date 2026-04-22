export default {
  name: 'pricingPage',
  title: 'Pricing Page',
  type: 'document',

  fields: [
    /* =========================
       КАТЕГОРИИ (ТАБЫ)
    ========================= */

    {
      name: 'categories',
      title: 'Категории / тарифы',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Категория',
          fields: [
            {
              name: 'id',
              title: 'ID категории',
              type: 'string',
              description: 'ads | smm | branding | web',
              validation: (Rule: any) => Rule.required(),
            },

            {
              name: 'heading',
              title: 'Короткое название (таб)',
              type: 'localeString',
              description: 'Например: Paid Ads / SMM / Branding',
            },

            {
              name: 'title',
              title: 'Заголовок секции',
              type: 'localeString',
            },

            {
              name: 'subtitle',
              title: 'Подзаголовок секции',
              type: 'localeText',
            },

            /* =========================
               ТАРИФЫ
            ========================= */

            {
              name: 'tiers',
              title: 'Тарифы',
              type: 'array',
              of: [
                {
                  type: 'object',
                  title: 'Тариф',
                  fields: [
                    {
                      name: 'name',
                      title: 'Название тарифа',
                      type: 'localeString',
                    },

                    {
                      name: 'price',
                      title: 'Цена',
                      type: 'localeString',
                      description: 'Например: 400€/мес, от 1500€',
                    },

                    {
                      name: 'oldPrice',
                      title: 'Старая цена (необязательно)',
                      type: 'localeString',
                    },

                    {
                      name: 'highlighted',
                      title: 'Выделенный тариф',
                      type: 'boolean',
                      initialValue: false,
                    },

                    {
                      name: 'features',
                      title: 'Что входит',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            {
                              name: 'text',
                              title: 'Текст пункта',
                              type: 'localeString',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    /* =========================
       КНОПКИ / UI ТЕКСТЫ
    ========================= */

    {
      name: 'discussBtn',
      title: 'Текст кнопки "Обсудить задачу"',
      type: 'localeString',
    },

    {
      name: 'giftAria',
      title: 'ARIA текст для подарка 🎁',
      type: 'localeString',
    },

    /* =========================
       МОДАЛКА
    ========================= */

    {
      name: 'modalTitle',
      title: 'Заголовок модалки',
      type: 'localeString',
    },

    {
      name: 'modalTypeLabel',
      title: 'Лейбл: Тип продвижения',
      type: 'localeString',
    },

    {
      name: 'modalNameLabel',
      title: 'Лейбл: Имя',
      type: 'localeString',
    },

    {
      name: 'modalNamePlaceholder',
      title: 'Placeholder: Имя',
      type: 'localeString',
    },

    {
      name: 'modalPhoneLabel',
      title: 'Лейбл: Телефон',
      type: 'localeString',
    },

    {
      name: 'modalPhonePlaceholder',
      title: 'Placeholder: Телефон',
      type: 'localeString',
    },

    {
      name: 'modalSubmit',
      title: 'Текст кнопки отправки',
      type: 'localeString',
    },
    {
      name: 'formatBlock',
      title: 'Блок “Формат работы”',
      type: 'pricingFormat',
    },
  ],
}
