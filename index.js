/**
 * `SheetSchema` - представляет собой объект реализующий работу со схемой листа электронной таблицы.
 * @class SheetSchema
 * @namespace SheetSchema
 * @version 3.0.0
 * @author Maksym Stoianov <stoianov.maksym@gmail.com>
 * @see [Snippet Source](https://script.google.com/home/projects/1nv6uIGSft_sQOPozWEUL6iIOpvyXqas5NAqvF3zDTH0uAJ9aSSHu0rLB/edit)
 * @see [Snippet Source Folder](https://drive.google.com/drive/folders/1q7SNcZBsyspSxO93XLfS5QWkCayhF3LK)
 * @see [Snippet Documentation](https://apps-script.blog/)
 * @see [Snippet DatabaseApp](https://script.google.com/home/projects/1rbK0VrB6HZ2a176Kl8TKLXwug_BRU9dxAA3dnhJYKpXxgx5Fi9Mz5mNi/edit)
 */
globalThis.SheetSchema = class SheetSchema {
  /**
   * Устанавливает схему в указанный лист электронной таблицы.
   */
  /**
   * @overload
   * @param {SpreadsheetApp.Sheet} sheet Экземпляр класса [`Sheet`](https://developers.google.com/apps-script/reference/spreadsheet/sheet).
   * ```javascript
   * const sheet = SpreadsheetApp.getActiveSheet();
   * const fields = [ 'time', null, { name: 'id' } ];
   * let schema = SheetSchema.newSchema(fields);
   * schema = SheetSchema.insertSchema(sheet, schema);
   * ```
   * @param {SheetSchema.Schema} schema Экземпляр класса [`Schema`](#).
   * @return {SheetSchema.Schema} Экземпляр класса [`Schema`](#).
   */
  /**
   * @overload
   * @param {SpreadsheetApp.Sheet} sheet Экземпляр класса [`Sheet`](https://developers.google.com/apps-script/reference/spreadsheet/sheet).
   * ```javascript
   * const sheet = SpreadsheetApp.getActiveSheet();
   * const fields = [ 'time', null, { name: 'id' } ];
   * const schema = SheetSchema.insertSchema(sheet, fields);
   * ```
   * @param {SheetSchema.Field[]} fields Массив полей.
   * @return {SheetSchema.Schema} Экземпляр класса [`Schema`](#)
   */
  static insertSchema(sheet, schema) {
    return this.newSchema(schema).addToSheet(sheet);
  }



  /**
   * Возвращает схему указанного листа электронной таблицы или `null`.
   * @param {SpreadsheetApp.Sheet} sheet Экземпляр класса [`Sheet`](https://developers.google.com/apps-script/reference/spreadsheet/sheet).
   * @return {SheetSchema.Schema} Экземпляр класса [`Schema`](#) или `null`.
   */
  static getSchemaBySheet(sheet) {
    if (!arguments.length)
      throw new Error(`Параметры () не соответствуют сигнатуре статического метода ${this.name}.getSchemaBySheet.`);

    if (!SpreadsheetApp.isSheet(sheet))
      throw new TypeError(`Параметры (${typeof name}) не соответствуют сигнатуре статического метода ${this.name}.getSchemaBySheet.`);

    const listMetadata = sheet
      .createDeveloperMetadataFinder()
      .withLocationType(SpreadsheetApp.DeveloperMetadataLocationType.COLUMN)
      .withVisibility(SpreadsheetApp.DeveloperMetadataVisibility.DOCUMENT)
      .find();

    const fields = new Array(sheet.getMaxColumns()).fill(null);

    let fieldNamePrefix = 'schema.field.';

    for (const metadata of listMetadata) {
      let key = metadata.getKey();

      if (!key.startsWith(fieldNamePrefix))
        continue;

      key = key.slice(fieldNamePrefix.length);

      if (!['name', 'description', 'type', 'mode'].includes(key))
        continue;

      const index = metadata
        .getLocation()
        .getColumn()
        .getColumn() - 1;

      if (!fields[index])
        fields[index] = {};

      fields[index][key] = metadata.getValue();
    }

    for (const [i, field] of fields.entries())
      if (!(Object.isObject(field) && this.isFieldName(field.name)))
        fields[i] = null;

    // Если нет полей
    if (!fields.filter(item => item != null).length)
      return null;

    return this.newSchema(fields).setSheet(sheet);
  }



  /**
   * Удаляет схему из указанного листа электронной таблицы.
   * @param {SpreadsheetApp.Sheet} sheet Экземпляр класса [`Sheet`](https://developers.google.com/apps-script/reference/spreadsheet/sheet).
   * @return {boolean} `true` в случае успеха.
   */
  static removeSchema(sheet) {
    if (!arguments.length)
      throw new Error(`Параметры () не соответствуют сигнатуре статического метода ${this.name}.removeSchema.`);

    if (!SpreadsheetApp.isSheet(sheet))
      throw new TypeError(`Параметры (${typeof name}) не соответствуют сигнатуре статического метода ${this.name}.removeSchema.`);

    const listMetadata = sheet
      .createDeveloperMetadataFinder()
      .withLocationType(SpreadsheetApp.DeveloperMetadataLocationType.COLUMN)
      .withVisibility(SpreadsheetApp.DeveloperMetadataVisibility.DOCUMENT)
      .find();

    let fieldNamePrefix = 'schema.field.';

    for (const metadata of listMetadata) {
      let key = metadata.getKey();

      if (!key.startsWith(fieldNamePrefix))
        continue;

      metadata.remove();
    }

    return true;
  }


  
  /**
   * Создает и возвращает экземпляр класса [`Schema`](#).
   */
  /**
   * @overload
   * @param {Array<(string|SheetSchema.Field)>} fields Массив полей схемы.
   * ```javascript
   * const fields = [ 'time', null, { name: 'id' } ];
   * const schema = SheetSchema.newSchema(fields);
   * ```
   * @return {SheetSchema.Schema} Экземпляр класса [`Schema`](#).
   */
  /**
   * @overload
   * @param {SheetSchema.Schema} schema Экземпляр класса [`Schema`](#).
   * ```javascript
   * const sheet = SpreadsheetApp.getActiveSheet();
   * let schema = SheetSchema.getSchemaBySheet(sheet);
   * schema = SheetSchema.newSchema(schema);
   * ```
   * @return {SheetSchema.Schema} Экземпляр класса [`Schema`](#).
   */
  static newSchema(...args) {
    if (!arguments.length)
      throw new Error(`Параметры () не соответствуют сигнатуре статического метода ${this}.newSchema.`);

    let fields = [];

    if (this.isSchema(args[0]) || (Object.isObject(args[0]) && Array.isArray(args[0]?.fields)))
      fields = args[0]?.fields;

    else if (Array.isArray(args[0]))
      fields = args[0];

    else throw new Error(`Недопустимые аргументы: невозможно определить правильную перегрузку статического метода ${this}.newSchema.`);

    return Reflect.construct(this.Schema, [fields]);
  }



  /**
   * Создает и возвращает экземпляр класса [`Field`](#).
   */
  /**
   * @overload
   * @param {string} name Название поля.
   * @param {Object} [options={}] Опциональные параметры.
   * @param {string} [options.description='']
   * @param {string} [options.mode='NULLABLE']
   * @param {string} [options.type='STRING']
   * @return {SheetSchema.Field} Экземпляр класса [`Field`](#).
   */
  /**
   * @overload
   * @param {Object} data
   * @param {string} data.name
   * @param {string} [data.description='']
   * @param {string} [data.mode='NULLABLE']
   * @param {string} [data.type='STRING']
   * @return {SheetSchema.Field} Экземпляр класса [`Field`](#).
   */
  /**
   * @overload
   * @param {SheetSchema.Field} field Поле.
   * @param {string} field.name
   * @param {string} [field.description='']
   * @param {string} [field.mode='NULLABLE']
   * @param {string} [field.type='STRING']
   * @return {SheetSchema.Field} Экземпляр класса [`Field`](#).
   */
  static newField(...args) {
    if (!arguments.length)
      throw new Error(`Параметры () не соответствуют сигнатуре статического метода ${this}.newField.`);

    let name, options = {};

    // Arguments: field
    if (args.length === 1 && (this.isField(args[0]) || Object.isObject(args[0]?._values))) {
      name = args[0]?._values.name;
      options = args[0]?._values;
    }

    // Arguments: data
    else if (args.length === 1 && Object.isObject(args[0])) {
      name = args[0]?.name;
      options = args[0];
    }

    // Arguments: name, options
    else if (args.length === 2 && (typeof args[0] === 'string' && args[0].length && Object.isObject(args[1]))) {
      name = args[0];
      options = args[1];
    }

    else throw new Error(`Недопустимые аргументы: невозможно определить правильную перегрузку статического метода ${this}.newField.`);

    return Reflect.construct(this.Field, [name, options]);
  }



  /**
   * Возвращает `true`, если объект является [`Schema`](#); иначе, `false`.
   * ```javascript
   * Logger.log(SheetSchema.isSchema(value));
   * ```
   * @param {*} input Объект для проверки.
   * @return {boolean}
   */
  static isSchema(input) {
    return input instanceof this.Schema;
  }



  /**
   * Возвращает `true`, если объект является [`Field`](#); иначе, `false`.
   * ```javascript
   * Logger.log(SheetSchema.isField(value));
   * ```
   * @param {*} input Объект для проверки.
   * @return {boolean}
   */
  static isField(input) {
    return input instanceof this.Field;
  }



  static isFieldName(input) {
    return typeof input === 'string' && this.Field.RegExp.NAME.test(input);
  }



  static isFieldDescription(input) {
    return ['string', 'number'].includes(typeof input);
  }



  static isFieldMode(input) {
    return typeof input === 'string' && this.Field.Mode[input.toUpperCase()];
  }



  static isFieldType(input) {
    return typeof input === 'string' && this.Field.Type[input.toUpperCase()];
  }



  constructor() {
    throw new Error(`${this.constructor.name} is not a constructor.`);
  }
};





/**
 * Конструктор 'Schema' - представляет собой объект для работы со схемой листа.
 * @class Schema
 * @memberof SheetSchema
 */
SheetSchema.Schema = class Schema {
  /**
   * @param {(Object[]|SheetSchema.Field[])} [fields=[]]
   */
  constructor(fields = []) {
    if (!Array.isArray(fields))
      throw new TypeError(`Параметры (${typeof fields}) не соответствуют сигнатуре конструктора ${this}.`);

    /**
     * @private
     * @readonly
     * @type {SpreadsheetApp.Sheet}
     */
    Object.defineProperty(this, '_sheet', {
      configurable: true,
      enumerable: false,
      writable: true,
      value: null
    });

    /**
     * @readonly
     * @type {SheetSchema.Field[]}
     */
    this.fields = [];

    for (let [i, field] of fields.entries()) {
      try {
        field = field ?? null;

        if (field === null) continue;

        else if (typeof field === 'string')
          field = { name: field };

        else if (!Object.isObject(field))
          throw new TypeError(`Значение поля с индексом ${Math.abs(i)} должно быть object.`);

        if (typeof field.name !== 'string')
          throw new TypeError(`Имя поля с индексом ${Math.abs(i)} должно быть string.`);

        field = SheetSchema.newField(field).addToSchema(this, i + 1);
      } catch (error) {
        field = null;
        console.warn(error.stack);
      } finally {
        this.fields[i] = field ?? null;
      }
    }
  }



  /**
   * @readonly
   * @type {Integer}
   */
  get length() {
    return this.fields?.length;
  }



  /**
   * Получить поле по его имени.
   * @param {string} name
   * @return {SheetSchema.Field}
   */
  getFieldByName(name) {
    if (!arguments.length)
      throw new Error(`Параметры () не соответствуют сигнатуре метода ${this}.getFieldByName.`);

    if (typeof name !== 'string')
      throw new TypeError(`Параметры (${typeof name}) не соответствуют сигнатуре метода ${this}.getFieldByName.`);

    if (!name.length)
      throw new Error(`Недопустимый аргумент name метода ${this}.getFieldByName.`);

    return this.fields?.find(item => item?.name === name) ?? null;
  }



  /**
   * Получить поле по индексу столбца.
   * @param {integer} columnIndex
   * @return {SheetSchema.Field}
   */
  getFieldByIndex(columnIndex) {
    if (!arguments.length)
      throw new Error(`Параметры () не соответствуют сигнатуре метода ${this}.getFieldByIndex.`);

    if (typeof columnIndex !== 'number')
      throw new TypeError(`Параметры (${typeof columnPosition}) не соответствуют сигнатуре метода ${this}.getFieldByColumn.`);

    if (!(Number.isInteger(columnIndex) && columnIndex >= 0))
      throw new Error(`Недопустимый аргумент columnIndex метода ${this}.getFieldByIndex.`);

    return (this.fields ?? [])[columnIndex] ?? null;
  }



  /**
   * Получить поле по положению столбца.
   * @param {integer} columnPosition 1-индексированная позиция столбца. Например, индекс столбца B равен 2.
   * @return {SheetSchema.Field}
   */
  getFieldByColumn(columnPosition) {
    if (!arguments.length)
      throw new Error(`Параметры () не соответствуют сигнатуре метода ${this}.getFieldByColumn.`);

    if (typeof columnPosition !== 'number')
      throw new TypeError(`Параметры (${typeof columnPosition}) не соответствуют сигнатуре метода ${this}.getFieldByColumn.`);

    if (!(Number.isInteger(columnPosition) && columnPosition > 0))
      throw new Error(`Недопустимый аргумент columnPosition метода ${this}.getFieldByColumn.`);

    return this.fields[columnPosition - 1] ?? null;
  }



  /**
   * Удаляет текущую схему из листа электронной таблицы.
   * @return {boolean}
   */
  remove() {
    if (!arguments.length)
      throw new Error(`Параметры () не соответствуют сигнатуре статического метода ${this.name}.removeSchema.`);

    const sheet = this.getSheet();

    if (!SpreadsheetApp.isSheet(sheet))
      throw new TypeError(`Параметры (${typeof name}) не соответствуют сигнатуре статического метода ${this.name}.removeSchema.`);

    const listMetadata = sheet
      .createDeveloperMetadataFinder()
      .withLocationType(SpreadsheetApp.DeveloperMetadataLocationType.COLUMN)
      .withVisibility(SpreadsheetApp.DeveloperMetadataVisibility.DOCUMENT)
      .find();

    let fieldNamePrefix = 'schema.field.';

    for (const metadata of listMetadata)
      if (metadata.getKey().startsWith(fieldNamePrefix))
        metadata.remove();

    return true;
  }



  /**
   * @param {SpreadsheetApp.Sheet} sheet
   * @return {SheetSchema.Schema}
   */
  setSheet(sheet) {
    if (!arguments.length)
      throw new Error(`Параметры () не соответствуют сигнатуре метода ${this}.setSheet.`);

    if (!SpreadsheetApp.isSheet(sheet))
      throw new TypeError(`Параметры (${typeof sheet}) не соответствуют сигнатуре метода ${this}.setSheet.`);

    this._sheet = sheet;

    return this;
  }



  /**
   * @return {SpreadsheetApp.Sheet}
   */
  getSheet() {
    return this._sheet ?? null;
  }



  /**
   * @return {SheetSchema.Schema}
   */
  save() {
    const sheet = this.getSheet();

    if (!sheet)
      throw new Error(`Недопустимое значение sheet.`);

    for (const [columnIndex, field] of this.fields.entries()) {
      try {
        const columnPosition = columnIndex + 1;

        let range = sheet[`_range_column_${columnPosition}`] ?? null;

        if (!range)
          range = sheet.getRange(`C[${columnIndex}]:C[${columnIndex}]`) ?? null;

        if (!range)
          throw new Error(`Недопустимое значение range.`);

        const fieldNamePrefix = 'schema.field.';

        // Удалить старые метаданные
        const listMetadata = range
          .createDeveloperMetadataFinder()
          .onIntersectingLocations()
          .withLocationType(SpreadsheetApp.DeveloperMetadataLocationType.COLUMN)
          .withVisibility(SpreadsheetApp.DeveloperMetadataVisibility.DOCUMENT)
          .find();

        for (const metadata of listMetadata)
          if (metadata.getKey().startsWith(fieldNamePrefix))
            metadata.remove();

        if (!SheetSchema.isField(field)) continue;

        // Установить новые метаданные
        for (const key in field.values) {
          const value = (field[key] ?? '').trim();

          if (key === 'description' && value === '') continue;
          if (key === 'mode' && value === 'NULLABLE') continue;
          if (key === 'type' && value === 'STRING') continue;

          range.addDeveloperMetadata(`schema.field.${key}`, value, SpreadsheetApp.DeveloperMetadataVisibility.DOCUMENT);
        }
      } catch (error) {
        console.warn(error.stack);
      }
    }

    return this;
  }



  /**
   * @param {SpreadsheetApp.Sheet} sheet
   * @return {boolean}
   */
  addToSheet(sheet) {
    return this.setSheet(sheet).save();
  }



  /**
   * Преобразует список значений в объект.
   * @param {Array} input
   * @return {Object}
   */
  fromEntries(input) {
    if (!arguments.length)
      throw new Error(`Параметры () не соответствуют сигнатуре метода ${this}.fromEntries.`);

    if (!Array.isArray(input))
      throw new TypeError(`Параметры (${typeof input}) не соответствуют сигнатуре метода ${this}.fromEntries.`);

    const result = {};

    for (const [i, field] of this.fields.entries())
      result[field.name] = input[i] ?? null;

    return result;
  }



  /**
   * Возвращает строку, представляющую объект.
   * @return {string}
   */
  toString() {
    return this.constructor.name;
  }
};





/**
 * Конструктор 'Field' - представляет собой объект для работы с полем схемы.
 * @class Field
 * @memberof SheetSchema
 */
SheetSchema.Field = class Field {
  /**
   * @param {string} name Название поля.
   * @param {Object} [options={}] Опциональные параметры.
   * @param {string} [options.description='']
   * @param {string} [options.mode='NULLABLE']
   * @param {string} [options.type='STRING']
   * @param {SchemaApp.Schema} [options.schema]
   */
  constructor(name, options = {}) {
    if (!arguments.length)
      throw new Error(`Параметры () не соответствуют сигнатуре конструктора ${this}.`);

    /**
     * @private
     * @readonly
     * @type {SchemaApp.Schema}
     */
    Object.defineProperty(this, '_schema', {
      configurable: true,
      enumerable: false,
      writable: true,
      value: null
    });

    /**
     * @private
     * @readonly
     * @type {Object}
     */
    Object.defineProperty(this, '_values', {
      configurable: true,
      enumerable: false,
      writable: true,
      value: {
        description: '',
        mode: 'NULLABLE',
        type: 'STRING',
      }
    });

    /**
     * @private
     * @type {Proxy}
     */
    Object.defineProperty(this, '_proxy', {
      configurable: true,
      enumerable: false,
      writable: true,
      value: new Proxy(this, {
        'get': (target, property) => {
          if (property === 'inspect') return null;

          if (typeof property === 'symbol')
            return target[property];

          if (typeof target[property] === 'function')
            return (...args) => target[property].apply(this, args);

          return target._values[property] ?? target[property] ?? null;
        },


        'set': (target, property, value) => {
          switch (property) {
            case 'name':
              if (!SheetSchema.isFieldName(value))
                throw new Error(`Параметр ${property} содержит недопустимое значение.`);
              break;


            case 'description':
              if (!SheetSchema.isFieldDescription(value))
                throw new Error(`Параметр ${property} содержит недопустимое значение.`);
              break;


            case 'mode':
              if (!SheetSchema.isFieldMode(value))
                throw new Error(`Параметр ${property} содержит недопустимое значение.`);

              value = value.toUpperCase();
              break;


            case 'type':
              if (!SheetSchema.isFieldType(value))
                throw new Error(`Параметр ${property} содержит недопустимое значение.`);

              value = value.toUpperCase();
              break;
          }

          target._values[property] = value;

          return value;
        }
      })
    });

    // Устанавливаем значения
    this._proxy.name = name;

    for (const key in options)
      this._proxy[key] = options[key];

    return this._proxy;
  }



  /**
   * @readonly
   * @type {integer}
   * @fixme Возможно get и set методы не будут работать с _proxy.
   */
  get index() {
    let index = (this._schema?.fields ?? [])
      .findIndex(item => item?.name === this.name);

    return index >= 0 ? index : null;
  }



  /**
   * @readonly
   * @type {integer}
   * @fixme Возможно get и set методы не будут работать с _proxy.
   */
  get values() {
    return this._values ?? null;
  }



  /**
   * @type {SheetSchema.Schema}
   */
  getSchema() {
    return this._schema ?? null;
  }



  /**
   * @type {SpreadsheetApp.Sheet}
   */
  getSheet() {
    return this._schema?._sheet ?? null;
  }



  /**
   * @type {SpreadsheetApp.Range}
   */
  getRange() {
    const sheet = this.getSheet();

    if (!sheet) return null;

    const columnIndex = this.index;

    if (!(columnIndex >= 0)) return null;

    const columnPosition = columnIndex + 1;

    let range = sheet[`_range_column_${columnPosition}`] ?? null;

    if (!range)
      range = sheet.getRange(`C[${columnPosition}]:C[${columnPosition}]`) ?? null;

    return range;
  }



  /**
   * Добавляет текущее поле к указанной схеме.
   * @param {SheetSchema.Schema} schema
   * @param {integer} columnPosition
   * @return {SheetSchema.Field}
   */
  addToSchema(schema, columnPosition) {
    if (!arguments.length)
      throw new Error(`Параметры () не соответствуют сигнатуре метода ${this}.addToSchema`);

    if (!SheetSchema.isSchema(schema))
      throw new TypeError(`Параметры (${typeof schema}) не соответствуют сигнатуре метода ${this}.addToSchema`);

    if (typeof columnPosition !== 'number')
      throw new TypeError(`Параметры (${typeof schema}, ${typeof columnPosition}) не соответствуют сигнатуре метода ${this}.addToSchema`);

    if (!(Number.isInteger(columnPosition) && columnPosition > 0))
      throw new Error(`Недопустимый аргумент columnPosition метода ${this}.addToSchema.`);

    this._schema = schema;

    const columnIndex = columnPosition - 1;

    if (this._schema.fields.find((item, i) => item?._values?.name === this?._values?.name && columnIndex !== i))
      throw new Error(`Поле с именем "${(this?._values?.name ?? null)}" уже существует!`);

    this._schema.fields[columnIndex] = this._proxy;

    return this._proxy;
  }



  /**
   * Удаляет данные поля схемы из указанного столбца.
   * @param {SpreadsheetApp.Range} range
   */
  remove() {
    const range = this.getRange();

    if (!range)
      throw new Error(`Недопустимое значение range.`);

    const listMetadata = range
      .createDeveloperMetadataFinder()
      .onIntersectingLocations()
      .withLocationType(SpreadsheetApp.DeveloperMetadataLocationType.COLUMN)
      .withVisibility(SpreadsheetApp.DeveloperMetadataVisibility.DOCUMENT)
      .find();

    const fieldNamePrefix = 'schema.field.';

    for (const metadata of listMetadata)
      if (metadata.getKey().startsWith(fieldNamePrefix))
        metadata.remove();

    const schema = this.getSchema();

    if (schema && this.index >= 0)
      schema.fields[this.index] = null;

    return true;
  }



  /**
   * @return {SheetSchema.Field}
   */
  save() {
    const range = this.getRange();

    if (!range)
      throw new Error(`Недопустимое значение range.`);

    this.remove();

    for (const key in this._values) {
      const value = (this._values[key] ?? '').trim();

      if (key === 'description' && value === '') continue;
      if (key === 'mode' && value === 'NULLABLE') continue;
      if (key === 'type' && value === 'STRING') continue;

      range.addDeveloperMetadata(`schema.field.${key}`, value, SpreadsheetApp.DeveloperMetadataVisibility.DOCUMENT);
    }

    const schema = this.getSchema();

    if (schema && this.index >= 0)
      schema.fields[this.index] = this;

    return this._proxy;
  }



  /**
   * Возвращает строку, представляющую объект.
   * @return {string}
   */
  toString() {
    return this.constructor.name;
  }
};





/**
 * Перечисление регулярных выражений.
 * @readonly
 * @enum {RegExp}
 */
SheetSchema.Field.RegExp = {};

/**
 * @readonly
 * @type {RegExp}
 */
SheetSchema.Field.RegExp.NAME = /([a-z_$][\w$]+)/i;





/**
 * Перечисление строковых значений ...
 * @readonly
 * @enum {string}
 */
SheetSchema.Field.Mode = {};

/**
 * Столбец допускает `null` значения.
 * @readonly
 * @type {string}
 */
SheetSchema.Field.Mode.NULLABLE = 'NULLABLE';

/**
 * Столбец не допускает `null` значения.
 * @readonly
 * @type {string}
 */
SheetSchema.Field.Mode.REQUIRED = 'REQUIRED';

/**
 * 
 * @readonly
 * @type {string}
 */
SheetSchema.Field.Mode.REPATED = 'REPATED';





/**
 * Перечисление строковых значений ...
 * @readonly
 * @enum {string}
 */
SheetSchema.Field.Type = {};

/**
 * Строка - Данные символов переменной длины.
 * @readonly
 * @type {string}
 */
SheetSchema.Field.Type.STRING = 'STRING';

/**
 * Байты - Двоичные данные переменной длины.
 * @readonly
 * @type {string}
 */
SheetSchema.Field.Type.BYTES = 'BYTES';

/**
 * Целое число - Числовые значения без дробных компонентов.
 * @readonly
 * @type {string}
 */
SheetSchema.Field.Type.INTEGER = 'INTEGER';

/**
 * Целое число - Числовые значения без дробных компонентов.
 * @readonly
 * @type {string}
 */
SheetSchema.Field.Type.INT64 = 'INT64';

/**
 * Плавающая точка - Приблизительные числовые значения с дробными составляющими.
 * @readonly
 * @type {string}
 */
SheetSchema.Field.Type.FLOAT = 'FLOAT';

/**
 * Плавающая точка - Приблизительные числовые значения с дробными составляющими.
 * @readonly
 * @type {string}
 */
SheetSchema.Field.Type.FLOAT64 = 'FLOAT64';

/**
 * Булево - ИСТИНА или ЛОЖЬ (без учета регистра).
 * @readonly
 * @type {string}
 */
SheetSchema.Field.Type.BOOLEAN = 'BOOLEAN';

/**
 * 
 * @readonly
 * @type {string}
 */
SheetSchema.Field.Type.BOOL = 'BOOL';

/**
 * Отметка времени - Абсолютный момент времени с точностью до микросекунд.
 * @readonly
 * @type {string}
 */
SheetSchema.Field.Type.TIMESTAMP = 'TIMESTAMP';

/**
 * Дата - Логическая календарная дата.
 * @readonly
 * @type {string}
 */
SheetSchema.Field.Type.DATE = 'DATE';

/**
 * Время - Время, не зависящее от конкретной даты.
 * @readonly
 * @type {string}
 */
SheetSchema.Field.Type.TIME = 'TIME';

/**
 * Дата/время - Год, месяц, день, час, минута, секунда и субсекунда.
 * @readonly
 * @type {string}
 */
SheetSchema.Field.Type.DATETIME = 'DATETIME';

/**
 * География - На поверхности множества точек Земли.
 * @readonly
 * @type {string}
 */
SheetSchema.Field.Type.GEOGRAPHY = 'GEOGRAPHY';

/**
 * Числовой - Точные числовые значения с дробными компонентами.
 * @readonly
 * @type {string}
 */
SheetSchema.Field.Type.NUMERIC = 'NUMERIC';





if (typeof Object.isObject !== 'function')
  /**
   * Возвращает `true`, если объект является [`Object`](#); иначе, `false`.
   * @param {*} input Объект для проверки.
   * @return {boolean}
   */
  Object.isObject = input => input === Object(input) && !Array.isArray(input);





if (typeof SpreadsheetApp.isSheet !== 'function')
  /**
   * Возвращает `true`, если объект является [`Sheet`](https://developers.google.com/apps-script/reference/spreadsheet/sheet); иначе, `false`.
   * @param {*} input Объект для проверки.
   * @return {boolean}
   */
  SpreadsheetApp.isSheet = input => input === Object(input) && !Array.isArray(input) && input.toString() === 'Sheet';
