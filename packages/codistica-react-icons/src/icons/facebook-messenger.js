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

function FacebookMessenger(props: Props) {
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <circle
                cx={'256'}
                cy={'256'}
                r={'193.5'}
                fill={backgroundColor || '#ffffff'}
            />
            <path
                d={
                    'M256 0C114.61 0 0 106.12 0 237.04c0 74.6 37.23 141.13 95.4 184.58V512l87.17-47.84a275.07 275.07 0 0073.43 9.91c141.39 0 256-106.12 256-237.03S397.39 0 256 0zm25.44 319.21l-65.2-69.53-127.2 69.53 139.93-148.54 66.78 69.53 125.62-69.53z'
                }
                fill={color || '#0084ff'}
            />
        </SvgIcon>
    );
}

FacebookMessenger.defaultProps = ({
    title: 'FacebookMessengerIcon',
    size: null,
    color: null,
    backgroundColor: null
}: DefaultProps);

export {FacebookMessenger};
