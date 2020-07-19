---
title: Variablen, undefined und simple Datentypen in JavaScript
tags:
  - JavaScript
date: 2015-06-29
description: Dieser Beitrag erklärt die Grundlagen von JavaScript. Den strict mode, Variablen sowie die simplen Datentypen number, boolean, string. Die Wertübergabe erfolgt "by value".
---

Leute, die von anderen objektorientierten Programmiersprachen wie Java oder C# nach JavaScript wandern, fühlen sich unter Umständen irritiert. JavaScript ist einfach anders, bietet aber eine vertraute C-ähnliche Syntax. In der Tat hab ich bereits gelesen, dass JavaScript als "unlernbare Sprache" betitelt wurde. Diese Blog-Serie erklärt die Grundlagen und Funktionsweise von JavaScript, um ihr diesen schlechten Ruf wieder abzunehmen.

::: info Strict Mode
Bevor wir wirklich beginnen, ein kleiner Hinweis: Es wird generell empfohlen, den strict mode von JavaScript zu aktivieren. Dazu am Anfang einer `.js`-Datei oder eines JavaScript-Blocks im HTML einfach `'use strict';` schreiben. Im strict mode werden mehr Fehler geworfen, um unerwartetes Verhalten zu vermeiden. Eine genaue Beschreibung ist hier zu lesen:

<http://www.mediaevent.de/javascript/strict-mode.html>

Eventuell folgt später auch eine Zusammenfassung der Auswirkungen von meiner Seite in diesem Blog. Meine Artikel zum Thema JavaScript gehen jedenfalls von **aktiviertem strict mode** aus.
:::

Eventuell folgt später auch eine Zusammenfassung der Auswirkungen von meiner Seite in diesem Blog. Meine Artikel zum Thema JavaScript gehen jedenfalls von aktiviertem strict mode aus.

## Variablen

Variablen werden mit dem keyword `var` deklariert. Wann und wo man Variablen deklariert, ist egal. Es muss also nicht zu Beginn einer Funktion sein. Die Variable ist ab dem deklarierten Zeitpunkt für den gesamten restlichen Verlauf der aktuellen Funktion sichtbar.

``` js
var tree, i,
  theAnswer = 42,
  darling = kitten = 'Minka';
```

(Aktuell ignoriere ich hier die beiden neuen keywords `let` und `const`, die mit ECMAScript 6 eingeführt werden, da sie im Normalfall noch nicht verwendet werden können.)

Gültige Variablennamen können Buchstaben (case sensitive), Zahlen und die beiden Zeichen `_` und `$` beinhalten. Zahlen dürfen jedoch nicht am Anfang des Namens stehen.

Datentypen kann man in zwei Kategorien unterteilen: simple und komplexe Datentypen. Zusätzlich gibt es noch den Typen `undefined`, der eine besondere Rolle spielt. Simple Datentypen sind: `boolean`, `number`, `string` und der ab ECMAScript 6 neue Typ `symbol`. Komplexe Typen sind: `object` und `function`.

Von welchem Datentyp eine Variable ist, findet man mit dem Schlüsselwort `typeof` heraus. Man kann `typeof` verwenden wie eine Funktion, muss man aber nicht. Siehe dazu folgende Beispiele:

``` js
console.log(typeof window); // > "object"
console.log(typeof(window)); // > "object"
console.log(typeof typeof window); // > "string"
```

Da das Ergebnis von `typeof` selbst immer ein String ist, kann man rein theoretisch den Typ davon ebenfalls mit `typeof` abfragen. (Siehe dritte Zeile oben) Die Sinnigkeit ist zwar ohne Frage anzweifelbar, allerdings verdeutlicht dieses Beispiel, was ich anfangs mit den Bausteinen aufzeigen wollte.

Sicher fragen sich jetzt einige, was denn mit Arrays ist. Die Antwort zu Arrays beantworte ich allerdings später, wenn ich den Datentyp `object` genauer behandle.

## Der Datentyp `undefined`

Bei `undefined` muss man unterscheiden, ob eine Variable oder nur deren Wert nicht definiert ist. Hierzu folgendes Beispiel:

``` js
var tree;

if (tree) { console.log('Baum'); }
else { console.log('kein Baum'); }
// > "kein Baum"

if (flower) { console.log('Blume'); }
else { console.log('keine Blume'); }
// > Uncaught ReferenceError
```

::: info Truthy/Falsy Value
Wird an einer Stelle ein boolescher Wert erwartet, aber keiner geliefert, wandelt JavaScript den vorhandenen Wert automatisch um. Das Ergebnis entspricht in aller Regel dem, was man normalerweise erwartet. Man spricht hier von “Truthy Value” bzw. “Falsy Value”.

Falsy Values sind: `false`, `null`, `undefined`, `0`, `NaN` und `''`.

Da `0` ein Falsy Value ist, lässt sich mit `if (allFlowers.length)` einfach abfragen, ob ein Array Elemente beinhaltet. Natürlich spricht nichts dagegen, wenn man Bedingungen spezifischer angeben möchte: `if (allFlowers.length > 0)`
:::

Beim ersten `if`-Statement (`if (tree)`) wird “kein Baum” in der JavaScript-Konsole ausgegeben, da eine nicht initialisierte Variable den Wert `undefined` hat, welcher schließlich als `false` interpretiert wird (“falsy value”). Dies kann man sich z. B. auch bei Funktionsparametern zunutze machen. Möchte man prüfen, ob ein Wert für einen bestimmten Parameter übergeben wurde, lässt sich das folgendermaßen bewerkstelligen:

``` js
function logSomeText(text)
{
  if (text) { console.log(text); }
  else { console.log('kein Text eingegeben'); }
}

// Ein paar ergänzende Beispiele:
var tree;
console.log(tree); // > undefined
console.log(typeof tree); // > "undefined"
console.log(tree === undefined); // > true
console.log(typeof(tree === undefined)); // > "boolean"
```

Beim zweiten `if`-Statement (`if (flower)`) dagegen wird ein `ReferenceError` geworfen. (Ein `Error` entspricht einer `Exception` in anderen Sprachen.) Prinzipiell vermeidet man diesen Fehler, indem man keine Variablen verwendet, bevor man sie mit `var` oder als Funktionsparameter deklariert.

## Simple Datentypen

Bei den simplen Datentypen gibt es kaum Überraschungen. Wichtig zu wissen ist allerdings, dass alle simplen Typen als Wert gespeichert werden. Die Wertübergabe erfolgt also “by value”.

``` js
var myNumber, myString, myBool;

myNumber = 42;
myNumber = 13.37;
myString = 'Hallo Welt';
myBool = true;

console.log(typeof myNumber, typeof myString, typeof myBool); // > "number string boolean"
```

JavaScript wechselt zwischen Ganz- und Kommazahlen automatisch, sofern notwendig. Beides wird einfach im Typ `number` zusammengefasst.

Strings können in doppelte sowie einfache Anführungszeichen geschrieben werden. Im Gegensatz zu PHP gibt es technisch keinen Unterschied. Ich persönlich bevorzuge die Schreibweise mit den einfachen Anführungszeichen, da in Strings gerne mal HTML auftauchen kann und so Attribute wie gewohnt mit doppelten Anführungszeichen geschrieben werden können, ohne diese (mit dem Backslash `\`) entwerten zu müssen. Bei Texten, in denen viele Apostrophe vorkommen, bietet sich die Verwendung von doppelten Anführungszeichen an. Mehrere Strings werden wie aus vielen anderen Sprachen bekannt mit dem Plus-Zeichen aneinandergehängt.

``` js
var greeting = 'Hallo ' + 'Welt';
```

Der simple Typ `symbol` sowie die komplexen Typen `object` und `function` sprengen allerdings den Rahmen dieses Artikels und werden später gesondert behandelt. Der nächste Artikel wird direkt die beiden komplexen Datentypen behandeln, da sie prinzipiell den Kern von JavaScript darstellen.
