// functions/worker.js

export async function onRequest(context) {
  const request = context.request;

  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { googleToken, turnstileToken } = await request.json();

    if (!googleToken || !turnstileToken) {
      return new Response(JSON.stringify({ error: 'Missing tokens' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // --- Read secrets from Cloudflare Pages Environment Variables ---
    const GOOGLE_SECRET = context.env.RECAPTCHA_SECRET;
    const TURNSTILE_SECRET = context.env.TURNSLIE_SECRET;

    if (!GOOGLE_SECRET || !TURNSTILE_SECRET) {
      return new Response(JSON.stringify({ error: 'Server misconfiguration' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // --- Google reCAPTCHA v3 verification ---
    const googleRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${GOOGLE_SECRET}&response=${googleToken}`,
      { method: 'POST' }
    );
    const googleData = await googleRes.json();

    // --- Cloudflare Turnstile verification ---
    const formData = new URLSearchParams();
    formData.append('secret', TURNSTILE_SECRET);
    formData.append('response', turnstileToken);

    const turnstileRes = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      { method: 'POST', body: formData }
    );
    const turnstileData = await turnstileRes.json();

    // --- Return combined verification results ---
    return new Response(
      JSON.stringify({ google: googleData, turnstile: turnstileData }),
      { headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}