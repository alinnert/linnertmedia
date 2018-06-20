---
title: Die Grundlagen zu Node.js
tags: JavaScript
date: 2018-06-16
description: Node.js erlaubt die Entwicklung von Serveranwendungen. Aber auch Node.js-basierte Kommandozeilentools oder Build-Skripte werden in den letzten Jahren stark genutzt.
---

Node.js ist inzwischen allgegenwärtig in der Welt der Web-Entwicklung. Einige kennen es aber vielleicht nur im Kontext von JavaScript-Server-Anwendungen. Dieser Artikel soll einen groben Überblick über alle Facetten von Node.js geben.

## Allgemeine Informationen

Node.js ist eine Plattform, die es erlaubt, JavaScript-Code außerhalb eines Web-Browsers auszuführen. Die aktuellen Versionen verwenden *V8* (Die JavaScript-Engine von Googles Browser *Chrome*) zum Ausführen von JavaScript-Code. Da V8 nur relativ begrenzte Möglichkeiten bietet, stehen einem des Weiteren noch native APIs zur Verfügung, um beispielsweise auf das lokale Dateisystem oder den Netzwerkverkehr zugreifen zu können.

Dadurch eröffnen sich nun einige Möglichkeiten und Einsatzgebiete. Der Bekannteste darunter ist die Entwicklung von Web-Anwendungs-Servern. Sei es zur Erstellung von HTML-Seiten oder zur Bereitstellung einer REST- oder GraphQL-API. Ein wichtiger Unterschied zu PHP ist hier allerdings, dass kein zusätzlicher Webserver wie Apache notwendig ist, denn Node.js selbst ist bereits der Server. Da man somit quasi seinen eigenen Server baut, hat man auch etwas mehr Freiheiten als mit Fertigpaketen wie Apache.

Weitere Einsatzzwecke sind das Erstellen von Kommandozeilen-Skripten und die Verwendung als Build-Tool für eigene Projekte. Nach der Installation auf einem Rechner stehen drei neue Befehle in der Kommandozeile zur Verfügung: `node`, `npm` und `npx`.

## Der `node`-Befehl

Mit dem Befehl `node` lassen sich `.js`-Dateien ausführen, aber auch eine interaktive JavaScript-Konsole starten. Letztere startet man einfach durch ausführen von `node` in der Kommandozeile. Gibt man als Parameter allerdings eine JavaScript-Datei an, so wird der Code in dieser Datei ausgeführt. Führt man also den Befehl `node my-script.js` aus — und geht davon aus, dass diese Datei existiert und den Code `console.log('Hallo Welt')` enthält — dann wird "Hallo Welt" in der Kommandozeile ausgegeben.

Unter Linux und Unix kann man sogar einen Schritt weitergehen und Skripte erstellen, die sich wie übliche Bash-Skripte starten lassen (`./my-script.js`). Dazu muss die JavaScript-Datei in der ersten Zeile folgendes beinhalten: `#!/usr/bin/env node`.

Dadurch lassen sich einerseits Skripte erstellen, die einen endlichen Job erledigen und irgendwann fertig sind — z. B. Dateien kopieren. Oder aber es wird ein Dienst gestartet, der permanent im Hintergrund läuft und auf Verbindungen oder Anfragen wartet.

## Neue Projekte anlegen mit `npm init` und `package.json`

Npm ist die in Node.js integrierte Paketverwaltung. Damit lassen sich Projekte erstellen und dessen Abhängigkeiten verwalten. In der Regel beginnt man damit, dass man in einem Ordner ein Npm-Projekt initialisiert. Das geschieht in der Regel im Hauptverzeichnis des Projekts, an dem man arbeitet, mit folgendem Befehl: `npm init`. Danach werden einem einige Fragen zum Projekt gestellt: Name, Version, Autor, Lizenz etc. Die muss man nicht sofort und absolut gewissenhaft beantworten, denn ein späteres Ändern der Daten ist sehr einfach möglich.

Nachdem das Projekt initialisiert wurde, findet man im Projektverzeichnis eine neue Datei: `package.json`. Diese beinhaltet alle vorhin eingegebenen Daten. Mehr ist dabei auch nicht passiert. Man kann diese Datei alternativ also auch per Hand erstellen. Diese Datei umfasst alle Informationen zum aktuellen Projekt und lässt sich als Dreh- und Angelpunkt dessen sehen. Ein händisches Editieren der Datei ist problemlos möglich und stellenweise sogar erforderlich.

## Pakete installieren mit `npm install`

In der `package.json` befinden sich u. a. die Felder `dependencies` und `devDependencies`. Diese listen die Pakete auf, die vom aktuellen Projekt benötigt werden, damit das Projekt lauffähig ist. Unter [npmjs.org](https://npmjs.org) kann man sich einen Überblick über alle verfügbaren Pakete verschaffen.

Die beiden Felder unterscheiden sich dabei nur darin, dass `devDependencies` alle Pakete beinhaltet, die zur Entwicklung am Projekt notwendig sind. `dependencies` listet alle Pakete auf, die zur generellen Funktionalität des Projekts notwendig sind. `devDependencies` beinhaltet also je nach Art des Projekts beispielsweise Entwicklerwerkzeuge wie Linter, Test-Tools, TypeScript-Definitionen und ähnliches.

Möchten wir jetzt ein neues Paket installieren, bewegen wir uns in der Kommandozeile erst einmal in das Verzeichnis, das die `package.json` beinhaltet. Dann führen wir den Befehl `npm install <name-of-package>` aus, wobei `<name-of-package>` der Name des Pakets ist, das wir installieren möchten. Installieren wir beispielsweise das Framework *Vue* würde das so aussehen: `npm install vue`. Der exakte Name des Paketes ist in der Regel in der Dokumentation der Bibliothek zu finden, oder direkt unter [npmjs.org](https://npmjs.org).

Was passiert nun bei der Installation? Alle installierten Pakete landen im Ordner `node_modules`, der neben unserer `package.json` angelegt wird, sollte er noch nicht existieren. Außerdem wird dieses Paket in der `package.json` im Feld `dependencies` automatisch hinterlegt. Das hat folgenden Vorteil: Bei der Verwendung einer Versionskontrolle wie Git brauchen wir den Inhalt von `node_modules` nicht mit unter Versionierung stellen. Checkt man das Projekt frisch aus und hat lediglich die `package.json`, reicht ein einfaches `npm install` und es werden automatisch alle Pakete erneut installiert, die in der `package.json` unter `dependencies` (und `devDependencies`) aufgelistet sind.

## Skripte ausführen mit `npm run`

In der `package.json` befindet sich auch ein Feld `scripts`. Dies beinhaltet eine Liste selbstdefinierter Skripte, die man immer wieder braucht. Npm hilft einem auch dabei, häufig benötigte Skripte schneller und einfacher ausführen zu können. Ein Skript definiert man, indem man dem `scripts`-Objekt ein Key-Value-Paar hinzufügt. Der „key“ ist dabei der Name des Skripts, der „value“ das Skript, das dann letzten Endes ausgeführt wird.

::: file package.json (Beispiel)
```json
{
	...
	"scripts": {
		"build": "webpack -p"
	}
}
```
:::

Im Grunde können die Skripte alles enthalten, was man auch in der Kommandozeile schreiben kann. Zusätzlich jedoch können ohne Umwege Skripte aufgerufen werden, die über Npm installiert wurden. Stellt ein **lokal und nicht global** installiertes Paket einen Kommandozeilenbefehl zur Verfügung (wie es zum Beispiel bei `webpack` der Fall ist), wäre dieser üblicherweise über `./node_modules/.bin/webpack` verfügbar. Diese umständliche Pfadangabe ist im `scripts`-Teil der `package.json` nicht notwendig. Es reicht ein einfaches `webpack`.

## Skripte ausführen mit `npx`

Npx ist neu mit Npm 5.0 hinzugekommen. Es vereinfacht das Ausführen von Kommandozeilenbefehlen, die durch Npm installiert wurden ungemein. Seitdem lässt sich das oben genannte Beispiel `./node_modules/.bin/webpack` durch `npx webpack` abkürzen. (In der `package.json` ist es aber weiterhin nicht notwendig)

Wird versucht, durch Npx einen Befehl auszuführen, der nicht existiert, wird automatisch das jeweilige Skript temporär via Npm installiert und anschließend ausgeführt. Dies ist vor allem dann hilfreich, wenn man einen Befehl nur ausprobieren möchte oder ihn nur sehr selten benötigt — zum Beispiel `yo` von [*Yeoman*](http://yeoman.io/).

## Pakete global installieren mit `npm install --global`

Die Möglichkeit, Pakete global auf dem System zu installieren, gerät mit der Zeit immer mehr in den Hintergrund. Durch Npx ist es einerseits nicht mehr notwendig, andererseits wird es an einigen Stellen empfohlen, Skripte im Projektkontext statt global zu installieren.

Einen interessanten Einsatzzweck hat die globale Installation von Paketen aber dennoch: Das Entwickeln von systemunabhängigen Kommandozeilenskripten, die die Arbeit mit der Kommandozeile vereinfachen sollen. Ein global installiertes Paket ergibt nur dann Sinn, wenn es einen Befehl für die Kommandozeile bereitstellt, der in vielen Ordnern einsetzbar ist. Ein Beispiel wäre [bookmark](https://github.com/DeMille/bookmark), ein kleines Kommandozeilen-Werkzeug, mit dem man Ordner als Lesezeichen anlegen kann, um schneller dorthin navigieren zu können.

## Node mit ChakraCore

Aktuell arbeitet Microsoft auch an einer Version von Node.js mit ChakraCore statt V8. ChakraCore ist die JavaScript-Engine des Browsers Edge. Man kann diese Version in Form einer Vorschau-Version ausprobieren. Der Quellcode ist auf [GitHub](https://github.com/nodejs/node-chakracore) zu finden.

## Node.js und WASM

Node.js wird in Zukunft mit *WASM* (WebAssembly) vermutlich noch etwas mehr an Bedeutung und Vielfältigkeit gewinnen. WASM, kurz erklärt, ist ein compile target für allerlei Programmiersprachen. WASM verwendet dabei die Laufzeitumgebung, die auch von JavaScript verwendet wird, allerdings wird beim Kompiliervorgang quasi an JavaScript "vorbeikompiliert". Dadurch ist für WASM kompilierter Programmcode sehr performant. Da Node.js eine Plattform ist, die auf einer Unzahl von Plattformen lauffähig ist, gilt das auch für WASM-Programme.

Unterm Strich erlaubt dies das Entwickeln von performanter Software in einer beliebigen Programmiersprache, die überall dort lauffähig ist, wo man eine WASM-kompatible JavaScript-Engine vorfindet. Das heißt konkret: Jede Plattform, auf der Node.js lauffähig ist und auch jeder aktuelle Web-Browser. Die aktuell primär unterstützten Sprachen sind C/C++ und Rust von Mozilla. Weitere Sprachen werden bald folgen. Darunter bekannte Sprachen, aber auch werden daraufhin neue Sprachen entstehen, die primär auf WASM abgestimmt sind, zum Beispiel [AssemblyScript](https://github.com/AssemblyScript/assemblyscript) oder [Kou](https://github.com/utatti/kou).