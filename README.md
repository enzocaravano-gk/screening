# Screening — Analisi Posturale SPORTHUB

App web per lo screening posturale visivo degli atleti: 4 foto (frontale, posteriore, laterali) con linee guida e cerchi, checklist per distretto, note, storico delle sessioni e report PDF.

> Screening visivo preliminare: non sostituisce la valutazione di uno specialista.

## Come usarla

**Online:** apri il link dell'app e, su iPad/iPhone/Android, usa **Condividi → Aggiungi a Home**. Dopo la prima apertura funziona anche **senza internet**.

**Da computer, senza installare nulla:** scarica il repository (*Code → Download ZIP*), estrailo e apri `postura.html` con Chrome o Edge.

## Dove vengono salvati i dati

I dati **non vengono mai inviati a un server**: restano sul dispositivo di chi usa l'app.

| Dispositivo | Archivio |
|---|---|
| PC / Mac con Chrome o Edge | Una **cartella a scelta** (es. Documenti, o una cartella iCloud/Drive condivisa): atleti, sessioni, foto (JPG) e report PDF sono normali file |
| Safari, iPad, iPhone, Android | Memoria interna dell'app sul dispositivo. Report e backup si salvano con **Condividi → Salva su File** |

Struttura della cartella dati:

```
atleti.json
sessioni/<id-atleta>.json
foto/<id-atleta>/<id-sessione>_<vista>.jpg
report/*.pdf
backup/*.json
```

Esporta regolarmente un backup dal pulsante 🗄️ in alto (il backup si può ripristinare su qualunque dispositivo).

⚠️ Non scegliere come cartella dati la cartella di questo repository: i dati degli atleti sono esclusi da git tramite `.gitignore`, ma è meglio tenerli separati.

## File

- `postura.html` — l'app
- `lib/` — librerie incluse localmente per l'uso offline (jsPDF, jsPDF-AutoTable, html2canvas, pdf.js, Font Awesome, Google Fonts)
- `sw.js`, `manifest.webmanifest`, `icons/` — installazione come app e funzionamento offline
