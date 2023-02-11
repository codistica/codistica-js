/** @module types/classes/types */

// TODO: ACCEPT RULES AS DEFAULT VALUES. RE-WRITE checkRule METHOD? TO BE ANALOG TO checkRuleSet METHOD?

// TODO: ALLOW _noRule AND _noRuleSet PROP TO EXPLICITLY TELL TYPES AN OBJECT IS NOT A RULE OR A RULE SET. AUTOMATICALLY STRIP THEM. ['_noRule'] AND ['_noRuleSet'] IN CASE OF ARRAYS. IF _noRule PRESENT, ALLOW IT TO BE A ruleSet THOUGH AND VICEVERSA.

// TODO: IMPLEMENT CIRCULAR SCHEMA CHECKING LOGIC.
// TODO: CIRCULARITY SHOULD BE CONVERTED ON INSTANTIATION. OTHERWISE, CONTEXT PATTERN WOULD HAVE TO BE IMPLEMENTED IN INSTANCE METHODS.
// TODO: DO NOT ADD OVERHEAD DURING RUNTIME! ONLY ON INITIALIZATION IF NEEDED.

// TODO: TEST JSDOC SPECIFIC VALUES SUPPORT AND FILL JSDOC WITH THEM IF SUPPORTED: 'Object', 'Array', 'boolean', etc...

// TODO: COMMENT CODE!
// TODO: ADD NOTE ABOUT INSTANCE PERFORMANCE VS INITIALIZATION!!! TO NOT SPOKE PEOPLE WITH CLASS LENGTH.

// TODO: SAVE TYPE ERRORS IN AN ARRAY TO BE USED AFTER VALIDATION.

// TODO: ALLOW PASSING CONSTRUCTOR AS TYPE (EX: Date) TO CHECK instanceof AND CHECK USAGES TO APPLY WHERE POSSIBLE.

// TODO: CHECK NAMING.

// TODO: PRINT USEFUL WARNINGS WHEN VALIDATION FAILS AND WHEN DEFAULT VALUE IS BEING USED.

// TODO: ADD JSDOC FOR SUPPORTED TYPES (EX: string, boolean, !string...)

/**
 * @typedef {(typesRuleType|typesRuleSetType)} typesSchemaType
 */

/**
 * @typedef {(Array<typesRuleType>|Object<string,typesRuleType>)} typesRuleSetType
 */

/**
 * @typedef typesRuleType
 * @property {typesTypeType} type - Expected type or expected types array.
 * @property {*} [min] - Min element value.
 * @property {*} [max] - Max element value.
 * @property {(Array<*>|*)} [equal] - The received value must be equal to one of the specified values.
 * @property {(typesRuleSetType|*)} [def] - Default value/schema to be applied if type is not satisfied.
 * @property {boolean} [optional] - Indicates that the presence of the value represented by this rule is not mandatory.
 * @property {boolean} [strict] - Do not allow extra properties.
 */

/**
 * @typedef {(string|typesSchemaType|Array<(string|typesSchemaType|Array<(string|typesSchemaType)>)>)} typesTypeType
 */

/**
 * @callback typesStepBackType
 * @returns {void} Void.
 */

/**
 * @callback typesCallType
 * @param {Function} fn - Function to be called.
 * @param {*} arg - Arguments to be passed to the function.
 * @param {*} [defaultValue] - Default value to be returned if circular reference is found.
 * @returns {*} Called function returned value or default value.
 */

/**
 * @typedef typesContextType
 * @property {Set<Array<*>|Object<string,*>>} branchCircularCache - Cache set for branch circular checking.
 * @property {typesCallType} call - Auxiliary method.
 */

/**
 * @classdesc A class for dynamic type-checking and default set.
 */
class Types {
    /**
     * @description Constructor.
     * @param {typesSchemaType} schema - Instance schema.
     */
    constructor(schema) {
        const that = this;

        if (!Types.isValidSchema(schema)) {
            throw new Error('Types - INVALID SCHEMA. ABORTING.');
        }

        /** @type {(WeakMap<(typesRuleType|*),boolean>)} */
        this.ruleCache = new WeakMap();
        /** @type {(WeakMap<(typesRuleSetType|*),boolean>)} */
        this.ruleSetCache = new WeakMap();
        /** @type {typesSchemaType} */
        this.schema = schema;
        /** @type {(boolean|null)} */
        this.validationState = null;

        /** @type {Set<Array<*>|Object<string,*>>} */
        const branchCircularCache = new Set();

        // BUILD CACHE
        this.ruleCache.set(this.schema, Types.isValidRule(this.schema));
        this.ruleSetCache.set(this.schema, Types.isValidRuleSet(this.schema));

        branchCircularCache.add(this.schema);

        recurse(this.schema);

        /**
         * @description Recursive function.
         * @param {typesSchemaType} currentElement - Rule set.
         * @returns {void} Void.
         */
        function recurse(currentElement) {
            const keys = Types.getKeys(currentElement);
            const length = keys.length;
            for (let i = 0; i < length; i++) {
                const key = keys[i];
                if (
                    Array.isArray(currentElement[key]) ||
                    (typeof currentElement[key] === 'object' &&
                        currentElement[key] !== null)
                ) {
                    if (branchCircularCache.has(currentElement[key])) {
                        branchCircularCache.delete(currentElement[key]);
                        continue;
                    }
                    branchCircularCache.add(currentElement[key]);
                    that.ruleCache.set(
                        currentElement[key],
                        Types.isValidRule(currentElement[key])
                    );
                    that.ruleSetCache.set(
                        currentElement[key],
                        Types.isValidRuleSet(currentElement[key])
                    );
                    recurse(currentElement[key]);
                    branchCircularCache.delete(currentElement[key]);
                }
            }
        }
    }

    /**
     * @instance
     * @description Returns the latest validation result.
     * @returns {(boolean|null)} Result.
     */
    isValid() {
        return this.validationState;
    }

    /**
     * @instance
     * @description Validate input using instance schema.
     * @param {*} input - Input value to be validated.
     * @returns {*} Validated input.
     */
    validate(input) {
        let rule = null;
        let ruleSet = null;

        if (this.ruleCache.get(this.schema)) {
            rule = /** @type {typesRuleType} */ (this.schema);

            this.validationState = true;

            if (!this.checkRule(rule, input)) {
                this.validationState =
                    rule.optional || typeof rule.def !== 'undefined';

                if (this.ruleSetCache.get(rule.def)) {
                    ruleSet = /** @type {typesRuleSetType} */ (rule.def);
                    input = Types.getStructure(ruleSet);
                } else {
                    input = rule.def;
                }
            }
        } else if (this.ruleSetCache.get(this.schema)) {
            ruleSet = /** @type {typesRuleSetType} */ (this.schema);

            this.validationState = true;

            if (!this.checkStructure(ruleSet, input)) {
                input = Types.getStructure(ruleSet);
            }
        } else {
            return undefined;
        }

        if (ruleSet) {
            this.checkRuleSet(ruleSet, input, true);
        }

        return input;
    }

    /**
     * @instance
     * @description Checks input value structure against specified structure.
     * @param {(Array|Object<string,*>)} structure - Input structure.
     * @param {*} value - Input value to be structure-checked.
     * @returns {boolean} Check result.
     */
    checkStructure(structure, value) {
        if (Array.isArray(structure)) {
            return Array.isArray(value);
        } else {
            return (
                !Array.isArray(value) &&
                typeof value === 'object' &&
                value !== null
            );
        }
    }

    /**
     * @instance
     * @description Checks input value against specified rule set.
     * @param {typesRuleSetType} ruleSet - Types rule set.
     * @param {*} value - Current value.
     * @param {boolean} [write] - Write corrections to input.
     * @returns {boolean} Check result.
     */
    checkRuleSet(ruleSet, value, write) {
        const keys = Types.getKeys(ruleSet);
        const length = keys.length;
        for (let i = 0; i < length; i++) {
            const key = keys[i];
            /** @constant {typesRuleType} */
            const currentRule = ruleSet[key];
            const ruleCheckResult = this.checkRule(currentRule, value[key]);
            let overriddenDef = null;
            if (!ruleCheckResult) {
                if (!write) {
                    if (
                        !currentRule.optional &&
                        typeof currentRule.def === 'undefined'
                    ) {
                        return false;
                    }
                }
                if (this.validationState !== false) {
                    this.validationState =
                        currentRule.optional ||
                        typeof currentRule.def !== 'undefined';
                }
                if (this.ruleSetCache.get(currentRule.def)) {
                    value[key] = Types.getStructure(currentRule.def);
                    this.checkRuleSet(currentRule.def, value[key], write);
                } else {
                    value[key] = currentRule.def;
                }
            } else {
                if (this.ruleSetCache.get(ruleCheckResult)) {
                    overriddenDef = /** @type {typesRuleSetType} */ (
                        ruleCheckResult
                    );
                }
                if (
                    overriddenDef ||
                    ((ruleCheckResult === 'object' ||
                        ruleCheckResult === 'array') &&
                        this.ruleSetCache.get(currentRule.def) &&
                        this.checkStructure(currentRule.def, value[key]))
                ) {
                    if (
                        !this.checkRuleSet(
                            overriddenDef || currentRule.def,
                            value[key],
                            write
                        )
                    ) {
                        if (!write) {
                            return false;
                        }
                    }
                }
            }
            if (currentRule.strict && write) {
                if (
                    Array.isArray(value[key]) ||
                    (typeof value[key] === 'object' && value[key] !== null)
                ) {
                    Types.getKeys(value[key]).forEach((valueKey) => {
                        if (
                            !Types.getKeys(
                                overriddenDef || currentRule.def
                            ).some((defKey) => defKey === valueKey)
                        ) {
                            delete value[key][valueKey];
                        }
                    });
                }
            }
        }
        return true;
    }

    /**
     * @instance
     * @description Checks input value against specified rule.
     * @param {typesRuleType} rule - Types rule.
     * @param {*} value - Input value to be rule-checked.
     * @returns {(string|typesRuleSetType|null)} Matched type or null.
     */
    checkRule(rule, value) {
        if (
            this.checkRange(rule.min, rule.max, value) &&
            this.checkEqual(rule.equal, value)
        ) {
            return this.checkType(rule.type, value);
        } else {
            return null;
        }
    }

    /**
     * @instance
     * @description Checks input against specified range.
     * @param {*} min - Minimum value.
     * @param {*} max - Maximum value.
     * @param {*} value - Input value to be range-checked.
     * @returns {boolean} Check result.
     */
    checkRange(min, max, value) {
        return (min ? value >= min : true) && (max ? value <= max : true);
    }

    /**
     * @instance
     * @description Checks input against specified equal.
     * @param {Array<*>|*} equal - Minimum value.
     * @param {*} value - Input value to be range-checked.
     * @returns {boolean} Check result.
     */
    checkEqual(equal, value) {
        if (typeof equal === 'undefined') {
            return true;
        } else {
            return (Array.isArray(equal) ? equal : [equal]).some(
                (currentEqual) => {
                    return currentEqual === value;
                }
            );
        }
    }

    /**
     * @instance
     * @description Checks input against specified type.
     * @param {typesTypeType} type - Types type.
     * @param {*} value - Input value to be type-checked.
     * @returns {(string|typesRuleSetType|null)} Matched type or null.
     */
    checkType(type, value) {
        let rule = null;
        let ruleSet = null;
        let matchedType = null;
        (Array.isArray(type) ? type : [type]).some((currentType) => {
            if (typeof currentType === 'string') {
                // STRING TYPE
                matchedType = this.checkStringType(currentType, value);
            } else if (this.ruleCache.get(currentType)) {
                // RULE TYPE
                rule = /** @type {typesRuleType} */ (currentType);

                matchedType = this.checkRule(rule, value);

                if (
                    (matchedType === 'object' || matchedType === 'array') &&
                    this.ruleSetCache.get(rule.def) &&
                    this.checkStructure(rule.def, value)
                ) {
                    ruleSet = /** @type {typesRuleSetType} */ (rule.def);
                    if (!this.checkRuleSet(ruleSet, value)) {
                        matchedType = null;
                    }
                }
            } else if (this.ruleSetCache.get(currentType)) {
                // RULE SET TYPE
                ruleSet = /** @type {typesRuleSetType} */ (currentType);

                if (this.checkStructure(ruleSet, value)) {
                    matchedType = this.checkRuleSet(ruleSet, value);
                }
            } else if (Array.isArray(currentType)) {
                // ARRAY TYPE
                matchedType =
                    Array.isArray(value) &&
                    (!currentType.length ||
                        (value.length &&
                            value.every((innerValue) =>
                                this.checkType(currentType, innerValue)
                            )));
            }

            matchedType =
                matchedType &&
                (typeof currentType === 'string'
                    ? currentType.toLowerCase()
                    : currentType);

            return matchedType;
        });

        return matchedType;
    }

    /**
     * @instance
     * @description Checks input against specified type (string format).
     * @param {string} stringType - Type type (string format).
     * @param {*} value - Input value to be type-checked.
     * @returns {(string|null)} Matched type or null.
     */
    checkStringType(stringType, value) {
        const negate = stringType.charAt(0) === '!';
        const content = Types.getStringTypeContent(stringType);
        const typeofString = Types.getStringTypeTypeofString(stringType);
        let checkResult = null;
        switch (typeofString) {
            case '*':
                checkResult = true;
                break;
            case 'null':
                if (value === null) {
                    checkResult = true;
                }
                break;
            case 'array':
                if (
                    Array.isArray(value) &&
                    (!content.length ||
                        (value.length &&
                            value.every((innerValue) =>
                                this.checkType(content, innerValue)
                            )))
                ) {
                    checkResult = true;
                }
                break;
            case 'object':
                if (
                    typeof value === 'object' &&
                    value !== null &&
                    !Array.isArray(value)
                ) {
                    checkResult = true;
                    if (content.length) {
                        for (const i in value) {
                            if (
                                !Object.prototype.hasOwnProperty.call(value, i)
                            ) {
                                continue;
                            }
                            if (!this.checkType(content, value[i])) {
                                checkResult = null;
                                break;
                            }
                        }
                    }
                }
                break;
            case 'regexp':
                if (value instanceof RegExp) {
                    checkResult = true;
                }
                break;
            default:
                if (typeof value === typeofString) {
                    checkResult = true;
                }
                break;
        }
        if (checkResult) {
            return negate ? null : stringType;
        } else {
            return negate ? '!' + stringType : null;
        }
    }

    /**
     * @description Determines if the input is a valid schema.
     * @param {*} input - Input.
     * @param {typesContextType|undefined} [context] - Check context.
     * @returns {boolean} Check result.
     */
    static isValidSchema(input, context) {
        context = Types.createContext(context);
        return (
            Types.isValidRule(input, context) ||
            Types.isValidRuleSet(input, context)
        );
    }

    /**
     * @description Determines if the input is a valid rule set.
     * @param {*} input - Input.
     * @param {typesContextType|undefined} [context] - Check context.
     * @returns {boolean} Check result.
     */
    static isValidRuleSet(input, context) {
        let keys = null;
        let length = null;
        context = Types.createContext(context);
        if (
            !Array.isArray(input) &&
            (typeof input !== 'object' || input === null)
        ) {
            return false;
        } else {
            keys = Types.getKeys(input);
            length = keys.length;
            for (let i = 0; i < length; i++) {
                if (!Types.isValidRule(input[keys[i]], context)) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * @description Determines if the input is a valid rule.
     * @param {*} input - Input.
     * @param {typesContextType|undefined} [context] - Check context.
     * @returns {boolean} Check result.
     */
    static isValidRule(input, context) {
        let validKeysFound = 0;
        context = Types.createContext(context);
        if (typeof input !== 'object' || input === null) {
            return false;
        }
        if (Types.isValidType(input.type, context)) {
            validKeysFound++;
        } else {
            return false;
        }
        if (Object.prototype.hasOwnProperty.call(input, 'max')) {
            validKeysFound++;
        }
        if (Object.prototype.hasOwnProperty.call(input, 'min')) {
            validKeysFound++;
        }
        if (Object.prototype.hasOwnProperty.call(input, 'def')) {
            validKeysFound++;
        }
        if (Object.prototype.hasOwnProperty.call(input, 'optional')) {
            if (typeof input.optional === 'boolean') {
                validKeysFound++;
            }
        }
        if (Object.prototype.hasOwnProperty.call(input, 'strict')) {
            if (typeof input.strict === 'boolean') {
                validKeysFound++;
            }
        }
        return (
            validKeysFound > 0 &&
            validKeysFound === Object.getOwnPropertyNames(input).length
        );
    }

    /**
     * @description Determines if the input is a valid type.
     * @param {*} input - Input.
     * @param {typesContextType|undefined} [context] - Check context.
     * @returns {boolean} Check result.
     */
    static isValidType(input, context) {
        context = Types.createContext(context);
        if (Array.isArray(input)) {
            return !!(
                input.length !== 0 &&
                input.every((currentType) => {
                    if (Array.isArray(currentType)) {
                        return currentType.every((subType) => {
                            if (typeof subType === 'string') {
                                return true;
                            } else {
                                return context.call(
                                    Types.isValidSchema,
                                    subType,
                                    true
                                );
                            }
                        });
                    } else {
                        if (typeof currentType === 'string') {
                            return true;
                        } else {
                            return context.call(
                                Types.isValidSchema,
                                currentType,
                                true
                            );
                        }
                    }
                })
            );
        } else {
            if (typeof input === 'string') {
                return true;
            } else {
                return context.call(Types.isValidSchema, input, true);
            }
        }
    }

    /**
     * @description Returns the input found keys.
     * @param {*} input - Input.
     * @returns {(Array<(string|number)>)} Found keys array.
     */
    static getKeys(input) {
        if (Array.isArray(input)) {
            return Object.keys(input).map((a) => parseInt(a));
        } else if (typeof input === 'object' && input !== null) {
            return Object.getOwnPropertyNames(input);
        } else {
            return [];
        }
    }

    /**
     * @description Returns correct empty structure or primitive depending on input.
     * @param {*} value - Input value.
     * @returns {*} Output.
     */
    static getStructure(value) {
        if (Array.isArray(value)) {
            return [];
        } else if (typeof value === 'object' && value !== null) {
            return {};
        } else {
            return value;
        }
    }

    /**
     * @description Translates a Types type string to a typeof valid string.
     * @param {string} str - Input string.
     * @returns {string} Typeof valid string.
     */
    static getStringTypeTypeofString(str) {
        return (str.charAt(0) === '!' ? str.substring(1) : str)
            .replace(/[^\w*].*$/, '')
            .toLowerCase();
    }

    /**
     * @description Parses type content if available.
     * @param {string} str - Input string.
     * @returns {Array<string>} Type content array.
     */
    static getStringTypeContent(str) {
        const contentStr = str.match(/<[^<]*>/);
        if (contentStr) {
            return contentStr[0].replace(/[^\w*|]/g, '').split('|');
        }
        return [];
    }

    /**
     * @description Returns unaltered context or a new context if undefined.
     * @param {typesContextType|undefined} context - Context.
     * @returns {typesContextType} Existent or new created context.
     */
    static createContext(context) {
        return (context = context
            ? context
            : {
                  branchCircularCache: new Set(),
                  call
              });

        /**
         * @description Calls passed function with circular references awareness.
         * @param {Function} fn - Function to be called.
         * @param {*} arg - Arguments to be passed to the function.
         * @param {*} [defaultValue] - Default value to be returned if circular reference is found.
         * @returns {*} Called function returned value or default value.
         */
        function call(fn, arg, defaultValue) {
            let calledResult = null;
            let stepBackFn = isNotCircular(arg);
            if (stepBackFn) {
                calledResult = fn(arg, context);
                stepBackFn();
                return calledResult;
            } else {
                return defaultValue;
            }
        }

        /**
         * @description Determines if passed input do not represent a circular reference.
         * @param {*} input - Input.
         * @returns {typesStepBackType|null} Result.
         */
        function isNotCircular(input) {
            if (
                Array.isArray(input) ||
                (typeof input === 'object' && input !== null)
            ) {
                if (context.branchCircularCache.has(input)) {
                    return null;
                } else {
                    context.branchCircularCache.add(input);
                    /**
                     * @description Removes relative cache entry when branch is moving backwards.
                     * @returns {void} Void.
                     */
                    return function stepBack() {
                        context.branchCircularCache.delete(input);
                    };
                }
            }
            /**
             * @description Mock version of stepBack function.
             * @returns {void} Void.
             */
            return function noop() {};
        }
    }
}

export {Types};
