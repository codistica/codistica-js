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

function Hdd(props: Props) {
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <g fill={color || '#000000'}>
                <path
                    d={
                        'M105.93 512h300.14a29.44 29.44 0 0029.42-29.43V29.43A29.44 29.44 0 00406.07 0H105.93a29.44 29.44 0 00-29.42 29.43v453.14A29.44 29.44 0 00105.93 512zm278.9-36.13a17.66 17.66 0 1117.65-17.66 17.63 17.63 0 01-17.66 17.66zm0-435.85a17.66 17.66 0 11-17.66 17.65 17.63 17.63 0 0117.65-17.65zM256 53.2a138.12 138.12 0 11-34.78 271.83l25.95-44.02c7.71-13.06-7.06-27.9-20.12-20.13l-60.2 35.5a.81.81 0 00-.24.17A138.11 138.11 0 01256 53.2zM130.7 40.02a17.66 17.66 0 11-17.65 17.65 17.63 17.63 0 0117.66-17.65zm0 400.54a17.66 17.66 0 11-17.65 17.65 17.63 17.63 0 0117.66-17.65z'
                    }
                />
                <circle cx={'256'} cy={'191.32'} r={'36.9'} />
            </g>
        </SvgIcon>
    );
}

Hdd.defaultProps = ({
    title: 'HddIcon',
    size: null,
    color: null
}: DefaultProps);

export {Hdd};
