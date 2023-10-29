[**BG**](README_bg.md) | [**DE**](README_de.md) | **EN** | [**RU**](README_ru.md) | [**UK**](README_uk.md)

# SheetSchema

SheetSchema is a library for working with Google Sheets in Google Apps Script. This project provides a convenient way to structure data in sheets.

## Installation

1. Откройте свой проект в [Google Apps Script Dashboard](https://script.google.com/).
2. Copy the content of the `index.js` file and paste it into a new file in your `Google Apps Script` project.

## Usage

### How to set a schema to a specified sheet of the spreadsheet?

 ```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const fields = [ 'time', null, { name: 'id' } ];
let schema = SheetSchema.newSchema(fields);
schema = SheetSchema.insertSchema(sheet, schema);
```

### How to get the schema of a specified sheet of the spreadsheet?

 ```javascript
const sheet = SpreadsheetApp.getActiveSheet();
let schema = SheetSchema.getSchemaBySheet(sheet);
```

### How to remove the schema from a specified sheet of the spreadsheet?

 ```javascript
const sheet = SpreadsheetApp.getActiveSheet();
let schema = SheetSchema.removeSchema(sheet);
```

## Changelog
- **3.0.0**: Completely updated code structure. Fixed bugs. Improved JSDoc documentation.
- **2.0.0**: Rethought code structure.
- **1.0.0**: Release.
