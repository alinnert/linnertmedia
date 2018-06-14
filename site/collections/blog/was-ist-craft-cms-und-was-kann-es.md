---
title: Was ist Craft CMS und was kann es?
tags: PHP, CraftCMS
date: 2014-03-25
---

Craft ist ein CMS, basierend auf PHP und MySQL, das sich durch seine Flexibilität und zeitgleicher Einfachheit von der Masse abhebt. In diesem Artikel stelle ich Craft allgemein vor.

Die Suche nach dem geeigneten CMS für die eigene Webseite oder seine Projekte kann einem endlos vorkommen. Man ist auf der Suche nach etwas, das möglichst einfach zu bedienen ist und einen Funktionsumfang mitbringt, den man mit sich vereinbaren kann. Für mich war die Suche zuende als ich auf Craft gestoßen war. Doch was macht Craft für mich so einzigartig?

![](/assets/images/blog/was-ist-craft-cms-und-was-kann-es/craft-entries.png)

Das erste das auffällt ist seine schlichte Oberfläche. Kundige unter uns erkennen vielleicht Designrichtlinien von Google wieder. Craft bietet einen schlanke und aufgeräumte Benutzeroberfläche, die es einfach macht, die Dinge zu finden, die man sucht. Den Eindruck, den das CMS hier vermittelt, kann einen allerdings stark täuschen, wenn man erwartet, dass die Technik unter der Haube ähnlich aufgebaut ist. Bei Craft handelt es sich um eines der flexibelsten Content Management Systeme, die ich bislang ausprobiert habe. Inwiefern ist es denn so flexibel?

Der Großteil aller Systeme bietet einem beim Befüllen einer Seite nur einen Texteditor an, in den man alles reinschreibt, was auf der Webseite erscheinen soll. Fortgeschrittenere Systeme lassen einem die Möglichkeit, mehrere Blöcke verschiedener Art zu erstellen und auch bei Belieben auszutauschen und temporär auszublenden. Ein gutes Beispiel hierfür ist Contao. Craft allerdings bietet einem die Möglichkeit genau zu definieren, wie jede Seite im Backend bearbeitbar ist. Man kann die Editierseiten mit allen möglichen Eingabefeldern bestücken und diese bestimmten Rollen zuweisen.

![](/assets/images/blog/was-ist-craft-cms-und-was-kann-es/craft-article.png)

Für einen Artikel bedeutet dies beispielsweise, dass ein Artikel immer eine Überschrift, einen Einleitungstext, verschiedene Tags und Artikelserien und einen Inhalt haben kann. Dies erleichtert es einerseits für den Autor ein einheitliches Schema beim Erstellen seiner Artikel beizubehalten. Auf der anderen Seite ist es für den Programmierer der Webseite ein Zuckerschlecken, gezielt den Einleitungstext herauszufiltern, um damit irgendwas großartiges anzustellen. Bei anderen Systemen hat man dagegen ein Problem, einen bestimmten Inhalt aus einem Artikel oder einer Seite herauszufiltern, da alles eine große untrennbare Einheit darstellt.

Auch lässt sich so jede beliebige Datenstruktur darstellen, z. B. eine tabellengestützte Terminliste, die alle Details enthält, die eine Webseite benötigt. Bei WordPress dagegen ist man hier bereits auf Plugins von Drittanbietern angewiesen.

Plugins gibt es für Craft übrigens auch. Mit diesen kann man beispielsweise Widgets für das Backend erstellen. Man verwendet sie aber auch, um beliebig Daten außerhalb des Backends zu manipulieren. Die Erstellung eines Kommentarsystems oder eines Gästebuches erfordert auch die Entwicklung eines Plugins. Sie können aber auch die Möglichkeiten der verwendeten Template-Engine Twig erweitern. Template-Engine Twig?

::: file beispiel.twig
```twig
{% for item in resultList %}

  <article>
    <header>
      <h1>
        <a href="{{ item.url }}">{{ item }}</a>
      </h1>
      <div class="meta">
        <span>{{ item.dateCreated | date('d.m.Y') }}</span>
        {# <span>0 Kommentare</span> #}
        {% for serie in item.blogserie %}
          {% set url = 'blog/serie/' ~ serie %}
          <span>In Serie: <a href="{{ url(url) }}">{{ serie }}</a></span>
        {% endfor %}
      </div>
    </header>

    <p>{{ item.einleitung | nl2br }}</p>
  </article>

{% endfor %}
```
:::

Ja, richtig! Die Templates werden nicht in HTML oder PHP geschrieben, sondern in Twig. Im Grunde ist dies HTML, das um Twig-Tags erweitert wird. Diese erlauben es Weichen einzubauen, Schleifen zu erstellen, Werte zu manipulieren bevor man sie ausgibt usw. Eine Template-Engine ist also im Prinzip eine kleine Programmiersprache, die allerdings einfacher zu bedienen ist und viel übersichtlicher aussieht als PHP. Auch der Einstieg für Leute ohne Programmierkenntnisse ist einfacher, wenn man sich auf wichtige Funktionen beschränkt.

Im Großen und Ganzen wirkt die Erstellung einer Webseite mit Craft genau so sauber und aufgeräumt, wie die Oberfläche des Systems selbst. Auf der anderen Seite bietet es aber mehr Flexibilität als die üblichen Verdächtigen auf dem CMS-Markt.

Eine Sache sollte man dennoch beachten: Craft ist kein CMS, das man eben schnell installiert, ein Theme runterlädt und die Webseite anschließend mit Inhalten bestückt. Denn: Es gibt keine Themes! Craft ist ein System für Leute, die ihre eigenen Layouts basteln und dafür ein stabiles aber flexibles Grundgerüst suchen. Es ist sehr gut geeignet für Webentwickler, die Webseiten für Kunden, Freunde oder sich selbst erstellen.

Ein weiterer wichtiger Punkt ist noch die finanzielle Frage: Was kostet Craft? Es folgt dem Freemium-Geschäftsmodell. Das Grundsystem ist kostenlos, es gibt aber derzeit 5 Zusatzpakete, die man unabhängig voneinander hinzukaufen kann, um den Funktionsumfang von Craft zu erweitern: Publish Pro (erweiterte Funktionen zum Erstellen von Seiten), Users (Mehrbenutzerunterstützung), Cloud (Zugriff auf Cloudsysteme von Amazon, Google und Rackspace), Rebrand (Möglichkeit, das Craftlogo durch ein eigenes zu ersetzen) und Localize (Möglichkeit, eine mehrsprachige Seite zu erstellen). Zusammen kommen alle Pakete auf einen Gesamtpreis von knapp 700 USD. Allerdings ist die besagte Flexibilität des Systems nicht zu unterschätzen. So kommt man mit dem kostenlosen Basissystem schon wirklich sehr weit.

**Nachtrag 21.05.2014:** Wenige Tage nach Veröffentlichung dieses Artikels hat Craft sein Preismodell grundlegend geändert. Das Grundsystem (Craft PERSONAL) bleibt weiterhin kostenlos. Es gibt jedoch 2 Upgrades zum Preis von 199 USD (Craft CLIENT) bzw. 299 USD (Craft PRO). Craft CLIENT ist hauptsächlich für Webentwickler geeignet, die ihren Kunden einen eigenen Zugang zum System bieten wollen, ohne ihren Administrationszugang aus den Händen geben zu müssen. Zusätzlich bietet es weitere Strukturierungsmöglichkeiten der Inhalte. Möchte man eine mehrsprachige Seite aufsetzen, muss man jedoch schon zu Craft PRO greifen. Weitere Infos und den genauen Funktionsumfang findet man in der Preistabelle.

Bei Zeiten werden weitere Tutorials zum Erstellen von Seiten mit Craft folgen. Ich bin mit dem System einfach viel zu zufrieden, um es nicht weiter bekannt zu machen. Desweiteren ist der Einstieg mit der offiziellen Dokumentation meiner Meinung nach nicht ganz so einfach wie er sein könnte.