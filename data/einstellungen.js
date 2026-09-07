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
  "name": "",

  // Adresse des Ateliers
  "strasse": "",      // z.B. "Waldweg 3"
  "plz_ort": "",      // z.B. "8000 Zürich"

  // Kontakt
  "email": "",        // z.B. "hallo@silvaflorum.ch"
  "telefon": "",      // z.B. "079 123 45 67" oder "+41 79 123 45 67" (ohne «(0)»)

  // Nur ausfüllen, falls das Geschäft im Handelsregister eingetragen ist
  // (z.B. "CHE-123.456.789"). Sonst einfach leer lassen.
  "uid": "",

  // Formspree-ID für das Anfrageformular (siehe README, «Formular aktivieren»).
  // Zeigt Formspree die Adresse https://formspree.io/f/abcdwxyz an,
  // dann lautet die ID "abcdwxyz".
  "formspree_id": ""

};
