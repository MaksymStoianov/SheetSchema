**BG** | [**DE**](README_de.md) | [**EN**](README.md) | [**RU**](README_ru.md) | [**UK**](README_uk.md)

# SheetSchema

SheetSchema е библиотека за работа с Google Sheets в Google Apps Script. Този проект предлага удобен начин за структуриране на данните в таблиците.

## Инсталиране

1. Отворете вашия проект в [Google Apps Script Dashboard](https://script.google.com/).
2. Копирайте съдържанието на файла `index.js` и го поставете в нов файл във вашия проект на `Google Apps Script`.

## Използване

### Как да зададете схема на определен лист от електронната таблица?

 ```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const fields = [ 'time', null, { name: 'id' } ];
let schema = SheetSchema.newSchema(fields);
schema = SheetSchema.insertSchema(sheet, schema);
```

### Как да получите схемата на определен лист от електронната таблица?

 ```javascript
const sheet = SpreadsheetApp.getActiveSheet();
let schema = SheetSchema.getSchemaBySheet(sheet);
```

### Как да премахнете схемата от определен лист от електронната таблица?

 ```javascript
const sheet = SpreadsheetApp.getActiveSheet();
let schema = SheetSchema.removeSchema(sheet);
```

## История на промените
- **3.0.0**: Напълно обновена структура на кода. Коригирани грешки. Подобрена документация на JSDoc.
- **2.0.0**: Преосмислена структура на кода.
- **1.0.0**: Релийз.
