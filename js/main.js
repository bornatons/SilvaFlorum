/* ============================================================
   Silva Florum – gemeinsames JavaScript für alle Seiten
   - Mobile Navigation (Burger-Menü)
   - Rendern der Produktkarten aus data/products.js
   - Kategorie-Filter auf der Angebotsseite
   ============================================================ */

"use strict";

/* ---------- Mobile Navigation ---------- */

document.addEventListener("DOMContentLoaded", function () {
  var knopf = document.querySelector(".nav-knopf");
  var navigation = document.querySelector(".navigation");

  if (knopf && navigation) {
    knopf.addEventListener("click", function () {
      var offen = navigation.classList.toggle("offen");
      knopf.setAttribute("aria-expanded", offen ? "true" : "false");
    });
  }

  // Aktuelles Jahr im Footer einsetzen
  var jahr = document.getElementById("jahr");
  if (jahr) {
    jahr.textContent = new Date().getFullYear();
  }

  fuelleKontaktangaben();
});

/* ---------- Kontaktangaben aus data/einstellungen.js einsetzen ---------- */

// Beschriftungen für die gelben [TODO]-Markierungen, solange ein Feld leer ist
var FELD_BESCHRIFTUNG = {
  name: "Vorname und Nachname",
  strasse: "Strasse und Hausnummer",
  plz_ort: "PLZ und Ort",
  adresse: "Adresse des Ateliers",
  email: "E-Mail-Adresse",
  telefon: "Telefonnummer",
  uid: "UID-Nummer"
};

/**
 * Liest einen Wert aus EINSTELLUNGEN. «adresse» ist ein Sammelfeld
 * aus Strasse und PLZ/Ort.
 */
function holeEinstellung(feld) {
  if (typeof EINSTELLUNGEN === "undefined" || !EINSTELLUNGEN) {
    return "";
  }
  if (feld === "adresse") {
    var strasse = String(EINSTELLUNGEN.strasse || "").trim();
    var plzOrt = String(EINSTELLUNGEN.plz_ort || "").trim();
    return strasse && plzOrt ? strasse + ", " + plzOrt : "";
  }
  return String(EINSTELLUNGEN[feld] || "").trim();
}

/**
 * Füllt alle Elemente mit data-feld="..." mit den Werten aus den
 * Einstellungen. Leere Felder werden gelb als [TODO] markiert.
 * Elemente mit data-nur-wenn="..." werden ausgeblendet, wenn das
 * genannte Feld leer ist.
 */
function fuelleKontaktangaben() {
  if (typeof EINSTELLUNGEN === "undefined") {
    console.warn(
      "data/einstellungen.js fehlt oder enthält einen Tippfehler (z.B. fehlendes " +
        "Komma oder Anführungszeichen). Darum werden [TODO]-Markierungen angezeigt."
    );
  }

  document.querySelectorAll("[data-feld]").forEach(function (element) {
    var feld = element.dataset.feld;
    var wert = holeEinstellung(feld);
    var istLink = element.tagName === "A";
    var beschriftung = FELD_BESCHRIFTUNG[feld] || feld;

    // Beim Sammelfeld «adresse» genau sagen, welcher Teil noch fehlt
    if (feld === "adresse" && !wert) {
      if (holeEinstellung("strasse")) {
        beschriftung = "PLZ und Ort";
      } else if (holeEinstellung("plz_ort")) {
        beschriftung = "Strasse und Hausnummer";
      }
    }

    if (wert) {
      element.textContent = wert;
      element.classList.remove("todo");
      if (istLink && feld === "email") {
        element.href = "mailto:" + wert;
      } else if (istLink && feld === "telefon") {
        // Für den Anruf-Link nur Ziffern und das Plus behalten;
        // ein «(0)» wie in «+41 (0)79 …» wird dabei entfernt
        element.href = "tel:" + wert.replace(/\(0\)/g, "").replace(/[^+\d]/g, "");
      }
    } else {
      element.textContent = "[TODO: " + beschriftung + "]";
      element.classList.add("todo");
      if (istLink) {
        element.removeAttribute("href");
      }
    }
  });

  document.querySelectorAll("[data-nur-wenn]").forEach(function (element) {
    element.hidden = !holeEinstellung(element.dataset.nurWenn);
  });
}

/* ---------- Produktkarten ---------- */

/**
 * Baut eine einzelne Produktkarte als HTML-Element.
 */
function baueProduktkarte(produkt) {
  var karte = document.createElement("article");
  karte.className = "karte";
  karte.dataset.kategorie = produkt.kategorie;

  var bild = document.createElement("img");
  bild.src = produkt.bild;
  bild.alt = "Beispielbild: " + produkt.name;
  bild.loading = "lazy";
  karte.appendChild(bild);

  var inhalt = document.createElement("div");
  inhalt.className = "karte-inhalt";

  var kategorie = document.createElement("p");
  kategorie.className = "karte-kategorie";
  kategorie.textContent = produkt.kategorie;
  inhalt.appendChild(kategorie);

  var titel = document.createElement("h3");
  titel.textContent = produkt.name;
  inhalt.appendChild(titel);

  var beschreibung = document.createElement("p");
  beschreibung.className = "karte-beschreibung";
  beschreibung.textContent = produkt.beschreibung;
  inhalt.appendChild(beschreibung);

  var fuss = document.createElement("div");
  fuss.className = "karte-fuss";

  var preis = document.createElement("span");
  preis.className = "karte-preis";
  preis.textContent = produkt.preis;
  fuss.appendChild(preis);

  var link = document.createElement("a");
  link.className = "button button--sekundaer";
  link.href = "bestellen.html?produkt=" + encodeURIComponent(produkt.id);
  link.textContent = "Anfragen";
  fuss.appendChild(link);

  inhalt.appendChild(fuss);
  karte.appendChild(inhalt);
  return karte;
}

/**
 * Rendert Produktkarten in den Container mit der angegebenen ID.
 * Mit nurHervorgehobene = true erscheinen nur die Startseiten-Produkte.
 */
function zeigeProdukte(containerId, nurHervorgehobene) {
  var container = document.getElementById(containerId);
  if (!container || typeof PRODUKTE === "undefined") {
    return;
  }

  PRODUKTE.forEach(function (produkt) {
    if (nurHervorgehobene && !produkt.hervorgehoben) {
      return;
    }
    container.appendChild(baueProduktkarte(produkt));
  });
}

/**
 * Baut die Kategorie-Filterknöpfe auf der Angebotsseite auf.
 * Die Knöpfe blenden Karten je nach Kategorie ein und aus.
 */
function baueKategorieFilter(filterId, kartenContainerId) {
  var leiste = document.getElementById(filterId);
  var container = document.getElementById(kartenContainerId);
  if (!leiste || !container || typeof PRODUKTE === "undefined") {
    return;
  }

  // Alle Kategorien einsammeln (ohne Doppelte)
  var kategorien = [];
  PRODUKTE.forEach(function (produkt) {
    if (kategorien.indexOf(produkt.kategorie) === -1) {
      kategorien.push(produkt.kategorie);
    }
  });

  function baueKnopf(beschriftung, kategorie) {
    var knopf = document.createElement("button");
    knopf.type = "button";
    knopf.className = "filter-knopf";
    knopf.textContent = beschriftung;
    knopf.addEventListener("click", function () {
      leiste.querySelectorAll(".filter-knopf").forEach(function (k) {
        k.classList.remove("aktiv");
      });
      knopf.classList.add("aktiv");
      container.querySelectorAll(".karte").forEach(function (karte) {
        var passt = kategorie === null || karte.dataset.kategorie === kategorie;
        karte.hidden = !passt;
      });
    });
    return knopf;
  }

  var alleKnopf = baueKnopf("Alle", null);
  alleKnopf.classList.add("aktiv");
  leiste.appendChild(alleKnopf);

  kategorien.forEach(function (kategorie) {
    leiste.appendChild(baueKnopf(kategorie, kategorie));
  });
}
