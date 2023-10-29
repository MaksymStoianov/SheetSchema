[**BG**](README_bg.md) | [**DE**](README_de.md) | [**EN**](README.md) | [**RU**](README_ru.md) | **UK**

# SheetSchema

SheetSchema - це бібліотека для роботи з Google Таблицями в Google Apps Script. Цей проект надає зручний спосіб структурування даних у таблицях.

## Встановлення

1. Відкрийте свій проект в [Google Apps Script Dashboard](https://script.google.com/).
2. Скопируйте содержимое файла `index.js` и вставьте его в новый файл в вашем проекте `Google Apps Script`.

## Використання

### Як встановити схему в зазначений аркуш електронної таблиці?

 ```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const fields = [ 'time', null, { name: 'id' } ];
let schema = SheetSchema.newSchema(fields);
schema = SheetSchema.insertSchema(sheet, schema);
```

### Як отримати схему зазначеного аркуша електронної таблиці?

 ```javascript
const sheet = SpreadsheetApp.getActiveSheet();
let schema = SheetSchema.getSchemaBySheet(sheet);
```

### Як видалити схему з зазначеного аркуша електронної таблиці?

 ```javascript
const sheet = SpreadsheetApp.getActiveSheet();
let schema = SheetSchema.removeSchema(sheet);
```

## Історія змін
- **3.0.0**: Повністю оновлена структура коду. Виправлені помилки. Покращена документація JSDoc.
- **2.0.0**: Переосмислена структура коду.
- **1.0.0**: Реліз.
