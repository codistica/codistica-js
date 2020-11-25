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

function JS(props: Props) {
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
            <g>
                <path
                    d={
                        'M30.27 0l41.9 460.34L255.66 512l184.52-52L481.73.17zm207.14 416L104 378.19 99 321l92.6 25.14V96h45.81zm177.24-263l-96.61.37v83.45l90.57-10.62-12.25 156.27L273.92 416v-56.62l85.76-24.78 3.12-46.19-88.88 15.83V96h144.64z'
                    }
                    fill={color || '#d4b830'}
                />
                <path
                    d={
                        'M256.35 40.76v434.87l149.84-40.59 35.04-394.28zM408.61 226.2l-12.25 156.27L273.92 416v-56.62l85.76-24.78 3.12-46.19-88.88 15.83V96h144.64l-3.9 57-96.62.37v83.45z'
                    }
                    fill={color || '#fdd83c'}
                />
            </g>
        </SvgIcon>
    );
}

JS.defaultProps = ({
    title: 'JSIcon',
    size: null,
    color: null,
    backgroundColor: null
}: DefaultProps);

export {JS};
