/* ============================================================
   Silva Florum – Logik für das Anfrageformular (bestellen.html)
   - Dropdown mit Arrangements aus data/products.js füllen
   - Frühesten Wunschtermin setzen (heute + 3 Tage)
   - Adressfeld nur bei Lieferung anzeigen
   - Prüfung der Eingaben und Versand über Formspree
   ============================================================ */

"use strict";

/* Die Formspree-ID wird in data/einstellungen.js eingetragen (siehe
   README.md, Abschnitt «Formular aktivieren»). Solange sie fehlt, wird
   das Formular nicht abgeschickt, sondern ein Hinweis angezeigt. */
function holeFormspreeId() {
  if (typeof EINSTELLUNGEN === "undefined" || !EINSTELLUNGEN) {
    return "";
  }
  var id = String(EINSTELLUNGEN.formspree_id || "").trim();
  // Falls jemand die ganze Adresse statt nur der ID eingetragen hat
  // (z.B. "https://formspree.io/f/abcdwxyz" oder "formspree.io/f/abcdwxyz/"),
  // nur den Teil nach "/f/" verwenden.
  var treffer = id.match(/\/f\/([^\/?#\s]+)/);
  if (treffer) {
    id = treffer[1];
  }
  return id === "FORMSPREE_ID" ? "" : id;
}

document.addEventListener("DOMContentLoaded", function () {
  var formular = document.getElementById("anfrage-formular");
  if (!formular) {
    return;
  }

  var formspreeId = holeFormspreeId();
  if (formspreeId) {
    formular.action = "https://formspree.io/f/" + formspreeId;
  }

  /* ---------- Dropdown mit Arrangements füllen ---------- */

  var auswahl = document.getElementById("arrangement");
  if (auswahl && typeof PRODUKTE !== "undefined") {
    PRODUKTE.forEach(function (produkt) {
      var option = document.createElement("option");
      option.value = produkt.name;
      option.dataset.id = produkt.id;
      option.textContent = produkt.name + " (" + produkt.preis + ")";
      auswahl.appendChild(option);
    });

    var sonder = document.createElement("option");
    sonder.value = "Sonderanfertigung";
    sonder.textContent = "Sonderanfertigung – eigene Idee";
    auswahl.appendChild(sonder);

    // Kam die Besucherin über den «Anfragen»-Knopf einer Produktkarte,
    // steht das Produkt in der Adresse (z.B. bestellen.html?produkt=tuerkranz)
    // und wird hier vorausgewählt.
    var parameter = new URLSearchParams(window.location.search);
    var produktId = parameter.get("produkt");
    if (produktId) {
      for (var i = 0; i < auswahl.options.length; i++) {
        if (auswahl.options[i].dataset.id === produktId) {
          auswahl.selectedIndex = i;
          break;
        }
      }
    }
  }

  /* ---------- Frühesten Wunschtermin setzen (heute + 3 Tage) ---------- */

  var terminFeld = document.getElementById("wunschtermin");
  var fruehesterTermin = new Date();
  fruehesterTermin.setDate(fruehesterTermin.getDate() + 3);
  // Datum im Format JJJJ-MM-TT, wie es das Datumsfeld erwartet
  var minDatum = fruehesterTermin.toISOString().slice(0, 10);
  if (terminFeld) {
    terminFeld.min = minDatum;
  }

  /* ---------- Adressfeld nur bei Lieferung anzeigen ---------- */

  var lieferungRadio = document.getElementById("uebergabe-lieferung");
  var abholungRadio = document.getElementById("uebergabe-abholung");
  var adressBereich = document.getElementById("adress-bereich");
  var adressFeld = document.getElementById("lieferadresse");

  function aktualisiereAdressfeld() {
    var lieferung = lieferungRadio && lieferungRadio.checked;
    if (adressBereich) {
      adressBereich.hidden = !lieferung;
    }
    if (adressFeld) {
      adressFeld.required = Boolean(lieferung);
      if (!lieferung) {
        adressFeld.value = "";
      }
    }
  }

  if (lieferungRadio && abholungRadio) {
    lieferungRadio.addEventListener("change", aktualisiereAdressfeld);
    abholungRadio.addEventListener("change", aktualisiereAdressfeld);
    aktualisiereAdressfeld();
  }

  /* ---------- Meldungen anzeigen ---------- */

  var meldung = document.getElementById("formular-meldung");

  function zeigeMeldung(text, typ) {
    if (!meldung) {
      return;
    }
    meldung.textContent = text;
    meldung.className = "meldung " + (typ === "erfolg" ? "meldung--erfolg" : "meldung--fehler");
    meldung.hidden = false;
    meldung.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /* ---------- Absenden: prüfen und an Formspree schicken ---------- */

  formular.addEventListener("submit", function (ereignis) {
    // Wir übernehmen den Versand selbst, damit die Besucherin auf der
    // Seite bleibt und eine klare Rückmeldung bekommt.
    ereignis.preventDefault();

    // 1. Eingebaute Browserprüfung (Pflichtfelder, E-Mail-Format usw.)
    if (!formular.checkValidity()) {
      formular.reportValidity();
      return;
    }

    // 2. Zusätzliche Prüfung: Wunschtermin frühestens in 3 Tagen
    if (terminFeld && terminFeld.value && terminFeld.value < minDatum) {
      zeigeMeldung(
        "Bitte wählen Sie einen Wunschtermin, der mindestens 3 Tage in der Zukunft liegt " +
          "(frühestens " + minDatum.split("-").reverse().join(".") + "). " +
          "So bleibt genug Zeit, Ihr Arrangement frisch anzufertigen.",
        "fehler"
      );
      terminFeld.focus();
      return;
    }

    // 3. Ist die Formspree-ID noch nicht eingetragen, freundlich darauf hinweisen
    if (!formspreeId) {
      zeigeMeldung(
        "Das Formular ist noch nicht aktiviert: In data/einstellungen.js fehlt die " +
          "Formspree-ID (siehe README.md). Bitte kontaktieren Sie uns in der " +
          "Zwischenzeit direkt per E-Mail oder Telefon – die Angaben finden Sie im Footer.",
        "fehler"
      );
      return;
    }

    // 4. Formulardaten an Formspree senden
    var absendeKnopf = formular.querySelector("button[type='submit']");
    if (absendeKnopf) {
      absendeKnopf.disabled = true;
      absendeKnopf.textContent = "Wird gesendet …";
    }

    fetch("https://formspree.io/f/" + formspreeId, {
      method: "POST",
      body: new FormData(formular),
      headers: { Accept: "application/json" }
    })
      .then(function (antwort) {
        if (antwort.ok) {
          formular.reset();
          aktualisiereAdressfeld();
          zeigeMeldung(
            "Herzlichen Dank für Ihre Anfrage! Silva meldet sich innerhalb von " +
              "2 Werktagen bei Ihnen. Die Anfrage ist unverbindlich – alles Weitere " +
              "besprechen wir gemeinsam.",
            "erfolg"
          );
        } else {
          // Genaue Ursache (z.B. Limit erreicht, Formular deaktiviert) in der
          // Browser-Konsole ausgeben – hilft beim Einrichten und Testen.
          antwort
            .json()
            .then(function (daten) {
              var details = daten && daten.errors
                ? daten.errors.map(function (e) { return e.message; }).join(", ")
                : (daten && daten.error) || "";
              console.error("Formspree-Fehler " + antwort.status + ": " + details);
            })
            .catch(function () {
              console.error("Formspree-Fehler " + antwort.status);
            });
          zeigeMeldung(
            "Leider konnte die Anfrage nicht gesendet werden. Bitte versuchen Sie es " +
              "später noch einmal oder kontaktieren Sie uns direkt per E-Mail oder Telefon.",
            "fehler"
          );
        }
      })
      .catch(function () {
        zeigeMeldung(
          "Es gab ein Verbindungsproblem und die Anfrage wurde nicht gesendet. " +
            "Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es noch einmal.",
          "fehler"
        );
      })
      .finally(function () {
        if (absendeKnopf) {
          absendeKnopf.disabled = false;
          absendeKnopf.textContent = "Anfrage senden";
        }
      });
  });
});
