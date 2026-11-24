# Splitto

Dividi le spese con gli amici, senza account e senza app.

- `public/`: il sito (app, guide per Google, privacy, chi siamo, icone).
- `src/worker.js`: il server. Salva gruppi, spese e pagamenti nel database Cloudflare D1.
- `wrangler.jsonc`: configurazione di Cloudflare. Il database si crea da solo al primo deploy.

## Pubblicare (si può fare tutto dall'iPad)

1. **GitHub**: crea un account su github.com e un repository vuoto chiamato `splitto`.
2. **Codice**: carica questi file nel repository.
3. **Cloudflare**: crea un account gratuito su cloudflare.com, poi vai in
   *Workers & Pages → Create → Import a repository*, scegli `splitto` e premi *Deploy*.
   Lascia vuoto il comando di build; il comando di deploy è `npx wrangler deploy`.
4. Dopo un minuto il sito è online su `splitto.<tuo-nome>.workers.dev`.
   Ogni modifica caricata su GitHub viene pubblicata da sola.

Se il deploy segnala un errore sul database: in Cloudflare vai su *Storage & Databases → D1*,
crea un database chiamato `splitto-db`, poi nelle impostazioni del Worker aggiungi un binding D1
con nome `DB` collegato a quel database e ripeti il deploy. Le tabelle si creano da sole.

## Prima di pubblicare

- Nome ed email in privacy e "Chi siamo": già inseriti (Pippo Rimessa, pipporimessa@gmail.com).
- Fai verificare l'informativa privacy da qualcuno di competente: è un modello di partenza.

## Dopo

- **Statistiche senza cookie**: Cloudflare → il tuo Worker → *Web Analytics*.
- **Google**: aggiungi il sito su Google Search Console e invia `/sitemap.xml`.
- **Pubblicità e Premium**: in `public/assets/app.js` c'è `CONFIG = {ads:false, premium:false}`.
  Si accendono solo dopo l'approvazione di AdSense (18+ oppure account di un genitore), il banner
  per i cookie e il collegamento a Stripe. Va aggiornata anche la privacy.
- **Dominio tuo**: Cloudflare → Worker → *Settings → Domains & Routes*.

## Provarlo sul computer

```
npm install
npm run dev
```
