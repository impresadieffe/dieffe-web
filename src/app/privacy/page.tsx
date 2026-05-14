import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Informativa sul trattamento dei dati personali ai sensi del GDPR (Regolamento UE 2016/679).',
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#F5F5F3] min-h-screen pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <h1 className="text-4xl font-black text-[#1E3A7B] mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-12">Ultimo aggiornamento: 14 Maggio 2026</p>

        <div className="space-y-10 text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-[#1E3A7B] mb-3">1. Titolare del Trattamento</h2>
            <p>
              Il Titolare del trattamento dei dati personali è <strong className="text-gray-800">DIEFFE DI FARO DANIELA</strong>,
              nella persona di Daniela Faro, con sede legale in Via Vincenzo Gioberti 17, 10042 Nichelino (TO),
              P.IVA 10908150013.
            </p>
            <p className="mt-2">
              È possibile contattare il Titolare ai seguenti recapiti:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Email: <a href="mailto:impresa.dieffe@gmail.com" className="text-[#1E3A7B] hover:underline">impresa.dieffe@gmail.com</a></li>
              <li>Telefono: <a href="tel:+393493191144" className="text-[#1E3A7B] hover:underline">+39 349 319 1144</a></li>
              <li>Sito web: <a href="https://www.impresadieffe.it" className="text-[#1E3A7B] hover:underline">www.impresadieffe.it</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1E3A7B] mb-3">2. Tipologie di dati raccolti</h2>
            <p>Il Titolare raccoglie le seguenti categorie di dati personali:</p>

            <h3 className="font-semibold text-gray-800 mt-4 mb-1">Dati di navigazione</h3>
            <p>
              I sistemi informatici e le procedure software preposte al funzionamento del sito web acquisiscono,
              nel corso del loro normale esercizio, alcuni dati personali la cui trasmissione è implicita nell&apos;uso
              dei protocolli di comunicazione di Internet. In questa categoria rientrano gli indirizzi IP,
              gli indirizzi URL delle risorse richieste, l&apos;orario della richiesta, il codice numerico indicante
              lo stato della risposta e altri parametri relativi al sistema operativo e all&apos;ambiente informatico.
            </p>

            <h3 className="font-semibold text-gray-800 mt-4 mb-1">Dati forniti volontariamente dall&apos;utente</h3>
            <p>
              Attraverso il modulo di contatto presente sul sito, l&apos;utente può fornire volontariamente i propri dati
              personali (nome, cognome, indirizzo email, numero di telefono, messaggio). Tali dati vengono
              utilizzati esclusivamente per rispondere alle richieste pervenute.
            </p>

            <h3 className="font-semibold text-gray-800 mt-4 mb-1">Cookie</h3>
            <p>
              Il sito utilizza cookie tecnici necessari al funzionamento e, previo consenso dell&apos;utente,
              cookie analitici. Per informazioni dettagliate si rimanda alla{' '}
              <a href="/cookie" className="text-[#1E3A7B] hover:underline">Cookie Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1E3A7B] mb-3">3. Finalità del trattamento</h2>
            <p>I dati personali raccolti sono trattati per le seguenti finalità:</p>
            <ul className="mt-2 list-disc list-inside space-y-2">
              <li><strong className="text-gray-800">Risposta alle richieste di contatto:</strong> elaborazione e risposta alle richieste di preventivo e informazioni inviate tramite il modulo di contatto.</li>
              <li><strong className="text-gray-800">Analisi statistica:</strong> tramite Google Analytics 4, al fine di comprendere come gli utenti interagiscono con il sito e migliorarne i contenuti e la navigabilità (previo consenso).</li>
              <li><strong className="text-gray-800">Funzionamento del sito:</strong> garantire il corretto funzionamento tecnico delle pagine web.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1E3A7B] mb-3">4. Base giuridica del trattamento</h2>
            <p>Il trattamento dei dati personali si fonda sulle seguenti basi giuridiche:</p>
            <ul className="mt-2 list-disc list-inside space-y-2">
              <li><strong className="text-gray-800">Consenso dell&apos;interessato</strong> (art. 6, par. 1, lett. a GDPR): per l&apos;utilizzo di cookie analitici.</li>
              <li><strong className="text-gray-800">Esecuzione di misure precontrattuali</strong> (art. 6, par. 1, lett. b GDPR): per rispondere alle richieste di preventivo.</li>
              <li><strong className="text-gray-800">Legittimo interesse del Titolare</strong> (art. 6, par. 1, lett. f GDPR): per i dati di navigazione necessari al funzionamento tecnico del sito.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1E3A7B] mb-3">5. Destinatari dei dati</h2>
            <p>
              I dati personali potranno essere comunicati alle seguenti categorie di destinatari, designati
              come Responsabili del trattamento ai sensi dell&apos;art. 28 GDPR:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-2">
              <li>
                <strong className="text-gray-800">Google LLC</strong> — fornitore del servizio Google Analytics 4
                per l&apos;analisi statistica delle visite al sito.
              </li>
              <li>
                <strong className="text-gray-800">Vercel Inc.</strong> — fornitore del servizio di hosting e CDN
                su cui è ospitato il sito web.
              </li>
              <li>
                <strong className="text-gray-800">Resend Inc.</strong> — fornitore del servizio di invio email
                utilizzato per l&apos;elaborazione dei messaggi provenienti dal modulo di contatto.
              </li>
            </ul>
            <p className="mt-3">
              I dati non verranno mai venduti a terzi né comunicati a soggetti non autorizzati.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1E3A7B] mb-3">6. Trasferimento dati extra UE</h2>
            <p>
              Alcuni dei fornitori di servizi indicati al punto precedente (in particolare Google LLC e Resend Inc.)
              hanno sede negli Stati Uniti d&apos;America. Il trasferimento dei dati verso tali paesi terzi avviene
              sulla base delle clausole contrattuali standard approvate dalla Commissione Europea (Standard
              Contractual Clauses — SCC) e, ove applicabile, nel rispetto del quadro EU-US Data Privacy Framework.
            </p>
            <p className="mt-2">
              Per i dettagli sulle garanzie offerte da Google si rimanda alla{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#1E3A7B] hover:underline">
                Privacy Policy di Google
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1E3A7B] mb-3">7. Periodo di conservazione dei dati</h2>
            <p>I dati personali sono conservati per il tempo strettamente necessario alle finalità per cui sono stati raccolti:</p>
            <ul className="mt-2 list-disc list-inside space-y-2">
              <li><strong className="text-gray-800">Dati del modulo di contatto:</strong> conservati per 12 mesi dalla ricezione della richiesta, salvo necessità di conservazione per obblighi di legge.</li>
              <li><strong className="text-gray-800">Dati di navigazione:</strong> conservati per il tempo tecnico necessario alla fornitura del servizio di hosting (generalmente pochi giorni).</li>
              <li><strong className="text-gray-800">Cookie analitici:</strong> secondo le politiche di Google Analytics (si veda la Cookie Policy).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1E3A7B] mb-3">8. Diritti dell&apos;interessato</h2>
            <p>
              Ai sensi degli artt. 15–22 del GDPR, l&apos;interessato ha diritto di:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-2">
              <li><strong className="text-gray-800">Accesso</strong> ai propri dati personali trattati dal Titolare (art. 15 GDPR).</li>
              <li><strong className="text-gray-800">Rettifica</strong> dei dati inesatti o incompleti (art. 16 GDPR).</li>
              <li><strong className="text-gray-800">Cancellazione</strong> (&quot;diritto all&apos;oblio&quot;) dei propri dati personali (art. 17 GDPR).</li>
              <li><strong className="text-gray-800">Limitazione</strong> del trattamento in determinate circostanze (art. 18 GDPR).</li>
              <li><strong className="text-gray-800">Portabilità</strong> dei dati in formato strutturato e leggibile da dispositivo automatico (art. 20 GDPR).</li>
              <li><strong className="text-gray-800">Opposizione</strong> al trattamento basato su legittimo interesse (art. 21 GDPR).</li>
              <li><strong className="text-gray-800">Revoca del consenso</strong> in qualsiasi momento, senza pregiudicare la liceità del trattamento precedente (art. 7 GDPR).</li>
              <li><strong className="text-gray-800">Proporre reclamo</strong> all&apos;Autorità Garante per la protezione dei dati personali (Garante Privacy — <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-[#1E3A7B] hover:underline">www.garanteprivacy.it</a>).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1E3A7B] mb-3">9. Come esercitare i diritti</h2>
            <p>
              Per esercitare i propri diritti o per qualsiasi richiesta relativa al trattamento dei dati personali,
              l&apos;interessato può contattare il Titolare inviando una richiesta scritta all&apos;indirizzo email{' '}
              <a href="mailto:impresa.dieffe@gmail.com" className="text-[#1E3A7B] hover:underline">
                impresa.dieffe@gmail.com
              </a>{' '}
              oppure per posta ordinaria all&apos;indirizzo: Via Vincenzo Gioberti 17, 10042 Nichelino (TO).
            </p>
            <p className="mt-2">
              Il Titolare risponderà alla richiesta entro 30 giorni dal ricevimento.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1E3A7B] mb-3">10. Modifiche alla Privacy Policy</h2>
            <p>
              Il Titolare si riserva il diritto di modificare la presente informativa in qualsiasi momento,
              dandone idonea pubblicità agli utenti su questa pagina. Si invita pertanto a consultare
              periodicamente questa pagina, prendendo come riferimento la data di ultimo aggiornamento
              indicata in cima al documento.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1E3A7B] mb-3">11. Proprietà intellettuale</h2>
            <p>
              Tutti i contenuti presenti sul sito web <strong className="text-gray-800">www.impresadieffe.it</strong> —
              inclusi a titolo esemplificativo testi, immagini, fotografie, loghi, grafiche, codice sorgente
              e materiale multimediale — sono di proprietà esclusiva di{' '}
              <strong className="text-gray-800">DIEFFE DI FARO DANIELA</strong> e sono protetti dalle vigenti norme
              in materia di diritto d&apos;autore e proprietà intellettuale.
            </p>
            <p className="mt-2">
              È vietata qualsiasi riproduzione, distribuzione, trasmissione, pubblicazione o utilizzo, anche
              parziale, dei contenuti senza previa autorizzazione scritta del Titolare. Per richieste di
              utilizzo contattare:{' '}
              <a href="mailto:impresa.dieffe@gmail.com" className="text-[#1E3A7B] hover:underline">
                impresa.dieffe@gmail.com
              </a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
