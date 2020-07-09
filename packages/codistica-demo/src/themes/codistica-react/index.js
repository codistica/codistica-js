/** @flow */

import {Button, InputText} from '@codistica/react';
import darkClassNames from './dark.module.scss';

Button.globalClassNames.default = {
    button: darkClassNames.button,
    buttonEnabled: darkClassNames.buttonEnabled
};

InputText.globalClassNames.default = {
    root: darkClassNames.inputTextRoot,
    input: darkClassNames.inputTextInput
};
