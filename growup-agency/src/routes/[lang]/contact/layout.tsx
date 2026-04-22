import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { sanityClient } from '~/sanity/client';

type Lang = 'ru' | 'en' | 'ro';
type L = { ru?: string; en?: string; ro?: string };
const pick = (v?: L, lang: Lang = 'ru') => v?.[lang] ?? v?.ru ?? '';

export type ContactPageVM = {
  heroTitle: string;
  heroSubtitle: string;

  contactsTitle: string;
  emailLabel: string;
  telegramLabel: string;
  instagramLabel: string;
  onlineMeetingsText: string;

  formTitle: string;
  formSubtitle: string;

  nameLabel: string;
  namePlaceholder: string;

  phoneLabel: string;
  phonePlaceholder: string;

  emailFieldLabel: string;
  emailPlaceholder: string;

  nicheLabel: string;
  nichePlaceholder: string;

  serviceLabel: string;
  servicePlaceholder: string;
  serviceOptions: { value: string; label: string }[];

  budgetLabel: string;
  budgetPlaceholder: string;
  budgetOptions: { value: string; label: string }[];

  goalLabel: string;
  goalPlaceholder: string;

  websiteLabel: string;
  websitePlaceholder: string;

  startWhenLabel: string;
  startWhenPlaceholder: string;
  startWhenOptions: { value: string; label: string }[];

  commentLabel: string;
  commentPlaceholder: string;

  errorRequired: string;
  errorSend: string;
  successMessage: string;

  submitIdle: string;
  submitSending: string;

  note: string;
};

export const useContactPage = routeLoader$<ContactPageVM>(async ({ params }) => {
  const lang = (params.lang as Lang) || 'ru';

  const data = await sanityClient.fetch<any>(`
    *[_type == "contactPage"][0]{
      heroTitle, heroSubtitle,
      contactsTitle, emailLabel, telegramLabel, instagramLabel, onlineMeetingsText,

      formTitle, formSubtitle,

      nameLabel, namePlaceholder,
      phoneLabel, phonePlaceholder,
      emailFieldLabel, emailPlaceholder,
      nicheLabel, nichePlaceholder,

      serviceLabel, servicePlaceholder,
      serviceOptions[]{ value, label },

      budgetLabel, budgetPlaceholder,
      budgetOptions[]{ value, label },

      goalLabel, goalPlaceholder,
      websiteLabel, websitePlaceholder,

      startWhenLabel, startWhenPlaceholder,
      startWhenOptions[]{ value, label },

      commentLabel, commentPlaceholder,

      errorRequired, errorSend, successMessage,
      submitIdle, submitSending,
      note
    }
  `);

  return {
    heroTitle: pick(data?.heroTitle, lang),
    heroSubtitle: pick(data?.heroSubtitle, lang),

    contactsTitle: pick(data?.contactsTitle, lang),
    emailLabel: pick(data?.emailLabel, lang),
    telegramLabel: pick(data?.telegramLabel, lang),
    instagramLabel: pick(data?.instagramLabel, lang),
    onlineMeetingsText: pick(data?.onlineMeetingsText, lang),

    formTitle: pick(data?.formTitle, lang),
    formSubtitle: pick(data?.formSubtitle, lang),

    nameLabel: pick(data?.nameLabel, lang),
    namePlaceholder: pick(data?.namePlaceholder, lang),

    phoneLabel: pick(data?.phoneLabel, lang),
    phonePlaceholder: pick(data?.phonePlaceholder, lang),

    emailFieldLabel: pick(data?.emailFieldLabel, lang),
    emailPlaceholder: pick(data?.emailPlaceholder, lang),

    nicheLabel: pick(data?.nicheLabel, lang),
    nichePlaceholder: pick(data?.nichePlaceholder, lang),

    serviceLabel: pick(data?.serviceLabel, lang),
    servicePlaceholder: pick(data?.servicePlaceholder, lang),
    serviceOptions: (data?.serviceOptions ?? []).map((o: any) => ({
      value: o?.value ?? '',
      label: pick(o?.label, lang),
    })),

    budgetLabel: pick(data?.budgetLabel, lang),
    budgetPlaceholder: pick(data?.budgetPlaceholder, lang),
    budgetOptions: (data?.budgetOptions ?? []).map((o: any) => ({
      value: o?.value ?? '',
      label: pick(o?.label, lang),
    })),

    goalLabel: pick(data?.goalLabel, lang),
    goalPlaceholder: pick(data?.goalPlaceholder, lang),

    websiteLabel: pick(data?.websiteLabel, lang),
    websitePlaceholder: pick(data?.websitePlaceholder, lang),

    startWhenLabel: pick(data?.startWhenLabel, lang),
    startWhenPlaceholder: pick(data?.startWhenPlaceholder, lang),
    startWhenOptions: (data?.startWhenOptions ?? []).map((o: any) => ({
      value: o?.value ?? '',
      label: pick(o?.label, lang),
    })),

    commentLabel: pick(data?.commentLabel, lang),
    commentPlaceholder: pick(data?.commentPlaceholder, lang),

    errorRequired: pick(data?.errorRequired, lang) || 'Пожалуйста, заполните все обязательные поля.',
    errorSend: pick(data?.errorSend, lang) || 'Что-то пошло не так при отправке. Попробуйте ещё раз.',
    successMessage: pick(data?.successMessage, lang),

    submitIdle: pick(data?.submitIdle, lang),
    submitSending: pick(data?.submitSending, lang),

    note: pick(data?.note, lang),
  };
});

export default component$(() => <Slot />);