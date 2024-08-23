<div id="locales" align="right">
  <a href="../bg/README.md"><img src="https://img.shields.io/badge/BG-blue?style=flat" alt="Български"></a>
  <a href="../de/README.md"><img src="https://img.shields.io/badge/DE-grey?style=flat" alt="Deutsch"></a>
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

**SheetSchema** е библиотека за скриптове на Google Apps, която осигурява лесен начин за работа със схеми на листове в Google Sheets.

Тя ви позволява да дефинирате, вмъквате, извличате и управлявате схеми в Google Sheets, което улеснява поддържането на структурирани данни.

__Внимание!__ Използването на този сервис може да увеличи времето за изпълнение на скрипта.


## Инсталация

1. Отворете своя проект в [Google Apps Script Dashboard](https://script.google.com/).
2. Копирайте съдържанието на файла [sheet-schema.js](../../src/sheet-schema.js) и го поставете в нов файл във вашия проект в Google Apps Script.


## Употреба

Ето няколко примера за използване на SheetSchema:

### Добавяне на схема

```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const fields = [„time“, null, { name: „id“ } ];
const schema = SheetSchema.insertSchema(sheet, fields);

console.log(schema);
```

### Извличане на схема

```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const schema = SheetSchema.getSchemaBySheet(sheet);

console.log(schema);
```

### Извличане на поле по индекс на колона

```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const schema = SheetSchema.getSchemaBySheet(sheet);
const field = schema.getFieldByIndex(0);

console.log(field);
```

### Получаване на поле по име

```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const schema = SheetSchema.getSchemaBySheet(sheet);
const field = schema.getFieldByName('time');

console.log(field);
```

### Изтриване на схема

```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const result = SheetSchema.removeSchema(sheet);

console.log(result);
```


## Принос

Моля, прочетете [CONTRIBUTING.md](CONTRIBUTING.md) за подробности относно това как да допринесете за този проект.


## История на промените

Моля, направете справка с [CHANGELOG.md](CHANGELOG.md) за подробен списък на промените и актуализациите.


## Лиценз

Този проект е лицензиран съгласно файла [LICENSE.md](LICENSE.md).