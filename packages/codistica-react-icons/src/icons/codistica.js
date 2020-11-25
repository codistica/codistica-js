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

function Codistica(props: Props) {
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <path
                d={'M154.13 61L380.1 451H506L280.03 61h-125.9'}
                fill={color || '#666666'}
            />
            <path
                d={
                    'M99.93 288.88l31.48-54.32c0 .02 62.7 108.22 62.7 108.22l.25.42L131.9 451H6z'
                }
                fill={color || '#8cc63f'}
            />
        </SvgIcon>
    );
}

Codistica.defaultProps = ({
    title: 'CodisticaIcon',
    size: null,
    color: null
}: DefaultProps);

export {Codistica};
