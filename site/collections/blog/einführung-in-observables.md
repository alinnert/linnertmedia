---
title: Einführung in Observables
tags: JavaScript, RxJS
date: 2018-06-05
---

RxJS ist voll toll und #ObservablesAreEverywhere.

::: info
Ich bin eine Infobox.
:::

::: anmerkung
Und ich bin eine Anmerkung
:::

::: file test.js
```javascript
function foo() {
  return 42 + String(true)
}

function main() {
  const directoryStream = Observable.from(readDirectory())

  directoryStream
    .flatMap(readFile)
    .map(parseMdFile)
    .subscribe(result => {
      writeFile(result)
    })
}
```
:::

Hier wird später noch viel mehr Text stehen und deswegen schreibe ich jetzt erstmal Dummy-Text hier rein, damit man auf der Vorschau etwas weiter scrollen kann, weil das praktisch ist und so.