# Screening — Analisi Posturale SPORTHUB

App web per lo screening posturale visivo degli atleti: 4 foto (frontale, posteriore, laterali) con linee guida e cerchi, checklist per distretto, note, storico delle sessioni e report PDF.

- **Misura angoli** (📐 su ogni foto): *Angolo* a 3 punti (es. ginocchio, gomito) o *Inclinazione* a 2 punti rispetto all'orizzontale/verticale (es. spalle, bacino). Tocca il valore per dare un nome alla misura.
- **Rilevamento automatico dei punti** (📐 → *Rileva punti*): il modello MediaPipe Pose, eseguito sul dispositivo, propone spalle, bacino, testa, ginocchia e anca e crea le misure. Le misure automatiche hanno il bordo tratteggiato e nel PDF sono indicate come «Automatica»; trascinando un punto diventano «Automatica, corretta» e non vengono più sovrascritte. Il modello stima i centri articolari, non i reperi palpatori: i valori vanno sempre verificati. Funziona aprendo l'app dal link o installata (non dal file su disco); dopo il primo utilizzo anche offline.
- **Confronto sessioni**: foto *Prima/Dopo* affiancate o sovrapposte, variazioni della valutazione e degli angoli, PDF del confronto. Per confrontare un angolo tra due sessioni, dagli lo stesso nome in entrambe.

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
- `lib/` — librerie incluse localmente per l'uso offline (jsPDF, jsPDF-AutoTable, html2canvas, pdf.js, Font Awesome, Google Fonts, MediaPipe Tasks Vision 1.0.1 con il modello Pose Landmarker «full» — Apache 2.0)
- `sw.js`, `manifest.webmanifest`, `icons/` — installazione come app e funzionamento offline
