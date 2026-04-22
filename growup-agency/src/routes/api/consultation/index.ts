import type { RequestHandler } from '@builder.io/qwik-city';

export const onPost: RequestHandler = async ({ request, json }) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('TELEGRAM env variables not set', { token: !!token, chatId: !!chatId });
    json(500, { ok: false, error: 'TELEGRAM env variables not set' });
    return;
  }

  const body = await request.json();
  const name = String(body.name ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  const email = String(body.email ?? '').trim();
  const page = String(body.page ?? '').trim();

  if (!name || (!phone && !email)) {
    json(400, { ok: false, error: 'Missing name or contact' });
    return;
  }

  const contacts: string[] = [];
  if (phone) contacts.push(`📞 Телефон: <b>${phone}</b>`);
  if (email) contacts.push(`✉️ Email: <b>${email}</b>`);

  const text =
    `🆕 <b>Новая заявка: бесплатная консультация</b>\n` +
    `👤 Имя: <b>${name}</b>\n` +
    (contacts.length ? contacts.join('\n') + '\n' : '') +
    (page ? `📄 Страница: <code>${page}</code>\n` : '') +
    `🕒 Время: ${new Date().toLocaleString('ru-RU')}`;

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: 565615932,        
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