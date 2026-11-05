// Support form endpoint (Vercel serverless function, served at /api/support next to the docs).
// The support address lives only in SUPPORT_TO on the server: the page never shows it.
//
// Bot protection, in order: honeypot field, time trap, per-IP rate limit, Cloudflare Turnstile.
// Environment: RESEND_API_KEY, SUPPORT_TO, RESEND_FROM_EMAIL, TURNSTILE_SECRET.
// In production a missing TURNSTILE_SECRET refuses every request (fails closed).

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const RESEND_URL = 'https://api.resend.com/emails';

const TYPES = {
  problem: 'Problem',
  image: 'Image',
  billing: 'Billing',
  privacy: 'Privacy',
  security: 'Security',
  enterprise: 'Enterprise',
};

const LIMITS = { name: 120, email: 254, company: 120, reference: 500, message: 5000 };
const MIN_FILL_MS = 4000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

// Best effort: one instance's memory. Turnstile is the real gate.
const recent = new Map();

function rateLimited(ip) {
  if (!ip) return false;
  const now = Date.now();
  const hits = (recent.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > RATE_MAX;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function clean(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return typeof first === 'string' ? first.split(',')[0].trim() : '';
}

async function verifyTurnstile(secret, token, ip) {
  const params = new URLSearchParams({ secret, response: token });
  if (ip) params.append('remoteip', ip);
  const res = await fetch(SITEVERIFY_URL, { method: 'POST', body: params });
  const json = await res.json();
  return json.success === true;
}

async function sendEmail(apiKey, payload) {
  const res = await fetch(RESEND_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`send failed: ${res.status}`);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = typeof req.body === 'object' && req.body ? req.body : {};

  // 1. Honeypot: a field people never see. A bot that fills it gets a quiet "ok".
  if (clean(body.website, 200)) return res.status(200).json({ ok: true });

  // 2. Time trap: a person needs a few seconds to read and type.
  const startedAt = Number(body.formStartedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return res.status(400).json({ error: 'Please try again.' });
  }

  // 3. Rate limit per address.
  const ip = clientIp(req);
  if (rateLimited(ip)) return res.status(429).json({ error: 'Too many requests. Try again in a few minutes.' });

  // 4. Turnstile.
  const secret = process.env.TURNSTILE_SECRET;
  if (secret) {
    const token = clean(body.turnstileToken, 4096);
    if (!token) return res.status(400).json({ error: 'Please confirm you are not a robot.' });
    try {
      if (!(await verifyTurnstile(secret, token, ip))) {
        return res.status(400).json({ error: 'Please confirm you are not a robot.' });
      }
    } catch (err) {
      console.error('[support] Turnstile verification error', err);
      return res.status(502).json({ error: 'Could not verify the request. Try again.' });
    }
  } else if (process.env.VERCEL_ENV === 'production') {
    console.error('[support] TURNSTILE_SECRET is not set');
    return res.status(503).json({ error: 'The form is not available right now.' });
  }

  const type = TYPES[body.type] ? body.type : null;
  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const company = clean(body.company, LIMITS.company);
  const reference = clean(body.reference, LIMITS.reference);
  const message = clean(body.message, LIMITS.message);

  if (!type || !name || !email || !message) {
    return res.status(400).json({ error: 'Fill in the request type, your name, your email and the message.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'That email address does not look right.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = (process.env.SUPPORT_TO || '').split(',').map((s) => s.trim()).filter(Boolean);
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || to.length === 0 || !from) {
    console.error('[support] email is not configured');
    return res.status(503).json({ error: 'The form is not available right now.' });
  }

  const tag = TYPES[type];
  const firstLine = message.split('\n')[0].slice(0, 80);
  const rows = [
    ['Type', tag],
    ['Name', name],
    ['Email', email],
    ['Company', company],
    ['SKU, link or reference', reference],
  ].filter(([, v]) => v);

  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#ebebeb;font-family:Arial,sans-serif;color:#171717">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e4e4e4;border-radius:6px">
<tr><td style="padding:20px 24px;border-bottom:1px solid #e4e4e4;font-size:13px;color:#767676">Support request from docs.getreica.com</td></tr>
<tr><td style="padding:16px 24px"><table width="100%" cellpadding="0" cellspacing="0">
${rows.map(([k, v]) => `<tr><td style="padding:6px 0;font-size:13px;color:#767676;width:170px;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 0;font-size:14px">${escapeHtml(v)}</td></tr>`).join('')}
</table></td></tr>
<tr><td style="padding:16px 24px 24px;border-top:1px solid #e4e4e4;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</td></tr>
</table></body></html>`;

  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${message}`;

  try {
    await sendEmail(apiKey, {
      from,
      to,
      reply_to: email,
      subject: `[${tag}] ${firstLine}`,
      html,
      text,
    });
  } catch (err) {
    console.error('[support] internal email failed', err);
    return res.status(502).json({ error: 'The message could not be sent. Try again in a few minutes.' });
  }

  // Short plain confirmation. It never repeats the message, so the form cannot be used to send text to others.
  try {
    await sendEmail(apiKey, {
      from,
      to: email,
      subject: 'We received your request',
      text: `Hello ${name},\n\nWe received your ${tag.toLowerCase()} request and will answer by email, on working days.\nReply to this email if you want to add something.\n\nReica support\nhttps://docs.getreica.com/support`,
      reply_to: to[0],
    });
  } catch (err) {
    console.error('[support] confirmation email failed', err);
  }

  return res.status(200).json({ ok: true });
}
