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

function Twitter2(props: Props) {
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <circle
                cx={'256'}
                cy={'256'}
                r={'207'}
                fill={backgroundColor || '#ffffff'}
            />
            <path
                d={
                    'M256 0C114.62 0 0 114.62 0 256s114.62 256 256 256 256-114.62 256-256S397.38 0 256 0zm130.5 189.08q.2 4.33.2 8.7c0 89-67.74 191.62-191.61 191.62a190.59 190.59 0 01-103.23-30.27 135.6 135.6 0 0099.7-27.88 67.43 67.43 0 01-62.9-46.77 68.34 68.34 0 0012.68 1.19 67 67 0 0017.74-2.36 67.38 67.38 0 01-54.02-66.03v-.85a67.03 67.03 0 0030.51 8.42 67.41 67.41 0 01-20.84-89.91 191.22 191.22 0 00138.81 70.36 68.11 68.11 0 01-1.73-15.35 67.37 67.37 0 01116.49-46.09 134.55 134.55 0 0042.78-16.34 67.54 67.54 0 01-29.62 37.26 134.47 134.47 0 0038.68-10.61 137.22 137.22 0 01-33.64 34.9z'
                }
                fill={color || '#2daae1'}
            />
        </SvgIcon>
    );
}

Twitter2.defaultProps = ({
    title: 'Twitter2Icon',
    size: null,
    color: null,
    backgroundColor: null
}: DefaultProps);

export {Twitter2};
