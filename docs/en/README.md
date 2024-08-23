<div id="locales" align="right">
  <a href="../bg/README.md"><img src="https://img.shields.io/badge/BG-grey?style=flat" alt="Български"></a>
  <a href="../de/README.md"><img src="https://img.shields.io/badge/DE-grey?style=flat" alt="Deutsch"></a>
  <a href="../en/README.md"><img src="https://img.shields.io/badge/EN-blue?style=flat" alt="English"></a>
  <a href="../ru/README.md"><img src="https://img.shields.io/badge/RU-grey?style=flat" alt="Русский"></a>
  <a href="../uk/README.md"><img src="https://img.shields.io/badge/UK-grey?style=flat" alt="Українська"></a>
</div>


# SettingsService

<div id="badges" align="left">
  <img src="https://img.shields.io/github/v/release/MaksymStoianov/SettingsService" alt="Release">
  <a href="LICENSE.md"><img src="https://img.shields.io/github/license/MaksymStoianov/SettingsService" alt="License"></a>
  <a href="https://github.com/google/clasp"><img src="https://img.shields.io/badge/built%20with-clasp-4285f4.svg" alt="clasp"></a>
</div>

**SettingsService** works similarly to [**PropertiesService**](https://developers.google.com/apps-script/reference/properties) but with enhanced capabilities.

The current modification reduces the load on system limits when reading and writing properties.
This is achieved through parallel data storage in [**CacheService**](https://developers.google.com/apps-script/reference/cache).

__Note!__ Using this service may increase script execution time.


## Installation

1. Open your project in the [Google Apps Script Dashboard](https://script.google.com/).
2. Copy the contents of the [settings.js](../../src/settings.js) file and paste it into a new file in your Google Apps Script project.


## Usage

### Getting a settings instance

Retrieve settings for a document, script, or user:

```javascript
// Document settings
const documentSettings = SettingsService.getDocumentSettings();

// Script settings
const scriptSettings = SettingsService.getScriptSettings();

// User settings
const userSettings = SettingsService.getUserSettings();
```

### Saving data

Use methods or proxies to save data:

```javascript
// Using the method
scriptSettings.setProperty('email', 'stoianov.maksym@gmail.com');

// Using a proxy
scriptSettings.email = 'stoianov.maksym@gmail.com';
```

### Data retrieval

Use methods or proxies to retrieve data:

```javascript
// Using the method
const email = scriptSettings.getProperty('email');

// Using a proxy
const email = scriptSettings.email;
```


## Tasks

- [ ] Create a method `settings.setProperties(properties, deleteAllOthers)`.
- [ ] Create a method `settings.getKeys()`.
- [ ] Create method `settings.getProperties()`.
- [ ] Create a method `settings.deleteAllProperties()`.
- [ ] Use a recursive proxy to track changes to the object tree in `settings._values`, this should also create a hierarchy of objects, e.g.: `settings._values.prop1.m1.m2 = 5;`.


## Contribution

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.


## Change History

Please refer to [CHANGELOG.md](CHANGELOG.md) for a detailed list of changes and updates.


## License

This project is licensed under the [LICENSE.md](LICENSE.md) file.