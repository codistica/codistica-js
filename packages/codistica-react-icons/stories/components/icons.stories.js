/** @flow */

import {randomizer} from '@codistica/core';
import {createSophistication} from '@codistica/react';
import {default as centered} from '@storybook/addon-centered/react';
import React, {useState, Fragment} from 'react';
import {
    Aws as AwsIcon,
    Babel as BabelIcon,
    Bitbucket as BitbucketIcon,
    C as CIcon,
    CPlusPlus as CPlusPlusIcon,
    CircleCI as CircleCIIcon
} from '../../src/index.js';

const useSophistication = createSophistication({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    icons: {
        margin: '50px 200px',
        '& > svg': {
            height: 100,
            width: 100,
            margin: 10
        }
    },
    buttons: {
        marginTop: 100,
        '& > button': {
            margin: 10
        }
    }
});

const icons = [
    AwsIcon,
    BabelIcon,
    BitbucketIcon,
    CIcon,
    CPlusPlusIcon,
    CircleCIIcon
];

/**
 * @description An all icons demo.
 * @returns {Object<string,*>} React component.
 */
function AllIcons() {
    const [color, setColor] = useState(null);
    const jssClassNames = useSophistication();
    return (
        <Fragment>
            <div className={jssClassNames.root}>
                <div className={jssClassNames.icons}>
                    {icons.map((Icon, key) => (
                        <Icon key={key} color={color} />
                    ))}
                </div>

                <div className={jssClassNames.buttons}>
                    <button
                        onClick={() => {
                            setColor(null);
                        }}>
                        {'Default Fill'}
                    </button>
                    <button
                        onClick={() => {
                            setColor('#dededd');
                        }}>
                        {'B/W Fill'}
                    </button>
                    <button
                        onClick={() => {
                            setColor(randomizer.getHEXColor());
                        }}>
                        {'Random Fill'}
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

const meta = {
    title: 'Icons',
    parameters: {
        backgrounds: {
            default: 'Dark'
        }
    },
    decorators: [centered]
};

export {AllIcons};
export default meta;
