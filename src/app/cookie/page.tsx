import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: "Informativa sull'utilizzo dei cookie sul sito www.impresadieffe.it.",
  robots: { index: false, follow: false },
};

export default function CookiePage() {
  return (
    <div className="bg-[#F5F5F3] min-h-screen pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <h1 className="text-4xl font-black text-[#1E3A7B] mb-2">Cookie Policy</h1>
        <p className="text-sm text-gray-400 mb-12">Ultimo aggiornamento: 14 Maggio 2026</p>

        <div className="space-y-10 text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-[#1E3A7B] mb-3">1. Cosa sono i cookie</h2>
            <p>
              I cookie sono piccoli file di testo che i siti web visitati dall&apos;utente inviano al suo dispositivo
              (computer, tablet, smartphone), dove vengono memorizzati per essere ritrasmessi agli stessi siti
              alla successiva visita. Grazie ai cookie, il sito ricorda le azioni e le preferenze dell&apos;utente
              (come la scelta sulla gestione dei cookie, la lingua, ecc.) in modo che non debbano essere
              reindicate ogni volta che si ritorna sul sito o si naviga da una pagina all&apos;altra.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1E3A7B] mb-3">2. Tipologie di cookie utilizzati</h2>

            <h3 className="font-semibold text-gray-800 mt-4 mb-2">Cookie tecnici necessari</h3>
            <p>
              Questi cookie sono essenziali per il corretto funzionamento del sito web e non possono essere
              disabilitati nei nostri sistemi. Vengono solitamente impostati solo in risposta ad azioni
              dell&apos;utente che equivalgono a una richiesta di servizi, come l&apos;impostazione delle preferenze
              sulla privacy. Possono essere impostati anche per ricordare le preferenze dell&apos;utente relative
              al consenso ai cookie. Questi cookie non memorizzano alcuna informazione di identificazione
              personale.
            </p>

            <h3 className="font-semibold text-gray-800 mt-4 mb-2">Cookie analitici</h3>
            <p>
              Questi cookie ci consentono di contare le visite e le sorgenti di traffico, al fine di misurare
              e migliorare le prestazioni del sito. Ci aiutano a capire quali pagine sono più e meno popolari
              e come i visitatori si muovono nel sito. Tutte le informazioni raccolte da questi cookie sono
              aggregate e pertanto anonime. Se non si accettano questi cookie, non sapremo quando ha visitato
              il nostro sito.
            </p>
            <p className="mt-2">
              Il sito utilizza <strong className="text-gray-800">Google Analytics 4</strong> di Google LLC.
              È possibile disabilitare il tracciamento di Google Analytics installando il componente aggiuntivo
              del browser disponibile all&apos;indirizzo:{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1E3A7B] hover:underline"
              >
                tools.google.com/dlpage/gaoptout
              </a>.
            </p>

            <h3 className="font-semibold text-gray-800 mt-4 mb-2">Cookie di terze parti</h3>
            <p>
              La pagina Contatti del sito incorpora una mappa fornita da{' '}
              <strong className="text-gray-800">Google Maps</strong> (Google LLC). Quando si carica la mappa,
              Google potrebbe impostare i propri cookie e raccogliere dati di utilizzo. Si invita a consultare
              la{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1E3A7B] hover:underline"
              >
                Privacy Policy di Google
              </a>{' '}
              per maggiori informazioni.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1E3A7B] mb-3">3. Tabella dei cookie</h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#1E3A7B] text-white">
                    <th className="text-left px-4 py-3 font-semibold">Nome</th>
                    <th className="text-left px-4 py-3 font-semibold">Tipo</th>
                    <th className="text-left px-4 py-3 font-semibold">Scopo</th>
                    <th className="text-left px-4 py-3 font-semibold">Durata</th>
                    <th className="text-left px-4 py-3 font-semibold">Fornitore</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-mono text-xs">dieffe-cookie-consent</td>
                    <td className="px-4 py-3">Tecnico</td>
                    <td className="px-4 py-3">Memorizza le preferenze di consenso ai cookie</td>
                    <td className="px-4 py-3">1 anno</td>
                    <td className="px-4 py-3">impresadieffe.it</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs">_ga</td>
                    <td className="px-4 py-3">Analitico</td>
                    <td className="px-4 py-3">Distingue gli utenti unici assegnando un ID casuale</td>
                    <td className="px-4 py-3">2 anni</td>
                    <td className="px-4 py-3">Google Analytics</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-mono text-xs">_gid</td>
                    <td className="px-4 py-3">Analitico</td>
                    <td className="px-4 py-3">Distingue gli utenti unici (sessione)</td>
                    <td className="px-4 py-3">24 ore</td>
                    <td className="px-4 py-3">Google Analytics</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs">_gat</td>
                    <td className="px-4 py-3">Analitico</td>
                    <td className="px-4 py-3">Limita la frequenza delle richieste a Google Analytics</td>
                    <td className="px-4 py-3">1 minuto</td>
                    <td className="px-4 py-3">Google Analytics</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-mono text-xs">NID, 1P_JAR</td>
                    <td className="px-4 py-3">Terze parti</td>
                    <td className="px-4 py-3">Cookie impostati da Google Maps per la visualizzazione della mappa</td>
                    <td className="px-4 py-3">6 mesi</td>
                    <td className="px-4 py-3">Google Maps</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1E3A7B] mb-3">4. Come gestire i cookie</h2>
            <p>
              È possibile gestire le preferenze sui cookie in qualsiasi momento tramite il banner che appare
              alla prima visita del sito. In alternativa, è possibile configurare le impostazioni del proprio
              browser per rifiutare tutti o alcuni cookie, o per ricevere una notifica prima di accettarli.
            </p>
            <p className="mt-3">
              Di seguito i link alle istruzioni per la gestione dei cookie nei principali browser:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#1E3A7B] hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noopener noreferrer" className="text-[#1E3A7B] hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#1E3A7B] hover:underline">Apple Safari</a></li>
              <li><a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge" target="_blank" rel="noopener noreferrer" className="text-[#1E3A7B] hover:underline">Microsoft Edge</a></li>
            </ul>
            <p className="mt-3">
              Per disabilitare il tracciamento di Google Analytics è disponibile il componente aggiuntivo
              ufficiale:{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1E3A7B] hover:underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1E3A7B] mb-3">5. Modifiche alla Cookie Policy</h2>
            <p>
              Il Titolare si riserva il diritto di modificare la presente Cookie Policy in qualsiasi momento.
              Le eventuali modifiche entreranno in vigore dalla data di pubblicazione sul sito. Si consiglia
              di verificare periodicamente questa pagina per rimanere aggiornati.
            </p>
            <p className="mt-3">
              Per ulteriori informazioni sul trattamento dei dati personali si rimanda alla{' '}
              <a href="/privacy" className="text-[#1E3A7B] hover:underline">Privacy Policy</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
