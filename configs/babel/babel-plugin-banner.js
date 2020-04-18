'use strict';

const codisticaLicense = `/**
 * @license Codistica
 *
 * Copyright (c) 2019, Codistica and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * BUILD DATE: ${new Date().toString()}
 */`;

module.exports = [
    '@comandeer/babel-plugin-banner',
    {
        banner: codisticaLicense
    }
];
