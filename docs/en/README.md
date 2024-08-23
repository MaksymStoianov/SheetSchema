<div id="locales" align="right">
  <a href="../bg/README.md"><img src="https://img.shields.io/badge/BG-grey?style=flat" alt="Български"></a>
  <a href="../de/README.md"><img src="https://img.shields.io/badge/DE-grey?style=flat" alt="Deutsch"></a>
  <a href="../en/README.md"><img src="https://img.shields.io/badge/EN-blue?style=flat" alt="English"></a>
  <a href="../ru/README.md"><img src="https://img.shields.io/badge/RU-grey?style=flat" alt="Русский"></a>
  <a href="../uk/README.md"><img src="https://img.shields.io/badge/UK-grey?style=flat" alt="Українська"></a>
</div>


# SheetSchema

<div id="badges" align="left">
  <img src="https://img.shields.io/github/v/release/MaksymStoianov/SheetSchema" alt="Release">
  <a href="LICENSE.md"><img src="https://img.shields.io/github/license/MaksymStoianov/SheetSchema" alt="License"></a>
  <a href="https://github.com/google/clasp"><img src="https://img.shields.io/badge/built%20with-clasp-4285f4.svg" alt="clasp"></a>
</div>

**SheetSchema** is a Google Apps Script library that provides an easy way to work with sheet schemas in Google Sheets.

It allows you to define, insert, extract and manage schemas in Google Sheets, making it easy to maintain structured data.

__Note!__ Using this service may increase script execution time.


## Installation

1. Open your project in the [Google Apps Script Dashboard](https://script.google.com/).
2. Copy the contents of the [sheet-schema.js](../../src/sheet-schema.js) file and paste it into a new file in your Google Apps Script project.


## Usage

Here are some examples of how to use SheetSchema:

### Insert Schema

```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const fields = [ 'time', null, { name: 'id' } ];
const schema = SheetSchema.insertSchema(sheet, fields);

console.log(schema);
```

### Retrieve schema

```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const schema = SheetSchema.getSchemaBySheet(sheet);

console.log(schema);
```

### Retrieve field by column index

```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const schema = SheetSchema.getSchemaBySheet(sheet);
const field = schema.getFieldByIndex(0);

console.log(field);
```

### Get field by name

```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const schema = SheetSchema.getSchemaBySheet(sheet);
const field = schema.getFieldByName('time');

console.log(field);
```

### Deleting schema

```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const result = SheetSchema.removeSchema(sheet);

console.log(result);
```


## Contribution

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.


## Change History

Please refer to [CHANGELOG.md](CHANGELOG.md) for a detailed list of changes and updates.


## License

This project is licensed under the [LICENSE.md](LICENSE.md) file.