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

function ArrowBack2(props: Props) {
    const {color, ...other} = props;
    return (
        <SvgIcon {...other}>
            <path
                d={
                    'M427.42 511.75c-53.96 0-100.42.9-146.8-.72-10.09-.35-22.97-7.3-29.29-15.35C198.74 428.7 148.13 360.2 95.3 293.43c-20.69-26.15-19.54-45.85 1.72-71.96C150.07 156.3 199.16 87.95 251.9 22.5c9.2-11.42 28.03-19.98 43-20.96 42.73-2.78 85.75-.97 136.7-.97-12.35 16.98-20.8 28.95-29.6 40.64-47.9 63.63-95.14 127.78-144.27 190.45-16.2 20.69-14.15 34.73 1.42 54.89 55.86 72.32 109.6 146.28 168.28 225.19z'
                }
                fill={color || '#000000'}
            />
        </SvgIcon>
    );
}

ArrowBack2.defaultProps = ({
    title: 'ArrowBack2Icon',
    size: null,
    color: null
}: DefaultProps);

export {ArrowBack2};
