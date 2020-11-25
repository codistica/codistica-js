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

function LinkedIn1(props: Props) {
    const getUniqueID = useGetUniqueID();
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <defs>
                <linearGradient
                    x1={'605.41'}
                    x2={'677.52'}
                    y1={'648.72'}
                    y2={'576.61'}
                    gradientTransform={
                        'matrix(5.0206 0 0 -5.0206 -2964.52 3331.91)'
                    }
                    gradientUnits={'userSpaceOnUse'}
                    id={getUniqueID('a')}>
                    <stop offset={'0'} stopColor={'#2489be'} />
                    <stop offset={'1'} stopColor={'#0575b3'} />
                </linearGradient>
            </defs>
            <circle
                cx={'256'}
                cy={'256'}
                r={'213.5'}
                fill={backgroundColor || '#ffffff'}
            />
            <path
                d={
                    'M256 0C114.61 0 0 114.61 0 256s114.61 256 256 256 256-114.61 256-256S397.38 0 256 0zm-68.3 379.76h-56.2V198.17h56.2zM159.33 174.4a33.5 33.5 0 1133.23-33.5 33.37 33.37 0 01-33.23 33.5zm239 205.37H342.4v-95.32c0-26.14-9.93-40.73-30.6-40.73-22.5 0-34.25 15.2-34.25 40.73v95.32h-53.91V198.17h53.9v24.46s16.22-30 54.73-30 66.07 23.52 66.07 72.15v114.98z'
                }
                fill={color || `url(#${getUniqueID('a')})`}
            />
        </SvgIcon>
    );
}

LinkedIn1.defaultProps = ({
    title: 'LinkedIn1Icon',
    size: null,
    color: null,
    backgroundColor: null
}: DefaultProps);

export {LinkedIn1};
