---
title: "Wie funktioniert this in JavaScript?"
date: 2019-02-17
draft: true
tags: JavaScript
---

Das Keyword `this` in JavaScript ist eines der am meisten missverstandenen Sprachfeatures. Die Verwirrung rührt in der Regel daher, dass es in anderen Sprachen ebenfalls ein `this`-Keyword gibt, mit einer scheinbar ähnlichen Funktionsweise. Oft wird davon abgeraten, `this` überhaupt zu verwenden. Ich möchte in diesem Artikel die Angst vor dem Schlüsselwort nehmen und erklären, wie es genau funktioniert.

Andere klassenbasierte Sprachen ‒ z. B. Java ‒ verwenden `this`, um auf die aktuelle Instanz einer Klasse zu verweisen. Schaut man jetzt zu JavaScript, stellt man fest, dass es hier keine Klassen gibt. Dadurch ist es für JavaScript gar nicht möglich, `this` genauso zu implementieren wie Java es tut. Es wurde mit ECMAScript 2015 zwar das Keyword `class` eingeführt, aber eine Garantie, dass `this` **immer** auf die Instanz dieser Klasse zeigt, ist auch hier nicht gegeben. Dadurch wird verhindert, dass neue Sonderregelungen und Abweichungen von der bisherigen Funktionsweise in die Sprache Einzug erhalten.

Doch wie funktioniert `this` nun genau? Man stellt sich `this` am besten als eine Art *nullten* (noch vor dem zuerst platzierten), impliziten Funktionsparameter vor. Dieser wird ebenfalls implizit an eine Funktion übergeben, man kann ihn aber auch explizit angeben.

## Implizite Belegung von `this`

Wann wird `this` implizit an eine Funktion übergeben? Bei jedem einzelnen Funktionsaufruf. Was ist der Wert von `this`? Das Objekt, über das die Funktion aufgerufen wird. Ob `this` mit einem Wert belegt wird und mit welchem Wert es belegt wird, hängt also vollständig davon ab, wie der Funktionsaufruf exakt aussieht. Wird eine Funktion als reine Funktion aufgerufen, hängt der Wert von `this` davon ab, ob das Skript im "strict" mode läuft, oder nicht. Hier ein paar Beispiele:

~~~ js
foo()
// innerhalb von foo:
// ("strict" mode ist aus) this === window
// ("strict" mode ist an) this === undefined

foo.bar() // innerhalb von bar → this === foo
foo.bar.baz() // innerhalb von baz → this === foo.bar
~~~

Dieses Verhalten ändert sich nicht, wenn man Funktionen nimmt und sie anderen Variablen oder Eigenschaften zuweist.

~~~ js
function outerFunction () {
  console.log(this)
}

const obj1 = {
  innerFunction () {
    console.log(this)
  }
}

const obj2 = {}

outerFunction() // -> window|undefined
obj1.innerFunction() // -> obj1

obj1.outerFunction = outerFunction
obj1.outerFunction() // -> obj1

const innerFunction = obj1.innerFunction
innerFunction() // -> window|undefined

obj2.innerFunction = obj1.innerFunction
obj2.innerFunction() // -> obj2
~~~

## Explizite Belegung von `this`

Man kann auch explizit einen Wert für `this` angeben. Man spricht hier von *binding*. Dazu benötigen wir eine von 3 Methoden, die jedes Funktionsobjekt besitzt. Wir erinnern uns: Auch Funktionen sind Objekte. Die einfachste Möglichkeit ist die `.call`-Methode. Diese verwendet man so:

~~~ js
const user = {
  name: 'Max',
  greetUser (greeting, suffix) {
    console.log(greeting + ', ' + this.name + suffix)
  }
}

const user2 = { name: 'Egon' }

user.greetUser('Hallo', '.') // -> 'Hallo, Max.'
user.greetUser.call(user2, 'Moin', '!') // -> 'Moin, Egon!'
~~~

Bei dieser Methodik sieht man auch wunderbar die Parameter-Natur von `this`. Der Wert von `this` wird als erstes an die `.call`-Methode übergeben, die sonst für eine Funktion üblichen Parameter rücken eine Stelle weiter nach hinten.

Des weiteren gibt es noch die `.apply`-Methode. Diese Funktioniert im Prinzip genauso, mit der Ausnahme, dass die Parameter für die aufgerufene Funktion nicht einzeln, sondern als Array übergeben werden. Dies ist auch eine beliebte Methode, um Funktionen zu erstellen, die beliebig viele Parameter annehmen. Hier ein Beispiel:

~~~ js
user.gridUser.apply(user2, ['Moin', '!'])
~~~

Zuletzt gibt es noch die dritte Methode `.bind`. Diese ruft, anders als `.call` und `.apply` die Funktion nicht direkt auf, sondern liefert lediglich eine veränderte Variante der Funktion zurück, in der der Wert von `this` bereits festgesetzt ist. Dies ist hilfreich, wenn man eine Referenz auf eine Funktion an eine andere Funktion übergeben möchte, man aber den Wert von `this` innerhalb der übergebenen Funktion festlegen möchte. Hier ein simples Basisbeispiel:

~~~ js
function logValue () {
  console.log(this.value)
}

const obj = { value: 42 }

const logValueOfObj = logValue.bind(obj)
logValueOfObj() // -> 42
~~~

Ist eine Funktion einmal an einen Wert für `this` gebunden, kann dieser durch nichts mehr geändert werden.

Ein gutes Praxisbeispiel hierfür ist das Setzen eines EventListeners:

~~~ js
const obj = {
  main () {
    document.body.addEventListener('click', onBodyClick.bind(this)) /* 2 */

    function onBodyClick () {
      console.log(this) /* 3 */
    }
  }
}

obj.main() /* 1 */
~~~

*Erklärung:* Alles beginnt mit dem Funktionsaufruf `obj.main()` bei `/* 1 */`. Dadurch wird der Wert von `this` innerhalb der `main`-Funktion auf `obj` festgelegt. Beim Setzen des EventListeners bei `/* 2 */` wird der Wert von `this` innerhalb der `onBodyClick`-Funktion auf das aktuelle `this` gesetzt, also `obj`. Damit (und nur damit) hat auch `onBodyClick` bei `/* 3 */` Zugriff auf `obj` über `this`.

Warum ist das notwendig? Das liegt an der Natur von Callbacks und sieht man schön an einem erweiterten Beispiel:

~~~ js
function getSomeData (handler) {
  const data = doMagicStuff()
  handler(data) /* 2 */
}

const obj = {
  main () {
    getSomeData(this.gotSomeData) /* 1 */
  },

  gotSomeData (data) {
    this.data = data /* 3 */
  }
}

obj.main()
~~~

*Erklärung:* Auch wenn die Funktionsreferenz zu `gotSomeData` bei `/* 1 */` noch eine Verbindung zu `this` hat, wird sie in `getSomeData` als Funktionsparameter `handler` angenommen. Diese verhalten sich ähnlich wie Variablen oder reine Funktionen. Der Aufruf von `gotSomeData` bzw. `handler` bei `/* 2 */` geschieht somit nicht mehr als Methode von `this`, sondern als normale Funktion. Dadurch besitzt `this` nach diesem Aufruf bei `/* 3 */` (im "strict" mode) keinen Wert. Das bedeutet widerum, dass obiger Code bei `/* 3 */` einen Fehler werfen wird, da, durch die Art und Weise, wie `gotSomeData` aufgerufen wird, `this` in dieser Funktion keinen Wert besitzt.

Verwendet man hier jetzt nicht den "strict" mode von JavaScript, würde man eine Property `data` im globalen `window`-Objekt erzeugen und mit dem Wert von `data` belegen. Das würde zu keinem direkten Fehler, aber potentiell zu einen schwer auffindbaren Bug führen. *Also merke:* **Immer** den "strict" mode verwenden!

Übergibt man bei `/* 1 */` die Callback-Funktion nun nicht als `this.gotSomeData`, sondern als `this.gotSomeData.bind(this)`, wird diese Funktion garantiert so aufgerufen, dass `this` mit dem erwarteten Wert von `obj` belegt ist.

*Übrigens*: `this.gotSomeData.bind(obj)` würde auch funktionieren. Es würde nur dann einen Unterschied machen, wenn `obj.main` mit einem alternativen Wert für `this` aufgerufen wird. Wann was sinnvoll ist, ist zu 100% situationsabhängig.

## `this` und Arrow Functions

Die mit ECMAScript 2015 eingeführten *Arrow Functions* verhalten sich ein klein wenig anders. Diese neuen Gefährten übernehmen automatisch den Wert `this`, der auch um sie herum bereits gilt. Das Beispiel von weiter oben funktioniert also problemlos, wenn man von Arrow Functions folgendermaßen Gebrauch macht:

~~~ js
function getSomeData (handler) {
  const data = doMagicStuff()
  handler(data) /* 2 */
}

const obj = {
  main () {
    getSomeData(() => { this.gotSomeData() }) /* 1 */
  },

  gotSomeData (data) {
    this.data = data /* 3 */
  }
}

obj.main()
~~~

*Erklärung:* Bei `/* 1 */` wird nicht direkt die Funktion `gotSomeData` übergeben, sondern eine Arrow Function. Der Wert von `this` innerhalb dieser Funktion wird von außen übernommen, zeigt also immer noch auf `obj`. Bei `/* 2 */` wird diese neue Arrow Funktion aufgerufen, statt wie bisher direkt `gotSomeData`. Diese widerum ruft `gotSomeData` als Methode von `this` (also `obj`) auf. Damit ist der Wert von `this` immerhalb von `gotSomeData` immer noch `obj`.

## Der Typ von `this`

Zu guter Letzt noch ein Hinweis: Der Typ von `this` ist **immer** `object` oder `function`. Wird versucht, eine Funktion an einen anderen Wert zu binden, wird dieser Wert in ein Objekt gecastet. Aus `1` wird also `new Number(1)`. Diese Objekt-Varianten von simplen Datentypen werden von JavaScript intern immer wieder verwendet, wenn dies notwendig ist. Als JS-Entwickler braucht man sich aber nicht weiter darum kümmern, da es keine nennenswerten Auswirkungen hat.