import {assert} from 'chai';
import {Types} from '../../classes/types.js';

/** @see module:codistica-types/classes/types */
function typesTest() {
    describe('Types', () => {
        const definitionA = {
            type: 'RegExp',
            def: 'defValA'
        };

        const definitionB = {
            val1: {
                type: [definitionA, 'Object', 'number'],
                def: definitionA
            },
            val2: {type: 'number'}
        };

        const definitionC = {
            type: {
                c1: {type: definitionB},
                c2: {type: 'boolean'}
            },
            def: definitionB
        };

        const definitionD = {
            val1: {type: 'boolean', def: 'defValD1'},
            val2: {type: 'number', def: 'defValD2'}
        };

        it('Should return unaltered inputs.', () => {
            let tests = [];

            tests.push({
                rule: {type: 'number', def: 'default'},
                inputs: [4]
            });

            tests.push({
                rule: {type: 'string', def: null, min: 'a', max: 'c'},
                inputs: ['b']
            });

            tests.push({
                rule: {type: ['string', 'Array<string>']},
                inputs: ['string', ['a', 'b']]
            });

            tests.push({
                rule: definitionA,
                inputs: [/\d\w/]
            });

            tests.push({
                rule: {type: definitionB},
                inputs: [{val1: /\d/, val2: 2}]
            });

            tests.push({
                rule: definitionB,
                inputs: [{val1: 5, val2: 5, extraProp: 7}]
            });

            tests.push({
                rule: {type: ['string', 'number', ['string', 'number']]},
                inputs: [[0, 2, 4, 6], 'testString', 1234, ['a', 'b', 'c']]
            });

            tests.forEach((test) => {
                const instance = new Types(test.rule);
                test.inputs.forEach((input) => {
                    assert.deepEqual(instance.validate(input), input);
                    assert.isTrue(instance.isValid());
                });
            });
        });

        it('Should return the default values.', () => {
            let tests = [];

            tests.push({
                rule: {type: 'number', def: 0},
                inputs: ['a']
            });

            tests.push({
                rule: {type: 'string', def: /\d/},
                inputs: [console.log]
            });

            tests.push({
                rule: {type: ['string', 'Array<string>'], def: []},
                inputs: [['a', 'b', 0], 5]
            });

            tests.push({
                rule: {type: definitionB, def: 'default'},
                inputs: ['string', {val1: 5, val2: 'not a number'}]
            });

            tests.push({
                rule: {type: 'number', min: 2, max: 5, def: 'defaultNumber'},
                inputs: [-1, 6, -0.01, 5.01]
            });

            tests.push({
                rule: {
                    type: 'string',
                    min: 'd',
                    max: 'h',
                    def: 'defaultString'
                },
                inputs: ['a', 'az', 'ha']
            });

            tests.push({
                rule: {
                    type: ['string', 'number', ['string', 'number']],
                    def: null
                },
                inputs: [true, [], [true, false], [0, null]]
            });

            tests.push({
                rule: {type: definitionC, def: 'default'},
                inputs: [
                    4,
                    {c1: {val1: {}, val2: null}, c2: true},
                    {c1: true, c2: null},
                    {c1: true, C3: 'not a boolean'}
                ]
            });

            tests.forEach((test) => {
                const instance = new Types(test.rule);
                test.inputs.forEach((input) => {
                    assert.deepEqual(instance.validate(input), test.rule.def);
                    assert.isTrue(instance.isValid());
                });
            });
        });

        it('Should return corrected inputs as expected.', () => {
            let tests = [];

            tests.push({
                rule: {type: definitionD, def: definitionD},
                inputs: [7, {val1: 0, val2: null}, {val1: null}, undefined],
                expect: {val1: 'defValD1', val2: 'defValD2'}
            });

            tests.forEach((test) => {
                const instance = new Types(test.rule);
                test.inputs.forEach((input) => {
                    assert.deepEqual(instance.validate(input), test.expect);
                    assert.isTrue(instance.isValid());
                });
            });
        });

        it('Should result in an invalid state.', () => {
            let tests = [];

            tests.push({
                rule: definitionB,
                inputs: [{val1: 5}, {val1: null}, {val2: null}, null, undefined]
            });

            tests.push({
                rule: {
                    A: {type: definitionB, def: 'defValA'},
                    B: {type: '!number'}
                },
                inputs: [{A: null, B: 5}]
            });

            tests.push({
                rule: {type: 'number', min: 2, max: 5},
                inputs: [0, 6, -1, 5.5]
            });

            tests.push({
                rule: {type: 'string', min: 'e', max: 'h'},
                inputs: ['a', 'z', 'this is a test', 'hh']
            });

            tests.forEach((test) => {
                const instance = new Types(test.rule);
                test.inputs.forEach((input) => {
                    instance.validate(input);
                    assert.isFalse(instance.isValid());
                });
            });
        });

        it('Should result in a valid state.', () => {
            let tests = [];

            tests.push({
                rule: {
                    A: {type: definitionB, def: 'defA'},
                    B: {type: '!number'}
                },
                inputs: [{A: null, B: null}, {A: {}}, null, undefined]
            });

            tests.forEach((test) => {
                const instance = new Types(test.rule);
                test.inputs.forEach((input) => {
                    instance.validate(input);
                    assert.isTrue(instance.isValid());
                });
            });
        });

        it('Should handle circular schemas at instantiation time with no errors.', () => {
            let tests = [];

            let circularSchemaA = {def: null};
            circularSchemaA.type = ['string', [circularSchemaA]];

            let circularSchemaB = {
                prop1: {type: definitionA, def: true},
                prop2: {type: [definitionB, circularSchemaA]}
            };

            let circularSchemaC = [
                {type: 'boolean', def: false},
                {
                    type: 'Object',
                    def: {
                        nestedRuleA: circularSchemaA,
                        nestedRuleB: circularSchemaB
                    }
                }
            ];

            tests.push({
                rule: circularSchemaA
            });

            tests.push({
                rule: circularSchemaB
            });

            tests.push({
                rule: circularSchemaC
            });

            tests.forEach((test) => {
                assert.doesNotThrow(() => new Types(test.rule));
            });
        });
    });
}

export {typesTest};
