# Chipi Desktop Client

This is a UI/UX prototype using [Electron Quick Start template](https://electronjs.org/docs/tutorial/quick-start).

Requires Node >= 8. Tested only in MacOSX.

## Usage

* Run as an Electron app: `npm start`
* Run in the browser (Chrome or Firefox): `npm run browser`
* Live demo: https://oscarotero.github.io/chipi-client/

## Structure

```html
<main>
    <app-front>
        <app-header>
            <chipi-logo />
            <chipi-search />
            <chipi-session />
        </app-header>

        <app-container>
            <app-results />
        </app-container>
    </app-front>

    <app-back />
    <app-help />
</main>
```