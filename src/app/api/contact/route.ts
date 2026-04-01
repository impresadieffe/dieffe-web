import { Resend } from 'resend';
import { contactSchema, type ContactFormData } from '@/lib/contactSchema';

const resend = new Resend(process.env.RESEND_API_KEY);

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { error: 'Dati non validi', details: result.error.flatten() },
        { status: 400, headers: CORS_HEADERS },
      );
    }

    const data = result.data;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminEmail) {
      console.error('[contact/route] ADMIN_EMAIL non configurata');
      return Response.json(
        { error: 'Errore interno' },
        { status: 500, headers: CORS_HEADERS },
      );
    }

    await resend.emails.send({
      // Requires a verified domain in production.
      // Use 'onboarding@resend.dev' for development testing.
      from: process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev',
      to: adminEmail,
      replyTo: data.email,
      subject: `Nuova richiesta preventivo da ${data.nome} ${data.cognome}`,
      html: buildEmailHtml(data),
    });

    return Response.json({ success: true }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error('[contact/route]', err);
    return Response.json(
      { error: 'Errore interno' },
      { status: 500, headers: CORS_HEADERS },
    );
  }
}

function buildEmailHtml(data: ContactFormData): string {
  const row = (label: string, value: string, highlight = false) => `
    <tr style="border-bottom:1px solid #f0f0f0;">
      <td style="padding:10px 8px;color:#6B7280;font-size:13px;width:150px;vertical-align:top;">${label}</td>
      <td style="padding:10px 8px;color:${highlight ? '#E8540A' : '#1A1A1A'};font-size:14px;font-weight:600;">${value}</td>
    </tr>`;

  const rows = [
    row('Nome e Cognome', `${data.nome} ${data.cognome}`),
    row('Email', data.email),
    ...(data.telefono ? [row('Telefono', data.telefono)] : []),
    ...(data.servizio ? [row('Servizio', data.servizio, true)] : []),
  ].join('');

  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:#F5F5F3;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F3;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#1A2E4A;padding:32px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">
                Dieffe Ristrutturazioni
              </h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.65);font-size:13px;">
                Nuova richiesta di preventivo dal sito
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">

              <h2 style="margin:0 0 16px;color:#1A2E4A;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">
                Dati del richiedente
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #f0f0f0;border-radius:8px;overflow:hidden;">
                ${rows}
              </table>

              <h2 style="margin:32px 0 12px;color:#1A2E4A;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">
                Messaggio
              </h2>
              <div style="background:#F5F5F3;border-radius:8px;padding:20px;color:#1A1A1A;font-size:14px;line-height:1.7;border-left:3px solid #E8540A;">
                ${data.messaggio.replace(/\n/g, '<br/>')}
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9f9f9;padding:20px 40px;border-top:1px solid #efefef;">
              <p style="margin:0;color:#9CA3AF;font-size:12px;text-align:center;">
                Email generata automaticamente da impresadieffe.it
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
