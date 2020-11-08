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

function Aws(props: Props) {
    return (
        <SvgIcon {...props}>
            <path
                d={
                    'M149.38,311.41l-46.91,20.15,43.44,18.57,50.38-18.57-46.91-20.15ZM78.86,336.59l-1.57,90.67,68.62,30.22V363.35l-67-26.76Zm141,0-62,23.62V449l62-25.18V336.59Zm74-282.07L246.66,74.67l43.76,18.57,50.37-18.57L293.88,54.52ZM228.4,81.28V172L287,189l1.9-82.49L228.4,81.28Zm131,5L304,109.93V199l55.41-25.18V86.32ZM72.09,182.13l-46.9,20.14,43.44,18.58L119,202.27,72.09,182.13ZM1.57,207.31,0,298,68.63,328.2V234.07Zm141,0-62,23.62V319.7l62-25.19Zm80.59-28.53-46.9,20.15,43.44,18.58,50.37-18.58L223.2,178.78ZM152.68,204l-1.57,90.66,68.63,30.23V230.73Zm141,0-62,23.61v88.77l62-25.18V204ZM441.48,54.52l-46.9,20.14L438,93.24l50.37-18.58L441.48,54.52ZM371,79.7l-1.57,90.67L438,200.59V106.47Zm141,0-62,23.62v88.77l62-25.19Z'
                }
                fill={'#f7a80d'}
            />
        </SvgIcon>
    );
}

Aws.defaultProps = ({
    title: 'AWSIcon',
    size: null,
    color: null
}: DefaultProps);

export {Aws};
