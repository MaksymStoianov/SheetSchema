[**BG**](README_bg.md) | [**DE**](README_de.md) | [**EN**](README.md) | RU | [**UK**](README_uk.md)

# SheetSchema

SheetSchema - это библиотека для работы с Google Таблицами в Google Apps Script. Этот проект предоставляет удобный способ структурирования данных в таблицах.

## Установка

1. Откройте свой проект в [Google Apps Script Dashboard](https://script.google.com/).
2. Скопируйте содержимое файла `index.js` и вставьте его в новый файл в вашем проекте Google Apps Script.

## Использование

### Как устанавлить схему в указанный лист электронной таблицы?

 ```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const fields = [ 'time', null, { name: 'id' } ];
let schema = SheetSchema.newSchema(fields);
schema = SheetSchema.insertSchema(sheet, schema);
```

### Как получить схему указанного листа электронной таблицы?

 ```javascript
const sheet = SpreadsheetApp.getActiveSheet();
let schema = SheetSchema.getSchemaBySheet(sheet);
```

### Как удалить схему из указанного листа электронной таблицы?

 ```javascript
const sheet = SpreadsheetApp.getActiveSheet();
let schema = SheetSchema.removeSchema(sheet);
```

## История изменений
- **3.0.0**: Полностью обновлена структура кода. Исправлены ошибки. Улучшена документация JSDoc.
- **2.0.0**: Переосмыслена структура кода.
- **1.0.0**: Релиз.
