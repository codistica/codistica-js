/** @flow */

import {Button, InputText} from '@codistica/react';
import componentClassNames from './index.module.scss';

Button.globalClassNames.default = {
    button: componentClassNames.button,
    buttonEnabled: componentClassNames.buttonEnabled
};

InputText.globalClassNames.default = {
    root: componentClassNames.inputTextRoot,
    input: componentClassNames.inputTextInput
};
