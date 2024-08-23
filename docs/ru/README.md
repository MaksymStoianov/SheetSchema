<div id="locales" align="right">
  <a href="../bg/README.md"><img src="https://img.shields.io/badge/BG-grey?style=flat" alt="Български"></a>
  <a href="../de/README.md"><img src="https://img.shields.io/badge/DE-grey?style=flat" alt="Deutsch"></a>
  <a href="../en/README.md"><img src="https://img.shields.io/badge/EN-grey?style=flat" alt="English"></a>
  <a href="../ru/README.md"><img src="https://img.shields.io/badge/RU-blue?style=flat" alt="Русский"></a>
  <a href="../uk/README.md"><img src="https://img.shields.io/badge/UK-grey?style=flat" alt="Українська"></a>
</div>


# SettingsService

<div id="badges" align="left">
  <img src="https://img.shields.io/github/v/release/MaksymStoianov/SettingsService" alt="Release">
  <a href="LICENSE.md"><img src="https://img.shields.io/github/license/MaksymStoianov/SettingsService" alt="License"></a>
  <a href="https://github.com/google/clasp"><img src="https://img.shields.io/badge/built%20with-clasp-4285f4.svg" alt="clasp"></a>
</div>

**SettingsService** работает подобно [**PropertiesService**](https://developers.google.com/apps-script/reference/properties), но с улучшенными возможностями.

Текущая модификация уменьшае нагрузку на системные лимиты при чтении и записи свойств.
Это достигается за счет параллельного хранения данных в [**CacheService**](https://developers.google.com/apps-script/reference/cache).

__Внимание!__ Использование этого сервиса может увеличить время выполнения скрипта.


## Установка

1. Откройте свой проект в [Google Apps Script Dashboard](https://script.google.com/).
2. Скопируйте содержимое файла [settings.js](../../src/settings.js) и вставьте его в новый файл в вашем проекте Google Apps Script.


## Использование

### Получение экземпляра настроек

Получите настройки для документа, сценария или пользователя:

```javascript
// Настройки документа
const documentSettings = SettingsService.getDocumentSettings();

// Настройки сценария
const scriptSettings = SettingsService.getScriptSettings();

// Настройки пользователя
const userSettings = SettingsService.getUserSettings();
```

### Сохранение данных

Используйте методы или прокси для сохранения данных:

```javascript
// С помощью метода
scriptSettings.setProperty('email', 'stoianov.maksym@gmail.com');

// С помощью прокси
scriptSettings.email = 'stoianov.maksym@gmail.com';
```

### Получение данных

Используйте методы или прокси для получения данных:

```javascript
// С помощью метода
const email = scriptSettings.getProperty('email');

// С помощью прокси
const email = scriptSettings.email;
```


## Задачи

- [ ] Создать метод `settings.setProperties(properties, deleteAllOthers)`.
- [ ] Создать метод `settings.getKeys()`.
- [ ] Создать метод `settings.getProperties()`.
- [ ] Создать метод `settings.deleteAllProperties()`.
- [ ] Использовать рекурсивный прокси для отслеживания изменений дерева объектов в `settings._values`, это также должно создавать иерархию объектов, например: `settings._values.prop1.m1.m2 = 5;`.


## Вклад

Пожалуйста, прочитайте [CONTRIBUTING.md](CONTRIBUTING.md) для получения подробной информации о том, как внести вклад в этот проект.


## История изменений

Для получения подробного списка изменений и обновлений, пожалуйста, обратитесь к файлу [CHANGELOG.md](CHANGELOG.md).


## Лицензия

Этот проект лицензируется в соответствии с файлом [LICENSE.md](LICENSE.md).