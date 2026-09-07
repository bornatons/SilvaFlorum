# CLAUDE.md – Projektkontext Silva Florum

## Worum es geht

Website für «Silva Florum – Wald der Blumen», das Blumenatelier von Silva in
der Schweiz. Sie fertigt handgemachte Blumenarrangements und Dekorationen
**auf Bestellung** an: kein Lagerbestand, Abholung im Atelier oder regionale
Lieferung. Der Besitzer des Repos ist ihr Sohn und Programmier-Anfänger –
Erklärungen bitte einfach halten.

## Technische Leitplanken (bitte einhalten)

- **Reine statische Website:** HTML, CSS, Vanilla-JavaScript. Kein Framework,
  kein Build-Schritt, keine npm-Abhängigkeiten, keine externen CDNs.
- Muss **lokal per Doppelklick auf `index.html`** funktionieren (deshalb kein
  `fetch` auf lokale Dateien!) und unverändert auf GitHub Pages/Netlify laufen.
- **Produkte** liegen in `data/products.js` als globale Konstante `PRODUKTE`
  (JSON-Array mit einer Zeile JS drumherum). Bewusst kein `products.json`:
  `fetch()` auf lokale JSON-Dateien scheitert beim Öffnen über `file://` an
  der Browser-Sicherheit. Felder: `id`, `name`, `beschreibung`, `preis`
  (Freitext, z.B. «ab CHF 45»), `kategorie`, `bild`, `hervorgehoben`.
- **Schriften:** nur Systemschriften (Georgia für Titel, system-ui für Text).
  Keine Google Fonts o.Ä. (Datenschutz).
- **Bilder:** `images/*.svg` sind Platzhalter mit Verlauf und Produktname;
  echte Fotos ersetzen sie später (Pfad in `data/products.js` anpassen).
- **Einstellungen:** Alle persönlichen Angaben (Name, Adresse, E-Mail,
  Telefon, UID, Formspree-ID) stehen **nur** in `data/einstellungen.js`
  (globale Konstante `EINSTELLUNGEN`). `js/main.js` füllt beim Laden alle
  Elemente mit `data-feld="…"` (Felder: `name`, `strasse`, `plz_ort`,
  `adresse` = Strasse + PLZ/Ort, `email`, `telefon`, `uid`); leere Felder
  werden als gelbes `[TODO: …]` (Klasse `.todo`) angezeigt. Elemente mit
  `data-nur-wenn="feld"` werden bei leerem Feld ausgeblendet. Kontaktangaben
  nie hart in HTML schreiben – immer über `data-feld`.
- **Formular:** Versand über Formspree per `fetch` in `js/bestellen.js`. Die
  Formspree-ID kommt aus `EINSTELLUNGEN.formspree_id`; das `action`-Attribut
  in `bestellen.html` wird beim Laden daraus gesetzt. Fehlt die ID, zeigt das
  Formular einen Hinweis statt zu senden.
- **Domain/Hosting:** Zielhosting ist GitHub Pages (Branch `main`, root) mit
  der eigenen Domain `silvaflorum.ch`. Bewusst KEINE `CNAME`-Datei im Repo:
  GitHub legt sie selbst an, sobald die Domain unter Settings → Pages
  gespeichert wird (sonst würde die github.io-Adresse schon vor der
  DNS-Umstellung auf die Domain umleiten). Die Domain wird zurzeit von Wix
  verwaltet (Nameserver ns0/ns1.wixdns.net, Stand 09/2026) – DNS-Änderungen
  passieren also im Wix-Konto, nicht bei einem Schweizer Registrar.
  `datenschutz.html` nennt GitHub Pages als Hoster.
- **Formular-Feldnamen:** Das E-Mail-Feld heisst `email` (Formspree setzt
  daraus die Antwortadresse). Nicht umbenennen.

## Sprache und Ton

- Deutsch in **Schweizer Schreibweise**: «ss» statt «ß» (Strasse, grüsst).
- Kundschaft wird mit **«Sie»** angesprochen; Ton warm, natürlich, unaufgeregt.
- Code-Kommentare, Klassennamen und Variablen sind bewusst **deutsch**, damit
  der Besitzer sie versteht (z.B. `.karten-raster`, `zeigeProdukte`).

## Aufbau

- `index.html` – Hero, hervorgehobene Arrangements (aus `PRODUKTE` mit
  `hervorgehoben: true`), Ablauf in 3 Schritten, Über Silva, Kontakt.
- `angebot.html` – alle Produkte als Karten mit Kategorie-Filter.
- `bestellen.html` – Anfrageformular. Regeln: Wunschtermin frühestens heute
  + 3 Tage (JS setzt `min` und prüft beim Absenden), Adressfeld erscheint nur
  bei «Lieferung», Datenschutz-Checkbox ist Pflicht. Produktkarten verlinken
  mit `bestellen.html?produkt=<id>` und wählen das Produkt im Dropdown vor.
- `impressum.html`, `datenschutz.html` – Grundtexte für eine Schweizer
  Kleinunternehmerin (revDSG); Kontaktangaben kommen über `data-feld` aus
  den Einstellungen.
- **Header und Footer sind auf allen 5 Seiten identisch dupliziert** (kein
  Include-Mechanismus, damit `file://` funktioniert). Änderungen daran müssen
  in allen HTML-Dateien nachgezogen werden.
- Design-Variablen (Waldgrün, Creme, Rosé, Anthrazit) stehen oben in
  `css/style.css` unter `:root`. Mobile-first, Breakpoints bei 560/720/900px.

## Offene Punkte

- `data/einstellungen.js` ausfüllen (Kontaktangaben, Formspree-ID) – solange
  leer, zeigt die Seite gelbe `[TODO]`-Markierungen.
- GitHub Pages einschalten und DNS für `silvaflorum.ch` setzen (README,
  Schritte C und D).
- Beispielprodukte/-preise und Platzhalterbilder durch echte ersetzen; Text
  «Über Silva» in `index.html` durch Silvas eigene Geschichte ersetzen.

## Hinweis für spätere Sessions

Der Besitzer kennt keine Git-/GitHub-Begriffe. In Antworten Fachwörter
vermeiden oder in einem Halbsatz erklären, Klick-für-Klick-Anleitungen geben
und auf die entsprechenden README-Abschnitte verweisen.
