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

function Cloudflare(props: Props) {
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <path
                d={
                    'M468.97 278.33l-64.22-36.78-11.08-4.78-262.7 1.79v133.21h338v-93.44z'
                }
                fill={backgroundColor || '#ffffff'}
            />
            <path
                d={
                    'M352.19 359.32c3.15-10.8 1.95-20.71-3.3-28.07-4.8-6.75-12.9-10.65-22.66-11.1l-184.72-2.4a3.41 3.41 0 01-2.86-1.5 4.14 4.14 0 01-.45-3.3 5.07 5.07 0 014.36-3.3l186.37-2.4c22.06-1.06 46.07-18.91 54.47-40.82l10.65-27.76a5.96 5.96 0 00.3-3.6 121.35 121.35 0 00-233.34-12.46 54.55 54.55 0 00-87.03 38.12 57.3 57.3 0 001.35 19.05A77.53 77.53 0 000 357.36a94.5 94.5 0 00.75 11.26 3.7 3.7 0 003.6 3.15h340.93a4.64 4.64 0 004.36-3.3z'
                }
                fill={color || '#f38020'}
            />
            <path
                d={
                    'M411.01 240.92c-1.65 0-3.45 0-5.1.15a3.03 3.03 0 00-2.7 2.1l-7.2 25.06c-3.16 10.8-1.96 20.7 3.3 28.06 4.8 6.75 12.9 10.65 22.65 11.1l39.32 2.4a3.41 3.41 0 012.85 1.5 4.23 4.23 0 01.45 3.3 5.07 5.07 0 01-4.35 3.3l-40.97 2.41c-22.2 1.05-46.06 18.9-54.47 40.82l-3 7.65a2.16 2.16 0 002.1 3h140.76a3.7 3.7 0 003.6-2.7 102.57 102.57 0 003.75-27.31c0-55.52-45.32-100.84-100.99-100.84'
                }
                fill={color || '#faae40'}
            />
        </SvgIcon>
    );
}

Cloudflare.defaultProps = ({
    title: 'CloudflareIcon',
    size: null,
    color: null,
    backgroundColor: null
}: DefaultProps);

export {Cloudflare};
