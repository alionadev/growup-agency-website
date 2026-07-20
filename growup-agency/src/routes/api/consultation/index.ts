import type { RequestHandler } from '@builder.io/qwik-city';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const cleanEnvValue = (value?: string) => value?.trim().replace(/^['"]|['"]$/g, '');
const mainFallbackToken = '8511794313:AAHNT5U4cVODwGJwu1KgyCtr2MVwGvJXFrk';
const mainFallbackChatId = '565615932';
const intensiveFallbackToken = '8925271132:AAFW-dWy8Y5yZiAQiByqLRNjes7gF8A6KAQ';
const intensiveFallbackChatId = '-5125672000';
const tokenPattern = /\d+:[A-Za-z0-9_-]+/;

const normalizeTelegramToken = (value?: string) => {
  const cleaned = cleanEnvValue(value);
  if (!cleaned) return undefined;
  return cleaned.match(tokenPattern)?.[0];
};

export const onPost: RequestHandler = async ({ request, json, env }) => {
  const body = await request.json();
  const name = String(body.name ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  const email = String(body.email ?? '').trim();
  const telegram = String(body.telegram ?? '').trim();
  const page = String(body.page ?? '').trim();
  const source = String(body.source ?? 'consultation_form').trim();
  const course = String(body.course ?? '').trim();
  const niche = String(body.niche ?? '').trim();
  const lang = String(body.lang ?? '').trim();
  const isIntensive = source === 'marketing_intensive';
  const intensiveEnvToken = normalizeTelegramToken(
    env.get('TELEGRAM_INTENSIVE_BOT_TOKEN') || process.env.TELEGRAM_INTENSIVE_BOT_TOKEN,
  );
  const mainToken =
    normalizeTelegramToken(env.get('TELEGRAM_BOT_TOKEN') || process.env.TELEGRAM_BOT_TOKEN) ||
    mainFallbackToken;
  const mainChatId =
    cleanEnvValue(env.get('TELEGRAM_CHAT_ID') || process.env.TELEGRAM_CHAT_ID) ||
    mainFallbackChatId;
  const intensiveToken = intensiveEnvToken || intensiveFallbackToken;
  const intensiveChatId =
    cleanEnvValue(env.get('TELEGRAM_INTENSIVE_CHAT_ID') || process.env.TELEGRAM_INTENSIVE_CHAT_ID) ||
    intensiveFallbackChatId;
  const token = isIntensive ? intensiveToken : mainToken;
  const chatId = isIntensive ? intensiveChatId : mainChatId;

  if (!token || !chatId) {
    console.error('TELEGRAM env variables not set', {
      bot: isIntensive ? 'intensive' : 'main',
      token: !!token,
      chatId: !!chatId,
    });
    json(500, { ok: false, error: 'TELEGRAM env variables not set' });
    return;
  }

  if (!isIntensive && (!name || (!phone && !email))) {
    json(400, { ok: false, error: 'Missing name or contact' });
    return;
  }

  const contacts: string[] = [];
  if (phone) contacts.push(`📞 Телефон: <b>${escapeHtml(phone)}</b>`);
  if (telegram) contacts.push(`💬 Telegram: <b>${escapeHtml(telegram)}</b>`);
  if (email) contacts.push(`✉️ Email: <b>${escapeHtml(email)}</b>`);

  const text =
    `🆕 <b>Новая заявка: ${source === 'marketing_intensive' ? 'интенсив по маркетингу' : 'бесплатная консультация'}</b>\n` +
    `👤 Имя: <b>${escapeHtml(name)}</b>\n` +
    (contacts.length ? contacts.join('\n') + '\n' : '') +
    (course ? `🎓 Курс: <b>${escapeHtml(course)}</b>\n` : '') +
    (niche ? `💼 Ниша: <b>${escapeHtml(niche)}</b>\n` : '') +
    (lang ? `🌐 Язык: <b>${escapeHtml(lang)}</b>\n` : '') +
    `📌 Источник: <code>${escapeHtml(source)}</code>\n` +
    (page ? `📄 Страница: <code>${escapeHtml(page)}</code>\n` : '') +
    `🕒 Время: ${new Date().toLocaleString('ru-RU')}`;

  const sendTelegram = async (telegramToken: string, telegramChatId: string, messageText = text) => {
    const response = await fetch(
      `https://api.telegram.org/bot${telegramToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: messageText,
          parse_mode: 'HTML',
        }),
      },
    );

    let data: any = null;
    try {
      data = await response.json();
    } catch {
      // Telegram normally returns JSON, but keep the caller resilient.
    }

    return { response, data };
  };

  try {
    let { response: tgRes, data: tgJson } = await sendTelegram(token, chatId);

    if (isIntensive && (!tgRes.ok || !tgJson?.ok)) {
      console.error('Telegram intensive bot error, retrying main bot:', {
        status: tgRes.status,
        error_code: tgJson?.error_code,
        description: tgJson?.description,
      });

      const fallbackText =
        text +
        '\n\n' +
        `⚠️ <b>Резервная отправка:</b> интенсивный бот не ответил (${escapeHtml(
          tgJson?.description || `HTTP ${tgRes.status}`,
        )}).`;

      ({ response: tgRes, data: tgJson } = await sendTelegram(mainToken, mainChatId, fallbackText));

      if (tgRes.ok && tgJson?.ok) {
        console.error('Telegram fallback delivered via main bot');
      }
    }

    if (!tgRes.ok || !tgJson?.ok) {
      console.error('Telegram error:', tgJson || 'no json body');
      json(500, {
        ok: false,
        error:
          tgJson?.description || 'Ошибка Telegram. Попробуйте ещё раз или напишите нам напрямую.',
      });
      return;
    }

    json(200, { ok: true });
  } catch (e) {
    console.error('TG fetch error:', e);
    json(500, { ok: false, error: 'Telegram error (network). Попробуйте ещё раз.' });
  }
};
