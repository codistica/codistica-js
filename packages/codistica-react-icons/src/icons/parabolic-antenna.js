/** @flow */

import React from 'react';
import {SvgIcon} from '../utils/svg-icon/svg-icon.js';

type DefaultProps = {|
    title: string,
    size: string | number | null,
    color: string | null
|};

type Props = {
    ...DefaultProps
};

function ParabolicAntenna(props: Props) {
    const {color, ...other} = props;
    return (
        <SvgIcon {...other}>
            <g fill={color || '#000000'}>
                <path
                    d={
                        'M78.9 74.63c.27-23.04 3.03-45.72 9.72-67.83 2.44-8.07 5.46-8.85 11.4-2.93q33.68 33.63 67.26 67.36a12.3 12.3 0 009.55 4.15q82.91-.2 165.82.01c4.02.01 6.08-1.21 8.1-4.7 5.1-8.77 14.88-12.85 24.72-11.06a24.24 24.24 0 0119.05 18.63c2 10.2-1.94 20.2-11 25.27-4 2.24-4.57 4.87-4.56 8.82q.15 68.48.08 136.96c0 7.98.48 16-.13 23.92-.54 6.96 1.84 11.72 6.8 16.55 21.4 20.87 42.39 42.15 63.51 63.3 7.63 7.63 6.97 10.3-3.61 13.17-63.68 17.2-124.95 9.82-183.83-18.91-38.35-18.7-70.97-45.02-99.84-76.36-31.17-33.84-55.72-71.51-70.09-115.46a263.51 263.51 0 01-12.94-80.89zM347.79 91.9h-157.5l78.53 78.64zm14.6 14.12l-79.63 79.62 79.63 79.35zM131.74 255.6c10.9 11.8 21.18 23.72 32.3 34.8 11.1 11.06 23.05 21.3 35.27 32.48l-14.92 9.49 6.02 17.39c10.7 30.92 21.49 61.8 31.99 92.8 1.43 4.24 3.36 6 7.78 5.45a53.87 53.87 0 017.97-.04c5.67.14 9.87 2.7 11.92 8.05a3408.58 3408.58 0 0117.9 47.66c2.13 5.86-.06 8.28-7.16 8.29q-43.9.07-87.82.03l-106.24-.01c-9.27 0-10.75-2.07-7.56-10.64q7.9-21.28 15.92-42.51c3.24-8.63 6.44-10.85 15.52-10.89 11.4-.04 11.38-.05 15.05-10.67 11.67-33.83 23.25-67.69 35.17-101.43 1.8-5.11 1.7-7.82-3.18-11.48-21.04-15.75-24.57-45.18-8.54-65.97.71-.93 1.6-1.73 2.6-2.8z'
                    }
                />
            </g>
        </SvgIcon>
    );
}

ParabolicAntenna.defaultProps = ({
    title: 'ParabolicAntennaIcon',
    size: null,
    color: null
}: DefaultProps);

export {ParabolicAntenna};
