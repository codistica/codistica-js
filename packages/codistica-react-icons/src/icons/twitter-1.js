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

function Twitter1(props: Props) {
    const {color, ...other} = props;
    return (
        <SvgIcon {...other}>
            <path
                d={
                    'M512 97.16a209.72 209.72 0 01-60.33 16.55 105.34 105.34 0 0046.18-58.11 209.78 209.78 0 01-66.7 25.5 105.08 105.08 0 00-181.67 71.87 106.4 106.4 0 002.7 23.96A298.25 298.25 0 0135.68 67.17a105.14 105.14 0 0032.5 140.22 104.53 104.53 0 01-47.59-13.13v1.33a105.08 105.08 0 0084.25 102.98 104.46 104.46 0 01-27.67 3.68 106.48 106.48 0 01-19.78-1.85 105.17 105.17 0 0098.11 72.94A211.48 211.48 0 010 416.82a297.23 297.23 0 00161 47.21c193.19 0 298.84-160.05 298.84-298.84q0-6.84-.32-13.58A213.94 213.94 0 00512 97.17z'
                }
                fill={color || '#2daae1'}
            />
        </SvgIcon>
    );
}

Twitter1.defaultProps = ({
    title: 'Twitter1Icon',
    size: null,
    color: null
}: DefaultProps);

export {Twitter1};
