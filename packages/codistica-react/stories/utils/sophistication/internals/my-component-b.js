/** @flow */

import React, {useState} from 'react';
import {mergeClassNames} from '../../../../src/index.js';
import {useSophistication} from './my-component-b.sophistication.js';

function MyComponentB(props: any) {
    const [toggle, setToggle] = useState(true);
    const jssClassNames = useSophistication({toggle, ...props});
    return (
        <div
            onClick={() => setToggle(!toggle)}
            style={{cursor: 'pointer'}}
            className={mergeClassNames(
                jssClassNames.dynamicStyle,
                jssClassNames.mixedValues,
                jssClassNames.staticStyle
            )}>
            {props.text}
        </div>
    );
}

export {MyComponentB};
