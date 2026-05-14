import { Resend } from 'resend';
import { contactSchema, type ContactFormData } from '@/lib/contactSchema';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = 'noreply@impresadieffe.it';

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

    const timestamp = new Date().toLocaleString('it-IT', {
      timeZone: 'Europe/Rome',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    await Promise.all([
      resend.emails.send({
        from: FROM,
        to: adminEmail,
        replyTo: data.email,
        subject: `Nuova richiesta preventivo - ${data.nome} ${data.cognome}`,
        html: buildAdminEmailHtml(data, timestamp),
      }),
      resend.emails.send({
        from: FROM,
        to: data.email,
        subject: 'Abbiamo ricevuto la tua richiesta - Dieffe Ristrutturazioni',
        html: buildConfirmEmailHtml(data),
      }),
    ]);

    return Response.json({ success: true }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error('[contact/route]', err);
    return Response.json(
      { error: 'Errore interno del server. Riprova più tardi.' },
      { status: 500, headers: CORS_HEADERS },
    );
  }
}

function buildAdminEmailHtml(data: ContactFormData, timestamp: string): string {
  const row = (label: string, value: string, highlight = false) => `
    <tr style="border-bottom:1px solid #f0f0f0;">
      <td style="padding:10px 8px;color:#6B7280;font-size:13px;width:150px;vertical-align:top;">${label}</td>
      <td style="padding:10px 8px;color:${highlight ? '#E8540A' : '#1A1A1A'};font-size:14px;font-weight:600;">${escapeHtml(value)}</td>
    </tr>`;

  const contactRows = [
    row('Nome', data.nome),
    row('Cognome', data.cognome),
    row('Email', data.email),
    ...(data.telefono ? [row('Telefono', data.telefono)] : []),
  ].join('');

  const requestRows = [
    ...(data.servizio ? [row('Servizio richiesto', data.servizio, true)] : []),
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

          <tr>
            <td style="background:#1E3A7B;padding:32px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.5px;">
                DIEFFE
              </h1>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.65);font-size:12px;letter-spacing:2px;text-transform:uppercase;">
                Ristrutturazioni
              </p>
              <p style="margin:16px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">
                Nuova richiesta di preventivo dal sito web
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:40px;">

              <h2 style="margin:0 0 16px;color:#1E3A7B;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">
                Dati del cliente
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #f0f0f0;border-radius:8px;overflow:hidden;">
                ${contactRows}
              </table>

              ${requestRows ? `
              <h2 style="margin:32px 0 16px;color:#1E3A7B;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">
                Servizio richiesto
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #f0f0f0;border-radius:8px;overflow:hidden;">
                ${requestRows}
              </table>` : ''}

              <h2 style="margin:32px 0 12px;color:#1E3A7B;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">
                Messaggio
              </h2>
              <div style="background:#F5F5F3;border-radius:8px;padding:20px;color:#1A1A1A;font-size:14px;line-height:1.7;border-left:3px solid #E8540A;">
                ${escapeHtml(data.messaggio).replace(/\n/g, '<br/>')}
              </div>

            </td>
          </tr>

          <tr>
            <td style="background:#f9f9f9;padding:20px 40px;border-top:1px solid #efefef;">
              <p style="margin:0;color:#9CA3AF;font-size:12px;text-align:center;">
                Richiesta ricevuta il ${timestamp} &bull; impresadieffe.it
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

function buildConfirmEmailHtml(data: ContactFormData): string {
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

          <tr>
            <td style="background:#1E3A7B;padding:32px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.5px;">
                DIEFFE
              </h1>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.65);font-size:12px;letter-spacing:2px;text-transform:uppercase;">
                Ristrutturazioni
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 16px;color:#1E3A7B;font-size:20px;font-weight:700;">
                Grazie, ${escapeHtml(data.nome)}!
              </h2>
              <p style="margin:0 0 16px;color:#4B5563;font-size:15px;line-height:1.7;">
                Abbiamo ricevuto la tua richiesta di preventivo e te ne siamo grati.
              </p>
              <p style="margin:0 0 24px;color:#4B5563;font-size:15px;line-height:1.7;">
                Il nostro team la esaminerà con attenzione e ti risponderà entro <strong style="color:#1E3A7B;">24 ore lavorative</strong>.
              </p>

              <div style="background:#F5F5F3;border-radius:8px;padding:20px;border-left:3px solid #1E3A7B;margin-bottom:24px;">
                <p style="margin:0 0 8px;color:#6B7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:700;">
                  Riepilogo richiesta
                </p>
                ${data.servizio ? `<p style="margin:0 0 4px;color:#1A1A1A;font-size:14px;"><strong>Servizio:</strong> ${escapeHtml(data.servizio)}</p>` : ''}
                <p style="margin:0;color:#4B5563;font-size:14px;line-height:1.6;">${escapeHtml(data.messaggio).replace(/\n/g, '<br/>')}</p>
              </div>

              <p style="margin:0;color:#4B5563;font-size:14px;line-height:1.7;">
                Per qualsiasi urgenza puoi contattarci direttamente via email a
                <a href="mailto:impresa.dieffe@gmail.com" style="color:#1E3A7B;font-weight:600;">impresa.dieffe@gmail.com</a>.
              </p>

              <p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #eeeeee;color:#999999;font-size:12px;text-align:center;line-height:1.7;">
                Questa è un&apos;email automatica, si prega di non rispondere a questo messaggio.<br/>
                Per ulteriori informazioni contattaci direttamente al <a href="tel:+393493191144" style="color:#999999;">+39 349 319 1144</a>
                o scrivici a <a href="mailto:impresa.dieffe@gmail.com" style="color:#999999;">impresa.dieffe@gmail.com</a>
              </p>
            </td>
          </tr>

          <tr>
            <td style="background:#f9f9f9;padding:20px 40px;border-top:1px solid #efefef;">
              <p style="margin:0;color:#9CA3AF;font-size:12px;text-align:center;">
                Dieffe Ristrutturazioni &bull; Torino e Piemonte &bull; impresadieffe.it
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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
