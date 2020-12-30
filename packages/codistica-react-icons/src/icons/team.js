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

function Team(props: Props) {
    const {color, ...other} = props;
    return (
        <SvgIcon {...other}>
            <g fill={color || '#000000'}>
                <path
                    d={
                        'M270.8 512h-31.87c-2.85-.75-5.67-1.93-8.57-2.18-103.74-8.83-195.37-86.54-220.97-188-4.05-16.02-6.3-32.5-9.39-48.75v-36.41c.74-2.9 1.84-5.74 2.18-8.67C14.11 124.29 84.2 40.49 184.7 11.17 203.06 5.81 222.35 3.64 241.2 0h29.6c7.05.99 14.12 1.95 21.17 2.98C398.23 18.42 482.7 97.64 505.3 203.4c2.98 13.96 4.51 28.23 6.71 42.36v25.03c-.96 6.68-1.72 13.38-2.9 20.02-18.67 105.17-78.13 175.68-179.74 209.29-18.78 6.2-39 8.04-58.57 11.9zm-15.23-20.54c130.04-1.17 234.46-103.85 235.5-232.56 1.08-132.43-105.18-239.03-235.5-238.2C124.3 21.54 22.07 126.11 20.8 251.43c-1.36 133.73 104.16 240.19 234.77 240.03z'
                    }
                />
                <path
                    d={
                        'M176.43 390.23c1.17-36.17-.04-71.9 4.22-106.96 3.25-26.76 22.76-44.27 48.5-54.9l26.94 35.2 25.77-34.1c25.48 5.68 49.55 32.9 51.74 62.6 2.08 28.27.72 56.8.87 85.21.02 4.09 0 8.18 0 12.95z'
                    }
                />
                <path
                    d={
                        'M173.2 257.28l17.51-19.32c1.3 3.17 1.99 4.2 1.78 4.43-18.48 20.6-25.14 44.93-24.32 72.23.76 24.92.16 49.88.16 75.55h-57.98a81.22 81.22 0 01-.83-8.37c-.06-29.16-.2-58.33.01-87.5.19-25.15 15.04-46.01 39.15-54.93l19.73 26 5.15-8.42zM402.12 390.53h-58c-.2-4.32-.53-8.32-.54-12.32-.03-25.37.4-50.74-.08-76.1-.43-23-9.07-43.15-24.7-60.4l3.34-2.8c3.33 3.79 6.78 7.46 9.95 11.37 3.56 4.4 6.85 9 11.28 14.85l20.59-26.19c22.18 9.32 36.4 25.6 37.68 48.72 1.88 33.88.48 67.95.48 102.87zM256.38 218.48c-27.82.11-49.11-20.94-49.1-48.57a48.95 48.95 0 0148.27-48.76c26.81-.34 49.15 21.97 49.17 49.1.02 26.87-21.28 48.13-48.34 48.23zM204.63 195.49a36.48 36.48 0 01-36.27 36.02c-20.28.06-36.35-16.41-36.25-37.15.1-20.13 15.8-35.56 36.22-35.59 20.77-.03 36.43 15.8 36.3 36.72zM307.33 193.89c.23-20.04 16.19-35.32 36.66-35.12 20.68.2 36.27 16.39 35.85 37.21-.4 19.68-16.93 35.64-36.83 35.54-20.25-.09-35.92-16.63-35.68-37.63zM255.86 255.6c-8.37-4.87-8.5-11.88-4.05-19 .88-1.4 7.72-1.44 8.45-.17 4.09 7.08 4.9 14.3-4.4 19.17z'
                    }
                />
                <path
                    d={
                        'M343.26 258.57c-5.34-3.11-5.43-7.58-2.59-12.13.56-.9 4.93-.92 5.4-.1 2.6 4.51 3.13 9.12-2.81 12.23zM168.86 258.57c-5.34-3.11-5.43-7.58-2.58-12.13.56-.9 4.92-.92 5.39-.1 2.6 4.51 3.13 9.12-2.8 12.23z'
                    }
                />
            </g>
        </SvgIcon>
    );
}

Team.defaultProps = ({
    title: 'TeamIcon',
    size: null,
    color: null
}: DefaultProps);

export {Team};
