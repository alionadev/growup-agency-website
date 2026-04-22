// /sanity/schemas/contactPage.js
export default {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    // HERO
    { name: 'heroTitle', title: 'Hero title', type: 'localeString' },
    { name: 'heroSubtitle', title: 'Hero subtitle', type: 'localeText' },

    // LEFT CONTACTS
    { name: 'contactsTitle', title: 'Contacts title', type: 'localeString' },
    { name: 'emailLabel', title: 'Email label', type: 'localeString' },
    { name: 'telegramLabel', title: 'Telegram label', type: 'localeString' },
    { name: 'instagramLabel', title: 'Instagram label', type: 'localeString' },
    { name: 'onlineMeetingsText', title: 'Online meetings text', type: 'localeText' },

    // FORM HEAD
    { name: 'formTitle', title: 'Form title', type: 'localeString' },
    { name: 'formSubtitle', title: 'Form subtitle', type: 'localeText' },

    // FIELDS (labels + placeholders)
    { name: 'nameLabel', type: 'localeString', title: 'Name label' },
    { name: 'namePlaceholder', type: 'localeString', title: 'Name placeholder' },

    { name: 'phoneLabel', type: 'localeString', title: 'Phone label' },
    { name: 'phonePlaceholder', type: 'localeString', title: 'Phone placeholder' },

    { name: 'emailFieldLabel', type: 'localeString', title: 'Email label' },
    { name: 'emailPlaceholder', type: 'localeString', title: 'Email placeholder' },

    { name: 'nicheLabel', type: 'localeString', title: 'Niche label' },
    { name: 'nichePlaceholder', type: 'localeString', title: 'Niche placeholder' },

    { name: 'serviceLabel', type: 'localeString', title: 'Service label' },
    { name: 'servicePlaceholder', type: 'localeString', title: 'Service placeholder (first option)' },

    // service options
    {
      name: 'serviceOptions',
      title: 'Service options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value (sent to webhook)' },
            { name: 'label', type: 'localeString', title: 'Label' },
          ],
        },
      ],
    },

    { name: 'budgetLabel', type: 'localeString', title: 'Budget label' },
    { name: 'budgetPlaceholder', type: 'localeString', title: 'Budget placeholder (first option)' },

    // budget options
    {
      name: 'budgetOptions',
      title: 'Budget options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value' },
            { name: 'label', type: 'localeString', title: 'Label' },
          ],
        },
      ],
    },

    { name: 'goalLabel', type: 'localeString', title: 'Goal label' },
    { name: 'goalPlaceholder', type: 'localeText', title: 'Goal placeholder' },

    { name: 'websiteLabel', type: 'localeString', title: 'Website label' },
    { name: 'websitePlaceholder', type: 'localeString', title: 'Website placeholder' },

    { name: 'startWhenLabel', type: 'localeString', title: 'Start when label' },
    { name: 'startWhenPlaceholder', type: 'localeString', title: 'Start when placeholder' },

    {
      name: 'startWhenOptions',
      title: 'Start when options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value' },
            { name: 'label', type: 'localeString', title: 'Label' },
          ],
        },
      ],
    },

    { name: 'commentLabel', type: 'localeString', title: 'Comment label' },
    { name: 'commentPlaceholder', type: 'localeText', title: 'Comment placeholder' },

    // MESSAGES + BUTTONS
    { name: 'errorRequired', type: 'localeString', title: 'Error: required fields' },
    { name: 'errorSend', type: 'localeString', title: 'Error: send failed' },
    { name: 'successMessage', type: 'localeText', title: 'Success message' },

    { name: 'submitIdle', type: 'localeString', title: 'Submit button (idle)' },
    { name: 'submitSending', type: 'localeString', title: 'Submit button (sending)' },

    { name: 'note', type: 'localeText', title: 'Note under button' },
  ],
};