// TODO: TEMP. REVERT TO "module.exports = '@codistica/prettier-config-default' AFTER FIXING PRESET.

const {
    jsxBracketSameLine, // DEPRECATED
    ...config
} = require('@codistica/prettier-config-default');

module.exports = {
    ...config,
    bracketSameLine: true // NEW PROPERTY NAME
};
