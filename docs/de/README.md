<div id="locales" align="right">
  <a href="../bg/README.md"><img src="https://img.shields.io/badge/BG-grey?style=flat" alt="Български"></a>
  <a href="../de/README.md"><img src="https://img.shields.io/badge/DE-blue?style=flat" alt="Deutsch"></a>
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

**SettingsService** funktioniert ähnlich wie [**PropertiesService**](https://developers.google.com/apps-script/reference/properties), jedoch mit erweiterten Möglichkeiten.

Die aktuelle Modifikation reduziert die Belastung der Systemgrenzen beim Lesen und Schreiben von Eigenschaften.
Dies wird durch die parallele Speicherung von Daten im [**CacheService**](https://developers.google.com/apps-script/reference/cache) erreicht.

__Achtung!__ Die Verwendung dieses Dienstes kann die Ausführungszeit des Skripts verlängern.


## Installation

1. Öffnen Sie Ihr Projekt im [Google Apps Script Dashboard](https://script.google.com/).
2. Kopieren Sie den Inhalt der Datei [settings.js](../../src/settings.js) und fügen Sie ihn in eine neue Datei in Ihrem Google Apps Script-Projekt ein.


## Verwendung

### Instanz der Einstellungen abrufen

Rufen Sie Einstellungen für ein Dokument, ein Skript oder einen Benutzer ab:

```javascript
// Dokumenteinstellungen
const documentSettings = SettingsService.getDocumentSettings();

// Szenarioeinstellungen
const scriptSettings = SettingsService.getScriptSettings();

// Benutzereinstellungen
const userSettings = SettingsService.getUserSettings();
```

### Speichern von Daten

Verwenden Sie Methoden oder Proxys, um Daten zu speichern:

```javascript
// Anwendung der Methode
scriptSettings.setProperty('email', 'stoianov.maksym@gmail.com');

// Mit einem Proxy
scriptSettings.email = 'stoianov.maksym@gmail.com';
```

### Datenabruf

Verwenden Sie Methoden oder Proxys zum Abrufen von Daten:

```javascript
// Anwendung der Methode
const email = scriptSettings.getProperty('email');

// Mit einem Proxy
const email = scriptSettings.email;
```


## Aufgaben

- [ ] Erstellen Sie eine Methode `settings.setProperties(properties, deleteAllOthers)`.
- [ ] Erstelle eine Methode `settings.getKeys()`.
- [ ] Erstelle Methode `settings.getProperties()`.
- [ ] Erstelle eine Methode `settings.deleteAllProperties()`.
- [ ] Verwenden Sie einen rekursiven Proxy, um Änderungen am Objektbaum in `settings._values` zu verfolgen, dies sollte auch eine Hierarchie von Objekten erstellen, z.B.: `settings._values.prop1.m1.m2 = 5;`.


## Beitrag

Bitte lesen Sie [CONTRIBUTING.md](CONTRIBUTING.md) für Details, wie Sie zu diesem Projekt beitragen können.


## Änderungshistorie

Bitte lesen Sie [CHANGELOG.md](CHANGELOG.md) für eine detaillierte Liste der Änderungen und Aktualisierungen.


## Lizenz

Dieses Projekt ist lizenziert unter der Datei [LICENSE.md](LICENSE.md).