---
title: Objekte in JavaScript
tags: JavaScript
date: 2015-09-13
description: Dieser Beitrag erklärt, wie man in JavaScript mit Objekten arbeiten kann. Im Vordergrund stehen der Zugriff auf Properties und der allgemeine Umgang mit Prototypen.
---

Objekte sind ein Hauptbestandteil von JavaScript. Diese erlauben es, Strukturen aufzubauen oder Daten und Funktionalitäten zusammenzufassen. Dieser Artikel erklärt, wie sie funktionieren und wie man mit ihnen umgeht.

::: info Vorwort
Sehr bald nachdem ich den letzten Artikel veröffentlicht hatte, hat sich mein Bild über Objekte etwas verändert. Ich hab Artikel über JavaScript-Objekte und -Klassen gelesen, begonnen das Buch [Programming JavaScript Applications](http://chimera.labs.oreilly.com/books/1234000000262) (von Eric Elliot) zu lesen und Aufzeichnungen von Vorträgen zu diesem Thema anzusehen. Dadurch bin ich jetzt in der Lage, einen tieferen Blick in Objekte zu gewähren als noch vor ein paar Wochen.
:::

## Objekte erstellen

Objekte kann man sich als Gruppierung mehrerer Variablen vorstellen. Gehen wir von folgendem Beispiel aus.

``` js
var name = 'Andreas';
var mail = 'andreas@linnertmedia.de';
var admin = true;

console.log(name, mail, admin);
// > Andreas andreas@linnertmedia.de true
```

All diese Daten gehören zu einem Benutzer. Diesen Benutzer möchten wir auch gerne als solchen behandeln und nicht einzeln von seinen ganzen Eigenschaften sprechen. Hier kommen Objekte ins Spiel.

``` js
var user = new Object();
user.name = 'Andreas';
user.mail = 'andreas@linnertmedia.de';
user.admin = true;

console.log(user);
// > Object {name: "Andreas", mail: "andreas@linnertmedia.de", admin: true}
```

Somit kann man alle Daten des Nutzers über das Objekt `user` ansprechen. Man nennt die Werte ab hier allerdings nicht mehr Variablen sondern Eigenschaften oder Properties. Üblicher und kürzer ist allerdings folgende Schreibweise.

``` js
var user = {
    name: 'Andreas',
    mail: 'andreas@linnertmedia.de',
    admin: true
};
```

Es gibt hier einige wichtige Punkte, die man sich im Hinterkopf behalten sollte. Durch die Klammerschreibweise wird ein neues Objekt erstellt. Weist man dieses Objekt einer Variable (oder auch einer Objekteigenschaft) zu, geht der vorherige Wert verloren. Näheres hierzu erläutere ich in einem eigenen Artikel.

## Die Namen der Eigenschaften

Die Namen der Eigenschaften selbst — in unserem Beispiel `name`, `mail` und `admin` — können jeden simplen Datentyp annehmen (`string`, `number`, `boolean` und `symbol`). Um das zu demonstrieren, muss eine weitere Möglichkeit verwendet werden, um auf Eigenschaften zuzugreifen.

``` js
var thing = {};

thing['hallo welt'] = 'Hallo JavaScript!';
console.log(thing['hallo welt']);
// > "Hallo JavaScript!"

thing[42] = 'The Answer';
thing[true] = 'yes';

thing[user.name] = 123;
console.log(thing.Andreas);
// > 123

function getString() { return 'Blume'; }
thing[getString()] = 'Tulpe';
console.log(thing.Blume);
// > "Tulpe"
```

Die Schreibweise mit eckigen Klammern erlaubt mehr Flexibilität bei der Benennung von Eigenschaften. So kann man beispielsweise auch Leerzeichen oder sogar Zeilenumbrüche verwenden. Ein Nebeneffekt bei der Verwendung von `boolean` und `number` ist, dass deren Werte automatisch auch in String-Form verwendbar sind. Es verhält sich in etwa so, als würde automatisch die `toString`-Methode aufgerufen werden, wenn man einen Boolean- oder Zahlenwert als Propertynamen verwendet. Für Symbole gilt dies allerdings nicht. Da sich Symbole hier sowieso etwas eigen verhalten und die Unterstützung noch nicht so verbreitet ist, gehe ich an dieser Stelle nicht weiter darauf ein.

``` js
thing[42] = 'The Answer';
console.log(thing['42']);
// > "The Answer"
```

Ein Einsatzzweck für diese Art der Flexibilität lässt sich sicher schwer finden, jedoch demonstriert dies, was in JavaScript möglich wäre und dass JavaScript-Objekte im Grunde nichts mit Java-Objekten zu tun haben. Unter diesem Gesichtspunkt halte ich den Satz “Alles in JavaScript ist ein Objekt” für Umsteiger äußerst irreführend. Denn er erklärt nicht, wie der Begriff “Objekt” zu verstehen ist.

Natürlich gilt außerdem weiterhin:

``` js
console.log(typeof user);
// > "object"
console.log(typeof user.name);
// > "string"
console.log(typeof typeof user);
// > "string"
```

## Prototypen

Durch ECMAScript 2015 werden Klassen in JavaScript eingeführt. Es gibt Leute, welche der Meinung sind, Klassen sind eines der schlechtesten Features, die auf JavaScript zukommen werden. Ein Grund ist, dass es keine echten Klassen sind und sich die Funktionsweise leicht von wirklich klassenbasierten Sprachen unterscheiden. Der größte Grund ist allerdings, dass JavaScript bereits eine Mechanik bietet, die flexibler ist als Klassen: Prototypen.

::: info Am Rande
Ich hab selbst etwas Zeit gebraucht, die Argumente dieser Leute zu verstehen. Der Grund liegt in der leider etwas flachen Argumentation und den fehlenden Beispielen. Nachdem ich mich auf Prototypen eingelassen hatte, wurde mir jedoch vieles klar. Ich möchte an dieser Stelle jedoch nur auf die Funktionsweise der Prototypen eingehen. Für die Vorteile von Prototypen gegenüber Klassen empfehle ich andere Quellen. Videos, Vorträge, Bücher…
:::

Besitzt ein Objekt einen Prototypen, hat man Zugriff auf alle Eigenschaften des Prototyps, ohne Gefahr zu laufen, diese versehentlich zu manipulieren. Da dieser Prototyp ebenfalls ein Objekt ist, kann dieser wiederum einen Prototypen besitzen. Man spricht hier von der Prototypenkette. Greift man auf eine Eigenschaft eines Objekts zu, wird bei diesem Objekt geprüft, ob es eine Eigenschaft mit diesem Namen besitzt. Ist das nicht der Fall, wird dessen Prototyp überprüft usw. Wird eine Eigenschaft in keinem Objekt der Prototypenkette gefunden, ist der Wert `undefined`.

Ich stelle mir Objekte im Zusammenhang mit Prototypen wie einen Stapel Blätter vor. Von oben betrachtet sitzt jede Eigenschaft am gleichen Platz auf dem Papier. Fehlt eine Eigenschaft in einem Objekt, befindet sich an der entsprechenden Stelle ein Loch, durch das man das darunterliegende Papier und dessen Wert für diese Eigenschaft sieht, sofern dort ein Wert festgelegt ist.

::: info ECMAScript 5 und der Internet Explorer
Einige der hier verwendeten Methoden sind Teil von *ECMAScript 5*. Diese erfordern *Internet Explorer 9* oder höher. Für ältere Internet Explorer-Versionen gibt es andere Möglichkeiten, mit Prototypen zu arbeiten.
:::

Man kann Prototypen folgendermaßen definieren. Ich werde hierzu bereits Funktionen in den Beispielen verwenden. Hierzu folgt aber noch ein separater Artikel.

``` js
var user, andreas, minka;

user = {
    sayYourName: function () {
        console.log('My name is ' + this.name);
    }
};

andreas = Object.create(user);
andreas.name = 'Andy';

minka = {
    name: 'Minka',
    sayYourName: function () {
        console.log(this.name + ' Miau!');
    }
};
Object.setPrototypeOf(minka, user);

andreas.sayYourName();
// > "My name is Andy"
minka.sayYourName();
// > "Minka Miau!"
```

Bei der Erstellung von Objekten trenne ich sehr gerne die Deklaration und Initialisierung der Variablen, da das sonst sehr schnell unübersichtlich wird, und die Kommata am Ende von Objekten auf mich etwas seltsam wirken.

Wir erstellen ein Objekt `user`, das die Basis von Nutzerobjekten sein wird. Mit `Object.create(prototype)` erstellen wir ein neues Objekt, legen aber gleichzeitig auch dessen Prototyp fest. Da das Objekt `andreas` nun `user` als Prototypen besitzt, erbt es auch dessen Funktion `sayYourName`. `andreas.sayYourName` zeigt somit auf die Funktion, die in `user` definiert wurde. Es handelt sich auch exakt um diese Funktion. Es wurde keine Kopie erstellt.

Das Schlüsselwort `this` zeigt dabei immer auf das Objekt, in dessen Kontext die Funktion aufgerufen wurde. Da wir nicht `user.sayYourName()` aufgerufen haben, sondern `andreas.sayYourName()`, sucht `this` innerhalb von `andreas` nach einer Eigenschaft mit dem Namen `name`.

`Object.setPrototypeOf(object, prototype)` erlaubt das nachträgliche Setzen oder Ändern des Prototyps eines Objekts.

Mit der Methode `hasOwnProperty` lässt sich prüfen, ob ein Objekt selbst eine bestimmte Eigenschaft besitzt, oder ob es sie nur durch Vererbung hat.

``` js
console.log(andreas.hasOwnProperty('name'));
// > true
console.log(andreas.hasOwnProperty('sayYourName'));
// > false
```

Woher kommt die Funktion `hasOwnProperty`? Jedes neu erstellte Objekt hat automatisch einen Prototypen, nämlich `Object.prototype`.

``` js
console.log(Object.getPrototypeOf(user) === Object.prototype);
// > true

console.log(Object.getPrototypeOf(user).hasOwnProperty === Object.prototype.hasOwnProperty);
// > true
```

Da der Artikel bereits sehr lang und vollgestopft mit Informationen ist, mache ich an dieser Stelle einen Schnitt.
