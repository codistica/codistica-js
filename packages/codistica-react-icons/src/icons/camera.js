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

function Camera(props: Props) {
    const {color, ...other} = props;
    return (
        <SvgIcon {...other}>
            <g fill={color || '#000000'}>
                <path
                    d={
                        'M155.25 195.14l43.52-103.6L512 220.3c-.38 1.16-.68 2.25-1.1 3.28a288.26 288.26 0 01-24.2 46.96c-6.37 10-15.36 17.12-25.88 22.38a115.06 115.06 0 01-43.75 11.88 15.9 15.9 0 01-6.9-1.57q-34.75-14.62-69.42-29.44-35.67-15.15-71.35-30.28-38.4-16.24-76.83-32.39c-11.7-4.94-23.38-9.94-35.06-14.92-.72-.3-1.41-.67-2.26-1.07zM135.2 242.84l15.26-36.34 257.22 108.96-16 34zM187.5 86.9l-43.56 103.54-45.26-19.1 44.46-102.68zM0 443.34V308.61a19.91 19.91 0 0110.57 4.89c7.94 6.52 12.68 15.18 16.12 24.64 6.32 17.38 7.4 35.27 5.19 53.49a88.07 88.07 0 01-10.2 32.56c-3.67 6.57-8.2 12.42-14.92 16.17-1.99 1.1-4.18 1.86-6.76 2.98z'
                    }
                />
                <path
                    d={
                        'M408.99 332.18c2.88-6.27 5.55-12.23 8.44-18.07.34-.7 1.89-1 2.92-1.13 14.04-1.66 27.64-4.95 40.52-10.87 11.44-5.26 21.64-12.24 29.39-22.37 1.03-1.35 1.95-1.63 3.34-.69a8.5 8.5 0 001.72.73c4.43 1.72 5.21 3.08 3.45 7.68-1.98 5.16-4.32 10.19-6.57 15.24q-10.48 23.54-21.04 47.04a36.79 36.79 0 01-3.63 5.9c-1.08 1.52-2.46 1.57-4.23.77q-24.45-11.05-48.97-21.93c-1.7-.76-3.43-1.48-5.34-2.3zM146.74 398.2a30.9 30.9 0 01-30.6-32.05c.4-16.38 14.63-29.99 31.03-29.7a30.85 30.85 0 0130.73 31.88c-.42 16.52-14.69 30.2-31.16 29.87zM108.05 363.54a41.07 41.07 0 005.58 24.38h-72.6v-24.38zM145.15 258.75l96.59 40.76c-6.43 4.86-13.55 6.13-20.84 6.35-17.32.54-33.19-4.5-47.94-13.29-10.3-6.13-19.3-13.68-24.75-24.66-1.31-2.65-1.92-5.65-3.06-9.16zM139.23 201.76l-15.2 36.13c-25.77-7.1-34.4-33.17-23.75-52.63zM145.37 328.09l15.7-33.3a109.34 109.34 0 0033.8 16.09l-15.9 33.64c-8.58-11.05-19.54-16.5-33.6-16.43z'
                    }
                />
            </g>
        </SvgIcon>
    );
}

Camera.defaultProps = ({
    title: 'CameraIcon',
    size: null,
    color: null
}: DefaultProps);

export {Camera};