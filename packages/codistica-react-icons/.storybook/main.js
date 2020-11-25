const {fileUtils} = require('@codistica/node');
const {resolve} = require('path');

const stories = ['../stories/**/*.stories.[tj]s'];

if (fileUtils.existsSync(resolve(__dirname, '../build-icons-output/stories'))) {
    stories.push('../build-icons-output/stories/**/*.stories.[tj]s');
}

module.exports = {
    stories,
    addons: ['@storybook/addon-backgrounds']
};
