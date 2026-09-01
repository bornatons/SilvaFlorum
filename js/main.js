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
});

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
