/** @flow */

import {useGetUniqueID} from '@codistica/react';
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

function LinkedIn2(props: Props) {
    const getUniqueID = useGetUniqueID();
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <defs>
                <linearGradient
                    x2={'512'}
                    y1={'256'}
                    y2={'256'}
                    gradientUnits={'userSpaceOnUse'}
                    id={getUniqueID('a')}>
                    <stop offset={'0'} stopColor={'#2489be'} />
                    <stop offset={'1'} stopColor={'#0575b3'} />
                </linearGradient>
            </defs>
            <path
                d={
                    'M116.65 512H11.15V170.67h105.5zM63.4 125.97a62.98 62.98 0 1162.38-63.5v.51a62.69 62.69 0 01-62.38 62.99zM512 512H407.01V332.83c0-49.14-18.64-76.58-57.43-76.58-42.23 0-64.3 28.57-64.3 76.58V512H184.1V170.67H285.3v45.97a118.83 118.83 0 01102.7-56.39c72.28 0 124.01 44.2 124.01 135.62z'
                }
                fill={color || `url(#${getUniqueID('a')})`}
            />
        </SvgIcon>
    );
}

LinkedIn2.defaultProps = ({
    title: 'LinkedIn2Icon',
    size: null,
    color: null
}: DefaultProps);

export {LinkedIn2};
