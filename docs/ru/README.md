<div id="locales" align="right">
  <a href="../bg/README.md"><img src="https://img.shields.io/badge/BG-grey?style=flat" alt="Български"></a>
  <a href="../de/README.md"><img src="https://img.shields.io/badge/DE-grey?style=flat" alt="Deutsch"></a>
  <a href="../en/README.md"><img src="https://img.shields.io/badge/EN-grey?style=flat" alt="English"></a>
  <a href="../ru/README.md"><img src="https://img.shields.io/badge/RU-blue?style=flat" alt="Русский"></a>
  <a href="../uk/README.md"><img src="https://img.shields.io/badge/UK-grey?style=flat" alt="Українська"></a>
</div>


# SheetSchema

<div id="badges" align="left">
  <img src="https://img.shields.io/github/v/release/MaksymStoianov/SheetSchema" alt="Release">
  <a href="LICENSE.md"><img src="https://img.shields.io/github/license/MaksymStoianov/SheetSchema" alt="License"></a>
  <a href="https://github.com/google/clasp"><img src="https://img.shields.io/badge/built%20with-clasp-4285f4.svg" alt="clasp"></a>
</div>

**SheetSchema** - это библиотека сценариев Google Apps Script, которая обеспечивает простой способ работы со схемами листов в Google Sheets.

Она позволяет определять, вставлять, извлекать и управлять схемами в Google Sheets, что упрощает ведение структурированных данных.

__Внимание!__ Использование этого сервиса может увеличить время выполнения скрипта.


## Установка

1. Откройте свой проект в [Google Apps Script Dashboard](https://script.google.com/).
2. Скопируйте содержимое файла [sheet-schema.js](../../src/sheet-schema.js) и вставьте его в новый файл в вашем проекте Google Apps Script.


## Использование

Вот несколько примеров использования SheetSchema:

### Вставка схемы

```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const fields = [ 'time', null, { name: 'id' } ];
const schema = SheetSchema.insertSchema(sheet, fields);

console.log(schema);
```

### Получение схемы

```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const schema = SheetSchema.getSchemaBySheet(sheet);

console.log(schema);
```

### Получение поля по индексу столбца

```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const schema = SheetSchema.getSchemaBySheet(sheet);
const field = schema.getFieldByIndex(0);

console.log(field);
```

### Получение поля по его имени

```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const schema = SheetSchema.getSchemaBySheet(sheet);
const field = schema.getFieldByName('time');

console.log(field);
```

### Удаление схемы

```javascript
const sheet = SpreadsheetApp.getActiveSheet();
const result = SheetSchema.removeSchema(sheet);

console.log(result);
```


## Вклад

Пожалуйста, прочитайте [CONTRIBUTING.md](CONTRIBUTING.md) для получения подробной информации о том, как внести вклад в этот проект.


## История изменений

Для получения подробного списка изменений и обновлений, пожалуйста, обратитесь к файлу [CHANGELOG.md](CHANGELOG.md).


## Лицензия

Этот проект лицензируется в соответствии с файлом [LICENSE.md](LICENSE.md).