const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return {};
}

async function subscribeButtondown(email, name) {
  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) return false;

  const response = await fetch('https://api.buttondown.email/v1/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Token ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      metadata: name ? { name } : undefined,
      tags: ['hazzler-website'],
    }),
  });

  // 201 created, 400 often means already subscribed
  if (response.ok || response.status === 400) return true;

  const text = await response.text();
  throw new Error(`Buttondown error ${response.status}: ${text}`);
}

async function subscribeWebhook(email, name) {
  const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!webhookUrl) return false;

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      name: name || null,
      source: 'hazzler-website',
      timestamp: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Webhook error ${response.status}: ${text}`);
  }

  return true;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = readBody(req);
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 80) : '';

  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  if (!process.env.BUTTONDOWN_API_KEY && !process.env.NEWSLETTER_WEBHOOK_URL) {
    console.error('Newsletter not configured: set BUTTONDOWN_API_KEY or NEWSLETTER_WEBHOOK_URL');
    return res.status(503).json({
      error: 'Email signup is not configured yet. Please try again soon.',
    });
  }

  try {
    const viaButtondown = await subscribeButtondown(email, name);
    const viaWebhook = viaButtondown ? false : await subscribeWebhook(email, name);

    if (!viaButtondown && !viaWebhook) {
      return res.status(503).json({
        error: 'Email signup is not configured yet. Please try again soon.',
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Subscribe error:', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
