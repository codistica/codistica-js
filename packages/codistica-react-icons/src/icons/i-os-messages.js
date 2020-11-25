/** @flow */

import {useGetUniqueID} from '@codistica/react';
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

function IOSMessages(props: Props) {
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
                    <stop offset={'0'} stopColor={'#00ea66'} />
                    <stop offset={'1'} stopColor={'#00d50f'} />
                </linearGradient>
            </defs>
            <path
                d={'M80.5 98.5h351v315h-351z'}
                fill={backgroundColor || '#ffffff'}
            />
            <path
                d={
                    'M392 0H120A120 120 0 000 120v272a120 120 0 00120 120h272a120 120 0 00120-120V120A120 120 0 00392 0zM256.1 369.12a155.32 155.32 0 01-54.4-9.89c-12.79 10.24-28.57 16.75-46.1 16.75a75.27 75.27 0 01-28.87-5.84c18.15-.2 32.44-15.34 32.44-33.92a20.8 20.8 0 00-.2-2.42C135 312.8 120 284.18 120 252.46c0-32.18 15.35-61.25 39.96-82.35.11-.1.29-.11.4-.2 3-2.58 6.02-5.13 9.3-7.47 3.4-2.4 7-4.54 10.68-6.66C202 143.26 228 136 256.1 136c75.1 0 135.9 52.07 135.9 116.46s-60.8 116.66-135.9 116.66z'
                }
                fill={color || `url(#${getUniqueID('a')})`}
            />
        </SvgIcon>
    );
}

IOSMessages.defaultProps = ({
    title: 'IOSMessagesIcon',
    size: null,
    color: null,
    backgroundColor: null
}: DefaultProps);

export {IOSMessages};
