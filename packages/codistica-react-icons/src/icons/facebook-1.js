/** @flow */

import React from 'react';
import {SvgIcon} from '../utils/svg-icon/svg-icon.js';

type DefaultProps = {|
    title: string,
    size: string | number | null,
    color: string | null,
    backgroundColor: string | null
|};

type Props = {
    ...DefaultProps
};

function Facebook1(props: Props) {
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <path
                d={
                    'M368.04 166.36c3.88-4.61 11.58-6.86 23.53-6.86l50.91-.02V71.6l-8.68-1.15c-7.7-1.02-32.71-3.13-60.94-3.13-32.28 0-59.55 10.08-78.85 29.16-19.98 19.74-30.54 48.44-30.54 82.98v46.98h-66.72v97.28h66.72V512h99.8V323.73h65.35l12.54-97.28h-77.89v-39.33c0-10.3 1.51-16.9 4.77-20.76z'
                }
                fill={backgroundColor || '#ffffff'}
            />
            <path
                d={
                    'M483.74 0H28.26A28.25 28.25 0 000 28.26v455.48A28.26 28.26 0 0028.26 512h245.21V313.73h-66.72v-77.28h66.72v-56.98c0-66.13 40.4-102.14 99.39-102.14 28.25 0 52.54 2.1 59.62 3.04v69.11l-40.92.02c-32.08 0-38.29 15.25-38.29 37.62v49.33h76.52l-9.97 77.28h-66.55V512h130.47A28.26 28.26 0 00512 483.74V28.26A28.26 28.26 0 00483.74 0z'
                }
                fill={color || '#485a96'}
            />
        </SvgIcon>
    );
}

Facebook1.defaultProps = ({
    title: 'Facebook1Icon',
    size: null,
    color: null,
    backgroundColor: null
}: DefaultProps);

export {Facebook1};
