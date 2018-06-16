---
title: Willkommen auf dem neuen Linnert Media-Blog
tags: Intern
date: 2018-06-17
---

Hola zusammen und willkommen beim neuen Linnert Media *Open Source-Blog*!

Wie ihr seht, wurde mein Blog grundlegend überarbeitet. Das hat mehrere Gründe:

1. Ich verliere mit der Zeit immer mehr das Interesse an PHP und allen zusammenhängenden Technologien und Produkten. Ich bin gerade dabei eine kleine Anwendung in PHP zu entwickeln und stoße dabei immer wieder auf Probleme und Unschönheiten, die ich so von anderen Sprachen nicht kenne. Es existieren Einschränkungen, die das Arbeiten mit Web-Frameworks unnötig unschön machen. Außerdem lässt sich PHP-Code nur dank Drittsoftware debuggen (XDebug), was auch entweder zu Problemen führt (das Craft CMS-Backend in Zusammenhang mit einem bestimmten Plugin zerschießt) oder gar nicht erst funktioniert (Slim Framework). Fehler in Server-Code ohne Debugger zu finden ist... äußerst uncool.
Wenn ich es außerdem schaffe, bei meinen Webseiten gänzlich auf PHP zu verzichten, kann ich mir einen PHP-Hosting-Plan und damit Geld sparen.

2. Der Workflow, eine Webseite zu aktualisieren und dabei aufzupassen, dass Datenbankstrukturen nicht zu Bruch gehen oder ähnliche Späße, fühlt sich für mich einfach falsch an. Vor allem bei einem Blog. Ich bin schon länger am Überlegen, ob dieser Workflow wirklich der Richtige ist. Aber da sich der Datenbestand bei manchen Webseiten im Live-Betrieb ändern kann, ist eine dateibasierte Umsetzung (a la SQLite) auch nicht so einfach möglich.

3. Ich verfasse meine Blog-Posts gerne als Markdown-Datei. Diese in einem CMS zu pflegen ist auch nicht das Gelbe vom Ei. Ich bin dort nicht in der Lage, die Markdown-Syntax für Bilder zu verwenden, um selbige auch auf der Webseite auszugeben. Das heißt, ich musste meinen Quellcode bei allen Bildern aufsplitten und die Bilder manuell über das CMS einpflegen.

## Das neue Blog

Deswegen gehe ich mit diesem Blog einen völlig anderen Weg: Ich hab mit Node.js einen eigenen kleinen Static Site Generator aufgezogen, der aus Markdown-Dateien die fertigen HTML-Dateien erstellt. Ich hab lange andere Generatoren ausprobiert, aber viele haben das Problem, dass dynamische Seiten nicht oder nur schwer erstellbar sind. Also zum Beispiel Seiten, die alle Beiträge zu einem bestimmten Tag auflisten.

Diese Arbeitsweise erlaubt es mir, die Seite vollständig über Git zu verwalten und außerdem als statische Seite auf [GitHub Pages](https://pages.github.com/) zu hosten, was (abgesehen von der Domain) komplett kostenlos ist.

Auch habe ich die Gelegenheit genutzt, um alte Posts auszumisten. Darunter die zum Thema *Craft CMS*, da sich mit Version 3 jetzt einiges geändert hat und auch wegen den oben genannten Gründen. Die Beiträge zum Thema JavaScript werde ich aber vorerst hierlassen, auch wenn diese auch eine Überarbeitung nötig hätten. Der Eintrag zum Thema Node.js wurde bereits komplett neu überarbeitet.

## Was ist ein Open Source-Blog?

Der komplette Quellcode dieser Webseite liegt auf [GitHub](https://github.com/alinnert/linnertmedia). Darüber kann ab jetzt auch vollständig die Kommunikation ablaufen, wenn es um Fragen zu einem Beitrag geht oder auch bei Ideen zu weiteren Themen, über die ich einen Beitrag verfassen kann.

Egal, um was es geht: Erstellt einfach ein [Issue auf GitHub](https://github.com/alinnert/linnertmedia/issues) und ich werde es so bald wie möglich bearbeiten.

Aber nun viel Spaß beim Lesen!