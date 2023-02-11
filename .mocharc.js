module.exports = {
    require: ['./.mocha/setup-tests.js', 'global-jsdom/register'],
    reporter: 'spec',
    checkLeaks: true,
    slow: 75 // DEFAULT: 75ms
};
