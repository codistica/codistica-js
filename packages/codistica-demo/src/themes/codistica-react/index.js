/** @flow */

import {Button} from '@codistica/react';
import darkClassNames from './dark.module.scss';

Button.globalClassNames.default = {
    button: darkClassNames.button,
    buttonEnabled: darkClassNames.buttonEnabled
};
