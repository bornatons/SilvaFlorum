# Silva Florum – Wald der Blumen

Website für das Blumenatelier von Silva: handgemachte Blumenarrangements und
Dekorationen auf Bestellung, mit Abholung im Atelier oder regionaler Lieferung.
Die Seite ist bewusst einfach gebaut: nur HTML, CSS und etwas JavaScript –
kein Programm muss installiert werden. Sie enthält keinen Shop und keine
Zahlungsfunktion, nur ein Anfrageformular.

**Du liest gerade das README.** Auf GitHub wird diese Datei automatisch auf der
Startseite des Projekts angezeigt (unter der Dateiliste). Im Projektordner heisst
sie `README.md`.

---

## 1. Ein paar Begriffe, ganz kurz erklärt

| Begriff | Bedeutung in einfachen Worten |
|---|---|
| **Repository** («Repo») | Der Projektordner mit allen Dateien der Website, gespeichert auf GitHub. Bei uns: `github.com/bornatons/SilvaFlorum`. |
| **Branch** | Eine «Arbeitskopie» des Projekts. `main` ist die Hauptversion, die online geht. Neue Arbeiten entstehen zuerst auf einem separaten Branch. |
| **Commit** | Ein gespeicherter Änderungsschritt («Speichern mit Notiz»). |
| **Pull Request** («PR») | Ein Vorschlag: «Bitte übernimm die Änderungen von diesem Branch in `main`.» Man kann sie vorher anschauen. |
| **Mergen** | Den Pull Request annehmen. Danach sind die Änderungen in `main`. |
| **GitHub Pages** | Gratis-Dienst von GitHub, der die Dateien aus `main` als echte Website ins Internet stellt. |
| **Formspree** | Gratis-Dienst, der die Formular-Anfragen von der Website per E-Mail an Silva weiterleitet. |
| **DNS** | Das «Telefonbuch» des Internets: sagt, dass `silvaflorum.ch` auf unsere GitHub-Pages-Seite zeigen soll. |

## 2. Schritt 0: Den Pull Request annehmen

Die Website wurde auf einem separaten Branch gebaut. Solange der Pull Request
nicht angenommen ist, enthält `main` nur dieses README – und alle folgenden
Schritte gehen ins Leere. Darum zuerst:

1. Auf GitHub das Repository öffnen und oben auf den Reiter **Pull requests**
   klicken.
2. Den Eintrag «Website-MVP für Silva Florum» anklicken.
3. Unten auf den grünen Knopf **Merge pull request** klicken, dann auf
   **Confirm merge**.

Fertig – jetzt liegen alle Dateien in `main`. Diesen Schritt braucht es nur
einmal.

## 3. Dateien direkt auf GitHub bearbeiten (ohne Programme)

Du brauchst nichts zu installieren. So änderst du eine Datei:

1. Auf GitHub das Repository öffnen. Oben links steht ein Knopf mit einem
   Verzweigungs-Symbol und einem Branch-Namen – dort muss **main** stehen.
   Falls nicht: anklicken und `main` wählen.
2. Die Datei anklicken (z.B. Ordner `data`, dann `einstellungen.js`).
3. Oben rechts auf das **Stift-Symbol** («Edit this file») klicken.
4. Text ändern.
5. Oben rechts auf den grünen Knopf **Commit changes…** klicken. Im Fenster
   die Auswahl **Commit directly to the main branch** stehen lassen und
   nochmals **Commit changes** klicken.

Sobald die Website online ist (Schritt C), erscheint jede so gespeicherte
Änderung automatisch auf der Website – meist nach ein bis zwei Minuten,
manchmal dauert es bis zu 10 Minuten.

## 4. Seite auf dem eigenen Computer ansehen

Projekt als ZIP herunterladen (grüner Knopf **Code** → **Download ZIP**, dabei
muss `main` gewählt sein), entpacken und die Datei `index.html` doppelklicken.
Sie öffnet sich im Browser – ganz ohne Internet oder Server.

## 5. Was liegt wo?

```
SilvaFlorum/
├── index.html            Startseite (mit dem Text «Über Silva»)
├── angebot.html          Alle Produkte mit Filter
├── bestellen.html        Anfrageformular
├── impressum.html        Impressum
├── datenschutz.html      Datenschutzerklärung
├── data/
│   ├── einstellungen.js  ★ Kontaktangaben + Formspree-ID – HIER ausfüllen
│   └── products.js       ★ Die Produktliste – hier Produkte pflegen
├── images/               Produktbilder (aktuell Platzhalter)
├── css/style.css         Das ganze Design (Farben ganz oben)
└── js/                   Technik (Menü, Produktkarten, Formular)
```

Im Alltag musst du nur die zwei mit ★ markierten Dateien anfassen. Einzige
Ausnahme: der Text «Über Silva» und das Atelierbild stehen direkt in
`index.html` (siehe Schritt E).

## 6. Schritt für Schritt zur fertigen Website

### Schritt A: Kontaktangaben eintragen

Alle Kontaktangaben stehen an **einer einzigen Stelle**: in der Datei
**`data/einstellungen.js`**. Solange dort ein Feld leer ist, zeigt die Website
an der Stelle eine gelbe `[TODO: …]`-Markierung (im Footer jeder Seite, im
Kontaktbereich, im Impressum und in der Datenschutzerklärung). Sobald du das
Feld ausfüllst, verschwinden alle Markierungen automatisch.

Die Datei sieht so aus – du schreibst einfach den Text zwischen die
Anführungszeichen:

```js
"name": "Silva Muster",
"strasse": "Waldweg 3",
"plz_ort": "8000 Zürich",
"email": "hallo@silvaflorum.ch",
"telefon": "079 123 45 67",
"uid": "",                      // leer lassen, falls nicht im Handelsregister
"formspree_id": ""              // kommt in Schritt B
```

Wichtig: Anführungszeichen und Kommas so lassen, wie sie sind. Falls nach dem
Speichern plötzlich wieder **alle** gelben `[TODO]` erscheinen, fehlt irgendwo
ein Komma oder ein Anführungszeichen – die Zeile nochmals genau anschauen.

### Schritt B: Formular aktivieren (Formspree)

Das Formular schickt Anfragen über Formspree per E-Mail. Du hast schon ein
Konto – jetzt fehlt nur noch die «Formular-ID»:

1. Auf [formspree.io](https://formspree.io) einloggen. Du landest auf der
   Übersicht deiner Formulare («Forms»).
2. **Falls die Anfragen an Silvas E-Mail-Adresse gehen sollen** (und nicht
   an die Adresse, mit der du dich angemeldet hast): Zuerst oben auf
   **Account** klicken, dort bei den E-Mail-Adressen auf **+ Add Email**
   und Silvas Adresse eintragen. Silva bekommt dann eine E-Mail von Formspree
   mit einem Bestätigungs-Link, den sie anklicken muss. Erst danach (Status
   nicht mehr «Pending») lässt sich ihre Adresse im nächsten Schritt wählen.
3. Zurück zu **Forms**, auf **+ New Form** klicken.
4. Einen Namen eingeben, z.B. `Silva Florum Anfragen`. Bei **Send emails to**
   die gewünschte Adresse wählen (Silvas Adresse, falls in Punkt 2
   hinzugefügt). Mit **Create Form** bestätigen.
5. Formspree zeigt nun die Adresse des Formulars, etwa
   `https://formspree.io/f/mqkvabcd`. Der kurze Teil nach `/f/` – hier
   `mqkvabcd` – ist die **Formspree-ID**. (Falls sie nicht sofort sichtbar
   ist: im Formular auf den Reiter **Integration** klicken.)
6. Diese ID in `data/einstellungen.js` eintragen:
   `"formspree_id": "mqkvabcd"` (mit deiner eigenen ID). Falls du aus
   Versehen die ganze Adresse einträgst, ist das auch in Ordnung – die
   Website nimmt automatisch nur die ID.
7. Zum Testen einmal selbst eine Anfrage über die Website abschicken. Sie
   sollte innert weniger Minuten als E-Mail ankommen. In dieser E-Mail kann
   Silva direkt auf **Antworten** klicken – die Antwort geht an die Kundin.

Gut zu wissen: Der Gratis-Tarif erlaubt 50 Anfragen pro Monat – für ein
kleines Atelier meist genug. Die Anfragen sind im Formspree-Konto unter
**Submissions** einsehbar, im Gratis-Tarif aber nur 30 Tage lang – wichtige
Anfragen also aus der E-Mail heraus aufbewahren. Solange die ID nicht
eingetragen ist, zeigt das Formular beim Absenden einen Hinweis an und
verschickt nichts.

### Schritt C: Website online stellen (GitHub Pages)

1. Auf GitHub das Repository öffnen und oben auf **Settings** klicken (ganz
   rechts in der Reiterleiste). Ist kein «Settings» zu sehen, auf das
   **…**-Menü rechts in der Reiterleiste klicken – dort steht es.
2. Links im Menü auf **Pages** klicken.
3. Unter «Build and deployment» bei **Source** die Option
   **Deploy from a branch** wählen.
4. Bei **Branch** den Eintrag `main` und daneben `/ (root)` wählen, dann
   **Save** klicken.
5. Kurz warten (meist ein bis zwei Minuten, höchstens etwa 10) und die Seite
   neu laden. Oben erscheint dann «Your site is live at …» mit der Adresse
   `https://bornatons.github.io/SilvaFlorum/`. Diese Adresse im Browser
   öffnen – die Website ist online. Falls nach 10 Minuten nichts erscheint:
   oben im Reiter **Actions** nachschauen, ob der Lauf «pages build and
   deployment» ein grünes Häkchen hat.

Das Repository ist bereits öffentlich («Public») – das ist die Voraussetzung
für Gratis-GitHub-Pages und bei einer Website völlig in Ordnung.

### Schritt D: Eigene Domain silvaflorum.ch verbinden

Erst diesen Schritt machen, wenn Schritt C funktioniert hat.

**Wichtig zu wissen:** Die Domain silvaflorum.ch wird zurzeit von **Wix**
verwaltet (die sogenannten Nameserver zeigen auf `ns0.wixdns.net` und
`ns1.wixdns.net`, Stand September 2026). Vermutlich wurde die Domain über Wix
gekauft oder mit einer Wix-Website verbunden. Das heisst: Die
DNS-Einstellungen werden **im Wix-Konto** geändert, nicht bei einem anderen
Anbieter. Falls unter silvaflorum.ch heute eine Wix-Seite läuft, ist diese
nach der Umstellung nicht mehr erreichbar – stattdessen erscheint die neue
Website.

**Teil 1 – bei GitHub (1 Minute):**

1. **Settings** → **Pages**.
2. Bei **Custom domain** `silvaflorum.ch` eintragen und **Save** klicken.
   GitHub legt dabei selbst eine Datei namens `CNAME` im Repository an –
   diese Datei nicht löschen.
3. Es erscheint zunächst eine Meldung, dass die Prüfung fehlgeschlagen ist –
   das ist normal, weil die DNS-Einträge (Teil 2) noch fehlen.

**Teil 2 – im Wix-Konto (DNS-Einträge):**

1. Bei Wix einloggen, zu **Domains** gehen und `silvaflorum.ch` anklicken.
2. Die DNS-Einträge öffnen (bei Wix etwa unter **Erweitert** / **Advanced**
   → **DNS-Einträge bearbeiten** / **Edit DNS**). Falls die Domain mit einer
   Wix-Website verbunden ist und sich die Einträge nicht ändern lassen, muss
   die Domain zuerst von dieser Website getrennt werden (bei der Domain
   unter «Von Website trennen» / «Disconnect»).
3. **Bestehende Einträge entfernen:** die drei **A**-Einträge für die
   Domain selbst (zeigen auf Wix-Adressen wie `185.230.63.…`) und den
   bestehenden **CNAME**-Eintrag für `www` (zeigt auf `…wixdns.net`).
4. **Diese Einträge neu anlegen:**

| Typ | Name / Host | Wert (Ziel) |
|---|---|---|
| A | `@` (oder leer, = silvaflorum.ch) | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `bornatons.github.io` |

Die vier A-Einträge zeigen `silvaflorum.ch` auf GitHub, der CNAME-Eintrag
sorgt dafür, dass auch `www.silvaflorum.ch` funktioniert. `@` steht für die
Domain selbst; bei manchen Anbietern heisst das Feld «Host».

**Teil 3 – warten und HTTPS einschalten:**

1. Bis die DNS-Änderung überall greift, kann es **bis zu 24 Stunden**
   dauern (meist geht es schneller). In dieser Zeit nichts an den Einträgen
   ändern.
2. Bei GitHub unter **Settings → Pages** steht bei der Domain irgendwann
   «DNS check successful» mit grünem Häkchen. Falls noch eine Fehlermeldung
   steht: auf **Check again** klicken oder später nochmals nachschauen.
3. Dann das Kästchen **Enforce HTTPS** anhaken – damit ist die Seite
   verschlüsselt (Schloss-Symbol im Browser). Das Kästchen kann ebenfalls bis
   zu 24 Stunden lang ausgegraut sein – einfach später nochmals versuchen.
4. Bleibt das Häkchen auch nach einem Tag aus oder bleibt «Enforce HTTPS»
   ausgegraut: bei **Custom domain** auf **Remove** klicken, `silvaflorum.ch`
   erneut eintippen und **Save** klicken – das startet die Prüfung neu.
5. Im Browser `https://silvaflorum.ch` aufrufen. Fertig!

Wenn du nicht weiterkommst: Der Wix-Support kennt «GitHub Pages» und kann
die fünf Einträge einrichten. Oder frag Claude – mit einem Screenshot der
DNS-Seite geht es meist schnell.

### Schritt E: Produkte, Bilder und Text anpassen

**Produkte** stehen in der Datei **`data/products.js`** – eine einfache Liste,
oben in der Datei ist jedes Feld erklärt. So sieht ein Produkt aus:

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

- **Ändern:** Text zwischen den Anführungszeichen anpassen, speichern.
- **Hinzufügen:** Einen ganzen Block `{ … }` kopieren, ein Komma dazwischen
  setzen und die Texte anpassen.
- **Entfernen:** Den Block `{ … }` samt Komma löschen.

Die Produkte erscheinen automatisch auf der Startseite (nur die mit
`"hervorgehoben": true`), auf der Angebotsseite und im Dropdown des Formulars.
Die aktuellen sechs Produkte und Preise sind **Beispiele**.

**Bilder:** Im Ordner `images/` liegen nur Platzhalter. Eigene Fotos so
einbauen:

1. Foto am besten im Querformat und verkleinert (ca. 1200 Pixel breit, als
   `.jpg`) vorbereiten – das hält die Seite schnell.
2. Auf GitHub den Ordner `images` öffnen → **Add file** → **Upload files** →
   Foto hineinziehen → **Commit changes**.
3. In `data/products.js` beim Produkt den Pfad anpassen, z.B.
   `"bild": "images/tuerkranz.jpg"`.

**Text «Über Silva» und Atelierbild:** Beides steht in `index.html`. Die
Datei auf GitHub öffnen (Stift-Symbol) und mit `Ctrl+F` (Mac: `Cmd+F`) nach
`Über Silva` suchen. Darunter stehen drei Textabsätze, jeder zwischen `<p>`
und `</p>` – den Text dazwischen ersetzen, die spitzen Klammern stehen
lassen. Das Atelierbild ist in derselben Gegend als
`<img src="images/atelier.svg" …>` eingetragen – dort den Dateinamen des
eigenen Fotos einsetzen (das Foto vorher wie oben in `images/` hochladen).

> **Warum heisst die Produktdatei `products.js` und nicht `products.json`?**
> Browser dürfen aus Sicherheitsgründen keine `.json`-Dateien laden, wenn man
> eine Website per Doppelklick (ohne Server) öffnet. Als `.js`-Datei
> funktioniert es überall – der Inhalt ist trotzdem eine einfache Liste.

## 7. Alternative zu GitHub Pages: Netlify

Falls GitHub Pages einmal nicht passt, geht es auch mit Netlify (ebenfalls
gratis): auf [netlify.com](https://www.netlify.com) ein Konto erstellen, mit
GitHub verbinden, **Add new site → Import an existing project**, dieses
Repository wählen, alle Build-Einstellungen leer lassen und **Deploy** klicken.
Die Domain wird dann unter «Domain management» verbunden (Netlify zeigt die
nötigen DNS-Einträge an). In diesem Fall in `datenschutz.html` den Text
«GitHub Pages (GitHub Inc., USA)» durch «Netlify (Netlify Inc., USA)» ersetzen.

## 8. Checkliste bis zum Livegang

- [ ] Schritt 0: Pull Request annehmen (Merge)
- [ ] Schritt A: `data/einstellungen.js` ausfüllen (Name, Adresse, E-Mail, Telefon)
- [ ] Schritt B: Formspree-ID eintragen und Testanfrage schicken
- [ ] Schritt C: GitHub Pages einschalten und `bornatons.github.io/SilvaFlorum` prüfen
- [ ] Schritt D: Domain bei GitHub eintragen, DNS-Einträge bei Wix setzen, «Enforce HTTPS» anhaken
- [ ] Schritt E: Echte Produkte, Preise, Fotos und den Text «Über Silva» eintragen
