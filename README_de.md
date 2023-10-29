[**BG**](README_bg.md) | **DE** | [**EN**](README.md) | [**RU**](README_ru.md) | [**UK**](README_uk.md)

# SheetSchema

SheetSchema ist eine Bibliothek zur Arbeit mit Google Tabellen in Google Apps Script. Dieses Projekt bietet eine bequeme Möglichkeit, Daten in Tabellen zu strukturieren.

## Installation

1. Öffnen Sie Ihr Projekt im [Google Apps Script Dashboard](https://script.google.com/).
2. Kopieren Sie den Inhalt der Datei `index.js` und fügen Sie ihn in eine neue Datei in Ihrem Google Apps Script-Projekt ein.

## Verwendung

### Wie setzt man ein Schema in das angegebene Blatt der Tabelle?

 ```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const fields = [ 'time', null, { name: 'id' } ];
let schema = SheetSchema.newSchema(fields);
schema = SheetSchema.insertSchema(sheet, schema);
```

### Wie bekommt man das Schema des angegebenen Blattes der Tabelle?

 ```javascript
const sheet = SpreadsheetApp.getActiveSheet();
let schema = SheetSchema.getSchemaBySheet(sheet);
```

### Wie entfernt man das Schema aus dem angegebenen Blatt der Tabelle?

 ```javascript
const sheet = SpreadsheetApp.getActiveSheet();
let schema = SheetSchema.removeSchema(sheet);
```

## Änderungsprotokoll
- **3.0.0**: Vollständig aktualisierte Code-Struktur. Fehler behoben. Verbesserte JSDoc-Dokumentation.
- **2.0.0**: Überdachte Code-Struktur.
- **1.0.0**: Veröffentlichung.
