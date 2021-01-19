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

function Internet(props: Props) {
    const {color, ...other} = props;
    return (
        <SvgIcon {...other}>
            <g fill={color || '#000000'}>
                <path
                    d={
                        'M252.87 264.48V376.9c4.98.34 9.9.4 14.72 1.06 16.2 2.2 32.4 4.47 48.56 7 6.25.99 9.41 5.51 8.25 10.61-1.2 5.2-5.66 7.53-11.94 6.16a303.5 303.5 0 00-54.5-7.1c-1.54-.05-3.08 0-4.95 0v87.06c2.75-.57 5.34-.96 7.84-1.66 18.25-5.04 32.54-16.12 44.47-30.27 6.35-7.53 11.7-15.88 17.4-23.94 3.11-4.4 7.9-5.81 12.1-3.32 4.12 2.43 5.26 7.52 2.72 12.22-.34.62-.72 1.21-1.09 1.81a173.22 173.22 0 01-26.37 33.55 5.63 5.63 0 00-1.76 3.24c3.68-1.23 7.4-2.31 11.02-3.7 6.57-2.55 13.1-5.25 19.6-7.94 5.38-2.22 10.17-.85 12.3 3.64 2.26 4.74.28 9.55-5.16 12.06-40.31 18.52-82.64 26.11-126.66 20.86-88.18-10.51-153.82-55.28-193.69-134.51-71.7-142.5 13.33-314.99 169.73-346.67 133.4-27.02 263.32 60.22 288.26 193.72a243.45 243.45 0 01-4.77 110.74c-1.06 3.85-2.98 6.66-7.13 7.45-6.45 1.23-11.22-4.19-9.77-11.03 2.19-10.34 4.56-20.66 6.4-31.06 1.1-6.24 1.25-12.64 1.95-18.95.28-2.63-.74-3.48-3.3-3.47q-41.52.08-83.04 0c-2.4 0-3.23.96-3.26 3.25a267.6 267.6 0 01-.48 13.97c-.4 6.24-3.84 9.82-8.97 9.64-5.37-.19-8.51-4.16-8.29-10.58.14-3.95.22-7.92.66-11.84.4-3.65-1.06-4.49-4.5-4.48-28.95.12-57.9.07-86.85.07zm-17.54 111.87c.06-1.16.2-2.55.2-3.94.02-34.3-.05-68.61.1-102.92.02-4.18-1.32-5.11-5.3-5.1-33.45.16-66.91.1-100.38.1h-5.45c1.01 43.9 7.89 85.99 23.6 125.85 14.96-3.17 29.06-6.73 43.37-9.02 14.31-2.3 28.83-3.32 43.86-4.97zM124.52 247.14c2.05.1 3.57.22 5.08.22 33.6 0 67.2-.06 100.8.1 4.08.02 5.25-1.08 5.23-5.18-.15-34.16-.08-68.33-.1-102.5 0-1.62-.2-3.24-.33-5.02a328.56 328.56 0 01-86.82-14c-15.99 40.83-22.9 82.83-23.86 126.38zm128.45-112.37c-.13 1.3-.28 2.12-.28 2.94-.01 35.3.04 70.61-.09 105.92 0 3.54 1.6 3.78 4.38 3.77 24-.06 48.01-.03 72.02-.03 10.3 0 20.62-.1 30.93.05 2.99.05 4.05-.93 3.79-3.9-.36-4.07-.43-8.17-.67-12.26-2.1-35.42-8.45-70-20.53-103.45-.84-2.33-1.87-4.59-2.9-7.1-28.37 8.77-57.03 13.1-86.65 14.06zm103.58-18.99c1.47 4.12 3.09 8.46 4.58 12.84 12.55 36.9 18.57 74.95 19.63 113.84.08 2.88.01 5.03 4.17 5 27.24-.18 54.49-.13 81.74-.05 2.94.01 3.92-.83 3.71-3.89-3.3-50.02-20.75-94.43-52.75-133.05-5.02-6.05-10.55-11.68-15.34-16.95zm-338.9 149c3.4 60.41 26.36 111.47 68.3 153.42l45.79-22.22c-16.4-41.96-23.34-86.02-24.58-131.2zm114.32-149.53c-1.7-.73-3-1.21-4.25-1.81-12.18-5.88-24.49-11.52-36.44-17.83-3.9-2.05-5.8-1.62-8.72 1.41q-51.67 53.7-62.74 127.3c-1.11 7.45-1.51 15-2.27 22.77h89.62c1.22-45.24 8.19-89.19 24.8-131.84zm23.8 291.7c4.41 12.74 20 36.1 32.22 48.55 9.9 10.08 21.07 18.32 34.53 23.01 4.03 1.4 8.26 2.24 12.73 3.42v-87.45a295.4 295.4 0 00-79.47 12.48zm79.52-376.7c-14.3 1.96-26.26 8.17-37.04 16.84-19.16 15.43-32.07 35.48-42.7 57.37 16.52 6.8 67.35 14.6 79.74 12.34zm97.1 74.18a20.86 20.86 0 00-.83-2.27c-7.03-14.2-15.22-27.68-25.67-39.66-12.34-14.15-26.6-25.6-45.12-30.7-2.49-.69-5.06-1.07-7.77-1.63v86.76c14.88 1.83 65.8-6.2 79.39-12.5zM181.02 39c-18.65 1.97-75.6 32.58-80 43.19L138.6 99.7c11-22.97 23.99-43.44 42.42-60.71zM100.2 430.1c13.97 15.18 67.61 43.23 80.42 42.32-18.23-16.98-31.09-37.55-42.07-60.31zM349.65 99.74l38.36-18.17c-16.02-16.03-67.29-42.8-80.34-42.11 18.1 17 30.98 37.4 41.98 60.28z'
                    }
                />
                <path
                    d={
                        'M450.8 389.86l52.29 52.21c1.8 1.8 3.65 3.54 5.37 5.4 4.54 4.92 4.82 11.27.23 16q-14 14.44-28.45 28.45c-4.92 4.76-11.56 4.06-16.93-1.3q-26.68-26.63-53.33-53.28c-.98-.98-2.02-1.91-3.4-3.21-1.08 1.35-2.04 2.5-2.93 3.69-7.24 9.74-14.52 19.45-21.66 29.27-3 4.14-6.76 6.35-11.92 5.6-5.04-.75-7.71-4.13-9.46-8.65q-32.9-85.03-65.76-170.09a18.12 18.12 0 01-.7-10.59c1.73-6.3 8.71-8.56 15.77-5.83q33.54 12.97 67.06 26l101.39 39.27c.66.26 1.3.57 1.97.78 4.93 1.58 8.53 4.52 9.28 9.9s-2 9.02-6.2 12.07c-9.72 7.04-19.3 14.26-28.92 21.42-1.1.82-2.17 1.7-3.7 2.9zm-77.38 59.31c1.25-1.51 2.07-2.42 2.8-3.4q9.6-12.92 19.16-25.86c6-8.09 13.1-8.6 20.26-1.45q26.66 26.65 53.27 53.35a15.77 15.77 0 012.17 3.48l20.61-20.61c-1.08-.96-2.52-2.1-3.81-3.4q-26.39-26.32-52.68-52.74a16.76 16.76 0 01-4.29-6.59c-1.57-5.33.58-9.57 5.03-12.83 9.88-7.24 19.69-14.57 30.33-22.45l-151.48-58.74z'
                    }
                />
            </g>
        </SvgIcon>
    );
}

Internet.defaultProps = ({
    title: 'InternetIcon',
    size: null,
    color: null
}: DefaultProps);

export {Internet};