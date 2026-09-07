/* ============================================================
   Silva Florum – Einstellungen
   ============================================================
   HIER trägst du alle persönlichen Angaben ein. Sie erscheinen
   danach automatisch auf allen Seiten (Footer, Kontakt, Impressum,
   Datenschutz). Solange ein Feld leer ist (""), zeigt die Website
   an dieser Stelle eine gelbe [TODO]-Markierung.

   So geht's: Den Text zwischen die Anführungszeichen schreiben,
   zum Beispiel
       "email": "hallo@silvaflorum.ch",
   dann speichern – fertig. Das Komma am Zeilenende stehen lassen.

   Falls nach dem Speichern plötzlich wieder ALLE gelben [TODO]
   erscheinen: Dann fehlt irgendwo ein Komma oder ein
   Anführungszeichen – die Änderung nochmals genau anschauen.
   ============================================================ */

"use strict";

const EINSTELLUNGEN = {

  // Vor- und Nachname der Inhaberin (erscheint im Impressum und Datenschutz)
  "name": "Silva Tonsic",

  // Adresse des Ateliers
  "strasse": "Kilchbergstrasse 6a",      // z.B. "Waldweg 3"
  "plz_ort": "8134 Adliswil",      // z.B. "8000 Zürich"

  // Kontakt
  "email": "silvaflorum@gmail.com",        // z.B. "hallo@silvaflorum.ch"
  "telefon": "079 769 23 33",      // z.B. "079 123 45 67" oder "+41 79 123 45 67" (ohne «(0)»)

  // Nur ausfüllen, falls das Geschäft im Handelsregister eingetragen ist
  // (z.B. "CHE-123.456.789"). Sonst einfach leer lassen.
  "uid": "CHE-234.034.860",

  // Formspree-ID für das Anfrageformular (siehe README, «Formular aktivieren»).
  // Zeigt Formspree die Adresse https://formspree.io/f/abcdwxyz an,
  // dann lautet die ID "abcdwxyz".
  "formspree_id": "https://formspree.io/f/xwlkrkzw"

};
