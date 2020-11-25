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

function MobileDevices(props: Props) {
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <g fill={color || '#000000'}>
                <path
                    d={
                        'M304.07 467.95c0 7.84.03 15.25 0 22.66-.03 7.27 1.55 14.03 6.1 19.9a14.06 14.06 0 01.77 1.32c-1.03.06-1.82.15-2.61.15H196.47l-154.6.02c-7.55 0-13.89-2.44-18.3-8.83a20.02 20.02 0 01-3.46-11.68l.04-98.19q0-38.2-.04-76.4.02-54.14.1-108.29-.02-93-.15-185.99c0-7.01 1.64-13.14 7.15-17.83A19.98 19.98 0 0140.51.06Q95.28-.04 150.07 0q52.37 0 104.74.03l67.56-.02q30.1 0 60.2.03c10.77.01 18.93 5.98 20.92 15.84.8 3.99.45 8.22.46 12.35.04 15.1 0 30.19 0 45.29v74.38h-19.9V40.26H40.3c-.05.9-.14 1.79-.15 2.67v367.4c0 18.3.04 36.59-.05 54.88-.02 2.31.74 2.8 2.89 2.79q93.87-.08 187.74-.04l70.06-.01zm-103.94 21.93a12.13 12.13 0 0011.76 12.07 12.04 12.04 0 00.3-24.09 12.12 12.12 0 00-12.06 12.02z'
                    }
                />
                <path
                    d={
                        'M491.93 335.93l-.01 151.83a40.58 40.58 0 01-.33 7.54c-1.87 9.77-9.25 16.06-19.2 16.62-1.35.08-2.7.06-4.05.06l-130.58.02c-7.35 0-13.58-2.31-18.03-8.4-2.84-3.88-3.77-8.33-3.77-13.1q.07-54.42.03-108.83 0-100.21-.03-200.43c0-7.22 2.48-13.13 8.39-17.48a19.66 19.66 0 0112.1-3.68q18.84.04 37.68.01l97.16.01c12 0 20.57 8.24 20.59 20.21q.1 64.15 0 128.3v27.32zM328 467.47h151.8V203.95H328zm63.94 22.22a12 12 0 1024.01.43 12 12 0 10-24-.43z'
                    }
                />
            </g>
        </SvgIcon>
    );
}

MobileDevices.defaultProps = ({
    title: 'MobileDevicesIcon',
    size: null,
    color: null
}: DefaultProps);

export {MobileDevices};
