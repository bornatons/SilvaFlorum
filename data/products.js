/* ============================================================
   Silva Florum – Produktliste
   ============================================================
   Diese Datei kannst du gefahrlos bearbeiten, um Produkte zu
   ändern, zu löschen oder neue hinzuzufügen.

   WICHTIG:
   - Nur den Teil zwischen den eckigen Klammern [ ... ] anpassen.
   - Jedes Produkt steht zwischen geschweiften Klammern { ... },
     Produkte werden mit einem Komma getrennt.
   - Texte immer in Anführungszeichen "..." schreiben.

   Bedeutung der Felder:
   - id:            Kurzname ohne Leerzeichen/Umlaute (wird intern
                    verwendet, z.B. für den Link zum Bestellformular).
   - name:          Angezeigter Produktname.
   - beschreibung:  Kurzbeschreibung (1–2 Sätze).
   - preis:         Preisangabe als Text, z.B. "ab CHF 45" oder
                    "Preis auf Anfrage".
   - kategorie:     Gruppe, nach der auf der Angebotsseite
                    gefiltert werden kann.
   - bild:          Pfad zum Bild im Ordner images/.
   - hervorgehoben: true = erscheint auf der Startseite,
                    false = nur auf der Angebotsseite.

   Hinweis: Alle Produkte und Preise unten sind BEISPIELE.
   ============================================================ */

const PRODUKTE = [
  {
    "id": "saisonstrauss",
    "name": "Saisonstrauss",
    "beschreibung": "Ein frischer Strauss mit dem Schönsten, was die Jahreszeit gerade hergibt – jedes Mal ein Unikat.",
    "preis": "ab CHF 45",
    "kategorie": "Sträusse",
    "bild": "images/saisonstrauss.svg",
    "hervorgehoben": true
  },
  {
    "id": "waldstrauss",
    "name": "Waldstrauss «Silva»",
    "beschreibung": "Wild und natürlich: Gräser, Zweige, Beeren und Blüten, wie am Waldrand gepflückt.",
    "preis": "ab CHF 65",
    "kategorie": "Sträusse",
    "bild": "images/waldstrauss.svg",
    "hervorgehoben": true
  },
  {
    "id": "tischgesteck",
    "name": "Tischgesteck",
    "beschreibung": "Ein liebevoll gestecktes Arrangement für den Esstisch – passend zu Anlass und Jahreszeit.",
    "preis": "ab CHF 55",
    "kategorie": "Gestecke",
    "bild": "images/tischgesteck.svg",
    "hervorgehoben": true
  },
  {
    "id": "tuerkranz",
    "name": "Türkranz",
    "beschreibung": "Handgebundener Kranz aus Naturmaterialien, der Ihre Haustür durch die Saison begleitet.",
    "preis": "ab CHF 85",
    "kategorie": "Kränze",
    "bild": "images/tuerkranz.svg",
    "hervorgehoben": true
  },
  {
    "id": "trockenblumen",
    "name": "Trockenblumen-Arrangement",
    "beschreibung": "Langlebige Schönheit: Trockenblumen in warmen Tönen, die monatelang Freude machen.",
    "preis": "ab CHF 70",
    "kategorie": "Trockenblumen",
    "bild": "images/trockenblumen.svg",
    "hervorgehoben": false
  },
  {
    "id": "hochzeitsdeko",
    "name": "Hochzeitsdeko",
    "beschreibung": "Brautstrauss, Tischschmuck und mehr – individuell geplant in einem persönlichen Gespräch.",
    "preis": "Preis auf Anfrage",
    "kategorie": "Hochzeit & Feste",
    "bild": "images/hochzeitsdeko.svg",
    "hervorgehoben": false
  }
];
