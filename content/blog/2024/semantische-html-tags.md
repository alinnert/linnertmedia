---
title: "Semantische HTML-Tags"
date: 2024-04-07
draft: false
tags:
- HTML
---

Dieser Artikel ist ein Überblick über die semantischen HTML-Tags und wie sie verwendet werden. Es gibt: `main`, `article`, `aside`, `nav`, `search` und `section`. Die Elemente `header` und `footer` spielen hier auch eine spezielle Rolle.

## `main`

Umschließt den Hauptinhalt des aktuellen Dokuments oder die Hauptfunktionalität der aktuellen Anwendung. Elemente, die sich auf einem Großteil der Dokumente einer Webseite wiederholen &ndash; z. B. Sidebars, Navigations-Links, Copyright-Informationen, Seiten-Logos und Suchformulare &ndash; sollten nicht innerhalb des `main`-Elements liegen. Es sei denn das Suchformular bspw. ist die Hauptfunktionalität des aktuellen Dokuments.

Das `main`-Element sollte nur einmal in einem Dokument verwendet werden.

[Mehr zu `main` auf MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main)

## `article`

Umschließt ein eigenständiges Schriftwerk, das an jeder beliebigen anderen Stelle wiederverwendbar ist, ohne an Sinnigkeit zu verlieren.

Beispiele sind: Ein Forum-Post, ein Magazin- oder Zeitungsartikel, ein Blog-Post, ein Produkt-Eintrag in einem Shop, ein benutzergenerierter Inhalt, ein interaktives Widget oder jede weitere Art von unabhängigem Inhalt.

[Mehr zu `article` auf MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article)

## `aside`

Umschließt jeden Inhalt, der nur indirekt mit dem Haupt-Inhalt der aktuellen Seite in Verbindung steht.

Beispiele sind: Sidebars und Call-Out-Boxen.

[Mehr zu `aside` auf MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside)

## `nav`

Umschließt einen Bereich der Webseite oder -Anwendung, der Navigationslinks bereithält &ndash; sei es innerhalb des aktuellen Dokuments oder zu einem anderen Dokument.

Beispiele sind: Navigationsmenüs, Inhaltsverzeichnisse und Indizes.

[Mehr zu `nav` auf MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav)

## `search`

Umschließt einen Bereich der Webseite oder -Anwendung, der Steuer- oder andere Elemente beinhaltet, die zur Suche oder Filterung von Inhalten dient. Die Such- oder Filterfunktion kann sich auf das aktuelle Dokument, die aktuelle Webseite bzw. -Anwendung oder auf das gesamte Internet bzw. einen Teil davon beziehen.

[Mehr zu `search` auf MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/search)

## `section`

Umschließt einen generische eigenständige Einheit des aktuellen Dokuments, für die es kein anderes Element gibt. `section`s sollten immer einen Titel besitzen, mit wenigen Ausnahmen.

Beispiele sind: Eine Liste mit Suchergebnissen oder eine Karte.

[Mehr zu `section` auf MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section)

## `header` und `footer`

Das Element `header` umschließt einleitenden Inhalt. Z. B.: Überschriften, ein Logo, ein Suchformular, den Autor und weitere Elemente.

Das Element `footer` umschließt bspw. Informationen zum Autor, Copyright-Informationen oder Links.

Befinden sich die Elemente `header` und `footer` in einem der Elemente `article`, `aside`, `nav` oder `section`, stellen sie den Header oder Footer dieses jeweiligen Abschnitts dar. Befinden sie sich in keinem dieser Elemente, stellen sie den globalen Webseiten-Header oder -Footer dar.

[Mehr zu `header` auf MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header)

[Mehr zu `footer` auf MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer)