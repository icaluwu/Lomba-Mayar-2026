import type { APIRoute } from 'astro';

export const prerender = false;

// Helper: HMAC-SHA256 using Web Crypto (available everywhere in Astro SSR)
async function computeHmacSha256(secret: string, message: string): Promise<string> {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
        'raw',
        enc.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign'],
    );
    const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
    return Array.from(new Uint8Array(sig))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

export const POST: APIRoute = async ({ request }) => {
    const webhookSecret = import.meta.env['MAYAR_WEBHOOK_SECRET'] as string | undefined;

    if (!webhookSecret) {
        console.error('[KamusNers Webhook] MAYAR_WEBHOOK_SECRET is not set!');
        return new Response(JSON.stringify({ error: 'Server misconfiguration' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // 1. Read raw body for signature verification
    const rawBody = await request.text();

    // 2. Verify Mayar webhook signature: X-Mayar-Signature: sha256=<hmac>
    const signatureHeader = request.headers.get('x-mayar-signature') || '';
    const hexSig = await computeHmacSha256(webhookSecret, rawBody);
    const expectedSig = `sha256=${hexSig}`;

    if (signatureHeader !== expectedSig) {
        console.warn('[KamusNers Webhook] Invalid signature received.');
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // 3. Parse payload
    let payload: Record<string, unknown>;
    try {
        payload = JSON.parse(rawBody) as Record<string, unknown>;
    } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const event = payload.event as string;
    const data = payload.data as Record<string, unknown>;

    console.log(`[KamusNers Webhook] Event: ${event}`);

    // 4. Handle events
    switch (event) {
        case 'payment.success': {
            const customer = data?.customer as Record<string, string> | undefined;
            const product = data?.product as Record<string, string> | undefined;
            console.log(`[KamusNers] 🎉 Payment SUCCESS`);
            console.log(`  Customer : ${customer?.name ?? 'Unknown'} <${customer?.email ?? ''}>`);
            console.log(`  Product  : ${product?.name ?? ''}`);
            console.log(`  Amount   : Rp${String(data?.amount ?? 0)}`);
            // TODO: Send welcome email, update database, etc.
            break;
        }
        case 'payment.expired':
            console.log(`[KamusNers] ⏰ Payment EXPIRED: ${String(data?.id ?? '')}`);
            break;
        case 'payment.failed':
            console.log(`[KamusNers] ❌ Payment FAILED: ${String(data?.id ?? '')}`);
            break;
        default:
            console.log(`[KamusNers Webhook] Unhandled event: ${event}`);
    }

    return new Response(JSON.stringify({ received: true, event }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};
