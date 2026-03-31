addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', {status: 405})
  }

  const { token } = await request.json()

  // TODO: Replace YOUR_GOOGLE_SECRET_KEY below with your REAL reCAPTCHA SECRET KEY
  const secret = '6LeRLJ8sAAAAAHE9TlknvEyf88o_ovOGT0ZYZGfe'

  // Verify token with Google
  const verifyRes = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    { method: 'POST' }
  )

  const data = await verifyRes.json()
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  })
}