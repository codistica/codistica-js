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

function AndroidMessages(props: Props) {
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <circle
                cx={'256'}
                cy={'256'}
                r={'193.5'}
                fill={backgroundColor || '#ffffff'}
            />
            <g fill={color || '#516fff'}>
                <path
                    d={
                        'M182.48 192.82h147.25v25.09H182.48zm0 37.17h147.25v25.09H182.48zm0 35.43h98.2v25.09h-98.2z'
                    }
                />
                <path
                    d={
                        'M256 0C114.59 0 0 114.59 0 256s114.59 256 256 256 256-114.59 256-256S397.41 0 256 0zm124.42 309.35A30.55 30.55 0 01350 339.76H185.04l-51.72 50.18V173.67a30.46 30.46 0 0130.31-30.41H350a30.55 30.55 0 0130.42 30.41z'
                    }
                />
            </g>
        </SvgIcon>
    );
}

AndroidMessages.defaultProps = ({
    title: 'AndroidMessagesIcon',
    size: null,
    color: null,
    backgroundColor: null
}: DefaultProps);

export {AndroidMessages};
