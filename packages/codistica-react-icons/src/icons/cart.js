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

function Cart(props: Props) {
    const {color, ...other} = props;
    return (
        <SvgIcon {...other}>
            <g fill={color || '#000000'}>
                <path
                    d={
                        'M196.1 303.75c1.6 5.09 3.09 9.9 4.64 14.7 4.73 14.52 9.55 29.01 14.16 43.57.95 3 2.11 4.25 5.6 4.25 59.8-.14 119.59-.09 179.38-.13a19.78 19.78 0 0116.33 7.88c5.7 7.16 3.9 20.25-3.07 26.02-5.64 4.67-11.8 4.68-18.29 4.7-4.5.02-8.99-.01-13.48-.01l-177.96.01c-10.6.01-16.04-4.7-19.27-13.7-4.55-12.68-8.4-25.62-12.6-38.43q-13.58-41.34-27.2-82.67-15.41-47.1-30.71-94.23Q94.92 118.3 76.26 60.85c-.7-2.15-1.84-2.59-3.86-2.58-17.44.05-34.88.1-52.32 0C8.28 58.2-.14 49.73 0 38.38c.13-10.13 8.31-18.74 18.5-18.8q35.76-.26 71.52-.02c8.47.05 15.18 5.53 18 14.18q10.82 33.1 21.55 66.22c2.97 9.16 2.93 9.17 12.56 9.17h253.36l62.95-.02 32.72.02c14.32 0 23.85 11.76 19.97 25.58-4.58 16.3-9.93 32.38-14.95 48.55-10.54 33.92-20.99 67.87-31.7 101.73-2.26 7.18-5.51 14.14-13.4 16.93a28.64 28.64 0 01-9.35 1.5c-30.6.02-61.2-.15-91.81-.17q-54.08-.05-108.16.04c-14.12.02-28.23.1-42.34.17-.92 0-1.85.15-3.33.28zM466.73 147.7h-321.3c.24 1.06.37 1.87.62 2.63 3.6 11.15 7.3 22.27 10.78 33.45.78 2.48 1.94 3.2 4.52 3.2 25.37-.11 50.74-.06 76.1-.06l212.4.01a14.85 14.85 0 012.13.02c2.07.3 2.91-.73 3.46-2.6 1.82-6.13 3.8-12.22 5.69-18.33 1.8-5.85 3.58-11.7 5.6-18.32zm-24.33 78.24H170.64c3.89 11.92 7.73 23.35 11.3 34.87.95 3.08 2.23 4.23 5.65 4.2 32.6-.15 65.2-.08 97.81-.08h87.15c18.03 0 36.06.03 54.09-.08 1.37 0 3.65-.78 3.96-1.72 4.06-12.22 7.84-24.53 11.81-37.2zM215.96 427.38a32.57 32.57 0 11-32.78 31.96c.18-17.65 14.95-32.05 32.78-31.96zM388.22 427.37c18.81.87 33.21 15.85 32.25 33.55-.98 18.14-15.87 32.27-33.27 31.59-18.45-.72-32.7-15.97-31.82-34.04.86-17.59 15.96-31.89 32.84-31.1z'
                    }
                />
            </g>
        </SvgIcon>
    );
}

Cart.defaultProps = ({
    title: 'CartIcon',
    size: null,
    color: null
}: DefaultProps);

export {Cart};
