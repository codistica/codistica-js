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

function Thunder2(props: Props) {
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <path
                d={
                    'M228.58 421.55l46.9-21.88.67.68L181.52 512V396.74l1.24-.54 21.9 29.22 58.9-155.77-109.7 54.56L309.52 0l.97.35-69.4 222.3 116.17-62.04.88.79-129.56 260.15z'
                }
                fill={color || '#000000'}
            />
        </SvgIcon>
    );
}

Thunder2.defaultProps = ({
    title: 'Thunder2Icon',
    size: null,
    color: null
}: DefaultProps);

export {Thunder2};
