<div id="locales" align="right">
  <a href="../bg/README.md"><img src="https://img.shields.io/badge/BG-grey?style=flat" alt="Български"></a>
  <a href="../de/README.md"><img src="https://img.shields.io/badge/DE-grey?style=flat" alt="Deutsch"></a>
  <a href="../en/README.md"><img src="https://img.shields.io/badge/EN-grey?style=flat" alt="English"></a>
  <a href="../ru/README.md"><img src="https://img.shields.io/badge/RU-grey?style=flat" alt="Русский"></a>
  <a href="../uk/README.md"><img src="https://img.shields.io/badge/UK-blue?style=flat" alt="Українська"></a>
</div>


# SettingsService

<div id="badges" align="left">
  <img src="https://img.shields.io/github/v/release/MaksymStoianov/SettingsService" alt="Release">
  <a href="LICENSE.md"><img src="https://img.shields.io/github/license/MaksymStoianov/SettingsService" alt="License"></a>
  <a href="https://github.com/google/clasp"><img src="https://img.shields.io/badge/built%20with-clasp-4285f4.svg" alt="clasp"></a>
</div>

**SettingsService** працює подібно до [**PropertiesService**](https://developers.google.com/apps-script/reference/properties), але з покращеними можливостями.

Поточна модифікація зменшує навантаження на системні ліміти при читанні та запису властивостей.
Це досягається завдяки паралельному зберіганню даних у [**CacheService**](https://developers.google.com/apps-script/reference/cache).

__Увага!__ Використання цього сервісу може збільшити час виконання скрипта.


## Встановлення

1. Відкрийте свій проект у [Google Apps Script Dashboard](https://script.google.com/).
2. Скопіюйте вміст файлу [settings.js](../../src/settings.js) і вставте його у новий файл у вашому проекті Google Apps Script.


## Використання

### Отримання екземпляра налаштувань

Отримайте налаштування для документа, скрипта або користувача:

```javascript
// Налаштування документа
const documentSettings = SettingsService.getDocumentSettings();

// Налаштування сценарію
const scriptSettings = SettingsService.getScriptSettings();

// Налаштування користувача
const userSettings = SettingsService.getUserSettings();
```

### Збереження даних

Використовуйте методи або проксі для збереження даних:

```javascript
// За допомогою методу
scriptSettings.setProperty('email', 'stoianov.maksym@gmail.com');

// За допомогою проксі
scriptSettings.email = 'stoianov.maksym@gmail.com';
```

### Отримання даних

Використовуйте методи або проксі для отримання даних:

```javascript
// За допомогою методу
const email = scriptSettings.getProperty('email');

// За допомогою проксі
const email = scriptSettings.email;
```


## Завдання

- [ ] Створити метод `settings.setProperties(properties, deleteAllOthers)`.
- [ ] Створити метод `settings.getKeys()`.
- [ ] Створити метод `settings.getProperties()`.
- [ ] Створити метод `settings.deleteAllProperties()`.
- [ ] Використовувати рекурсивний проксі для відстеження змін дерева об'єктів в `settings._values`, це також має створювати ієрархію об'єктів, наприклад: `settings._values.prop1.m1.m2 = 5;`.


## Внесок

Будь ласка, прочитайте [CONTRIBUTING.md](CONTRIBUTING.md) для отримання докладної інформації про те, як зробити внесок у цей проект.


## Історія змін

Для отримання докладного списку змін і оновлень, будь ласка, зверніться до файлу [CHANGELOG.md](CHANGELOG.md).


## Ліцензія

Цей проект ліцензується відповідно до файлу [LICENSE.md](LICENSE.md).