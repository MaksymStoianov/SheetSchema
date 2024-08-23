<div id="locales" align="right">
  <a href="../bg/README.md"><img src="https://img.shields.io/badge/BG-grey?style=flat" alt="Български"></a>
  <a href="../de/README.md"><img src="https://img.shields.io/badge/DE-blue?style=flat" alt="Deutsch"></a>
  <a href="../en/README.md"><img src="https://img.shields.io/badge/EN-grey?style=flat" alt="English"></a>
  <a href="../ru/README.md"><img src="https://img.shields.io/badge/RU-grey?style=flat" alt="Русский"></a>
  <a href="../uk/README.md"><img src="https://img.shields.io/badge/UK-grey?style=flat" alt="Українська"></a>
</div>


# SheetSchema

<div id="badges" align="left">
  <img src="https://img.shields.io/github/v/release/MaksymStoianov/SheetSchema" alt="Release">
  <a href="LICENSE.md"><img src="https://img.shields.io/github/license/MaksymStoianov/SheetSchema" alt="License"></a>
  <a href="https://github.com/google/clasp"><img src="https://img.shields.io/badge/built%20with-clasp-4285f4.svg" alt="clasp"></a>
</div>

**SheetSchema** ist eine Google Apps Script-Bibliothek, die eine einfache Möglichkeit bietet, mit Sheet-Schemata in Google Sheets zu arbeiten.

Sie ermöglicht das Definieren, Einfügen, Extrahieren und Verwalten von Schemata in Google Sheets und erleichtert so die Pflege strukturierter Daten.

__Achtung!__ Die Verwendung dieses Dienstes kann die Ausführungszeit des Skripts verlängern.


## Installation

1. Öffnen Sie Ihr Projekt im [Google Apps Script Dashboard](https://script.google.com/).
2. Kopieren Sie den Inhalt der Datei [sheet-schema.js](../../src/sheet-schema.js) und fügen Sie ihn in eine neue Datei in Ihrem Google Apps Script-Projekt ein.


## Verwendung

Hier sind einige Beispiele für die Verwendung von SheetSchema:

### Schema einfügen

```javascript
const Blatt = SpreadsheetApp.getActiveSheet();
const fields = [ 'time', null, { name: 'id' } ];
const schema = SheetSchema.insertSchema(sheet, fields);

console.log(schema);
```

### Schema abrufen

```javascript
const Blatt = SpreadsheetApp.getActiveSheet();
const schema = SheetSchema.getSchemaBySheet(sheet);

console.log(schema);
```

### Abrufen von Feld nach Spaltenindex

```javascript
const Blatt = SpreadsheetApp.getActiveSheet();
const schema = SheetSchema.getSchemaBySheet(sheet);
const field = schema.getFieldByIndex(0);

console.log(field);
```

### Feld nach Name abrufen

```javascript
const Blatt = SpreadsheetApp.getActiveSheet();
const schema = SheetSchema.getSchemaBySheet(Blatt);
const field = schema.getFieldByName('time');

console.log(field);
```

### Löschen des Schemas

```javascript
const Blatt = SpreadsheetApp.getActiveSheet();
const result = SheetSchema.removeSchema(sheet);

console.log(result);
```


## Beitrag

Bitte lesen Sie [CONTRIBUTING.md](CONTRIBUTING.md) für Details, wie Sie zu diesem Projekt beitragen können.


## Änderungshistorie

Bitte lesen Sie [CHANGELOG.md](CHANGELOG.md) für eine detaillierte Liste der Änderungen und Aktualisierungen.


## Lizenz

Dieses Projekt ist lizenziert unter der Datei [LICENSE.md](LICENSE.md).