// api/send.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || '6973858076';

  if (!token) {
    return res.status(500).json({ error: 'Telegram token not configured' });
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Telegram error:', error);
    res.status(500).json({ error: 'Failed to send message to Telegram' });
  }
}
