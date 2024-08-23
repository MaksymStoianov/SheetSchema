<div id="locales" align="right">
  <a href="../bg/README.md"><img src="https://img.shields.io/badge/BG-blue?style=flat" alt="Български"></a>
  <a href="../de/README.md"><img src="https://img.shields.io/badge/DE-grey?style=flat" alt="Deutsch"></a>
  <a href="../en/README.md"><img src="https://img.shields.io/badge/EN-grey?style=flat" alt="English"></a>
  <a href="../ru/README.md"><img src="https://img.shields.io/badge/RU-grey?style=flat" alt="Русский"></a>
  <a href="../uk/README.md"><img src="https://img.shields.io/badge/UK-grey?style=flat" alt="Українська"></a>
</div>


# SettingsService

<div id="badges" align="left">
  <img src="https://img.shields.io/github/v/release/MaksymStoianov/SettingsService" alt="Release">
  <a href="LICENSE.md"><img src="https://img.shields.io/github/license/MaksymStoianov/SettingsService" alt="License"></a>
  <a href="https://github.com/google/clasp"><img src="https://img.shields.io/badge/built%20with-clasp-4285f4.svg" alt="clasp"></a>
</div>

**SettingsService** работи подобно на [**PropertiesService**](https://developers.google.com/apps-script/reference/properties), но с подобрени възможности.

Настоящата модификация намалява натоварването върху системните лимити при четене и запис на свойства.
Това се постига чрез паралелно съхранение на данни в [**CacheService**](https://developers.google.com/apps-script/reference/cache).

__Внимание!__ Използването на този сервис може да увеличи времето за изпълнение на скрипта.


## Инсталация

1. Отворете своя проект в [Google Apps Script Dashboard](https://script.google.com/).
2. Копирайте съдържанието на файла [settings.js](../../src/settings.js) и го поставете в нов файл във вашия проект в Google Apps Script.


## Употреба

### Получаване на инстанция на настройките

Получете настройки за документ, сценарий или потребител:

```javascript
// Настройки на документа
const documentSettings = SettingsService.getDocumentSettings();

// Настройки на сценария
const scriptSettings = SettingsService.getScriptSettings();

// Настройки на потребителя
const userSettings = SettingsService.getUserSettings();
```

### Запазване на данни

Използвайте методи или пълномощни за запазване на данни:

```javascript
// Използване на метода
scriptSettings.setProperty('email', 'stoianov.maksym@gmail.com');

// Използване на прокси
scriptSettings.email = 'stoianov.maksym@gmail.com';
```

### Извличане на данни

Използвайте методи или пълномощни за извличане на данни:

```javascript
// Използване на метода
const email = scriptSettings.getProperty('email');

// Използване на прокси
const email = scriptSettings.email;
```


## Задачи

- [ ] Създаване на метод `settings.setProperties(properties, deleteAllOthers)`.
- [ ] Създаване на метод `settings.getKeys()`.
- [ ] Създаване на метод `settings.getProperties()`.
- [ ] Създаване на метод `settings.deleteAllProperties()`.
- [ ] Използвайте рекурсивно пълномощно, за да проследявате промените в дървото на обектите в `settings._values`, като това трябва да създаде и йерархия от обекти, напр: `settings._values.prop1.m1.m2 = 5;`.


## Принос

Моля, прочетете [CONTRIBUTING.md](CONTRIBUTING.md) за подробности относно това как да допринесете за този проект.


## История на промените

Моля, направете справка с [CHANGELOG.md](CHANGELOG.md) за подробен списък на промените и актуализациите.


## Лиценз

Този проект е лицензиран съгласно файла [LICENSE.md](LICENSE.md).