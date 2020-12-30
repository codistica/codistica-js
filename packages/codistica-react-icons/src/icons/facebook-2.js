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

function Facebook2(props: Props) {
    const {color, ...other} = props;
    return (
        <SvgIcon {...other}>
            <path
                d={
                    'M295.65 512V278.46h78.4l11.73-91.02h-90.13v-58.1c0-26.36 7.31-44.31 45.1-44.31l48.2-.03V3.6A645.17 645.17 0 00318.72 0c-69.49 0-117.06 42.42-117.06 120.32v67.12h-78.6v91.01h78.59V512z'
                }
                fill={color || '#485a96'}
            />
        </SvgIcon>
    );
}

Facebook2.defaultProps = ({
    title: 'Facebook2Icon',
    size: null,
    color: null
}: DefaultProps);

export {Facebook2};
