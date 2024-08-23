<div id="locales" align="right">
  <a href="../bg/README.md"><img src="https://img.shields.io/badge/BG-grey?style=flat" alt="Български"></a>
  <a href="../de/README.md"><img src="https://img.shields.io/badge/DE-grey?style=flat" alt="Deutsch"></a>
  <a href="../en/README.md"><img src="https://img.shields.io/badge/EN-grey?style=flat" alt="English"></a>
  <a href="../ru/README.md"><img src="https://img.shields.io/badge/RU-grey?style=flat" alt="Русский"></a>
  <a href="../uk/README.md"><img src="https://img.shields.io/badge/UK-blue?style=flat" alt="Українська"></a>
</div>


# SheetSchema

<div id="badges" align="left">
  <img src="https://img.shields.io/github/v/release/MaksymStoianov/SheetSchema" alt="Release">
  <a href="LICENSE.md"><img src="https://img.shields.io/github/license/MaksymStoianov/SheetSchema" alt="License"></a>
  <a href="https://github.com/google/clasp"><img src="https://img.shields.io/badge/built%20with-clasp-4285f4.svg" alt="clasp"></a>
</div>

**SheetSchema** - це бібліотека сценаріїв Google Apps Script, яка забезпечує простий спосіб роботи зі схемами аркушів у Google Sheets.

Вона дає змогу визначати, вставляти, витягувати та керувати схемами в Google Sheets, що спрощує ведення структурованих даних.

__Увага!__ Використання цього сервісу може збільшити час виконання скрипта.


## Встановлення

1. Відкрийте свій проект у [Google Apps Script Dashboard](https://script.google.com/).
2. Скопіюйте вміст файлу [sheet-schema.js](../../src/sheet-schema.js) і вставте його у новий файл у вашому проекті Google Apps Script.


## Використання

Ось кілька прикладів використання SheetSchema:

### Вставка схеми

```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const fields = [ 'time', null, { name: 'id' } ];
const schema = SheetSchema.insertSchema(sheet, fields);

console.log(schema);
```

### Отримання схеми

```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const schema = SheetSchema.getSchemaBySheet(sheet);

console.log(schema);
```

### Отримання поля за індексом стовпця

```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const schema = SheetSchema.getSchemaBySheet(sheet);
const field = schema.getFieldByIndex(0);

console.log(field);
```

### Отримання поля за його іменем

```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const schema = SheetSchema.getSchemaBySheet(sheet);
const field = schema.getFieldByName('time');

console.log(field);
```

### Видалення схеми

```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const result = SheetSchema.removeSchema(sheet);

console.log(result);
```


## Внесок

Будь ласка, прочитайте [CONTRIBUTING.md](CONTRIBUTING.md) для отримання докладної інформації про те, як зробити внесок у цей проект.


## Історія змін

Для отримання докладного списку змін і оновлень, будь ласка, зверніться до файлу [CHANGELOG.md](CHANGELOG.md).


## Ліцензія

Цей проект ліцензується відповідно до файлу [LICENSE.md](LICENSE.md).