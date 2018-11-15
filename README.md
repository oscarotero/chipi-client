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
    <chipi-front>
        <header is="chipi-header">
            <chipi-logo />
            <chipi-search />
            <chipi-session />
        </header>

        <chipi-container>
            <chipi-results />
        </chipi-container>
    </chipi-front>

    <chipi-back />
    <chipi-help />
</main>
```