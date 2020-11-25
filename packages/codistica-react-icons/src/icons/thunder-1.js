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

function Thunder1(props: Props) {
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <path
                d={
                    'M314.02.15L281.16 198.5l72.8-36.13L177.88 512l-1.02-.33 54.02-223.48-72.04 35.8-.8-.6L313.29 0z'
                }
                fill={color || '#000000'}
            />
        </SvgIcon>
    );
}

Thunder1.defaultProps = ({
    title: 'Thunder1Icon',
    size: null,
    color: null
}: DefaultProps);

export {Thunder1};
