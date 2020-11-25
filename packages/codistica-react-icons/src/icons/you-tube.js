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

function YouTube(props: Props) {
    const {color, backgroundColor, ...other} = props;
    return (
        <SvgIcon {...other}>
            <path
                d={'M134.5 134.5h243v243h-243z'}
                fill={backgroundColor || '#ffffff'}
            />
            <path
                d={
                    'M341.05 250.76c-46.94-25.09-137.84-72.23-137.84-72.23L324.41 260l16.64-9.23z'
                }
                opacity={'.1'}
                fill={color || '#000000'}
            />
            <path
                d={
                    'M212.05 435.35c-97.51-1.8-130.81-3.41-151.29-7.63-13.85-2.8-25.88-9.02-34.7-18.05-6.83-6.83-12.25-17.25-16.46-31.7C6 365.91 4.6 355.9 2.58 331.41c-3.07-55.25-3.8-100.42 0-150.89 3.14-27.87 4.66-60.95 25.48-80.25a68.3 68.3 0 0134.11-17.25c20.06-3.81 105.53-6.82 194.02-6.82 88.28 0 173.95 3 194.03 6.82 16.04 3 31.09 12.03 39.92 23.67 19 29.88 19.33 67.04 21.26 96.11.8 13.85.8 92.5 0 106.34-3 45.94-5.41 62.2-12.23 79.04-4.22 10.64-7.82 16.26-14.05 22.48a67.3 67.3 0 01-35.72 18.26c-84.38 6.34-156.03 7.72-237.35 6.42zm129.21-184.59c-46.94-25.09-91.9-48.35-137.84-72.43V322.4c48.35-26.28 99.32-50.36 138.04-71.83l-.2.2z'
                }
                fill={color || '#cd201f'}
            />
        </SvgIcon>
    );
}

YouTube.defaultProps = ({
    title: 'YouTubeIcon',
    size: null,
    color: null,
    backgroundColor: null
}: DefaultProps);

export {YouTube};
