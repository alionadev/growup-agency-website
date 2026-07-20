import type { RequestHandler } from '@builder.io/qwik-city';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const cleanEnvValue = (value?: string) => value?.trim().replace(/^['"]|['"]$/g, '');

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
  const token = isIntensive
    ? cleanEnvValue(env.get('TELEGRAM_INTENSIVE_BOT_TOKEN') || process.env.TELEGRAM_INTENSIVE_BOT_TOKEN)
    : cleanEnvValue(env.get('TELEGRAM_BOT_TOKEN') || process.env.TELEGRAM_BOT_TOKEN);
  const chatId = cleanEnvValue(env.get('TELEGRAM_CHAT_ID') || process.env.TELEGRAM_CHAT_ID);

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

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML',
        }),
      },
    );

    let tgJson: any = null;
    try {
      tgJson = await tgRes.json();
    } catch {
      // на всякий случай, если тело не JSON
    }

    if (!tgRes.ok || !tgJson?.ok) {
      console.error('Telegram error:', tgJson || (await tgRes.text().catch(() => 'no body')));
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
