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

function CSS(props: Props) {
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <path
                d={'M256 78.5h165v355H256zM91 78.5h165v355H91z'}
                fill={backgroundColor || '#ffffff'}
            />
            <path
                d={'M91 78.5h165v355H91z'}
                opacity={'.1'}
                fill={color || '#000000'}
            />
            <path
                d={
                    'M30.27 0l41.09 460.82L255.72 512l184.88-51.25L481.73 0zm366.45 111.16L382.99 264.5l-.18 1.99-.03.4-9.66 107.44-.85 9.54-116.1 32.06-.26.08-116.2-32.13-7.95-88.73h56.94l4.04 45.07 63.18 17 .05-.02 63.27-17.02 6.62-73.29h-70.03v.01h-62.38l-1.14-12.7-2.58-28.65-1.36-15.16H330.9l5.18-57.87H119l-1.14-12.7-2.58-28.65L113.92 96h284.16z'
                }
                fill={color || '#1572b6'}
            />
            <g fill={color || '#33a9dc'}>
                <path
                    d={
                        'M325.86 266.88H256v90.29l63.24-17 6.62-73.29zM336.08 152.51H256v57.87h74.9l5.18-57.87z'
                    }
                />
                <path
                    d={
                        'M256 37.68V96h142.08l-1.36 15.16-13.73 153.33-.18 1.99-.03.4-9.66 107.44-.85 9.55L256 415.96v56.86l149.39-41.41 35.15-393.73H256z'
                    }
                />
            </g>
        </SvgIcon>
    );
}

CSS.defaultProps = ({
    title: 'CSSIcon',
    size: null,
    color: null,
    backgroundColor: null
}: DefaultProps);

export {CSS};
