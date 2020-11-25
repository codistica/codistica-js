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

function Telegram(props: Props) {
    const getUniqueID = useGetUniqueID();
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <defs>
                <linearGradient
                    x1={'331.04'}
                    x2={'203.04'}
                    y1={'80.92'}
                    y2={'379.58'}
                    gradientUnits={'userSpaceOnUse'}
                    id={getUniqueID('a')}>
                    <stop offset={'0'} stopColor={'#37aee2'} />
                    <stop offset={'1'} stopColor={'#1e96c8'} />
                </linearGradient>
            </defs>
            <circle
                cx={'256'}
                cy={'256'}
                r={'189'}
                fill={backgroundColor || '#ffffff'}
            />
            <g fill={color || '#3fa9f5'}>
                <path
                    d={
                        'M214.27 308.74l-5.2 62.46v2.13c6.4 0 9.17-2.98 12.8-6.4 2.28-2.2 15.74-15.28 30.77-29.89z'
                    }
                    opacity={'.2'}
                />
                <path
                    d={
                        'M324.19 198.4l-146.56 92.37-.14-.04 21.68 71.51c3 7.9 1.5 11.1 9.82 11.1v-2.14l5.2-62.45-.94-.7L332.3 201.17c5.12-4.69-1.28-7.04-8.1-2.77z'
                    }
                    opacity={'.12'}
                />
            </g>
            <path
                d={
                    'M256 0C114.56 0 0 114.56 0 256s114.56 256 256 256 256-114.56 256-256S397.44 0 256 0zm125.87 175.36l-42.03 197.97c-2.99 14.08-11.52 17.28-23.25 10.88l-63.95-47.17c-15.03 14.61-28.49 27.7-30.77 29.9-3.63 3.4-6.4 6.4-12.8 6.4-8.32 0-6.83-3.2-9.82-11.1l-21.68-71.5-63.22-19.8c-13.66-4.06-13.87-13.45 2.98-20.27l246.62-95.15c11.3-5.12 22.18 2.56 17.92 19.84z'
                }
                fill={color || `url(#${getUniqueID('a')})`}
            />
        </SvgIcon>
    );
}

Telegram.defaultProps = ({
    title: 'TelegramIcon',
    size: null,
    color: null,
    backgroundColor: null
}: DefaultProps);

export {Telegram};
