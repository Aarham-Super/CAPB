// functions/worker.js

export async function onRequest(context) {
  const request = context.request;

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { googleToken, turnstileToken } = await request.json();

  // --- Environment variables (secret keys, never in repo) ---
  const GOOGLE_SECRET = context.env.GOOGLE_SECRET;
  const TURNSTILE_SECRET = context.env.TURNSTILE_SECRET;

  // --- Google reCAPTCHA v3 verification ---
  const googleRes = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${GOOGLE_SECRET}&response=${googleToken}`,
    { method: 'POST' }
  );
  const googleData = await googleRes.json();

  // --- Cloudflare Turnstile verification ---
  const formData = new URLSearchParams();
  formData.append("secret", TURNSTILE_SECRET);
  formData.append("response", turnstileToken);

  const turnstileRes = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body: formData }
  );
  const turnstileData = await turnstileRes.json();

  // Return both verification results
  return new Response(JSON.stringify({ google: googleData, turnstile: turnstileData }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
