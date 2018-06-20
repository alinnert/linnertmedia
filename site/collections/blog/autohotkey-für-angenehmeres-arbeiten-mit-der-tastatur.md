---
title: AutoHotKey für angenehmeres Arbeiten mit der Tastatur
tags: Tipps
date: 2017-06-10
description: Mit AutoHotKey lassen sich Tastenkürzel definieren und Tasten umbelegen, um produktiver mit der Tastatur arbeiten zu können. Hier gibt es ein Beispiel für ein solches AHK-Skript.
---

Viele Programmierer nutzen Vim als ihre primäre Entwicklungsumgebung unter anderem, weil so gut wie alle Befehle über das Buchstabenfeld der Tastatur erreichbar sind. Mit AutoHotkey lässt sich etwas Ähnliches bewerkstelligen und hat dabei meiner Meinung nach noch weitere Vorteile.

Im konsolenbasierten Text-Editor Vim lässt sich der Textcursor über die Tasten `H`/`J`/`K`/`L` steuern. Das ist ganz praktisch, da man beim Programmieren sehr oft zwischen dem Buchstabenfeld und den Pfeiltasten hin- und herwechseln muss. Wenn die Pfeiltasten über das Buchstabenfeld steuerbar sind, spart man sich jedoch die wiederholte Hin- und Herbewegung mit der Hand. Die Variante vom Vim-Editor hat meiner Meinung nach allerdings zwei Nachteile. Ich finde die Tastenbelegung nicht sehr intuitiv und sie funktioniert ausschließlich in Vim. Außerhalb muss man auf diese Komfortfunktion verzichten.

Deswegen hab ich etwas nachgeforscht, ob man die Tastaturbelegung nicht generell anpassen kann. Und hierbei bin ich über [AutoHotkey](https://www.autohotkey.com/) gestolpert. Primär lässt sich dieses Programm nutzen, um verschiedene Vorgänge per Tastenkürzel zu automatisieren. Konkret lassen sich bspw. Tastenanschläge abfangen und in andere Tastatureingaben umwandeln, die anschließend weiter an das aktive Programm geschickt werden.

Nachdem man AutoHotkey installiert hat, erstellt man Skripte in einer eigens dafür entwickelten Skriptsprache. Diese speichert man in Dateien mit der Endung `.ahk`. Diese Dateien lassen sich anschließend ausführen und bleiben aktiv, bis man das Skript wieder manuell beendet. Solange die Skripte ausgeführt werden, können sie auf Tastatureingaben reagieren und unterschiedliche Aktionen ausführen.

Daraufhin dachte ich mir folgendes: Die Capslock-Taste wird jetzt nicht so super-oft verwendet, also kann man diese doch in eine zusätzliche Modifier-Taste umfunktionieren. Ist diese gedrückt, möchte ich mit den Tasten `I`/`J`/`K`/`L` die Pfeiltasten der Tastatur ansprechen können, `U` und `O` werden zu “Pos 1” und “Ende”, und `Z` und `H` werden zu “Bild auf/ab”. Wo wir schon dabei sind, können wir auch weitere Buchstaben dazu verwenden, die Lautstärke des PCs zu ändern, die Musiksteuerung anzusprechen und weitere Tasten anzusteuern, die sonst etwas schwerer erreichbar sind.

Apropos schwer erreichbare Tasten: Bei der Programmierung brauche ich sehr häufig Zugriff auf die geschweiften Klammern. Diese sind mit `Alt Gr` + `7` bzw. `0` alles andere als angenehm zu tippen. Wie wäre es also, hätte ich die `<`-Taste als einen weiteren Modifier für Sonderzeichen und die geschweiften Klammern auf `J` und `K`? Das setzte sich mit der Zeit immer weiter fort, bis ein Großteil meiner Tastatur belegt war. Ich hab das so aufgesetzte System jetzt einige Zeit lang getestet und es quasi “ausreifen” lassen, bevor ich es jetzt öffentlich mit allen teile.

Wie kann man diese umbelegten Tasten nun selbst ausprobieren? Das benötigt zwar ein paar Handgriffe, ist aber nicht allzu schwierig.

1. Zuerst muss [AutoHotkey](https://www.autohotkey.com/) von der offiziellen Webseite heruntergeladen und installiert werden.
2. Dann erstellt man sich eine Datei mit der Endung `.ahk`. Der Name und Ort ist egal. Ein Ordner, der mit einer Cloud synchronisiert wird (OneDrive, Dropbox etc.), ist allerdings empfehlenswert.
3. Das Skript, das ich für diesen Zweck erstellt habe sowie eine Liste der wichtigsten Kürzel, findet ihr [hier auf Gist](https://gist.github.com/alinnert/a4f3868e10eafcfe6b4684dca3f79dfc). Den Inhalt des Skripts einfach in die Datei kopieren und speichern.
4. Durch einen Doppelklick auf diese Datei wird das Skript gestartet. Im Systray-Bereich erscheint ein neues Symbol, das anzeigt, dass ein Skript läuft. Über dieses kann ein Skript auch beendet oder neu geladen werden.
5. Möchtet ihr dieses Skript bei jedem Systemstart sofort nutzen können, legt ihr eine Verknüpfung zu dieser `.ahk`-Datei in folgenden Ordner (Windows 10): `%USERPROFILE%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\`

Im oben verlinkten Skript kann man genauer nachlesen, welche Tastenkürzel definiert sind. Das Skript kann man bei Bedarf natürlich auch an seine eigenen Bedürfnisse anpassen. Ein weiterer angenehmer Nebeneffekt ist, dass die verschiedenen Tastaturlayouts bei Laptops nicht mehr so schwer ins Gewicht fallen. Pfeiltasten und weitere Tasten wie “Bild auf/ab”, “Pos 1” und “Ende” sind auch dort immer an der gewohnten Stelle.

Nichtsdestotrotz gibt jedoch ein paar Dinge, die man sich im Hinterkopf behalten sollte:

1. Das Skript funktioniert nicht, wenn eine Anwendung mit Admin-Berechtigung den Fokus hat. Ich tippe auf einen Schutzmechanismus von Windows.
2. Dadurch, dass die `<`-Taste zum Modifier umfunktioniert wurde, reagiert diese erst, wenn man diese wieder loslässt.
3. Es dauert natürlich, bis man sich an eine neu belegte Tastatur gewöhnt hat. Bei mir dauerte es zwischen einer und zwei Wochen. Allerdings habe ich die Belegung der Tasten auch Schritt für Schritt aufgebaut.
4. AutoHotkey ist aktuell nur für Windows verfügbar. Ich bin mir nicht sicher, ob es eine ähnliche Lösung für macOS gibt. Für Linux hab ich keine gefunden ‒ außer eigene Tastaturmappings zu erstellen.
5. Wenn man an einem anderen PC sitzt, der das Skript nicht nutzt, kann es vorkommen, dass man aus Gewohnheit eine der neuen Tastenkürzel verwendet und sich wundert, dass der PC nicht wie gewohnt reagiert.