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

function CircleCI(props: Props) {
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <g fill={color || '#37474f'}>
                <ellipse cx={'252.29'} cy={'256'} rx={'61.59'} ry={'60.71'} />
                <path
                    d={
                        'M.74 191.63c0 .73-.74 2.2-.74 2.93a12.42 12.42 0 0012.61 12.43h104.63c5.2 0 8.9-2.92 11.13-7.31 21.52-46.81 69.01-78.26 123.18-78.26 74.94 0 135.79 59.97 135.79 133.85s-60.85 133.85-135.8 133.85a136.2 136.2 0 01-123.17-77.53c-2.23-5.12-5.94-8.05-11.13-8.05H12.62A12.42 12.42 0 000 315.98c0 .73 0 2.19.74 2.92C29.68 430.08 131.34 512 252.3 512 395.5 512 512 397.16 512 256 512 114.83 395.5 0 252.29 0 131.34 0 29.69 81.92.74 191.63z'
                    }
                />
            </g>
        </SvgIcon>
    );
}

CircleCI.defaultProps = ({
    title: 'CircleCIIcon',
    size: null,
    color: null
}: DefaultProps);

export {CircleCI};
