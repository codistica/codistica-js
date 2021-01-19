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

function Http(props: Props) {
    const {color, ...other} = props;
    return (
        <SvgIcon {...other}>
            <g fill={color || '#000000'}>
                <path
                    d={
                        'M256 402.1l-83.04.01q-52.34.04-104.68.14c-14.31.01-23.7-9.3-23.7-23.55q0-57.41.03-114.83 0-65.46-.03-130.93c0-10.55 4.98-18.15 14.71-21.79a27.11 27.11 0 019.32-1.36c41.24-.04 82.5.09 123.74.09q68.44 0 136.87-.14 57.45-.04 114.9-.01c8.65 0 15.7 3.2 20 10.8a23.23 23.23 0 013.14 10.82c.15 41.35-.02 82.7-.04 124.06-.01 18.6.15 37.19.18 55.78q.05 33.95 0 67.9c-.01 13.84-9.52 23.19-23.34 23.18q-94.03-.03-188.06 0zM122 205.47c-5.5 0-11.05-.03-16.28 0-4.75.04-4.75.07-4.75 4.92v23.69h-6.49V205.6H73.51v29.65c0 15.86.06 31.72-.05 47.58-.02 2.59.74 3.45 3.35 3.35 4.8-.18 9.63-.22 14.43.01 2.88.14 3.45-.97 3.4-3.59-.15-8.96-.07-17.93-.07-26.9 0-1.15.1-2.3.14-3.31h6.26c0 10.36.1 20.41-.06 30.47-.04 2.68.84 3.37 3.37 3.27 4.59-.18 9.2-.2 13.78 0 2.91.14 3.96-.64 3.94-3.78-.13-24.5.09-75.62 0-76.9zm177.14 47.94c3.71 0 6.88.22 10-.04 9.36-.79 13.56-5.1 13.9-14.45.2-5.89.17-11.8-.08-17.7-.4-9.36-4.93-14.5-14.27-15.11-9.9-.66-19.86-.41-29.8-.55-.17 0-.34.25-.56.42v80.12c5.79 0 11.24-.16 16.67.06 3.04.13 4.38-.6 4.15-3.9-.26-3.7-.02-7.44-.01-11.15v-17.7zm-142.31-31.76v4.82c0 18.8-.02 37.6.08 56.4 0 1.08.98 3.09 1.56 3.11 6.4.23 12.81.14 19.67.14v-64.63h12.07v-15.9h-45.44v16.06zm65.03.02v4.51c0 18.91.04 37.82-.05 56.73 0 2.4.62 3.32 3.12 3.24 4.92-.15 9.85-.17 14.77.05 2.68.12 3.28-.84 3.26-3.37-.09-19.14-.05-38.28-.04-57.42v-3.82h12.25v-16.15c-14.74 0-29.27-.03-43.8.1-.64 0-1.78 1.42-1.82 2.22-.2 3.82-.03 7.65-.12 11.48-.04 1.9.78 2.5 2.55 2.45 3.15-.08 6.3-.02 9.88-.02zm209.36-13.25l-43.1 74.64 16.64 9.63 43.15-74.63zm-59.02 52.67h-20.22v20.33h20.22zm-20.33-25.96h20.44c0-6.32.05-12.4-.08-18.48 0-.64-1.03-1.78-1.6-1.79-6.18-.13-12.37-.08-18.76-.08z'
                    }
                />
                <path
                    d={
                        'M299.4 239.37V219.7c4.14-.73 5.79.27 6.1 4.36a74.86 74.86 0 01-.07 11.08c-.29 3.8-1.56 4.59-6.03 4.23z'
                    }
                />
                <path
                    d={
                        'M0 115.59V396.4A52.59 52.59 0 0052.59 449H459.4A52.59 52.59 0 00512 396.41V115.6A52.59 52.59 0 00459.41 63H52.6A52.59 52.59 0 000 115.59zM454.85 425.5H57.15c-18.3 0-33.15-14.38-33.15-32.13V118.63c0-17.75 14.84-32.13 33.15-32.13h397.7c18.3 0 33.15 14.38 33.15 32.13v274.74c0 17.75-14.84 32.13-33.15 32.13z'
                    }
                />
            </g>
        </SvgIcon>
    );
}

Http.defaultProps = ({
    title: 'HttpIcon',
    size: null,
    color: null
}: DefaultProps);

export {Http};