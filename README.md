# Linnert Media

Linnert Media ist ein Blog zum Thema Web-Entwicklung, primär JavaScript.

URL: <https://linnertmedia.de>

## Idee für einen Beitrag?

Sollte Interesse für einen Beitrag zu einem bestimmten Thema bestehen, bitte gerne ein [GitHub-Issue öffnen](https://github.com/alinnert/linnertmedia/issues) oder vorhandene Issues mit Daumen nach oben bewerten.

## Technische Details

Dies ist eine automatisiert generierte, statische Website. Primär wird [RxJS](https://github.com/ReactiveX/rxjs) verwendet, um die ganzen asynchronen APIs in den Griff zu kriegen. Das Build-Skript ist eigener Quellcode und es wird kein *Static Site Generator* verwendet.

### Verwendete Technologien

- [TypeScript](http://www.typescriptlang.org/), [ts-node](https://github.com/TypeStrong/ts-node) und [RxJS](https://github.com/ReactiveX/rxjs) für den Build-Prozess
- [Sass](http://sass-lang.com/) als CSS-Preprozessor
- [PostCSS](https://postcss.org/) mit [Auto-Prefixer](https://github.com/postcss/autoprefixer) für automatisch eingefügte Prefix-CSS-Regeln (z. B. `display: -webkit-flex;`)