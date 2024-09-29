/**
 * MIT License
 * 
 * Copyright (c) 2023 Maksym Stoianov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */



/**
 * `SheetSchema` - представляет собой объект реализующий работу со схемой листа электронной таблицы.
 * @class               SheetSchema
 * @namespace           SheetSchema
 * @version             3.1.0
 * @author              Maksym Stoianov <stoianov.maksym@gmail.com>
 * @license             MIT
 * @tutorial            https://maksymstoianov.com/
 * @see                 [GitHub](https://github.com/MaksymStoianov/SheetSchema)
 */
class SheetSchema {

  /**
   * Устанавливает схему в указанный лист электронной таблицы.
   */
  /**
   * @overload
   * @param {SpreadsheetApp.Sheet} sheet Экземпляр класса [`Sheet`](https://developers.google.com/apps-script/reference/spreadsheet/sheet).
   * 
   * #### Example
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
   * 
   * #### Example
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
    if (!arguments.length) {
      throw new Error(`Параметры () не соответствуют сигнатуре статического метода ${this.name}.getSchemaBySheet.`);
    }

    if (!this.isSheet(sheet)) {
      throw new TypeError(`Параметры (${typeof name}) не соответствуют сигнатуре статического метода ${this.name}.getSchemaBySheet.`);
    }

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

    for (const [i, field] of fields.entries()) {
      if (!(Object.isObject(field) && this.isFieldName(field.name))) {
        fields[i] = null;
      }
    }

    // Если нет полей
    if (!fields.filter(item => item != null).length) {
      return null;
    }

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

    if (!this.isSheet(sheet)) {
      throw new TypeError(`Параметры (${typeof name}) не соответствуют сигнатуре статического метода ${this.name}.removeSchema.`);
    }

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
   * 
   * #### Example
   * ```javascript
   * const fields = [ 'time', null, { name: 'id' } ];
   * const schema = SheetSchema.newSchema(fields);
   * ```
   * @return {SheetSchema.Schema} Экземпляр класса [`Schema`](#).
   */
  /**
   * @overload
   * @param {SheetSchema.Schema} schema Экземпляр класса [`Schema`](#).
   * 
   * #### Example
   * ```javascript
   * const sheet = SpreadsheetApp.getActiveSheet();
   * let schema = SheetSchema.getSchemaBySheet(sheet);
   * schema = SheetSchema.newSchema(schema);
   * ```
   * @return {SheetSchema.Schema} Экземпляр класса [`Schema`](#).
   */
  static newSchema(...args) {
    if (!arguments.length) {
      throw new Error(`Параметры () не соответствуют сигнатуре статического метода ${this.name}.newSchema.`);
    }

    let fields = [];

    if (this.isSchema(args[0]) || (Object.isObject(args[0]) && Array.isArray(args[0]?.fields)))
      fields = args[0]?.fields;

    else if (Array.isArray(args[0]))
      fields = args[0];

    else throw new Error(`Недопустимые аргументы: невозможно определить правильную перегрузку статического метода ${this.name}.newSchema.`);

    return Reflect.construct(this.Schema, [fields]);
  }



  /**
   * Создает и возвращает экземпляр класса [`Field`](#).
   */
  /**
   * @overload
   * @param {string} name Название поля.
   * @param {Object} [options = {}] Опциональные параметры.
   * @param {string} [options.description = '']
   * @param {string} [options.mode = 'NULLABLE']
   * @param {string} [options.type = 'STRING']
   * @return {SheetSchema.Field} Экземпляр класса [`Field`](#).
   */
  /**
   * @overload
   * @param {Object} data
   * @param {string} data.name
   * @param {string} [data.description = '']
   * @param {string} [data.mode = 'NULLABLE']
   * @param {string} [data.type = 'STRING']
   * @return {SheetSchema.Field} Экземпляр класса [`Field`](#).
   */
  /**
   * @overload
   * @param {SheetSchema.Field} field Поле.
   * @param {string} field.name
   * @param {string} [field.description = '']
   * @param {string} [field.mode = 'NULLABLE']
   * @param {string} [field.type = 'STRING']
   * @return {SheetSchema.Field} Экземпляр класса [`Field`](#).
   */
  static newField(...args) {
    if (!arguments.length) {
      throw new Error(`Параметры () не соответствуют сигнатуре статического метода ${this.name}.newField.`);
    }

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

    else throw new Error(`Недопустимые аргументы: невозможно определить правильную перегрузку статического метода ${this.name}.newField.`);

    return Reflect.construct(this.Field, [name, options]);
  }



  /**
   * Проверяет, является ли заданное значение объектом типа [`Schema`](#).
   * @param {*} input Значение для проверки.
   * @return {boolean}
   */
  static isSchema(input) {
    if (!arguments.length) {
      throw new Error(`The parameters () don't match any method signature for ${this.name}.isSchema.`);
    }

    return (input instanceof this.Schema);
  }



  /**
   * Проверяет, является ли заданное значение объектом типа [`Field`](#).
   * @param {*} input Значение для проверки.
   * @return {boolean}
   */
  static isField(input) {
    if (!arguments.length) {
      throw new Error(`The parameters () don't match any method signature for ${this.name}.isField.`);
    }

    return (input instanceof this.Field);
  }



  /**
   * @param {*} input Значение для проверки.
   * @return {boolean}
   */
  static isFieldName(input) {
    if (!arguments.length) {
      throw new Error(`The parameters () don't match any method signature for ${this.name}.isFieldName.`);
    }

    return (
      typeof input === 'string' &&
      this.Field.RegExp.NAME.test(input)
    );
  }



  /**
   * @param {*} input Значение для проверки.
   * @return {boolean}
   */
  static isFieldDescription(input) {
    if (!arguments.length) {
      throw new Error(`The parameters () don't match any method signature for ${this.name}.isFieldDescription.`);
    }

    return ['string', 'number'].includes(typeof input);
  }



  /**
   * @param {*} input Значение для проверки.
   * @return {boolean}
   */
  static isFieldMode(input) {
    if (!arguments.length) {
      throw new Error(`The parameters () don't match any method signature for ${this.name}.isFieldMode.`);
    }

    return (
      typeof input === 'string' &&
      this.Field.Mode[input.toUpperCase()]
    );
  }



  /**
   * @param {*} input Значение для проверки.
   * @return {boolean}
   */
  static isFieldType(input) {
    if (!arguments.length) {
      throw new Error(`The parameters () don't match any method signature for ${this.name}.isFieldType.`);
    }

    return (
      typeof input === 'string' &&
      this.Field.Type[input.toUpperCase()]
    );
  }



  /**
   * Возвращает `true`, если объект является [`Sheet`](https://developers.google.com/apps-script/reference/spreadsheet/sheet); иначе, `false`.
   * @param {*} input Объект для проверки.
   * @return {boolean}
   */
  static isSheet(input) {
    if (!arguments.length) {
      throw new Error(`The parameters () don't match any method signature for ${this.name}.isSheet.`);
    }

    return (
      input === Object(input) &&
      input?.toString() === 'Sheet'
    );
  };



  constructor() {
    throw new Error(`${this.constructor.name} is not a constructor.`);
  }

}





/**
 * Конструктор 'Schema' - представляет собой объект для работы со схемой листа.
 * @class               Schema
 * @memberof            SheetSchema
 * @version             3.1.0
 */
SheetSchema.Schema = class Schema {

  /**
   * @param {(Object[]|SheetSchema.Field[])} [fields = []]
   */
  constructor(fields = []) {
    if (!Array.isArray(fields)) {
      throw new TypeError(`Параметры (${typeof fields}) не соответствуют сигнатуре конструктора ${this.constructor.name}.`);
    }

    /**
     * @private
     * @readonly
     * @type {SpreadsheetApp.Sheet}
     */
    Object.defineProperty(this, '_sheet', {
      "configurable": true,
      "enumerable": false,
      "writable": true,
      "value": null
    });

    /**
     * @readonly
     * @type {SheetSchema.Field[]}
     */
    this.fields = [];

    for (let [i, field] of fields.entries()) {
      try {
        field = (field ?? null);

        if (field === null) continue;

        else if (typeof field === 'string') {
          field = { "name": field };
        }

        else if (!Object.isObject(field)) {
          throw new TypeError(`Значение поля с индексом ${Math.abs(i)} должно быть Object.`);
        }

        if (typeof field.name !== 'string') {
          throw new TypeError(`Имя поля с индексом ${Math.abs(i)} должно быть String.`);
        }

        field = SheetSchema.newField(field).addToSchema(this, i + 1);
      } catch (error) {
        field = null;
        console.warn(error.stack);
      } finally {
        this.fields[i] = (field ?? null);
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
    if (!arguments.length) {
      throw new Error(`Параметры () не соответствуют сигнатуре метода ${this.constructor.name}.getFieldByName.`);
    }

    if (typeof name !== 'string') {
      throw new TypeError(`Недопустимое значение аргумента "name".`);
    }

    if (!name.length) {
      throw new TypeError(`Недопустимое значение аргумента "name".`);
    }

    return this.fields?.find(item => item?.name === name) ?? null;
  }



  /**
   * Получить поле по индексу столбца.
   * @param {Integer} colIndex
   * @return {SheetSchema.Field}
   */
  getFieldByIndex(colIndex) {
    if (!arguments.length) {
      throw new Error(`Параметры () не соответствуют сигнатуре метода ${this.constructor.name}.getFieldByIndex.`);
    }

    if (typeof colIndex !== 'number') {
      throw new TypeError(`Недопустимое значение аргумента "colIndex".`);
    }

    if (!(Number.isInteger(colIndex) && colIndex >= 0)) {
      throw new TypeError(`Недопустимое значение аргумента "colIndex".`);
    }

    return ((this.fields ?? [])[colIndex] ?? null);
  }



  /**
   * Получить поле по положению столбца.
   * @param {Integer} col 1-индексированная позиция столбца. Например, индекс столбца B равен 2.
   * @return {SheetSchema.Field}
   */
  getFieldByColumn(col) {
    if (!arguments.length) {
      throw new Error(`Параметры () не соответствуют сигнатуре метода ${this.constructor.name}.getFieldByColumn.`);
    }

    if (typeof col !== 'number') {
      throw new TypeError(`Недопустимое значение аргумента "col".`);
    }

    if (!(Number.isInteger(col) && col > 0)) {
      throw new TypeError(`Недопустимое значение аргумента "col".`);
    }

    return (this.fields[col - 1] ?? null);
  }



  /**
   * Удаляет текущую схему из листа электронной таблицы.
   * @return {boolean}
   */
  remove() {
    if (!arguments.length) {
      throw new Error(`Параметры () не соответствуют сигнатуре статического метода ${this.constructor.name}.removeSchema.`);
    }

    const sheet = this.getSheet();

    if (!SheetSchema.isSheet(sheet)) {
      throw new TypeError(`Недопустимое значение "sheet".`);
    }

    const listMetadata = sheet
      .createDeveloperMetadataFinder()
      .withLocationType(SpreadsheetApp.DeveloperMetadataLocationType.COLUMN)
      .withVisibility(SpreadsheetApp.DeveloperMetadataVisibility.DOCUMENT)
      .find();

    let fieldNamePrefix = 'schema.field.';

    for (const metadata of listMetadata) {
      if (metadata.getKey().startsWith(fieldNamePrefix)) {
        metadata.remove();
      }
    }

    return true;
  }



  /**
   * @param {SpreadsheetApp.Sheet} sheet
   * @return {SheetSchema.Schema}
   */
  setSheet(sheet) {
    if (!arguments.length) {
      throw new Error(`Параметры () не соответствуют сигнатуре метода ${this.constructor.name}.setSheet.`);
    }

    if (!SheetSchema.isSheet(sheet)) {
      throw new TypeError(`Недопустимое значение аргумента "sheet".`);
    }

    this._sheet = sheet;

    return this;
  }



  /**
   * @return {SpreadsheetApp.Sheet}
   */
  getSheet() {
    return (this._sheet ?? null);
  }



  /**
   * @return {SheetSchema.Schema}
   */
  save() {
    const sheet = this.getSheet();

    if (!sheet) {
      throw new TypeError(`Недопустимое значение sheet.`);
    }

    for (const [colIndex, field] of this.fields.entries()) {
      try {
        const col = colIndex + 1;

        let range = (sheet[`_range_column_${col}`] ?? null);

        if (!range) {
          range = (sheet.getRange(`C[${colIndex}]:C[${colIndex}]`) ?? null);
        }

        if (!range) {
          throw new TypeError(`Недопустимое значение "range".`);
        }

        const fieldNamePrefix = 'schema.field.';

        // Удалить старые метаданные
        const listMetadata = range
          .createDeveloperMetadataFinder()
          .onIntersectingLocations()
          .withLocationType(SpreadsheetApp.DeveloperMetadataLocationType.COLUMN)
          .withVisibility(SpreadsheetApp.DeveloperMetadataVisibility.DOCUMENT)
          .find();

        for (const metadata of listMetadata) {
          if (metadata.getKey().startsWith(fieldNamePrefix)) {
            metadata.remove();
          }
        }

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
   * Добавляет текущую схему в указанный лист таблицы.
   * @param {SpreadsheetApp.Sheet} sheet Лист электронной таблицы, в который будет добавлена схема.
   * @return {boolean}
   */
  addToSheet(sheet) {
    return this.setSheet(sheet).save();
  }



  /**
   * Преобразует массив значений в объект.
   * 
   * Метод берёт массив значений и преобразует его в объект, основываясь на заданной схеме (порядке полей).
   * Если поле отсутствует в объекте, его значение будет `null`.
   * 
   * #### Example
   * ```javascript
   * const values = [ 'yyyy-MM-dd', 'info', 0 ];
   * const result = schema.fromEntries(values);
   * 
   * console.log(result); // { "count": 0, "date": 'yyyy-MM-dd',  "type": 'info' }
   * ```
   * @param {Array} input
   * @return {Object}
   */
  fromEntries(input) {
    if (!arguments.length) {
      throw new Error(`Параметры () не соответствуют сигнатуре метода ${this.constructor.name}.fromEntries.`);
    }

    if (!Array.isArray(input)) {
      throw new TypeError(`Недопустимое значение аргумента.`);
    }

    const result = {};

    for (const [i, field] of this.fields.entries()) {
      result[field.name] = (input[i] ?? null);
    }

    return result;
  }



  /**
   * Преобразует объект в массив значений согласно схеме.
   * 
   * Метод берёт объект и преобразует его значения в массив, основываясь на заданной схеме (порядке полей).
   * Если поле отсутствует в объекте, его значение будет `null`.
   * 
   * #### Example
   * ```javascript
   * const values = {
   *   "count": 0,
   *   "date": 'yyyy-MM-dd',
   *   "type": 'info'
   * };
   * const result = schema.toEntries(values);
   * 
   * console.log(result); // [ 'yyyy-MM-dd', 'info', 0 ]
   * ```
   * @param {Object} input
   * @return {Array}
   */
  toEntries(input) {
    if (!arguments.length) {
      throw new Error(`Параметры () не соответствуют сигнатуре метода ${this.constructor.name}.toEntries.`);
    }

    if (!(input !== null && typeof input === 'object' && input.constructor === Object)) {
      throw new TypeError(`Недопустимое значение аргумента.`);
    }

    const result = new Array(this.fields.length).fill(null);

    for (const [i, field] of this.fields.entries()) {
      result[i] = (input[field] ?? null);
    }

    return result;
  }



  /**
   * Вызывается при преобразовании объекта в соответствующее примитивное значение.
   * @param {string} hint Строковый аргумент, который передаёт желаемый тип примитива: `string`, `number` или `default`.
   * @return {string}
   */
  [Symbol.toPrimitive](hint) {
    if (hint !== 'string') {
      return null;
    }

    return this.constructor.name;
  }



  /**
   * Возвращает значение текущего объекта.
   * @return {string}
   */
  valueOf() {
    return (this[Symbol.toPrimitive] ? this[Symbol.toPrimitive]() : this.constructor.name);
  }



  /**
   * Геттер для получения строки, представляющей тег объекта.
   * @return {string} Имя класса текущего объекта, используемое в `Object.prototype.toString`.
   */
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }



  /**
   * Возвращает строку, представляющую объект.
   * @return {string}
   */
  toString() {
    return (this[Symbol.toPrimitive] ? this[Symbol.toPrimitive]('string') : this.constructor.name);
  }

};





/**
 * Конструктор 'Field' - представляет собой объект для работы с полем схемы.
 * @class               Field
 * @memberof            SheetSchema
 * @version             3.1.0
 */
SheetSchema.Field = class Field {

  /**
   * @param {string} name Название поля.
   * @param {Object} [options = {}] Опциональные параметры.
   * @param {string} [options.description = '']
   * @param {string} [options.mode = 'NULLABLE']
   * @param {string} [options.type = 'STRING']
   * @param {SchemaApp.Schema} [options.schema]
   */
  constructor(name, options = {}) {
    if (!arguments.length) {
      throw new Error(`Параметры () не соответствуют сигнатуре конструктора ${this.constructor.name}.`);
    }


    /**
     * @private
     * @readonly
     * @type {SchemaApp.Schema}
     */
    this._schema = null;


    /**
     * @private
     * @readonly
     * @type {Object}
     */
    this._values = {
      "description": '',
      "mode": 'NULLABLE',
      "type": 'STRING',
    };


    /**
     * @private
     * @type {Proxy}
     */
    this._proxy = new Proxy(this, {

      get(target, property) {
        if (property === 'inspect') {
          return null;
        }

        if (typeof property === 'symbol') {
          return target[property];
        }

        if (typeof target[property] === 'function') {
          return (...args) => target[property].apply(this, args);
        }

        return (
          target._values[property] ??
          target[property] ??
          null
        );
      },


      set(target, property, value) {
        switch (property) {
          case 'name':
            if (!SheetSchema.isFieldName(value)) {
              throw new Error(`Параметр ${property} содержит недопустимое значение.`);
            }
            break;


          case 'description':
            if (!SheetSchema.isFieldDescription(value)) {
              throw new Error(`Параметр ${property} содержит недопустимое значение.`);
            }
            break;


          case 'mode':
            if (!SheetSchema.isFieldMode(value)) {
              throw new Error(`Параметр ${property} содержит недопустимое значение.`);
            }

            value = value.toUpperCase();
            break;


          case 'type':
            if (!SheetSchema.isFieldType(value)) {
              throw new Error(`Параметр ${property} содержит недопустимое значение.`);
            }

            value = value.toUpperCase();
            break;
        }

        target._values[property] = value;

        return value;
      }

    });


    for (const key of Object.getOwnPropertyNames(this)) {
      if (key.startsWith('_')) {
        // Скрыть свойство
        Object.defineProperty(this, key, {
          "configurable": true,
          "enumerable": false,
          "writable": true
        });
      }
    }

    // Устанавливаем значения
    this._proxy.name = name;

    for (const key in options) {
      this._proxy[key] = options[key];
    }

    return this._proxy;
  }



  /**
   * @readonly
   * @type {Integer}
   * @fixme Возможно get и set методы не будут работать с _proxy.
   */
  get index() {
    let index = (this._schema?.fields ?? [])
      .findIndex(item => item?.name === this.name);

    return (index >= 0 ? index : null);
  }



  /**
   * @readonly
   * @type {Integer}
   * @fixme Возможно `get` и `set` методы не будут работать с `_proxy`.
   */
  get values() {
    return (this._values ?? null);
  }



  /**
   * @type {SheetSchema.Schema}
   */
  getSchema() {
    return (this._schema ?? null);
  }



  /**
   * @type {SpreadsheetApp.Sheet}
   */
  getSheet() {
    return (this._schema?._sheet ?? null);
  }



  /**
   * @type {SpreadsheetApp.Range}
   */
  getRange() {
    const sheet = this.getSheet();

    if (!sheet) {
      throw new TypeError(`Недопустимое значение "sheet".`);
    }

    const colIndex = this.index;

    if (!(colIndex >= 0)) {
      return null;
    }

    const col = colIndex + 1;

    let range = (sheet[`_range_column_${col}`] ?? null);

    if (!range) {
      range = (sheet.getRange(`C[${col}]:C[${col}]`) ?? null);
    }

    return range;
  }



  /**
   * Добавляет текущее поле к указанной схеме.
   * @param {SheetSchema.Schema} schema
   * @param {Integer} col
   * @return {SheetSchema.Field}
   */
  addToSchema(schema, col) {
    if (!arguments.length) {
      throw new Error(`Параметры () не соответствуют сигнатуре метода ${this.constructor.name}.addToSchema`);
    }

    if (!SheetSchema.isSchema(schema)) {
      throw new TypeError(`Недопустимое значение аргумента "schema".`);
    }

    if (typeof col !== 'number') {
      throw new TypeError(`Недопустимое значение аргумента "col".`);
    }

    if (!(Number.isInteger(col) && col > 0)) {
      throw new TypeError(`Недопустимое значение аргумента "col".`);
    }

    this._schema = schema;

    const colIndex = col - 1;

    if (this._schema.fields.find((item, i) => item?._values?.name === this?._values?.name && colIndex !== i)) {
      throw new Error(`Поле с именем "${this?._values?.name ?? null}" уже существует!`);
    }

    this._schema.fields[colIndex] = this._proxy;

    return this._proxy;
  }



  /**
   * Удаляет данные поля схемы из указанного столбца.
   * @param {SpreadsheetApp.Range} range
   */
  remove() {
    const range = this.getRange();

    if (!range) {
      throw new TypeError(`Недопустимое значение "range".`);
    }

    const listMetadata = range
      .createDeveloperMetadataFinder()
      .onIntersectingLocations()
      .withLocationType(SpreadsheetApp.DeveloperMetadataLocationType.COLUMN)
      .withVisibility(SpreadsheetApp.DeveloperMetadataVisibility.DOCUMENT)
      .find();

    const fieldNamePrefix = 'schema.field.';

    for (const metadata of listMetadata) {
      if (metadata.getKey().startsWith(fieldNamePrefix)) {
        metadata.remove();
      }
    }

    const schema = this.getSchema();

    if (schema && this.index >= 0) {
      schema.fields[this.index] = null;
    }

    return true;
  }



  /**
   * @return {SheetSchema.Field}
   */
  save() {
    const range = this.getRange();

    if (!range) {
      throw new TypeError(`Недопустимое значение "range".`);
    }

    this.remove();

    for (const key in this._values) {
      const value = (this._values[key] ?? '').trim();

      if (key === 'description' && value === '') continue;
      if (key === 'mode' && value === 'NULLABLE') continue;
      if (key === 'type' && value === 'STRING') continue;

      range.addDeveloperMetadata(`schema.field.${key}`, value, SpreadsheetApp.DeveloperMetadataVisibility.DOCUMENT);
    }

    const schema = this.getSchema();

    if (schema && this.index >= 0) {
      schema.fields[this.index] = this;
    }

    return this._proxy;
  }



  /**
   * Вызывается при преобразовании объекта в соответствующее примитивное значение.
   * @param {string} hint Строковый аргумент, который передаёт желаемый тип примитива: `string`, `number` или `default`.
   * @return {string}
   */
  [Symbol.toPrimitive](hint) {
    if (hint !== 'string') {
      return null;
    }

    return this.constructor.name;
  }



  /**
   * Возвращает значение текущего объекта.
   * @return {string}
   */
  valueOf() {
    return (this[Symbol.toPrimitive] ? this[Symbol.toPrimitive]() : this.constructor.name);
  }



  /**
   * Геттер для получения строки, представляющей тег объекта.
   * @return {string} Имя класса текущего объекта, используемое в `Object.prototype.toString`.
   */
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }



  /**
   * Возвращает строку, представляющую объект.
   * @return {string}
   */
  toString() {
    return (this[Symbol.toPrimitive] ? this[Symbol.toPrimitive]('string') : this.constructor.name);
  }

};





/**
 * Перечисление регулярных выражений.
 * @enum {RegExp}
 * @readonly
 */
SheetSchema.Field.RegExp = {};

/**
 * @type {RegExp}
 * @readonly
 */
SheetSchema.Field.RegExp.NAME = /([a-z_$][\w$]+)/i;





/**
 * Перечисление строковых значений ...
 * @enum {string}
 * @readonly
 */
SheetSchema.Field.Mode = {};

/**
 * Столбец допускает `null` значения.
 * @type {string}
 * @readonly
 */
SheetSchema.Field.Mode.NULLABLE = 'NULLABLE';

/**
 * Столбец не допускает `null` значения.
 * @type {string}
 * @readonly
 */
SheetSchema.Field.Mode.REQUIRED = 'REQUIRED';

/**
 * @type {string}
 * @readonly
 */
SheetSchema.Field.Mode.REPATED = 'REPATED';





/**
 * Перечисление строковых значений ...
 * @enum {string}
 * @readonly
 */
SheetSchema.Field.Type = {};

/**
 * Строка - Данные символов переменной длины.
 * @type {string}
 * @readonly
 */
SheetSchema.Field.Type.STRING = 'STRING';

/**
 * Байты - Двоичные данные переменной длины.
 * @type {string}
 * @readonly
 */
SheetSchema.Field.Type.BYTES = 'BYTES';

/**
 * Целое число - Числовые значения без дробных компонентов.
 * @type {string}
 * @readonly
 */
SheetSchema.Field.Type.INTEGER = 'INTEGER';

/**
 * Целое число - Числовые значения без дробных компонентов.
 * @type {string}
 * @readonly
 */
SheetSchema.Field.Type.INT64 = 'INT64';

/**
 * Плавающая точка - Приблизительные числовые значения с дробными составляющими.
 * @type {string}
 * @readonly
 */
SheetSchema.Field.Type.FLOAT = 'FLOAT';

/**
 * Плавающая точка - Приблизительные числовые значения с дробными составляющими.
 * @type {string}
 * @readonly
 */
SheetSchema.Field.Type.FLOAT64 = 'FLOAT64';

/**
 * Булево - ИСТИНА или ЛОЖЬ (без учета регистра).
 * @type {string}
 * @readonly
 */
SheetSchema.Field.Type.BOOLEAN = 'BOOLEAN';

/**
 * @type {string}
 * @readonly
 */
SheetSchema.Field.Type.BOOL = 'BOOL';

/**
 * Отметка времени - Абсолютный момент времени с точностью до микросекунд.
 * @type {string}
 * @readonly
 */
SheetSchema.Field.Type.TIMESTAMP = 'TIMESTAMP';

/**
 * Дата - Логическая календарная дата.
 * @type {string}
 * @readonly
 */
SheetSchema.Field.Type.DATE = 'DATE';

/**
 * Время - Время, не зависящее от конкретной даты.
 * @type {string}
 * @readonly
 */
SheetSchema.Field.Type.TIME = 'TIME';

/**
 * Дата/время - Год, месяц, день, час, минута, секунда и доля секунды.
 * @type {string}
 * @readonly
 */
SheetSchema.Field.Type.DATETIME = 'DATETIME';

/**
 * География - На поверхности множества точек Земли.
 * @type {string}
 * @readonly
 */
SheetSchema.Field.Type.GEOGRAPHY = 'GEOGRAPHY';

/**
 * Числовой - Точные числовые значения с дробными компонентами.
 * @type {string}
 * @readonly
 */
SheetSchema.Field.Type.NUMERIC = 'NUMERIC';





if (typeof Object.isObject !== 'function') {
  /**
   * Возвращает `true`, если объект является [`Object`](#); иначе, `false`.
   * @param {*} input Объект для проверки.
   * @return {boolean}
   */
  Object.isObject = input => {
    if (!arguments.length)
      return false;

    return (
      input !== null &&
      typeof input === 'object' &&
      input.constructor === Object
    );
  };
}
