# Silva Florum – Wald der Blumen

Website für das Blumenatelier von Silva: handgemachte Blumenarrangements und
Dekorationen auf Bestellung, mit Abholung im Atelier oder regionaler Lieferung.

Die Seite ist bewusst einfach gebaut: **nur HTML, CSS und etwas JavaScript** –
kein Framework, kein Build-Schritt, keine Installation nötig.

## Seite lokal ansehen

Einfach die Datei `index.html` doppelklicken – sie öffnet sich im Browser.
Alle Seiten, Produkte und das Formular funktionieren auch so, ganz ohne Server.

## Projektstruktur

```
SilvaFlorum/
├── index.html        Startseite (Hero, Arrangements, Ablauf, Über Silva, Kontakt)
├── angebot.html      Alle Produkte mit Kategorie-Filter
├── bestellen.html    Anfrageformular
├── impressum.html    Impressum (mit [TODO]-Stellen zum Ausfüllen)
├── datenschutz.html  Datenschutzerklärung (mit [TODO]-Stellen zum Ausfüllen)
├── css/
│   └── style.css     Das ganze Design (Farben ganz oben als Variablen)
├── js/
│   ├── main.js       Menü, Produktkarten, Kategorie-Filter
│   └── bestellen.js  Formular-Logik (Prüfung und Versand)
├── data/
│   └── products.js   ★ Die Produktliste – hier Produkte pflegen
└── images/           Produktbilder (aktuell Platzhalter)
```

## Produkte ändern

Alle Produkte stehen in der Datei **`data/products.js`**. Sie enthält eine
Liste im JSON-Format – oben in der Datei ist jedes Feld erklärt.

> **Warum `products.js` und nicht `products.json`?** Browser dürfen aus
> Sicherheitsgründen keine `.json`-Dateien laden, wenn man eine Website direkt
> per Doppelklick (ohne Server) öffnet. Als `.js`-Datei funktioniert es überall –
> der Inhalt ist aber derselbe: eine einfache JSON-Liste.

So sieht ein Produkt aus:

```js
{
  "id": "tuerkranz",                        // Kurzname ohne Leerzeichen/Umlaute
  "name": "Türkranz",                       // Angezeigter Name
  "beschreibung": "Handgebundener Kranz …", // 1–2 Sätze
  "preis": "ab CHF 85",                     // Freitext, z.B. auch "Preis auf Anfrage"
  "kategorie": "Kränze",                    // Gruppe für den Filter
  "bild": "images/tuerkranz.svg",           // Pfad zum Bild
  "hervorgehoben": true                     // true = erscheint auf der Startseite
}
```

- **Produkt ändern:** Text zwischen den Anführungszeichen anpassen, speichern, fertig.
- **Produkt hinzufügen:** Einen ganzen Block `{ ... }` kopieren, ein Komma
  dazwischen setzen und die Texte anpassen.
- **Produkt entfernen:** Den Block `{ ... }` samt zugehörigem Komma löschen.

Die Produkte erscheinen automatisch auf der Startseite (nur die mit
`"hervorgehoben": true`), auf der Angebotsseite und im Dropdown des Formulars.

## Bilder ersetzen

Aktuell liegen im Ordner `images/` nur **Platzhalter** (SVG-Grafiken mit
Produktname). Echte Fotos einbauen geht so:

1. Foto aufnehmen und am besten verkleinern (Querformat, ca. 1200 Pixel breit,
   als `.jpg` – das hält die Seite schnell).
2. Die Datei in den Ordner `images/` legen, z.B. `images/tuerkranz.jpg`.
3. In `data/products.js` beim Produkt den Pfad anpassen:
   `"bild": "images/tuerkranz.jpg"`.

Die alten `.svg`-Platzhalter können danach gelöscht werden. Das Bild im
Abschnitt «Über Silva» (`images/atelier.svg`) wird direkt in `index.html`
eingebunden – dort den Dateinamen im `<img src="…">` anpassen.

## Formular aktivieren (Formspree)

Das Anfrageformular verschickt die Anfragen über den Gratisdienst
[Formspree](https://formspree.io) – ohne eigenen Server. Einrichtung:

1. Auf [formspree.io](https://formspree.io) ein kostenloses Konto erstellen
   (mit der E-Mail-Adresse, an die die Anfragen gehen sollen).
2. Dort ein neues Formular («New Form») anlegen. Formspree zeigt eine Adresse
   wie `https://formspree.io/f/abcdwxyz` – der Teil nach `/f/` ist die **Formspree-ID**.
3. Die ID an **zwei Stellen** eintragen (jeweils den Platzhalter `FORMSPREE_ID` ersetzen):
   - in `bestellen.html` in der Zeile `action="https://formspree.io/f/FORMSPREE_ID"`
   - in `js/bestellen.js` in der Zeile `var FORMSPREE_ID = "FORMSPREE_ID";`
4. Einmal selbst eine Testanfrage abschicken. Beim allerersten Mal schickt
   Formspree eine Bestätigungs-E-Mail («Confirm») – diese bestätigen, danach
   kommen alle Anfragen per E-Mail an.

Solange die ID nicht eingetragen ist, zeigt das Formular beim Absenden einen
klaren Hinweis an und verschickt nichts.

## Seite online stellen

### Variante A: GitHub Pages (gratis)

1. Dieses Repository auf GitHub öffnen.
2. Oben auf **Settings** klicken, links auf **Pages**.
3. Bei «Build and deployment» als Source **Deploy from a branch** wählen,
   dann Branch **main** und Ordner **/ (root)**, mit **Save** bestätigen.
4. Nach ein bis zwei Minuten ist die Seite erreichbar unter
   `https://BENUTZERNAME.github.io/SilvaFlorum/` (die genaue Adresse wird
   auf der Pages-Seite angezeigt).

Jede Änderung, die auf den Branch `main` gepusht wird, erscheint automatisch
kurz darauf online.

### Variante B: Netlify (gratis)

1. Auf [netlify.com](https://www.netlify.com) ein Konto erstellen und mit
   GitHub verbinden.
2. **Add new site → Import an existing project** wählen und dieses Repository
   auswählen.
3. Alle Build-Einstellungen leer lassen (es gibt nichts zu bauen) und
   **Deploy** klicken.
4. Netlify vergibt eine Adresse wie `silva-florum.netlify.app`; unter
   «Domain settings» kann später auch eine eigene Domain (z.B.
   `silvaflorum.ch`) verbunden werden.

## Vor dem Livegang: Checkliste

- [ ] Alle `[TODO: …]`-Stellen ausfüllen (Kontaktangaben im Footer und auf der
      Startseite, Impressum, Datenschutzerklärung). Am einfachsten im Editor
      projektweit nach `TODO` suchen.
- [ ] Formspree-ID eintragen und Testanfrage schicken (siehe oben).
- [ ] Beispielprodukte und -preise in `data/products.js` durch echte ersetzen.
- [ ] Platzhalterbilder durch eigene Fotos ersetzen.
