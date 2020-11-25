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

function Molecule(props: Props) {
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <path
                d={
                    'M409.01 99.03L294.84 215.9l13.68 31.52 66.76-7.5c2.83-.32 5.64-.73 8.47-1 11.28-1.07 21.07-.88 26.22-16.02 6.04-17.73 29.24-23.63 46.46-15.66a36.54 36.54 0 0119.12 45.82c-6.48 17.91-24.48 26.8-43.3 22.37-14.31-3.37-22.1-12.85-27.1-26.06-26.51 3.05-52.73 6.05-78.94 9.11-5.64.66-12.77-.27-16.44 2.82-3.43 2.88-2.7 10.33-4.67 15.43-3.25 8.4-7.2 16.53-11.13 25.39l114.34 112c28.26-17.07 57.1-14.17 75.99 9.05a54.58 54.58 0 01-3.39 72.43c-18.5 19.24-49.18 21.9-70.95 6.14-23.75-17.17-28.86-46.07-13.24-75.43L281.5 313.47c-38.15 22.98-66.86 20.76-97.98-9.06l-87.12 89.16c12.57 25.44 9.46 47.27-10.19 61.72a44.36 44.36 0 01-63.32-60.12c13.31-20.14 35.54-24.88 63.77-12.31 18.87-19.38 38.22-39.39 57.73-59.23 8.96-9.12 18.4-17.77 27.25-27 1.63-1.72 2.7-5.73 1.87-7.79-13.21-32.44-7.3-60.56 18.24-84.56a15.56 15.56 0 001.67-2.45l-69.26-67.7c-9.3 5.9-20.34 8.4-32.24 4.55a36.53 36.53 0 1123.06-69.31c19.42 6.93 29.68 27.76 22.13 46.91-2.45 6.23-1.22 9.43 3.15 13.74 20.27 19.94 40.1 40.32 60.33 60.3 1.97 1.95 6.18 3.94 8.26 3.13 27.11-10.6 51.8-6.4 74.82 11.42l114.1-116.73c-17.4-29.66-14.12-58.3 10.29-77.01a54.57 54.57 0 0176.86 75.94c-17.35 23.31-46.95 28.33-75.92 11.96zM237.04 200.69c-31.74.13-57.6 25.98-57.54 57.54a57.94 57.94 0 0058.22 57.55c31.4-.25 57.31-26.45 57.18-57.8-.14-31.56-26.25-57.42-57.86-57.3zM441.16 96.12a41.67 41.67 0 10-41.74-41.6 41.7 41.7 0 0041.74 41.6zm42.32 361.1a41.67 41.67 0 00-83.33.57 41.67 41.67 0 1083.33-.57zM28.53 419.48a31.2 31.2 0 0031.16 31.5 31.58 31.58 0 0031.85-31.83c-.22-17.13-14.7-31.38-31.75-31.25a31.6 31.6 0 00-31.26 31.58zm74.05-339.33a23.76 23.76 0 1024.07 23.5 23.85 23.85 0 00-24.07-23.5zm338.55 184.07a23.75 23.75 0 10-23.55-24.02 23.57 23.57 0 0023.55 24.02z'
                }
                fill={color || '#000000'}
            />
        </SvgIcon>
    );
}

Molecule.defaultProps = ({
    title: 'MoleculeIcon',
    size: null,
    color: null
}: DefaultProps);

export {Molecule};
