module.exports = {
    reporter: ['lcov', 'text'],
    all: true,
    extension: ['.js'],
    include: [
        'packages/codistica-core/lib',
        'packages/codistica-dev-tools/lib',
        'packages/codistica-node/lib',
        'packages/codistica-scriptfiber/lib',
        'packages/codistica-types/lib'
    ],
    'exclude-after-remap': false,
    watermarks: {
        lines: [80, 95],
        functions: [80, 95],
        branches: [80, 95],
        statements: [80, 95]
    },
    branches: 80,
    lines: 80,
    functions: 80,
    statements: 80
};
