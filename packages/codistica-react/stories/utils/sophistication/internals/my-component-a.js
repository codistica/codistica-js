/** @flow */

import React, {useState} from 'react';
import {mergeClassNames} from '../../../../src/modules/merge-class-names.js';
import {useSophistication} from './my-component-a.sophistication.js';

function MyComponentA(props: any) {
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

export {MyComponentA};
